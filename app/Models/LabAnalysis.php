<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabAnalysis extends Model
{
    protected $table = 'tbl_la_lab_analysis';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
