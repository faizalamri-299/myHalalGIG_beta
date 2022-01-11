<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALSusunAtur extends Model
{
    protected $table = 'tbl_hsa_halal_susun_atur';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
