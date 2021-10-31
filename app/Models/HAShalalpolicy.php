<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HAShalalpolicy extends Model
{
    protected $table = 'has_halalpolicy';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
