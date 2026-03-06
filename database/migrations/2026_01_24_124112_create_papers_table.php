<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('papers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->string('name'); // e.g., Physics 1st Paper
            $table->string('code')->nullable(); // e.g., 174
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('papers');
    }
};
