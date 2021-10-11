<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASRawMat extends Model
{
    protected $table = 'tbl_hrm_has_raw_mat';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
