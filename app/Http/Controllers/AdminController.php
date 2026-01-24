<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\StudentApproved;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'totalStudents' => User::where('role', 'student')->where('is_approved', true)->count(),
            'pendingApprovals' => User::where('role', 'student')->where('is_approved', false)->count(),
        ]);
    }

    public function pendingStudents()
    {
        $students = User::where('role', 'student')
            ->where('is_approved', false)
            ->latest()
            ->get();

        return Inertia::render('Admin/PendingStudents', [
            'students' => $students
        ]);
    }

    public function approveStudent(User $user)
    {
        if ($user->is_approved) {
            return back()->with('error', 'User is already approved.');
        }

        DB::transaction(function () use ($user) {
            // Generate Student ID: YY-G-SSS
            // YY: Last 2 digits of HSC Year
            $yy = substr($user->hsc_year, -2);
            
            // G: Group Code
            $groupCodes = [
                'Science' => '1',
                'Business' => '2',
                'Humanities' => '3'
            ];
            $g = $groupCodes[$user->group] ?? '0'; // Default to 0 if unknown

            // SSS: Serial Number
            // Find the max serial for this year and group
            // We search for students with IDs starting with "$yy-$g-"
            $prefix = "$yy-$g-";
            $latestStudent = User::where('student_id', 'like', "$prefix%")
                ->orderBy('student_id', 'desc')
                ->first();

            $nextSerial = 1;
            if ($latestStudent) {
                // Extract SSS from YY-G-SSS
                $parts = explode('-', $latestStudent->student_id);
                if (count($parts) === 3) {
                    $nextSerial = intval($parts[2]) + 1;
                }
            }

            $sss = str_pad($nextSerial, 3, '0', STR_PAD_LEFT);
            $studentId = "$yy-$g-$sss";

            $user->update([
                'student_id' => $studentId,
                'is_approved' => true
            ]);
            
            // Send notification
            try {
                $user->notify(new StudentApproved($user));
            } catch (\Exception $e) {
                // Log error but don't fail transaction? 
                // For now, let's just proceed.
            }
        });

        return back()->with('success', 'Student approved successfully. ID: ' . $user->student_id);
    }
}
