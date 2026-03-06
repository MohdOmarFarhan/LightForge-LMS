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

    Route::get('/students', [App\Http\Controllers\StudentController::class, 'index'])->name('students');
    Route::get('/students/export', [App\Http\Controllers\StudentController::class, 'export'])->name('students.export');
    Route::get('/students/create', [App\Http\Controllers\StudentController::class, 'create'])->name('students.create');
    Route::post('/students', [App\Http\Controllers\StudentController::class, 'store'])->name('students.store');
    Route::get('/students/{student}/edit', [App\Http\Controllers\StudentController::class, 'edit'])->name('students.edit');
    Route::put('/students/{student}', [App\Http\Controllers\StudentController::class, 'update'])->name('students.update');
    Route::delete('/students/{student}', [App\Http\Controllers\StudentController::class, 'destroy'])->name('students.destroy');

    Route::get('/questions', [App\Http\Controllers\QuestionController::class, 'index'])->name('questions');
    Route::get('/questions/create', [App\Http\Controllers\QuestionController::class, 'create'])->name('questions.create');
    Route::post('/questions', [App\Http\Controllers\QuestionController::class, 'store'])->name('questions.store');
    Route::get('/questions/{question}', [App\Http\Controllers\QuestionController::class, 'show'])->name('questions.show');
    Route::get('/questions/{question}/edit', [App\Http\Controllers\QuestionController::class, 'edit'])->name('questions.edit');
    Route::put('/questions/{question}', [App\Http\Controllers\QuestionController::class, 'update'])->name('questions.update');
    Route::delete('/questions/{question}', [App\Http\Controllers\QuestionController::class, 'destroy'])->name('questions.destroy');

    Route::get('/exams', [App\Http\Controllers\ExamController::class, 'index'])->name('exams');
    Route::get('/exams/create', [App\Http\Controllers\ExamController::class, 'create'])->name('exams.create');
    Route::post('/exams', [App\Http\Controllers\ExamController::class, 'store'])->name('exams.store');
    Route::get('/exams/{exam}', [App\Http\Controllers\ExamController::class, 'show'])->name('exams.show');
    Route::get('/exams/{exam}/edit', [App\Http\Controllers\ExamController::class, 'edit'])->name('exams.edit');
    Route::put('/exams/{exam}', [App\Http\Controllers\ExamController::class, 'update'])->name('exams.update');
    Route::delete('/exams/{exam}', [App\Http\Controllers\ExamController::class, 'destroy'])->name('exams.destroy');
    Route::get('/api/questions/search', [App\Http\Controllers\ExamController::class, 'searchQuestions'])->name('api.questions.search');

    Route::get('/scrutiny', [App\Http\Controllers\ScrutinyController::class, 'index'])->name('scrutiny');
    Route::get('/scrutiny/{attempt}', [App\Http\Controllers\ScrutinyController::class, 'show'])->name('scrutiny.show');
    Route::post('/scrutiny/{attempt}', [App\Http\Controllers\ScrutinyController::class, 'update'])->name('scrutiny.update');

    Route::get('/leaderboard', [AdminController::class, 'leaderboard'])->name('leaderboard');

    // Academic Structure
    Route::get('/academic-structure', [App\Http\Controllers\AcademicController::class, 'index'])->name('academic.structure');
    
    Route::post('/subjects', [App\Http\Controllers\AcademicController::class, 'storeSubject'])->name('subjects.store');
    Route::put('/subjects/{subject}', [App\Http\Controllers\AcademicController::class, 'updateSubject'])->name('subjects.update');
    Route::delete('/subjects/{subject}', [App\Http\Controllers\AcademicController::class, 'destroySubject'])->name('subjects.destroy');

    Route::post('/papers', [App\Http\Controllers\AcademicController::class, 'storePaper'])->name('papers.store');
    Route::put('/papers/{paper}', [App\Http\Controllers\AcademicController::class, 'updatePaper'])->name('papers.update');
    Route::delete('/papers/{paper}', [App\Http\Controllers\AcademicController::class, 'destroyPaper'])->name('papers.destroy');

    Route::post('/chapters', [App\Http\Controllers\AcademicController::class, 'storeChapter'])->name('chapters.store');
    Route::put('/chapters/{chapter}', [App\Http\Controllers\AcademicController::class, 'updateChapter'])->name('chapters.update');
    Route::delete('/chapters/{chapter}', [App\Http\Controllers\AcademicController::class, 'destroyChapter'])->name('chapters.destroy');

    Route::post('/modules', [App\Http\Controllers\AcademicController::class, 'storeModule'])->name('modules.store');
    Route::put('/modules/{module}', [App\Http\Controllers\AcademicController::class, 'updateModule'])->name('modules.update');
    Route::delete('/modules/{module}', [App\Http\Controllers\AcademicController::class, 'destroyModule'])->name('modules.destroy');
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
    Route::post('/exams/{id}/submit', [ExamSessionController::class, 'submitSection'])->name('exams.submit');
    Route::post('/exams/submit-all/{id}', [App\Http\Controllers\ExamSessionController::class, 'submitAll'])->name('exams.submit_all');
    
    Route::post('/complete-onboarding', function (\Illuminate\Http\Request $request) {
        $user = $request->user();
        if ($user->is_approved) {
            $user->update(['has_completed_onboarding' => true]);
            return redirect()->route('dashboard');
        }
        return redirect()->back();
    })->name('complete-onboarding');
});

Route::get('/waiting-lobby', function () {
    return Inertia::render('WaitingLobby');
})->middleware(['auth'])->name('waiting-lobby');

require __DIR__.'/auth.php';
