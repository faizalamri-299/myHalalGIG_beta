<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALMaklumatPekerja extends Model
{
    protected $table = 'tbl_hmp_halal_maklumat_pekerja';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
