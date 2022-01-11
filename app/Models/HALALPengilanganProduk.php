<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALPengilanganProduk extends Model
{
    protected $table = 'halal_productmanufacturing';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
