<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            [
                'name' => 'Arif Rahman',
                'email' => 'arif@example.com',
                'student_id' => '241073',
                'class' => '11',
                'group' => 'Science',
                'hsc_year' => '2025',
                'contact_no' => '01711111111',
                'is_approved' => true,
            ],
            [
                'name' => 'Fatima Khan',
                'email' => 'fatima@example.com',
                'student_id' => '241074',
                'class' => '11',
                'group' => 'Science',
                'hsc_year' => '2025',
                'contact_no' => '01722222222',
                'is_approved' => true,
            ],
            [
                'name' => 'Samiul Haque',
                'email' => 'samiul@example.com',
                'student_id' => '241075',
                'class' => '12',
                'group' => 'Science',
                'hsc_year' => '2024',
                'contact_no' => '01733333333',
                'is_approved' => true,
            ],
            [
                'name' => 'Nusrat Jahan',
                'email' => 'nusrat@example.com',
                'student_id' => '241076',
                'class' => '12',
                'group' => 'Science',
                'hsc_year' => '2024',
                'contact_no' => '01744444444',
                'is_approved' => true,
            ],
            [
                'name' => 'Rafiq Ahmed',
                'email' => 'rafiq@example.com',
                'student_id' => '241077',
                'class' => '11',
                'group' => 'Science',
                'hsc_year' => '2025',
                'contact_no' => '01755555555',
                'is_approved' => true,
            ],
            [
                'name' => 'Sadia Islam',
                'email' => 'sadia@example.com',
                'student_id' => '241078',
                'class' => '12',
                'group' => 'Science',
                'hsc_year' => '2024',
                'contact_no' => '01766666666',
                'is_approved' => true,
            ],
            [
                'name' => 'Tariq Hassan',
                'email' => 'tariq@example.com',
                'student_id' => '241079',
                'class' => '11',
                'group' => 'Science',
                'hsc_year' => '2025',
                'contact_no' => '01777777777',
                'is_approved' => true,
            ],
            [
                'name' => 'Ayesha Begum',
                'email' => 'ayesha@example.com',
                'student_id' => '241080',
                'class' => '12',
                'group' => 'Science',
                'hsc_year' => '2024',
                'contact_no' => '01788888888',
                'is_approved' => true,
            ],
        ];

        foreach ($students as $student) {
            User::create([
                'name' => $student['name'],
                'email' => $student['email'],
                'password' => Hash::make('password'),
                'role' => 'student',
                'student_id' => $student['student_id'],
                'class' => $student['class'],
                'group' => $student['group'],
                'hsc_year' => $student['hsc_year'],
                'contact_no' => $student['contact_no'],
                'whatsapp_no' => $student['contact_no'], // Using same for now
                'guardian_no' => $student['contact_no'], // Using same for now
                'institution' => 'Test College',
                'is_approved' => $student['is_approved'],
            ]);
        }
    }
}
