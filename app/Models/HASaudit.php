<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASaudit extends Model
{
    protected $table = 'has_audit';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
