<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdvisorActivities extends Model
{
    use HasFactory;
    protected $primaryKey = 'advisorActPK';
    protected $table = 'advisor_activities';
    public $timestamps = false;
}
