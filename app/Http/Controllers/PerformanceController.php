<?php

namespace App\Http\Controllers;

use App\Models\ExamAttempt;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PerformanceController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Get all graded attempts for the user
        $attempts = ExamAttempt::where('user_id', $user->id)
            ->where('status', 'graded')
            ->with('exam')
            ->orderBy('submitted_at')
            ->get();

        $examData = $attempts->map(function ($attempt) {
            $totalMarks = $attempt->exam->total_marks > 0 ? $attempt->exam->total_marks : 100;
            $percentage = round(($attempt->total_score / $totalMarks) * 100);
            
            // Determine grade based on percentage
            $grade = 'F';
            if ($percentage >= 90) $grade = 'A+';
            else if ($percentage >= 85) $grade = 'A';
            else if ($percentage >= 80) $grade = 'B+';
            else if ($percentage >= 75) $grade = 'B';
            else if ($percentage >= 70) $grade = 'C+';
            else if ($percentage >= 65) $grade = 'C';
            else if ($percentage >= 60) $grade = 'D+';
            else if ($percentage >= 50) $grade = 'D';

            return [
                'id' => $attempt->id,
                'subject' => $attempt->exam->subject,
                'title' => $attempt->exam->title,
                'date' => $attempt->submitted_at->format('Y-m-d'),
                'dateLabel' => $attempt->submitted_at->format('M d'),
                'totalMarks' => $totalMarks,
                'obtainedMarks' => $attempt->total_score,
                'percentage' => $percentage,
                'grade' => $grade,
            ];
        });

        return Inertia::render('Performance', [
            'examData' => $examData
        ]);
    }
}
