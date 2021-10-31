<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASSOPTraceability extends Model
{
    protected $table = 'tbl_hst_has_sop_traceability';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
