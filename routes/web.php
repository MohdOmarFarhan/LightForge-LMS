<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ExamSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\PerformanceController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/students/pending', [AdminController::class, 'pendingStudents'])->name('students.pending');
    Route::post('/students/{user}/approve', [AdminController::class, 'approveStudent'])->name('students.approve');

    Route::get('/students', [AdminController::class, 'students'])->name('students');

    Route::get('/questions', [App\Http\Controllers\QuestionController::class, 'index'])->name('questions');
    Route::get('/questions/create', [App\Http\Controllers\QuestionController::class, 'create'])->name('questions.create');
    Route::post('/questions', [App\Http\Controllers\QuestionController::class, 'store'])->name('questions.store');

    Route::get('/exams', [App\Http\Controllers\ExamController::class, 'index'])->name('exams');
    Route::get('/exams/create', [App\Http\Controllers\ExamController::class, 'create'])->name('exams.create');
    Route::post('/exams', [App\Http\Controllers\ExamController::class, 'store'])->name('exams.store');
    Route::get('/api/questions/search', [App\Http\Controllers\ExamController::class, 'searchQuestions'])->name('api.questions.search');

    Route::get('/scrutiny', [App\Http\Controllers\ScrutinyController::class, 'index'])->name('scrutiny');
    Route::get('/scrutiny/{attempt}', [App\Http\Controllers\ScrutinyController::class, 'show'])->name('scrutiny.show');
    Route::post('/scrutiny/{attempt}', [App\Http\Controllers\ScrutinyController::class, 'update'])->name('scrutiny.update');

    Route::get('/leaderboard', [AdminController::class, 'leaderboard'])->name('leaderboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // New Pages
    Route::get('/exams', [ExamSessionController::class, 'index'])->name('exams');

    Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard');

    Route::get('/performance', [PerformanceController::class, 'index'])->name('performance');

    // Exam Session Routes
    Route::get('/exams/{id}/session', [ExamSessionController::class, 'show'])->name('exams.session');
    Route::post('/exams/{id}/start', [ExamSessionController::class, 'start'])->name('exams.start');
    Route::get('/exams/{id}/take', [ExamSessionController::class, 'take'])->name('exams.take');
    Route::post('/exams/{id}/submit', [ExamSessionController::class, 'submit'])->name('exams.submit');
});

Route::get('/waiting-lobby', function () {
    return Inertia::render('WaitingLobby');
})->name('waiting-lobby');

require __DIR__.'/auth.php';
