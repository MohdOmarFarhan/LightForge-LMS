<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Paper;
use App\Models\Chapter;
use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicController extends Controller
{
    public function index()
    {
        $subjects = Subject::with('papers.chapters.modules')->get();

        return Inertia::render('Admin/AcademicStructure', [
            'subjects' => $subjects
        ]);
    }

    // --- Subject Methods ---
    public function storeSubject(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255|unique:subjects,code',
        ]);

        Subject::create($validated);

        return back()->with('success', 'Subject created successfully.');
    }

    public function updateSubject(Request $request, Subject $subject)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255|unique:subjects,code,' . $subject->id,
        ]);

        $subject->update($validated);

        return back()->with('success', 'Subject updated successfully.');
    }

    public function destroySubject(Subject $subject)
    {
        $subject->delete();
        return back()->with('success', 'Subject deleted successfully.');
    }

    // --- Paper Methods ---
    public function storePaper(Request $request)
    {
        $validated = $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:255',
        ]);

        Paper::create($validated);

        return back()->with('success', 'Paper created successfully.');
    }

    public function updatePaper(Request $request, Paper $paper)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:255',
        ]);

        $paper->update($validated);

        return back()->with('success', 'Paper updated successfully.');
    }

    public function destroyPaper(Paper $paper)
    {
        $paper->delete();
        return back()->with('success', 'Paper deleted successfully.');
    }

    // --- Chapter Methods ---
    public function storeChapter(Request $request)
    {
        $validated = $request->validate([
            'paper_id' => 'required|exists:papers,id',
            'name' => 'required|string|max:255',
            'number' => 'required|integer',
        ]);

        Chapter::create($validated);

        return back()->with('success', 'Chapter created successfully.');
    }

    public function updateChapter(Request $request, Chapter $chapter)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'number' => 'required|integer',
        ]);

        $chapter->update($validated);

        return back()->with('success', 'Chapter updated successfully.');
    }

    public function destroyChapter(Chapter $chapter)
    {
        $chapter->delete();
        return back()->with('success', 'Chapter deleted successfully.');
    }

    // --- Module Methods ---
    public function storeModule(Request $request)
    {
        $validated = $request->validate([
            'chapter_id' => 'required|exists:chapters,id',
            'name' => 'required|string|max:255',
            'number' => 'required|integer',
        ]);

        Module::create($validated);

        return back()->with('success', 'Module created successfully.');
    }

    public function updateModule(Request $request, Module $module)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'number' => 'required|integer',
        ]);

        $module->update($validated);

        return back()->with('success', 'Module updated successfully.');
    }

    public function destroyModule(Module $module)
    {
        $module->delete();
        return back()->with('success', 'Module deleted successfully.');
    }
}
