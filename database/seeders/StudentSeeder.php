<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classes = ['11', '12'];
        $groups = ['Science', 'Humanities', 'Business Studies'];
        $baseStudentId = 241000;
        $counter = 1;

        foreach ($classes as $class) {
            foreach ($groups as $group) {
                // Create 3 students for each class-group combination
                for ($i = 1; $i <= 3; $i++) {
                    $studentId = $baseStudentId + $counter;
                    $hscYear = $class === '11' ? '2026' : '2025';
                    
                    User::create([
                        'name' => "Student {$class} {$group} {$i}",
                        'email' => "student{$studentId}@lms.com",
                        'password' => Hash::make('password'),
                        'role' => 'student',
                        'student_id' => (string)$studentId,
                        'class' => $class,
                        'group' => $group,
                        'hsc_year' => $hscYear,
                        'contact_no' => '017' . str_pad((string)$counter, 8, '0', STR_PAD_LEFT),
                        'whatsapp_no' => '017' . str_pad((string)$counter, 8, '0', STR_PAD_LEFT),
                        'guardian_no' => '018' . str_pad((string)$counter, 8, '0', STR_PAD_LEFT),
                        'institution' => 'LightForge Academy',
                        'is_approved' => true,
                    ]);
                    
                    $counter++;
                }
            }
        }
    }
}
