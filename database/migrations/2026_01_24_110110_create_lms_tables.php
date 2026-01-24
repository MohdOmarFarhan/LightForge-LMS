<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Questions Table
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // mcq, cq, descriptive
            $table->text('content'); // Question text or stem
            $table->integer('class');
            $table->string('subject');
            $table->string('paper');
            $table->string('chapter');
            $table->string('module')->nullable();
            $table->string('difficulty');
            $table->integer('marks');
            $table->integer('time_limit')->nullable(); // in minutes
            $table->json('options')->nullable(); // For MCQ
            $table->string('correct_answer')->nullable(); // For MCQ
            $table->json('sub_questions')->nullable(); // For CQ (a, b, c, d)
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });

        // Exams Table
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->integer('class');
            $table->string('subject');
            $table->string('paper');
            $table->timestamp('start_time')->nullable();
            $table->timestamp('end_time')->nullable();
            $table->integer('duration_minutes');
            $table->integer('total_marks');
            $table->boolean('is_published')->default(false);
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });

        // Exam Questions Pivot Table
        Schema::create('exam_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained()->onDelete('cascade');
            $table->foreignId('question_id')->constrained()->onDelete('cascade');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Exam Attempts Table
        Schema::create('exam_attempts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamp('started_at');
            $table->timestamp('submitted_at')->nullable();
            $table->integer('score_mcq')->nullable();
            $table->integer('score_cq')->nullable();
            $table->integer('score_descriptive')->nullable();
            $table->integer('total_score')->nullable();
            $table->string('status')->default('in_progress'); // in_progress, submitted, graded
            $table->timestamps();
        });

        // Exam Answers Table
        Schema::create('exam_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_attempt_id')->constrained()->onDelete('cascade');
            $table->foreignId('question_id')->constrained()->onDelete('cascade');
            $table->text('answer_text')->nullable(); // For MCQ (option index) or text answer
            $table->json('answer_images')->nullable(); // For CQ/Descriptive uploads
            $table->integer('marks_obtained')->nullable();
            $table->text('feedback')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_answers');
        Schema::dropIfExists('exam_attempts');
        Schema::dropIfExists('exam_questions');
        Schema::dropIfExists('exams');
        Schema::dropIfExists('questions');
    }
};
