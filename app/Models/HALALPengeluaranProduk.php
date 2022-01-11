<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALPengeluaranProduk extends Model
{
    protected $table = 'tbl_hpp_halal_pengeluaran_produk';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
