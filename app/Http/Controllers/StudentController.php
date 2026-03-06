<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('role', 'student');

        if ($request->has('class') && $request->class !== 'all') {
            $query->where('class', $request->class);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('student_id', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $students = $query->orderBy('created_at', 'desc')
            ->withCount('examAttempts as exams_count')
            ->withAvg('examAttempts as avg_score', 'total_score')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'filters' => $request->only(['class', 'search']),
            'stats' => [
                'all' => User::where('role', 'student')->count(),
                '11' => User::where('role', 'student')->where('class', '11')->count(),
                '12' => User::where('role', 'student')->where('class', '12')->count(),
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Students/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'class' => 'required|integer|in:11,12',
            'group' => 'required|string|in:Science,Humanities,Business Studies',
            'hsc_year' => 'required|string',
            'contact_no' => 'required|string',
            'student_id' => 'nullable|string|unique:users',
            'is_approved' => 'boolean',
        ]);

        $student = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'student',
            'class' => $validated['class'],
            'group' => $validated['group'],
            'hsc_year' => $validated['hsc_year'],
            'contact_no' => $validated['contact_no'],
            'student_id' => $validated['student_id'],
            'is_approved' => $validated['is_approved'] ?? true, // Default to approved if created by admin
        ]);

        return redirect()->route('admin.students')->with('success', 'Student created successfully.');
    }

    public function edit(User $student)
    {
        return Inertia::render('Admin/Students/Edit', [
            'student' => $student
        ]);
    }

    public function update(Request $request, User $student)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($student->id)],
            'class' => 'required|integer|in:11,12',
            'group' => 'required|string|in:Science,Humanities,Business Studies',
            'hsc_year' => 'required|string',
            'contact_no' => 'required|string',
            'student_id' => ['nullable', 'string', Rule::unique('users')->ignore($student->id)],
            'password' => 'nullable|string|min:8',
        ]);

        $data = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'class' => $validated['class'],
            'group' => $validated['group'],
            'hsc_year' => $validated['hsc_year'],
            'contact_no' => $validated['contact_no'],
            'student_id' => $validated['student_id'],
        ];

        if (!empty($validated['password'])) {
            $data['password'] = Hash::make($validated['password']);
        }

        $student->update($data);

        return redirect()->route('admin.students')->with('success', 'Student updated successfully.');
    }

    public function destroy(User $student)
    {
        $student->delete();
        return redirect()->back()->with('success', 'Student deleted successfully.');
    }

    public function export(Request $request)
    {
        $query = User::where('role', 'student');

        if ($request->has('class') && $request->class !== 'all') {
            $query->where('class', $request->class);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('student_id', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $students = $query->orderBy('created_at', 'desc')->get();

        $headers = [
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename=students_export_" . date('Y-m-d_H-i-s') . ".csv",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        ];

        $columns = ['ID', 'Student ID', 'Name', 'Email', 'Class', 'Group', 'HSC Year', 'Contact No', 'Created At'];

        $callback = function() use ($students, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($students as $student) {
                fputcsv($file, [
                    $student->id,
                    $student->student_id,
                    $student->name,
                    $student->email,
                    $student->class,
                    $student->group,
                    $student->hsc_year,
                    $student->contact_no,
                    $student->created_at,
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
