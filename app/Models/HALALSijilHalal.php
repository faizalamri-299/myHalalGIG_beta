<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALSijilHalal extends Model
{
    protected $table = 'tbl_hsh_halal_sijil_halal';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
