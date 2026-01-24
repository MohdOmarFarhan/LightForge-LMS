<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'type',
        'content',
        'class',
        'subject',
        'paper',
        'chapter',
        'module',
        'difficulty',
        'marks',
        'time_limit',
        'options',
        'correct_answer',
        'sub_questions',
        'created_by',
    ];

    protected $casts = [
        'options' => 'array',
        'sub_questions' => 'array',
    ];

    public function exams()
    {
        return $this->belongsToMany(Exam::class, 'exam_questions');
    }
}
