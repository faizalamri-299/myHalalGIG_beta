<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdvisorExperience extends Model
{
    //advisorexperience
    use HasFactory;
    protected $primaryKey = 'advisorExpPK';
    protected $table = 'advisor_experience';
    public $timestamps = false;
}
