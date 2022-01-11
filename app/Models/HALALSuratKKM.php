<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALSuratKKM extends Model
{
    protected $table = 'tbl_hsk_halal_surat_KKM';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
