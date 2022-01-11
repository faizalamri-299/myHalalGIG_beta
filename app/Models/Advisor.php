<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advisor extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $table = 'tbl_ac_advisor_has_company';
    public $timestamps = false;
}
