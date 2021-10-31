<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdvisorProfile extends Model
{
    use HasFactory;
    protected $primaryKey = 'advisorPK';
    protected $table = 'advisor';
    public $timestamps = false;
}
