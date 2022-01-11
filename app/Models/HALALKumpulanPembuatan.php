<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALKumpulanPembuatan extends Model
{
    protected $table = 'halal_batchmanufacturing';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
