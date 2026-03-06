<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;
use App\Models\Subject;
use App\Models\Level;
use App\Models\Paper;
use App\Models\Chapter;
use App\Models\Module;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        // Truncate the questions table first to erase existing data
        if (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = OFF;');
        } else {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }
        Question::truncate();
        if (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = ON;');
        } else {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }

        $admin = User::where('role', 'admin')->first();
        // Assuming 'HSC' is the main level we are working with
        $level = Level::where('code', 'HSC')->first();
        
        if (!$level || !$admin) return;

        // Get all subjects
        $subjects = Subject::with('papers.chapters.modules')->get();

        foreach ($subjects as $subject) {
            // Select first 2 chapters from the first paper as a sample
            // If a subject has papers, use the first one
            $paper = $subject->papers->first();
            if (!$paper) continue;

            $chapters = $paper->chapters->take(2);

            foreach ($chapters as $chapter) {
                $module = $chapter->modules->first();
                $moduleId = $module ? $module->id : null;

                // 3 MCQs
                for ($i = 1; $i <= 3; $i++) {
                    Question::create([
                        'level_id' => $level->id,
                        'subject_id' => $subject->id,
                        'paper_id' => $paper->id,
                        'chapter_id' => $chapter->id,
                        'module_id' => $moduleId,
                        'type' => 'mcq',
                        'difficulty' => 'medium',
                        'marks' => 1,
                        'time_limit' => 1,
                        'content' => "Sample MCQ #{$i} for {$subject->name} - {$chapter->name}. What is a key concept here?",
                        'options' => ['Option A', 'Option B', 'Option C', 'Option D'],
                        'correct_answer' => 'Option A',
                        'created_by' => $admin->id,
                    ]);
                }

                // 3 CQs
                for ($i = 1; $i <= 3; $i++) {
                    Question::create([
                        'level_id' => $level->id,
                        'subject_id' => $subject->id,
                        'paper_id' => $paper->id,
                        'chapter_id' => $chapter->id,
                        'module_id' => $moduleId,
                        'type' => 'cq',
                        'difficulty' => 'hard',
                        'marks' => 10,
                        'time_limit' => 20,
                        'content' => "Sample Creative Question #{$i} for {$subject->name} - {$chapter->name}. Analyze the scenario.",
                        'sub_questions' => [
                            'a' => 'Define the core term.',
                            'b' => 'Explain the mechanism.',
                            'c' => 'Apply the concept to the scenario.',
                            'd' => 'Evaluate the outcome.'
                        ],
                        'created_by' => $admin->id,
                    ]);
                }

                // 3 Descriptive
                for ($i = 1; $i <= 3; $i++) {
                    Question::create([
                        'level_id' => $level->id,
                        'subject_id' => $subject->id,
                        'paper_id' => $paper->id,
                        'chapter_id' => $chapter->id,
                        'module_id' => $moduleId,
                        'type' => 'descriptive',
                        'difficulty' => 'medium',
                        'marks' => 5,
                        'time_limit' => 10,
                        'content' => "Sample Descriptive Question #{$i} for {$subject->name} - {$chapter->name}. Discuss the significance of this topic in detail.",
                        'created_by' => $admin->id,
                    ]);
                }
            }
        }
    }
}
