<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ExamController extends Controller
{
    public function index(Request $request)
    {
        $query = Exam::query();

        if ($request->filled('class') && $request->class !== 'all') {
            $query->where('class', $request->class);
        }

        if ($request->filled('subject') && $request->subject !== 'all') {
            $query->where('subject', $request->subject);
        }

        $exams = $query->latest()
            ->withCount('questions')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Exams/Index', [
            'exams' => $exams,
            'filters' => $request->only(['class', 'subject']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Exams/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'class' => 'required|integer',
            'subject' => 'required|string',
            'paper' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'duration_minutes' => 'required|integer|min:1',
            'total_marks' => 'required|integer|min:1',
            'questions' => 'required|array|min:1',
            'questions.*.id' => 'required|exists:questions,id',
            'is_published' => 'boolean',
        ]);

        DB::transaction(function () use ($validated) {
            $exam = Exam::create([
                'title' => $validated['title'],
                'class' => $validated['class'],
                'subject' => $validated['subject'],
                'paper' => $validated['paper'],
                'start_time' => $validated['start_time'],
                'end_time' => $validated['end_time'],
                'duration_minutes' => $validated['duration_minutes'],
                'total_marks' => $validated['total_marks'],
                'is_published' => $validated['is_published'] ?? false,
                'created_by' => auth()->id(),
            ]);

            foreach ($validated['questions'] as $index => $question) {
                $exam->questions()->attach($question['id'], ['order' => $index + 1]);
            }
        });

        return redirect()->route('admin.exams')->with('success', 'Exam created successfully.');
    }

    public function searchQuestions(Request $request)
    {
        $query = Question::query();

        if ($request->filled('class')) {
            $query->where('class', $request->class);
        }

        if ($request->filled('subject')) {
            $query->where('subject', $request->subject);
        }
        
        if ($request->filled('chapter')) {
             $query->where('chapter', 'like', '%' . $request->chapter . '%');
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        return response()->json([
            'questions' => $query->latest()->limit(20)->get()
        ]);
    }
}
