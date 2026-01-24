<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

use Illuminate\Support\Facades\DB;
use App\Models\ExamAttempt;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $stats = null;

        if ($user && $user->role === 'student') {
            $examsTakenCount = ExamAttempt::where('user_id', $user->id)
                ->whereIn('status', ['submitted', 'graded'])
                ->count();

            $attempts = ExamAttempt::where('user_id', $user->id)
                ->where('status', 'graded')
                ->with('exam')
                ->get();
            
            $avgPercentage = 0;
            if ($attempts->count() > 0) {
                $totalPercentage = 0;
                foreach ($attempts as $attempt) {
                    if ($attempt->exam->total_marks > 0) {
                        $totalPercentage += ($attempt->total_score / $attempt->exam->total_marks) * 100;
                    }
                }
                $avgPercentage = round($totalPercentage / $attempts->count(), 1);
            }

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

            $stats = [
                'exams_taken' => $examsTakenCount,
                'avg_score' => $avgPercentage,
                'rank' => $rankDisplay,
            ];
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'stats' => $stats,
            ],
        ];
    }
}
