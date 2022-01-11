<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALRekodSertu extends Model
{
    protected $table = 'halal_serturecords';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
