<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class checklist extends Model
{
    use HasFactory;
    protected $primaryKey = 'cklistPK';
    public $timestamps = false;

    protected $fillable = [
        'cklistName'
    ];
    
}
