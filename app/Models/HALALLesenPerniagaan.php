<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALLesenPerniagaan extends Model
{
    protected $table = 'tbl_hlp_halal_lesen_perniagaan';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
