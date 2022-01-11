<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALNotaNotifikasiProduk extends Model
{
    protected $table = 'halal_notnobfk';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
