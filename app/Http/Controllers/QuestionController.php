<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Subject;
use App\Models\Level;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index(Request $request)
    {
        $query = Question::with(['level', 'subject', 'paper', 'chapter', 'module']);

        if ($request->filled('level_id') && $request->level_id !== 'all') {
            $query->where('level_id', $request->level_id);
        }

        if ($request->filled('subject_id') && $request->subject_id !== 'all') {
            $query->where('subject_id', $request->subject_id);
        }

        if ($request->filled('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        if ($request->filled('paper_id') && $request->paper_id !== 'all') {
            $query->where('paper_id', $request->paper_id);
        }

        if ($request->filled('chapter_id') && $request->chapter_id !== 'all') {
            $query->where('chapter_id', $request->chapter_id);
        }

        $questions = $query->latest()->paginate(10)->withQueryString();

        // Calculate stats
        $stats = [
            'mcq' => Question::where('type', 'mcq')->count(),
            'cq' => Question::where('type', 'cq')->count(),
            'descriptive' => Question::where('type', 'descriptive')->count(),
        ];
        
        $subjects = Subject::with('papers.chapters')->get();
        $levels = Level::all();

        return Inertia::render('Admin/Questions/Index', [
            'questions' => $questions,
            'filters' => $request->only(['level_id', 'subject_id', 'type', 'paper_id', 'chapter_id']),
            'stats' => $stats,
            'allSubjects' => $subjects,
            'levels' => $levels,
        ]);
    }

    public function create()
    {
        $subjects = Subject::with('papers.chapters.modules')->get();
        $levels = Level::all();
        return Inertia::render('Admin/Questions/Create', [
            'subjects' => $subjects,
            'levels' => $levels
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'level_id' => 'required|exists:levels,id',
            'subject_id' => 'required|exists:subjects,id',
            'paper_id' => 'required|exists:papers,id',
            'chapter_id' => 'required|exists:chapters,id',
            'module_id' => 'nullable|exists:modules,id',
            'type' => 'required|in:mcq,cq,descriptive',
            'difficulty' => 'required|string',
            'marks' => 'required|integer',
            'time_limit' => 'nullable|integer',
            
            // Validating array of questions
            'questions' => 'required|array|min:1',
            'questions.*.content' => 'required|string',
            'questions.*.options' => 'nullable|array',
            'questions.*.correct_answer' => 'nullable|string',
            'questions.*.sub_questions' => 'nullable|array',
        ]);

        $commonData = [
            'level_id' => $validated['level_id'],
            'subject_id' => $validated['subject_id'],
            'paper_id' => $validated['paper_id'],
            'chapter_id' => $validated['chapter_id'],
            'module_id' => $validated['module_id'] ?? null,
            'type' => $validated['type'],
            'difficulty' => $validated['difficulty'],
            'marks' => $validated['marks'],
            'time_limit' => $validated['time_limit'],
            'created_by' => auth()->id(),
        ];

        foreach ($validated['questions'] as $qData) {
            $questionData = array_merge($commonData, [
                'content' => $qData['content'],
                'options' => $qData['options'] ?? null,
                'correct_answer' => $qData['correct_answer'] ?? null,
                'sub_questions' => $qData['sub_questions'] ?? null,
            ]);
            
            Question::create($questionData);
        }

        return redirect()->route('admin.questions')->with('success', 'Questions created successfully.');
    }

    public function show(Question $question)
    {
        $question->load(['level', 'subject', 'paper', 'chapter', 'module']);
        return Inertia::render('Admin/Questions/Show', [
            'question' => $question,
        ]);
    }

    public function edit(Question $question)
    {
        $subjects = Subject::with('papers.chapters.modules')->get();
        $levels = Level::all();
        return Inertia::render('Admin/Questions/Edit', [
            'question' => $question,
            'subjects' => $subjects,
            'levels' => $levels
        ]);
    }

    public function update(Request $request, Question $question)
    {
        $validated = $request->validate([
            'level_id' => 'required|exists:levels,id',
            'subject_id' => 'required|exists:subjects,id',
            'paper_id' => 'required|exists:papers,id',
            'chapter_id' => 'required|exists:chapters,id',
            'module_id' => 'nullable|exists:modules,id',
            'type' => 'required|in:mcq,cq,descriptive',
            'difficulty' => 'required|string',
            'marks' => 'required|integer',
            'time_limit' => 'nullable|integer',
            'content' => 'required|string',
            'options' => 'nullable|array',
            'correct_answer' => 'nullable|string',
            'sub_questions' => 'nullable|array',
        ]);

        $question->update([
            'level_id' => $validated['level_id'],
            'subject_id' => $validated['subject_id'],
            'paper_id' => $validated['paper_id'],
            'chapter_id' => $validated['chapter_id'],
            'module_id' => $validated['module_id'] ?? null,
            'type' => $validated['type'],
            'difficulty' => $validated['difficulty'],
            'marks' => $validated['marks'],
            'time_limit' => $validated['time_limit'],
            'content' => $validated['content'],
            'options' => $validated['options'] ?? null,
            'correct_answer' => $validated['correct_answer'] ?? null,
            'sub_questions' => $validated['sub_questions'] ?? null,
        ]);

        return redirect()->route('admin.questions')->with('success', 'Question updated successfully.');
    }

    public function destroy(Question $question)
    {
        $question->delete();
        return redirect()->back()->with('success', 'Question deleted successfully.');
    }
}
