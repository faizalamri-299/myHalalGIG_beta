<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASSertu extends Model
{
    protected $table = 'tbl_hs_has_sertu';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
