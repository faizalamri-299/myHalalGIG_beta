<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawMatSuppDoc extends Model
{
    protected $table = 'tbl_rmsd_raw_mat_has_support_document';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
