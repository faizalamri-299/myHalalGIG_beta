<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALCartaAlir extends Model
{
    protected $table = 'tbl_hca_halal_carta_alir';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
