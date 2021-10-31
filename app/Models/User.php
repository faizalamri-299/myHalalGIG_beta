<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'username', 'password','cmpnyFK','roleFK'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];
    public function getID()
    {
        return $this->belongsTo('App\Models\role', 'roleFK', 'rolePK')->first()->rolelevel;
    }

    public function getRoleLevel()
    {
        return $this->belongsTo('App\Models\role', 'roleFK', 'rolePK')->first()->rolelevel;
    }
    public function getRole()
    {
        return $this->belongsTo('App\Models\role', 'roleFK', 'rolePK')->first();
    }
    public function getCompany()
    {
        $data=$this->hasOne('App\Models\company', 'cmpnyPK','cmpnyFK')->first();
        if(!is_null($data)){
        $data->cmpnyDetails=json_decode($data->cmpnyDetails);
        $data->cmpnyConfig=json_decode($data->cmpnyConfig);
        $data->cmpnyFile1=json_decode($data->cmpnyFile1);

        $data->id=encrypt($data->cmpnyFK);}
        return $data;
    }
    public function getAdvisor()
    {
        $data=$this->hasOne('App\Models\AdvisorProfile', 'userFK','id')->first();
        if(!is_null($data)){
        $data->advImg=json_decode($data->advImg);
        $data->id=encrypt($data->id);}
        return $data;
    }
    public function AdvUser()
    {
        return $this->hasOne('App\Models\AdvisorProfile', 'userFK','id');   
    }
    // public function getAdvID()
    // {
    //     return $this->belongsTo('App\Models\user', 'roleFK', 'rolePK')->first();
    // }
    public function getCompanyLite()
    {
        $data=$this->hasOne('App\Models\company', 'cmpnyPK','cmpnyFK')->select('cmpnyPK as id','cmpnyName','cmpnyDetails')->first();
        $data->cmpnyDetails=json_decode($data->cmpnyDetails);
        $data->id=encrypt($data->id);
        return $data;
    }
  
}
