<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALPenyataKewangan extends Model
{
    protected $table = 'tbl_hpk_halal_penyata_kewangan';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
