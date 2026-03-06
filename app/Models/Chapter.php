<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    use HasFactory;

    protected $fillable = ['paper_id', 'name', 'number'];

    public function paper()
    {
        return $this->belongsTo(Paper::class);
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
