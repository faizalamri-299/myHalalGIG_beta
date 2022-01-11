<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HALALLesenPergudangan extends Model
{
    protected $table = 'halal_warehousinglicense';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
