<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASSOPSertu extends Model
{
    protected $table = 'tbl_hss_has_sop_sertu';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
