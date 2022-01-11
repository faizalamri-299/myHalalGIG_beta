<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawMaterial extends Model
{
    protected $table = 'tbl_sprm_supplier_has_raw_mat';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;

    public function supportdoc()
    {
        return $this->hasMany('App\Models\RawMatSuppDoc', 'fk_rmsd_raw_mat_id','id');
    }
}

