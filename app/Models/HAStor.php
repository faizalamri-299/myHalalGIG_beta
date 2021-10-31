<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HAStor extends Model
{
    protected $table = 'has_tor';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
