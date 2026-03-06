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
            // Drop old string columns
            $table->dropColumn(['subject', 'paper']);

            // Rename class to target_class for clarity, but keeping as integer for now
            $table->renameColumn('class', 'target_class');

            // Add new ID columns
            $table->foreignId('level_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('paper_id')->nullable()->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exams', function (Blueprint $table) {
            // Drop new ID columns
            $table->dropForeign(['level_id']);
            $table->dropForeign(['subject_id']);
            $table->dropForeign(['paper_id']);
            $table->dropColumn(['level_id', 'subject_id', 'paper_id']);

            // Rename back
            $table->renameColumn('target_class', 'class');

            // Add back old string columns
            $table->string('subject')->nullable();
            $table->string('paper')->nullable();
        });
    }
};
