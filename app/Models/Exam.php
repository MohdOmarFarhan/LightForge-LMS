<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $fillable = [
        'title',
        'class',
        'subject',
        'paper',
        'start_time',
        'end_time',
        'duration_minutes',
        'total_marks',
        'is_published',
        'created_by',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'is_published' => 'boolean',
    ];

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'exam_questions')
            ->withPivot('order')
            ->orderBy('pivot_order');
    }

    public function attempts()
    {
        return $this->hasMany(ExamAttempt::class);
    }
}
