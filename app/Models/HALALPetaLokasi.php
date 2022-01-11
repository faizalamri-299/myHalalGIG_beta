<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALPetaLokasi extends Model
{
    protected $table = 'tbl_hpl_halal_peta_lokasi';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
