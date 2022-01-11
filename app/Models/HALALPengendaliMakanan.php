<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALPengendaliMakanan extends Model
{
    protected $table = 'halal_foodhandler';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
