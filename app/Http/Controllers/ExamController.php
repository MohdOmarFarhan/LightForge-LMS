<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Question;
use App\Models\Subject;
use App\Models\Level;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ExamController extends Controller
{
    public function index(Request $request)
    {
        $query = Exam::with(['level', 'subject', 'paper']);

        if ($request->filled('target_class') && $request->target_class !== 'all') {
            $query->where('target_class', $request->target_class);
        }

        if ($request->filled('subject_id') && $request->subject_id !== 'all') {
            $query->where('subject_id', $request->subject_id);
        }

        $exams = $query->latest()
            ->withCount('questions')
            ->paginate(10)
            ->withQueryString();
            
        $subjects = Subject::all();

        return Inertia::render('Admin/Exams/Index', [
            'exams' => $exams,
            'filters' => $request->only(['target_class', 'subject_id']),
            'subjects' => $subjects
        ]);
    }

    public function create()
    {
        $subjects = Subject::with('papers.chapters.modules')->get();
        $levels = Level::all();
        return Inertia::render('Admin/Exams/Create', [
            'subjects' => $subjects,
            'levels' => $levels
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'target_class' => 'required|integer',
            'level_id' => 'required|exists:levels,id',
            'subject_id' => 'nullable|exists:subjects,id',
            'paper_id' => 'nullable|exists:papers,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'duration_minutes' => 'required|integer|min:1',
            'mcq_duration_minutes' => 'required_without_all:cq_duration_minutes,descriptive_duration_minutes|nullable|integer|min:0',
            'cq_duration_minutes' => 'required_without_all:mcq_duration_minutes,descriptive_duration_minutes|nullable|integer|min:0',
            'descriptive_duration_minutes' => 'required_without_all:mcq_duration_minutes,cq_duration_minutes|nullable|integer|min:0',
            'total_marks' => 'required|integer|min:1',
            'mcq_marks_per_question' => 'nullable|numeric|min:0',
            'cq_marks_per_question' => 'nullable|numeric|min:0',
            'descriptive_marks_per_question' => 'nullable|numeric|min:0',
            'questions' => 'required|array|min:1',
            'questions.*.id' => 'required|exists:questions,id',
            'is_published' => 'boolean',
        ]);

        DB::transaction(function () use ($validated) {
            $exam = Exam::create([
                'title' => $validated['title'],
                'target_class' => $validated['target_class'],
                'level_id' => $validated['level_id'],
                'subject_id' => $validated['subject_id'] ?? null,
                'paper_id' => $validated['paper_id'] ?? null,
                'start_time' => $validated['start_time'],
                'end_time' => $validated['end_time'],
                'duration_minutes' => $validated['duration_minutes'],
                'mcq_duration_minutes' => $validated['mcq_duration_minutes'] ?? null,
                'cq_duration_minutes' => $validated['cq_duration_minutes'] ?? null,
                'descriptive_duration_minutes' => $validated['descriptive_duration_minutes'] ?? null,
                'total_marks' => $validated['total_marks'],
                'mcq_marks_per_question' => $validated['mcq_marks_per_question'] ?? null,
                'cq_marks_per_question' => $validated['cq_marks_per_question'] ?? null,
                'descriptive_marks_per_question' => $validated['descriptive_marks_per_question'] ?? null,
                'is_published' => $validated['is_published'] ?? false,
                'created_by' => auth()->id(),
            ]);

            foreach ($validated['questions'] as $index => $question) {
                $exam->questions()->attach($question['id'], ['order' => $index + 1]);
            }
        });

        return redirect()->route('admin.exams')->with('success', 'Exam created successfully.');
    }

    public function show(Exam $exam)
    {
        $exam->load(['questions.subject', 'questions.chapter', 'level', 'subject', 'paper']);
        return Inertia::render('Admin/Exams/Show', [
            'exam' => $exam
        ]);
    }

    public function edit(Exam $exam)
    {
        $exam->load(['questions.subject', 'questions.chapter']);
        $subjects = Subject::with('papers.chapters.modules')->get();
        $levels = Level::all();
        return Inertia::render('Admin/Exams/Edit', [
            'exam' => $exam,
            'subjects' => $subjects,
            'levels' => $levels
        ]);
    }

    public function update(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'target_class' => 'required|integer',
            'level_id' => 'required|exists:levels,id',
            'subject_id' => 'nullable|exists:subjects,id',
            'paper_id' => 'nullable|exists:papers,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'duration_minutes' => 'required|integer|min:1',
            'mcq_duration_minutes' => 'required_without_all:cq_duration_minutes,descriptive_duration_minutes|nullable|integer|min:0',
            'cq_duration_minutes' => 'required_without_all:mcq_duration_minutes,descriptive_duration_minutes|nullable|integer|min:0',
            'descriptive_duration_minutes' => 'required_without_all:mcq_duration_minutes,cq_duration_minutes|nullable|integer|min:0',
            'total_marks' => 'required|integer|min:1',
            'mcq_marks_per_question' => 'nullable|numeric|min:0',
            'cq_marks_per_question' => 'nullable|numeric|min:0',
            'descriptive_marks_per_question' => 'nullable|numeric|min:0',
            'questions' => 'required|array|min:1',
            'questions.*.id' => 'required|exists:questions,id',
            'is_published' => 'boolean',
        ]);

        DB::transaction(function () use ($validated, $exam) {
            $exam->update([
                'title' => $validated['title'],
                'target_class' => $validated['target_class'],
                'level_id' => $validated['level_id'],
                'subject_id' => $validated['subject_id'] ?? null,
                'paper_id' => $validated['paper_id'] ?? null,
                'start_time' => $validated['start_time'],
                'end_time' => $validated['end_time'],
                'duration_minutes' => $validated['duration_minutes'],
                'mcq_duration_minutes' => $validated['mcq_duration_minutes'] ?? null,
                'cq_duration_minutes' => $validated['cq_duration_minutes'] ?? null,
                'descriptive_duration_minutes' => $validated['descriptive_duration_minutes'] ?? null,
                'total_marks' => $validated['total_marks'],
                'mcq_marks_per_question' => $validated['mcq_marks_per_question'] ?? null,
                'cq_marks_per_question' => $validated['cq_marks_per_question'] ?? null,
                'descriptive_marks_per_question' => $validated['descriptive_marks_per_question'] ?? null,
                'is_published' => $validated['is_published'] ?? false,
            ]);

            // Sync questions with order
            $questionsWithOrder = [];
            foreach ($validated['questions'] as $index => $question) {
                $questionsWithOrder[$question['id']] = ['order' => $index + 1];
            }
            $exam->questions()->sync($questionsWithOrder);
        });

        return redirect()->route('admin.exams')->with('success', 'Exam updated successfully.');
    }

    public function destroy(Exam $exam)
    {
        $exam->delete();
        return redirect()->back()->with('success', 'Exam deleted successfully.');
    }

    public function searchQuestions(Request $request)
    {
        $query = Question::with(['subject', 'chapter']);

        // Core change: Filter by Level, NOT Class
        if ($request->filled('level_id')) {
            $query->where('level_id', $request->level_id);
        }

        if ($request->filled('subject_id')) {
            $query->where('subject_id', $request->subject_id);
        }

        if ($request->filled('paper_id')) {
            $query->where('paper_id', $request->paper_id);
        }
        
        if ($request->filled('chapter_id')) {
             $query->where('chapter_id', $request->chapter_id);
        }

        if ($request->filled('module_id')) {
            $query->where('module_id', $request->module_id);
       }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        return response()->json([
            'questions' => $query->latest()->limit(50)->get()
        ]);
    }
}
