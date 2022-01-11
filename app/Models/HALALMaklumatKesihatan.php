<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALMaklumatKesihatan extends Model
{
    protected $table = 'halal_employeehealthrecords';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
