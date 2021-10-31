<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CertBodies extends Model
{
    protected $table = 'tbl_cb_certification_bodies';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
