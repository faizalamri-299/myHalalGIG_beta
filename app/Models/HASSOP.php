<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASSOP extends Model
{
    protected $table = 'has_sop';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
