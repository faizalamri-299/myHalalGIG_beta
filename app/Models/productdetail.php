<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class productdetail extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $table = 'tbl_prsp_product_has_supplier';
    public $timestamps = false;
}
