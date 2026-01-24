<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index(Request $request)
    {
        $query = Question::query();

        if ($request->filled('class') && $request->class !== 'all') {
            $query->where('class', $request->class);
        }

        if ($request->filled('subject') && $request->subject !== 'all') {
            $query->where('subject', $request->subject);
        }

        if ($request->filled('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        $questions = $query->latest()->paginate(10)->withQueryString();

        // Calculate stats
        $stats = [
            'mcq' => Question::where('type', 'mcq')->count(),
            'cq' => Question::where('type', 'cq')->count(),
            'descriptive' => Question::where('type', 'descriptive')->count(),
        ];
        
        // Subject-wise breakdown
        $subjects = ['mathematics', 'physics', 'chemistry', 'biology'];
        $subjectStats = [];
        foreach ($subjects as $subject) {
            $subjectStats[] = [
                'subject' => ucfirst($subject),
                'mcq' => Question::where('subject', $subject)->where('type', 'mcq')->count(),
                'cq' => Question::where('subject', $subject)->where('type', 'cq')->count(),
                'descriptive' => Question::where('subject', $subject)->where('type', 'descriptive')->count(),
                'total' => Question::where('subject', $subject)->count(),
            ];
        }

        return Inertia::render('Admin/Questions/Index', [
            'questions' => $questions,
            'filters' => $request->only(['class', 'subject', 'type']),
            'stats' => $stats,
            'subjectStats' => $subjectStats,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Questions/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:mcq,cq,descriptive',
            'content' => 'required|string',
            'class' => 'required|integer',
            'subject' => 'required|string',
            'paper' => 'required|string',
            'chapter' => 'required|string',
            'module' => 'nullable|string',
            'difficulty' => 'required|string',
            'marks' => 'required|integer',
            'time_limit' => 'nullable|integer',
            'options' => 'nullable|array',
            'correct_answer' => 'nullable|string',
            'sub_questions' => 'nullable|array',
        ]);

        $validated['created_by'] = auth()->id();

        Question::create($validated);

        return redirect()->route('admin.questions')->with('success', 'Question created successfully.');
    }
}
