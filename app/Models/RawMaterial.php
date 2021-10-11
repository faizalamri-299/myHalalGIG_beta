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

    public function getCert()
    {
        $data=$this->hasOne('App\Models\SupplierCert', 'id','sprm_fk_id_halal_cert_2')->first();
        // if(!is_null($data))
        // {
        //     $cert = $data->sprm_fk_id_halal_cert;
        //     $data = $data->sprm_fk_id_halal_cert_2 + $cert;
        // }
        // else{
        //     $data = $data->sprm_fk_id_halal_cert;
        // }
        return $data;
    }
}

