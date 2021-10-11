<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASTraceability extends Model
{
    protected $table = 'tbl_ht_has_traceability';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
