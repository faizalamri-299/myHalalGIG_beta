<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALAliranPergerakan extends Model
{
    protected $table = 'halal_operationsflow';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
