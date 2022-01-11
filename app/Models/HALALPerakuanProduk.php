<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALPerakuanProduk extends Model
{
    protected $table = 'halal_productregistration';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
