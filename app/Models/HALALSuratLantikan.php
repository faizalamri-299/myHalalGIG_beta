<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALSuratLantikan extends Model
{
    protected $table = 'tbl_hsl_halal_surat_lantikan';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
