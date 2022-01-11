<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\company;
use  App\Models\Advisor;
use  App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use DB;
use Carbon\Carbon;

use App\Models\cmpnyPremise;
use App\Models\cmpnyIHC;
use App\Models\cmpnyTraining;

class AuditorController extends Controller
{
    //
    function getAllCompany(){
        
        $cmpny= company::get();
        foreach ($cmpny as $c) {
            $c->cmpnyDetails=json_decode($c->cmpnyDetails);
            $c->cmpnyConfig=json_decode($c->cmpnyConfig);
            // $c->cmpnyPK=encrypt($c->cmpnyPK);
        }
        return response()->json($cmpny);
    }

    function getAllUser(){
        
        $id=Auth::user()->getCompany()->cmpnyPK;

        $usr= user::select('id','name','username','roleFK','lastLogin','lastLoginIP','rolename')
        ->leftJoin('roles','rolePK','roleFK')
        ->where('cmpnyFK',$id)->get();
        // $subcr= subscription::select('dateStart','dateEnd','subcrDetails','cmpnyFK',
        // 'subcrPK')->where('cmpnyFK',$id)->orderBy('dateEnd','desc')->first();
        // if($subcr) $subcr->subcrDetails=json_decode($subcr->subcrDetails);
        // $cklist= checklist::get();
        // foreach ($cklist as $c) {
        //     $c->cklistData=json_decode($c->cklistData);
        //     }
            
        // $returnObj = (object)['isSuccess' =>false,'active_subcr'=>$subcr,'users'=>$usr,'data'=>null,'premises'=>null,'schmlist'=>null,'stockCkList'=>$cklist];
        // $id=dechex($id);
        // if(Storage::exists($id.'\data\subcr')){
        //     $contents = Storage::get($id.'\data\subcr');
        //     $returnObj->data=$this->unencodeMaster($contents);
        // }
        // if(Storage::exists($id.'\data\prms')){
        //     $contents = Storage::get($id.'\data\prms');
        //     $returnObj->premises=$this->unencodeMaster($contents);
        // }
        // if(Storage::exists($id.'\data\schemelist')){
        //     $contents = Storage::get($id.'\data\schemelist');
        //     $returnObj->schmlist=$this->unencodeMaster($contents);
        // }
        return response()->json($usr);
    }
    
    
    
}
