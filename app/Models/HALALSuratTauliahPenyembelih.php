<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALSuratTauliahPenyembelih extends Model
{
    protected $table = 'halal_slaughterercredentials';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
