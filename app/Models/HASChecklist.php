<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HASChecklist extends Model
{
    protected $table = 'tbl_hc_has_checklist';
    use HasFactory;
    protected $primaryKey = 'id';
    public $timestamps = false;
}
