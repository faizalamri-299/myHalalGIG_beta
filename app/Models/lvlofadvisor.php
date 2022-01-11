<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class lvlofadvisor extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $table = 'tbl_adl_advisor_level';
    public $timestamps = false;
}
