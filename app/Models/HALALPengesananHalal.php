<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALPengesananHalal extends Model
{
    protected $table = 'halal_halaltracking';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
