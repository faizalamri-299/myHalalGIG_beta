<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALSijilPendaftaran extends Model
{
    protected $table = 'tbl_hsp_halal_sijil_pendaftaran';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
