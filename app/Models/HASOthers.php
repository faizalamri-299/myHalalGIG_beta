<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASOthers extends Model
{
    protected $table = 'has_others';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
