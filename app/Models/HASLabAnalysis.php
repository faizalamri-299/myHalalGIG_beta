<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASLabAnalysis extends Model
{
    protected $table = 'tbl_hla_has_lab_analysis';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
