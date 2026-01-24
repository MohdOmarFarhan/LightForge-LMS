<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Question;
use App\Models\Exam;
use App\Models\ExamAttempt;
use App\Notifications\StudentApproved;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function dashboard()
    {
        // Stats
        $totalStudents = User::where('role', 'student')->where('is_approved', true)->count();
        $questionsCount = Question::count();
        $activeExams = Exam::where('is_published', true)
            ->where('end_time', '>', now())
            ->count();
        $pendingReviews = ExamAttempt::where('status', 'submitted')->count();
        $pendingApprovals = User::where('role', 'student')->where('is_approved', false)->count();
        
        // Avg Performance (across all graded attempts)
        $avgPerformance = ExamAttempt::where('status', 'graded')
            ->join('exams', 'exam_attempts.exam_id', '=', 'exams.id')
            ->select(DB::raw('AVG((exam_attempts.total_score / exams.total_marks) * 100) as avg_pct'))
            ->value('avg_pct');
        $avgPerformance = $avgPerformance ? round($avgPerformance, 1) : 0;

        // Recent Activity (Last 5 attempts)
        $recentActivity = ExamAttempt::with(['user', 'exam'])
            ->latest('updated_at')
            ->take(5)
            ->get()
            ->map(function ($attempt) {
                $action = 'Started exam';
                if ($attempt->status === 'submitted') $action = 'Submitted exam';
                if ($attempt->status === 'graded') $action = 'Graded exam';

                return [
                    'student' => $attempt->user->name,
                    'action' => $action,
                    'exam' => $attempt->exam->title,
                    'time' => $attempt->updated_at->diffForHumans(),
                    'class' => 'Class ' . $attempt->user->class,
                ];
            });

        // Upcoming Exams (Next 5)
        $upcomingExams = Exam::where('is_published', true)
            ->where('start_time', '>', now())
            ->orderBy('start_time')
            ->take(3)
            ->get()
            ->map(function ($exam) {
                return [
                    'name' => $exam->title,
                    'class' => 'Class ' . $exam->class,
                    'date' => $exam->start_time->format('M d, Y'),
                    'time' => $exam->start_time->format('h:i A'),
                    'students' => User::where('role', 'student')
                        ->where('class', $exam->class)
                        ->where('is_approved', true)
                        ->count(), // Potential students
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalStudents' => $totalStudents,
                'questionsCount' => $questionsCount,
                'activeExams' => $activeExams,
                'pendingReviews' => $pendingReviews,
                'pendingApprovals' => $pendingApprovals,
                'avgPerformance' => $avgPerformance,
            ],
            'recentActivity' => $recentActivity,
            'upcomingExams' => $upcomingExams,
        ]);
    }

    public function students(Request $request)
    {
        $query = User::where('role', 'student')->where('is_approved', true);

        if ($request->has('class') && $request->class !== 'all') {
            $query->where('class', $request->class);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('student_id', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $students = $query->orderBy('student_id')
            ->withCount('examAttempts as exams_count')
            ->withAvg('examAttempts as avg_score', 'total_score')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'filters' => $request->only(['class', 'search']),
            'stats' => [
                'all' => User::where('role', 'student')->where('is_approved', true)->count(),
                '11' => User::where('role', 'student')->where('is_approved', true)->where('class', '11')->count(),
                '12' => User::where('role', 'student')->where('is_approved', true)->where('class', '12')->count(),
            ]
        ]);
    }

    public function pendingStudents()
    {
        $students = User::where('role', 'student')
            ->where('is_approved', false)
            ->latest()
            ->get();

        return Inertia::render('Admin/PendingStudents', [
            'students' => $students
        ]);
    }

    public function approveStudent(User $user)
    {
        if ($user->is_approved) {
            return back()->with('error', 'User is already approved.');
        }

        DB::transaction(function () use ($user) {
            // Generate Student ID: YYGSSS
            // YY: Last 2 digits of HSC Year
            $yy = substr($user->hsc_year, -2);
            
            // G: Group Code
            $groupCodes = [
                'Science' => '1',
                'Business' => '2',
                'Humanities' => '3'
            ];
            $g = $groupCodes[$user->group] ?? '0'; // Default to 0 if unknown

            // SSS: Serial Number
            // Find the max serial for this year and group
            // We search for students with IDs starting with "$yy$g"
            $prefix = "$yy$g";
            $latestStudent = User::where('student_id', 'like', "$prefix%")
                ->orderBy('student_id', 'desc')
                ->first();

            $nextSerial = 1;
            if ($latestStudent) {
                // Extract SSS from YYGSSS
                // $prefix is 3 chars long (YYG)
                $lastId = $latestStudent->student_id;
                // Ensure it's numeric and has the expected length/format before parsing
                if (is_numeric($lastId) && strlen($lastId) >= 3) {
                     $serialPart = substr($lastId, 3);
                     $nextSerial = intval($serialPart) + 1;
                }
            }

            $sss = str_pad($nextSerial, 3, '0', STR_PAD_LEFT);
            $studentId = "$yy$g$sss";

            $user->update([
                'student_id' => $studentId,
                'is_approved' => true
            ]);
            
            // Send notification
            try {
                $user->notify(new StudentApproved($user));
            } catch (\Exception $e) {
                // Log error but don't fail transaction? 
                // For now, let's just proceed.
            }
        });

        return back()->with('success', 'Student approved successfully. ID: ' . $user->student_id);
    }

    public function leaderboard(Request $request)
    {
        $selectedClass = $request->input('class', '12'); // Default to 12

        $students = User::where('role', 'student')
            ->where('is_approved', true)
            ->where('class', $selectedClass)
            ->withCount(['examAttempts as exams_count' => function ($q) {
                $q->where('status', 'graded');
            }])
            ->withSum(['examAttempts as total_marks' => function ($q) {
                $q->where('status', 'graded');
            }], 'total_score')
            ->withAvg(['examAttempts as avg_marks' => function ($q) {
                $q->where('status', 'graded');
            }], 'total_score')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => (string) ($user->student_id ?? $user->id),
                    'name' => $user->name,
                    'exams' => $user->exams_count,
                    'totalMarks' => (int) $user->total_marks,
                    'avgMarks' => round($user->avg_marks ?? 0, 1),
                    'isCurrentUser' => false,
                ];
            })
            ->sortByDesc('avgMarks')
            ->values();

        return Inertia::render('Admin/Leaderboard', [
            'students' => $students,
            'filters' => [
                'class' => $selectedClass,
            ]
        ]);
    }
}
