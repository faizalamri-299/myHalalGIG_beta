<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdvisorAchievement extends Model
{
    //advisorachievement
    use HasFactory;
    protected $primaryKey = 'advisorAchPK';
    protected $table = 'advisor_achievement';
    public $timestamps = false;
}
