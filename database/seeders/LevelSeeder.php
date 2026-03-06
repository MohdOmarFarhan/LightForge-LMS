<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Level;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $levels = [
            [
                'name' => 'Higher Secondary Certificate',
                'code' => 'HSC',
                'description' => 'For Class 11 and 12 students'
            ],
            [
                'name' => 'Secondary School Certificate',
                'code' => 'SSC',
                'description' => 'For Class 9 and 10 students'
            ],
        ];

        foreach ($levels as $level) {
            Level::create($level);
        }
    }
}
