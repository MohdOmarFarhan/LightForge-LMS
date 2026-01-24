<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index()
    {
        $currentUser = auth()->user();

        $students = User::where('role', 'student')
            ->where('class', $currentUser->class)
            ->where('hsc_year', $currentUser->hsc_year)
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
                    'isCurrentUser' => $user->id === auth()->id(),
                ];
            })
            ->sortByDesc('avgMarks')
            ->values();

        return Inertia::render('Leaderboard', [
            'students' => $students
        ]);
    }
}
