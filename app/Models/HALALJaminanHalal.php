<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALJaminanHalal extends Model
{
    protected $table = 'tbl_hjh_halal_jaminan_halal';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
