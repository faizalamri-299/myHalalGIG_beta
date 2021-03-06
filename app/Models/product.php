<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $table = 'tbl_pr_product';
    public $timestamps = false;

    public function productdetail()
    {
        return $this->hasMany('App\Models\productdetail', 'prsp_fk_product_id','id');
    }
    
}
