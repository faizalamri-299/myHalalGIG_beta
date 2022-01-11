<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASProductHalalCert extends Model
{
    protected $table = 'has_producthalalcert';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
