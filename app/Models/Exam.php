<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $fillable = [
        'title',
        'target_class',
        'level_id',
        'subject_id',
        'paper_id',
        'start_time',
        'end_time',
        'duration_minutes',
        'total_marks',
        'is_published',
        'created_by',
        'mcq_duration_minutes',
        'cq_duration_minutes',
        'descriptive_duration_minutes',
        'mcq_marks_per_question',
        'cq_marks_per_question',
        'descriptive_marks_per_question',
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
            ->orderByPivot('order');
    }

    public function attempts()
    {
        return $this->hasMany(ExamAttempt::class);
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
}
