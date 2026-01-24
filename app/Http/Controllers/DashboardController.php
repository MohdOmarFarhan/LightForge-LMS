<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\ExamAttempt;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Redirect admin
        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        // 1. Upcoming Exams
        // Exams for student's class, published, start_time in future OR (started but not submitted)
        // Actually, "Upcoming" usually means start_time > now.
        // But let's show exams that are available to take.
        $upcomingExams = Exam::where('class', $user->class)
            ->where('is_published', true)
            ->where('end_time', '>', now()) // Not expired
            ->whereDoesntHave('attempts', function ($q) use ($user) {
                $q->where('user_id', $user->id)->whereIn('status', ['submitted', 'graded']);
            })
            ->orderBy('start_time')
            ->take(5)
            ->get()
            ->map(function ($exam) {
                return [
                    'id' => $exam->id,
                    'title' => $exam->title,
                    'subject' => $exam->subject,
                    'date' => $exam->start_time->format('M d, Y'),
                    'time' => $exam->start_time->format('h:i A') . ' - ' . $exam->end_time->format('h:i A'),
                    'duration' => $exam->duration_minutes . ' min',
                    'questions' => $exam->questions()->count(),
                    'status' => 'upcoming', // You could refine this
                ];
            });

        // 2. Stats
        // Exams Taken
        $examsTakenCount = ExamAttempt::where('user_id', $user->id)
            ->whereIn('status', ['submitted', 'graded'])
            ->count();

        // Average Score
        $avgScore = ExamAttempt::where('user_id', $user->id)
            ->where('status', 'graded') // Only graded exams count for score
            ->avg('total_score');
        
        $avgScore = $avgScore ? round($avgScore, 1) : 0;

        // Rank
        // Calculate average score for all users who have graded exams
        $userScores = ExamAttempt::where('status', 'graded')
            ->whereHas('user', function ($q) use ($user) {
                $q->where('class', $user->class)
                  ->where('hsc_year', $user->hsc_year);
            })
            ->select('user_id', DB::raw('AVG(total_score) as avg_score'))
            ->groupBy('user_id')
            ->orderByDesc('avg_score')
            ->get();
        
        $rank = $userScores->search(function ($item) use ($user) {
            return $item->user_id == $user->id;
        });

        $rankDisplay = ($rank !== false) ? '#' . ($rank + 1) : '-';
        $totalStudents = $userScores->count(); // Or User::where('role', 'student')->count();
        if ($totalStudents == 0) {
             $totalStudents = \App\Models\User::where('role', 'student')
                ->where('class', $user->class)
                ->where('hsc_year', $user->hsc_year)
                ->count();
        }


        $stats = [
            [
                'id' => 'exams',
                'title' => 'Exams Taken',
                'value' => (string)$examsTakenCount,
                'description' => 'Total completed exams',
                'type' => 'exams' // For icon mapping in frontend
            ],
            [
                'id' => 'performance',
                'title' => 'Average Score',
                'value' => $avgScore . '%', // Assuming total_score is percentage or we normalize it. 
                                            // Wait, total_score is absolute marks. We should probably calculate percentage.
                                            // But for now let's stick to raw score or assume max is 100.
                                            // If exams have different total marks, straight average of scores is misleading.
                                            // Percentage is better: (obtained / total) * 100
                'description' => 'Across all graded exams',
                'type' => 'performance'
            ],
            [
                'id' => 'leaderboard',
                'title' => 'Your Rank',
                'value' => $rankDisplay,
                'description' => "Out of $totalStudents students",
                'type' => 'leaderboard'
            ]
        ];
        
        // Fix Average Score Percentage Calculation
        $attempts = ExamAttempt::where('user_id', $user->id)
            ->where('status', 'graded')
            ->with('exam')
            ->get();
            
        if ($attempts->count() > 0) {
            $totalPercentage = 0;
            foreach ($attempts as $attempt) {
                if ($attempt->exam->total_marks > 0) {
                    $totalPercentage += ($attempt->total_score / $attempt->exam->total_marks) * 100;
                }
            }
            $avgPercentage = round($totalPercentage / $attempts->count(), 1);
            $stats[1]['value'] = $avgPercentage . '%';
        }


        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'upcomingExams' => $upcomingExams,
        ]);
    }
}
