<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class role extends Model
{
    use HasFactory;
    protected $primaryKey = 'rolePK';
    public $timestamps = false;

    protected $fillable = [
        'prsp_fk_supplier_id', 'prsp_name', 'prsp_scientific_name','prsp_category',
    ];

    public function getSupplier()
    {
        return $this->belongsTo('App\Models\supplier', 'prsp_fk_supplier_id', 'id')->first();
    }
}
