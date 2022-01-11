<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALSuntikanThypoid extends Model
{
    protected $table = 'tbl_hst_halal_suntikan_thypoid';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
