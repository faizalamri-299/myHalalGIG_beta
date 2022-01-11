<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALPembungkusan extends Model
{
    protected $table = 'tbl_hp_halal_pembungkusan';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
