<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('exams', function (Blueprint $table) {
            $table->integer('mcq_duration_minutes')->nullable();
            $table->integer('cq_duration_minutes')->nullable();
            $table->integer('descriptive_duration_minutes')->nullable();
            
            $table->float('mcq_marks_per_question')->nullable();
            $table->float('cq_marks_per_question')->nullable();
            $table->float('descriptive_marks_per_question')->nullable();
        });

        Schema::table('exam_attempts', function (Blueprint $table) {
            $table->timestamp('mcq_started_at')->nullable();
            $table->timestamp('mcq_submitted_at')->nullable();
            
            $table->timestamp('cq_started_at')->nullable();
            $table->timestamp('cq_submitted_at')->nullable();
            
            $table->timestamp('descriptive_started_at')->nullable();
            $table->timestamp('descriptive_submitted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exams', function (Blueprint $table) {
            $table->dropColumn([
                'mcq_duration_minutes', 'cq_duration_minutes', 'descriptive_duration_minutes',
                'mcq_marks_per_question', 'cq_marks_per_question', 'descriptive_marks_per_question'
            ]);
        });

        Schema::table('exam_attempts', function (Blueprint $table) {
            $table->dropColumn([
                'mcq_started_at', 'mcq_submitted_at',
                'cq_started_at', 'cq_submitted_at',
                'descriptive_started_at', 'descriptive_submitted_at'
            ]);
        });
    }
};
