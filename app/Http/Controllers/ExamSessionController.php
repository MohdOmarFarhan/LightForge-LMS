<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\ExamAttempt;
use App\Models\ExamAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ExamSessionController extends Controller
{
    public function index()
    {
        // Get available exams for the student's class
        $exams = Exam::where('target_class', auth()->user()->class)
            ->where('is_published', true)
            ->with(['subject', 'attempts' => function($query) {
                $query->where('user_id', auth()->id());
            }])
            ->latest()
            ->get()
            ->map(function ($exam) {
                $exam->user_attempt = $exam->attempts->first();
                return $exam;
            });

        return Inertia::render('Exams/Index', [
            'exams' => $exams
        ]);
    }

    public function show($id)
    {
        $exam = Exam::with(['subject'])->withCount('questions')->findOrFail($id);
        $attempt = ExamAttempt::where('exam_id', $id)
            ->where('user_id', auth()->id())
            ->first();

        // Calculate breakdown for frontend
        $breakdown = [
            'mcq' => $exam->questions()->where('type', 'mcq')->count(),
            'cq' => $exam->questions()->where('type', 'cq')->count(),
            'descriptive' => $exam->questions()->where('type', 'descriptive')->count(),
            'mcq_marks' => $exam->questions()->where('type', 'mcq')->sum('marks'),
            'cq_marks' => $exam->questions()->where('type', 'cq')->sum('marks'),
            'descriptive_marks' => $exam->questions()->where('type', 'descriptive')->sum('marks'),
        ];

        return Inertia::render('Exams/Show', [
            'exam' => $exam,
            'attempt' => $attempt,
            'breakdown' => $breakdown
        ]);
    }

    public function start(Request $request, $id)
    {
        $exam = Exam::findOrFail($id);
        
        // Check if already attempted
        $existingAttempt = ExamAttempt::where('exam_id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if ($existingAttempt) {
            // Check if user is trying to start a specific section
            if ($request->has('section')) {
                return redirect()->route('exams.take', ['id' => $id, 'section' => $request->section]);
            }
            return redirect()->route('exams.session', $id);
        }

        $attempt = ExamAttempt::create([
            'exam_id' => $id,
            'user_id' => auth()->id(),
            'started_at' => now(),
            'status' => 'in_progress',
        ]);

        if ($request->has('section')) {
            return redirect()->route('exams.take', ['id' => $id, 'section' => $request->section]);
        }
        
        return redirect()->route('exams.session', $id);
    }

    public function take(Request $request, $id)
    {
        $section = $request->query('section'); // mcq, cq, descriptive

        if (!$section || !in_array($section, ['mcq', 'cq', 'descriptive'])) {
             return redirect()->route('exams.session', $id)->with('error', 'Invalid exam section.');
        }

        $exam = Exam::with(['questions' => function($q) use ($section) {
            $q->where('type', $section)
              ->orderByPivot('order');
        }])->findOrFail($id);

        $attempt = ExamAttempt::where('exam_id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        // Check if section is already submitted
        $submittedColumn = "{$section}_submitted_at";
        if ($attempt->$submittedColumn) {
            return redirect()->route('exams.session', $id)->with('error', 'Section already submitted.');
        }

        // Check if section is started, if not start it
        $startedColumn = "{$section}_started_at";
        if (!$attempt->$startedColumn) {
            $attempt->update([$startedColumn => now()]);
        }

        // Calculate remaining time for THIS section
        $durationColumn = "{$section}_duration_minutes";
        $duration = $exam->$durationColumn ?? $exam->duration_minutes; // Fallback to total if not set (though logic implies separate)
        
        // If specific duration is not set, we might need a fallback or assume it's part of total. 
        // User requirement says "time will be alloted separately". 
        // If 0 or null, maybe unlimited? Let's assume strict separation.
        
        $startTime = $attempt->$startedColumn;
        $endTime = $startTime->copy()->addMinutes($duration);
        $remainingSeconds = now()->diffInSeconds($endTime, false);

        if ($remainingSeconds <= 0) {
             // Auto submit section
             return $this->submitSection($request, $id, $section);
        }

        return Inertia::render('Exams/Take', [
            'exam' => $exam,
            'attempt' => $attempt,
            'remainingSeconds' => $remainingSeconds,
            'section' => $section
        ]);
    }

    public function submitSection(Request $request, $id, $section = null)
    {
        // If called from route, section might be in request
        $section = $section ?? $request->input('section');

        if (!$section || !in_array($section, ['mcq', 'cq', 'descriptive'])) {
            return redirect()->back();
        }

        $exam = Exam::with(['questions' => function($q) use ($section) {
            $q->where('type', $section);
        }])->findOrFail($id);

        $attempt = ExamAttempt::where('exam_id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();
            
        $submittedColumn = "{$section}_submitted_at";
        if ($attempt->$submittedColumn) {
             return redirect()->route('exams.session', $id);
        }

        $answers = $request->input('answers', []);
        
        DB::transaction(function () use ($exam, $attempt, $answers, $section, $submittedColumn) {
            $sectionScore = 0;

            foreach ($exam->questions as $question) {
                $userAnswer = $answers[$question->id] ?? null;
                $marks = 0;
                
                // Determine Marks for this question
                $questionMarks = $question->marks;
                if ($section === 'mcq' && $exam->mcq_marks_per_question) $questionMarks = $exam->mcq_marks_per_question;
                if ($section === 'cq' && $exam->cq_marks_per_question) $questionMarks = $exam->cq_marks_per_question;
                if ($section === 'descriptive' && $exam->descriptive_marks_per_question) $questionMarks = $exam->descriptive_marks_per_question;

                if ($question->type === 'mcq') {
                    if ($userAnswer && isset($userAnswer['answer_text']) && $userAnswer['answer_text'] === $question->correct_answer) {
                         $marks = $questionMarks;
                         $sectionScore += $marks;
                    }
                }

                // Handle Image Uploads or Rich Text for CQ/Descriptive
                // CQ might have sub-questions structure in answer_text JSON
                $answerText = $userAnswer['answer_text'] ?? null;
                if (is_array($answerText)) {
                    $answerText = json_encode($answerText);
                }

                ExamAnswer::updateOrCreate(
                    [
                        'exam_attempt_id' => $attempt->id,
                        'question_id' => $question->id,
                    ],
                    [
                        'answer_text' => $answerText,
                        // 'answer_images' => ... (handle file uploads if necessary, or assume URLs from frontend editor)
                        'marks_obtained' => ($question->type === 'mcq') ? $marks : null, 
                    ]
                );
            }

            $updateData = [
                $submittedColumn => now(),
            ];

            if ($section === 'mcq') {
                $updateData['score_mcq'] = $sectionScore;
            }

            $attempt->update($updateData);
            
            // Check if all sections are done to mark main status as submitted/graded?
            // For now, main status 'in_progress' is fine until we define a 'completed' state for the whole exam.
            // But we need to show results.
        });

        return redirect()->route('exams.session', $id)->with('success', strtoupper($section) . ' section submitted.');
    }

    public function submitAll($id)
    {
        $attempt = ExamAttempt::where('exam_id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $exam = Exam::with('questions')->findOrFail($id);
        
        // Determine if there are written questions
        $writtenQuestions = $exam->questions->filter(function ($q) {
            return in_array($q->type, ['cq', 'descriptive']);
        });
        
        $hasWritten = $writtenQuestions->count() > 0;

        $updateData = [
            'submitted_at' => now(),
            'status' => $hasWritten ? 'submitted' : 'graded',
        ];

        // If no written questions, total score is just MCQ score
        if (!$hasWritten) {
            $updateData['total_score'] = $attempt->score_mcq;
        }

        $attempt->update($updateData);

        return redirect()->route('exams.session', $id)->with('success', 'Exam submitted successfully.');
    }
}
