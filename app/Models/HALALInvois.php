<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALInvois extends Model
{
    protected $table = 'tbl_hi_halal_invois';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
