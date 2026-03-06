<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exam;
use App\Models\Question;
use App\Models\Subject;
use App\Models\Level;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ExamSeeder extends Seeder
{
    public function run(): void
    {
        // Truncate exams table
        if (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = OFF;');
        } else {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }
        Exam::truncate();
        DB::table('exam_questions')->truncate();
        if (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = ON;');
        } else {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }

        $admin = User::where('role', 'admin')->first();
        $level = Level::where('code', 'HSC')->first();
        
        if (!$level || !$admin) return;

        // Create exams for each subject
        $subjects = Subject::all();

        foreach ($subjects as $subject) {
            // Exam for Class 11
            $exam11 = Exam::create([
                'title' => "{$subject->name} Mid-Term (Class 11)",
                'target_class' => '11',
                'level_id' => $level->id,
                'subject_id' => $subject->id,
                'total_marks' => 100, // Approximate
                'duration_minutes' => 120,
                'start_time' => now(),
                'end_time' => now()->addDays(14),
                'is_published' => true,
                'created_by' => $admin->id,
            ]);

            // Exam for Class 12
            $exam12 = Exam::create([
                'title' => "{$subject->name} Pre-Test (Class 12)",
                'target_class' => '12',
                'level_id' => $level->id,
                'subject_id' => $subject->id,
                'total_marks' => 100,
                'duration_minutes' => 120,
                'start_time' => now(),
                'end_time' => now()->addDays(14),
                'is_published' => true,
                'created_by' => $admin->id,
            ]);

            // Attach questions to exams
            // We'll attach ALL questions of this subject for now as a pool
            $questions = Question::where('subject_id', $subject->id)->get();
            
            if ($questions->count() > 0) {
                $exam11->questions()->attach($questions);
                $exam12->questions()->attach($questions);
            }
        }
    }
}
