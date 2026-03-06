<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamAttempt extends Model
{
    protected $fillable = [
        'exam_id',
        'user_id',
        'started_at',
        'submitted_at',
        'score_mcq',
        'score_cq',
        'score_descriptive',
        'total_score',
        'status',
        'mcq_started_at',
        'mcq_submitted_at',
        'cq_started_at',
        'cq_submitted_at',
        'descriptive_started_at',
        'descriptive_submitted_at',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'submitted_at' => 'datetime',
        'mcq_started_at' => 'datetime',
        'mcq_submitted_at' => 'datetime',
        'cq_started_at' => 'datetime',
        'cq_submitted_at' => 'datetime',
        'descriptive_started_at' => 'datetime',
        'descriptive_submitted_at' => 'datetime',
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function answers()
    {
        return $this->hasMany(ExamAnswer::class);
    }
}
