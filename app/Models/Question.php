<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'type',
        'content',
        'level_id',
        'subject_id',
        'paper_id',
        'chapter_id',
        'module_id',
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

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function paper()
    {
        return $this->belongsTo(Paper::class);
    }

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }

    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
