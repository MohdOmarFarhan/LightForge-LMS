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
        Schema::table('questions', function (Blueprint $table) {
            // Drop old string columns
            $table->dropColumn(['class', 'subject', 'paper', 'chapter', 'module']);

            // Add new ID columns
            $table->foreignId('level_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('paper_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('chapter_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('module_id')->nullable()->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            // Drop new ID columns
            $table->dropForeign(['level_id']);
            $table->dropForeign(['subject_id']);
            $table->dropForeign(['paper_id']);
            $table->dropForeign(['chapter_id']);
            $table->dropForeign(['module_id']);
            $table->dropColumn(['level_id', 'subject_id', 'paper_id', 'chapter_id', 'module_id']);

            // Add back old string columns
            $table->integer('class')->nullable();
            $table->string('subject')->nullable();
            $table->string('paper')->nullable();
            $table->string('chapter')->nullable();
            $table->string('module')->nullable();
        });
    }
};
