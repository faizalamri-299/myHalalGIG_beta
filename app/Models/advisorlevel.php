<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class advisorlevel extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $table = 'tbl_level';
    public $timestamps = false;

}
