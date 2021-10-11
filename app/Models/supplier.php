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


    public function getRawMaterial()
    {
        $data=$this->hasOne('App\Models\RawMaterial', 'id','sprm_fk_supplier_id')->first();
        $data->id=encrypt($data->id);
        return $data;
        
    }

}
