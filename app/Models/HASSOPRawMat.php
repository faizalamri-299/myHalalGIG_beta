<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASSOPRawMat extends Model
{
    protected $table = 'tbl_hsrm_has_sop_raw_mat';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
