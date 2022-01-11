<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASorgchart extends Model
{
    protected $table = 'has_orgchart';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
