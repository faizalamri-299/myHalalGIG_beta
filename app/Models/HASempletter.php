<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASempletter extends Model
{
    protected $table = 'has_empletter';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
