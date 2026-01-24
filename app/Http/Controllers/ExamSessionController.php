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
        $exams = Exam::where('class', auth()->user()->class)
            ->where('is_published', true)
            ->with(['attempts' => function($query) {
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
        $exam = Exam::withCount('questions')->findOrFail($id);
        $attempt = ExamAttempt::where('exam_id', $id)
            ->where('user_id', auth()->id())
            ->first();

        return Inertia::render('Exams/Show', [
            'exam' => $exam,
            'attempt' => $attempt
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
            return redirect()->route('exams.take', $id);
        }

        $attempt = ExamAttempt::create([
            'exam_id' => $id,
            'user_id' => auth()->id(),
            'started_at' => now(),
            'status' => 'in_progress',
        ]);

        return redirect()->route('exams.take', $id);
    }

    public function take($id)
    {
        $exam = Exam::with(['questions' => function($q) {
            $q->select('questions.id', 'type', 'content', 'options', 'marks', 'sub_questions') // Hide correct_answer
              ->orderBy('pivot_order');
        }])->findOrFail($id);

        $attempt = ExamAttempt::where('exam_id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        if ($attempt->status !== 'in_progress') {
            return redirect()->route('exams.session', $id);
        }

        // Calculate remaining time
        $endTime = $attempt->started_at->addMinutes($exam->duration_minutes);
        $remainingSeconds = now()->diffInSeconds($endTime, false);

        if ($remainingSeconds <= 0) {
            // Auto submit if time is up
             return $this->submit($id, new Request()); // Simplified for now
        }

        return Inertia::render('Exams/Take', [
            'exam' => $exam,
            'attempt' => $attempt,
            'remainingSeconds' => $remainingSeconds
        ]);
    }

    public function submit(Request $request, $id)
    {
        $exam = Exam::with('questions')->findOrFail($id);
        $attempt = ExamAttempt::where('exam_id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        if ($attempt->status !== 'in_progress') {
             return redirect()->route('exams.session', $id);
        }

        $answers = $request->input('answers', []);
        
        DB::transaction(function () use ($exam, $attempt, $answers) {
            $score_mcq = 0;

            foreach ($exam->questions as $question) {
                $userAnswer = $answers[$question->id] ?? null;
                $marks = 0;

                // Auto-grade MCQ
                if ($question->type === 'mcq' && $userAnswer) {
                     if ($userAnswer['answer_text'] === $question->correct_answer) {
                         $marks = $question->marks;
                         $score_mcq += $marks;
                     }
                }

                ExamAnswer::create([
                    'exam_attempt_id' => $attempt->id,
                    'question_id' => $question->id,
                    'answer_text' => $userAnswer['answer_text'] ?? null,
                    'answer_images' => $userAnswer['answer_images'] ?? null,
                    'marks_obtained' => $marks, // Default 0 for CQ/Descriptive until graded
                ]);
            }

            $attempt->update([
                'submitted_at' => now(),
                'status' => 'submitted',
                'score_mcq' => $score_mcq,
                // total_score will be updated after manual grading
            ]);
        });

        return redirect()->route('exams.session', $id)->with('success', 'Exam submitted successfully.');
    }
}
