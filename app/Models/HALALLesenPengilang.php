<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALLesenPengilang extends Model
{
    protected $table = 'halal_manufacturerlicense';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
