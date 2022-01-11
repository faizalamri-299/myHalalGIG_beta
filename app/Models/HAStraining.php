<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HAStraining extends Model
{
    protected $table = 'has_training';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
