<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class supplier extends Model
{
    protected $table = 'tbl_sp_supplier';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;


    public function certbodies()
    {
        return $this->hasMany('App\Models\SupplierCert','spcb_fk_supplier_id','id');
    }

    public function raw_material()
    {
        return $this->hasMany('App\Models\RawMaterial','sprm_fk_supplier_id','id');
    }

    public function raw_material_support_doc()
    {
        return $this->hasMany('App\Models\RawMaterial','sprm_fk_supplier_id','id');
    }

}
