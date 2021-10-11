<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdvisorAcademic extends Model
{
    //advisoracademic
    use HasFactory;
    protected $primaryKey = 'advisorAcaPK';
    protected $table = 'advisor_academic';
    public $timestamps = false;
}
