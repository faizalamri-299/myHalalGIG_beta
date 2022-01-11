<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALDokumenMS extends Model
{
    protected $table = 'halal_msdocuments';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
