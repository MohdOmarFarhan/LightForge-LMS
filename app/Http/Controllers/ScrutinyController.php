<?php

namespace App\Http\Controllers;

use App\Models\ExamAttempt;
use App\Models\ExamAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ScrutinyController extends Controller
{
    public function index(Request $request)
    {
        $query = ExamAttempt::with(['user', 'exam'])
            ->where('status', 'submitted');

        if ($request->filled('exam_id')) {
            $query->where('exam_id', $request->exam_id);
        }

        $attempts = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Scrutiny/Index', [
            'attempts' => $attempts,
            'filters' => $request->only(['exam_id']),
        ]);
    }

    public function show(ExamAttempt $attempt)
    {
        $attempt->load(['user', 'exam', 'answers.question']);

        return Inertia::render('Admin/Scrutiny/Show', [
            'attempt' => $attempt,
        ]);
    }

    public function update(Request $request, ExamAttempt $attempt)
    {
        $validated = $request->validate([
            'answers' => 'required|array',
            'answers.*.id' => 'required|exists:exam_answers,id',
            'answers.*.marks_obtained' => 'required|integer|min:0',
            'answers.*.feedback' => 'nullable|string',
        ]);

        DB::transaction(function () use ($attempt, $validated) {
            $totalScore = 0;
            $mcqScore = 0;
            $cqScore = 0;
            $descriptiveScore = 0;

            foreach ($validated['answers'] as $answerData) {
                $answer = ExamAnswer::find($answerData['id']);
                $answer->update([
                    'marks_obtained' => $answerData['marks_obtained'],
                    'feedback' => $answerData['feedback'],
                ]);

                // Recalculate scores based on question type
                $type = $answer->question->type;
                if ($type === 'mcq') {
                    $mcqScore += $answerData['marks_obtained'];
                } elseif ($type === 'cq') {
                    $cqScore += $answerData['marks_obtained'];
                } else {
                    $descriptiveScore += $answerData['marks_obtained'];
                }
                
                $totalScore += $answerData['marks_obtained'];
            }

            $attempt->update([
                'score_mcq' => $mcqScore,
                'score_cq' => $cqScore,
                'score_descriptive' => $descriptiveScore,
                'total_score' => $totalScore,
                'status' => 'graded',
            ]);
        });

        return redirect()->route('admin.scrutiny')->with('success', 'Exam graded successfully.');
    }
}
