<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASSOPProductRecall extends Model
{
    protected $table = 'tbl_hpr_has_product_recall';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
