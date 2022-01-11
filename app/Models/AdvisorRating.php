<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdvisorRating extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $table = 'tbl_ar_advisor_rating';
    public $timestamps = false;

}
