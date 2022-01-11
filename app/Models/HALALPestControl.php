<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALPestControl extends Model
{
    protected $table = 'tbl_hpc_halal_pest_control';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
