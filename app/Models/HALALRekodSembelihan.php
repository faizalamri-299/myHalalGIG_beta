<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALRekodSembelihan extends Model
{
    protected $table = 'halal_slaughterrecords';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
