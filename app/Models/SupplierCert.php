<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierCert extends Model
{
    use HasFactory;
    protected $table = 'tbl_spcb_supplier_has_cert_bodies';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
}
