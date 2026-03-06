<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@lms.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_approved' => true,
        ]);

        // Sample Student User
        User::factory()->create([
            'name' => 'Test Student',
            'email' => 'student@lms.com',
            'role' => 'student',
            'is_approved' => false,
            'institution' => 'Test College',
            'class' => '12',
            'group' => 'Science',
            'hsc_year' => '2025',
            'contact_no' => '01700000000',
            'whatsapp_no' => '01700000000',
            'guardian_no' => '01700000000',
        ]);

        $this->call([
            LevelSeeder::class,
            AcademicStructureSeeder::class,
            StudentSeeder::class,
            QuestionSeeder::class,
            ExamSeeder::class,
        ]);
    }
}
