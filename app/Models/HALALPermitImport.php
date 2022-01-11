<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALPermitImport extends Model
{
    protected $table = 'tbl_hpi_halal_permit_import';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
