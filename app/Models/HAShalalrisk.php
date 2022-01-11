<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HAShalalrisk extends Model
{
    protected $table = 'has_halalrisk';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
