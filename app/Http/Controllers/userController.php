<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use  App\Models\User;
use  App\Models\profile;
use  App\Models\company;
use  App\Models\role;
use  App\Models\Advisor;

use Illuminate\Support\Facades\Hash;

use  App\Models\AdvisorProfile;

use Illuminate\Support\Facades\Auth;

class userController extends Controller
{
    //

    function getAllUser(){ //get all advisor from admin side
        
        $usr= user::leftJoin('companies','cmpnyPK','cmpnyFK')
        ->leftJoin('roles','rolePK','roleFK')
        ->leftJoin('tbl_adl_advisor_level','adl_fk_user_id','id')
        ->select('id','name','username','lastLogin','lastLoginIP','cmpnyName','cmpnyFK as cmpnyID','roleFK','rolename')
        ->get();
        return response()->json($usr);
    }

    function getAllAdvisor(){

        $usr= DB::table('users')
        ->leftJoin('advisor','userFK','id')
        ->leftJoin('companies','cmpnyPK','cmpnyFK')
        ->leftJoin('roles','rolePK','roleFK')
        ->leftJoin('tbl_adl_advisor_level','tbl_adl_advisor_level.adl_fk_user_id','users.id')
        ->leftJoin('tbl_level','tbl_adl_advisor_level.adl_fk_level','tbl_level.id')
        ->leftJoin('tbl_ac_advisor_has_company', 'tbl_ac_advisor_has_company.ad_fk_user_id','users.id')
        ->select('users.id','name','username','lastLogin','lastLoginIP','cmpnyName','cmpnyFK as cmpnyID','roleFK','rolename','level_name','level_max_user','advIcno','advAddress','advPreflocation','advDescription','advTelno','advGender','advBirthdate','advImg', DB::raw('count(case when ad_status = 1 then 1 else null end) as total','tbl_adl_advisor_level.ad_status'))
        ->where('roleFK',3)
        ->groupBy('users.id')
        ->get();

        foreach ($usr as $u) {
        $u->advImg=json_decode($u->advImg);
        }
        return response()->json($usr);
    }

    function getNewUser(){ //dashboard admin

        $usr= DB::table('users')
        ->leftJoin('companies','cmpnyPK','cmpnyFK')
        ->leftJoin('roles','rolePK','roleFK')
        ->select('users.id','name','username','lastLogin','created_at','cmpnyName')
        ->where('roleFK',5)
        ->OrderBy('created_at','desc')
        ->take(5)
        // ->groupBy('users.id')
        ->get();

        $advisor= DB::table('users')
        ->leftJoin('companies','cmpnyPK','cmpnyFK')
        ->leftJoin('roles','rolePK','roleFK')
        ->select('users.id','name','username','lastLogin','created_at','cmpnyName')
        ->where('roleFK',3)
        ->OrderBy('created_at','desc')
        ->take(5)
        // ->groupBy('users.id')
        ->get();

        $totalcompany= DB::table('users')
        ->leftJoin('companies','cmpnyPK','cmpnyFK')
        ->leftJoin('roles','rolePK','roleFK')
        ->select('users.id','name','username','lastLogin','created_at','cmpnyName',DB::raw('count(case when roleFK = 5 then 1 else null end) as totalUser'),DB::raw('count(case when roleFK = 3 then 1 else null end) as totalAdvisor'))
        ->get();

        $company= DB::table('companies')
        ->select(DB::raw('count(case when cmpnyPK IS NOT NULL then 1 else null end) as totalCompany'))
        ->get();

        $supplier= DB::table('tbl_sp_supplier')
        ->select(DB::raw('count(case when id IS NOT NULL then 1 else null end) as totalSupplier'))
        ->get();

        $returnObj = (object)['isSuccess' =>true,'usr'=>$usr,'totalcompany'=>$totalcompany,'company'=>$company,'supplier'=>$supplier,'advisor'=>$advisor];
        return response()->json($returnObj);
    }
    

    function addAdvisor(Request $request){
        // Auth::id()
        $role=Auth::user()->getRoleLevel();

       if($role==4){
        if($request->id && $request->id == Auth::id()){
            $usr = User::where('id',$request->id)->first();
            if($request->password!="default"){
                $usr->password =Hash::make($request->password);
            }
        }
        else{
            return response()->json(['isSuccess' =>false,'message'=>"You are not allowed to perform this action"],401);
        }
        }
        else{
            if($request->id){
                $usr = User::where('id',$request->id)->first();
                if($request->password!="default"){
                $usr->password =Hash::make($request->password) ;}
            }
            else{
                $usr = new User;
                $usr->password =Hash::make($request->password) ;

                // $userid=user::getLatestUser()->id;
                // $userid=Auth::user()->id;
                
                
            }
            // $usr->lastLoginIP =$request->getClientIp();
            if($request->cmpnyid){
                $usr->cmpnyFK=$request->cmpnyid;
            }
            if($request->role){
                $usr->roleFK=$request->role;
            }
        }

        $usr->username = $request->username;
        $usr->name = $request->name;
        $usr->save();

        $advsr = new AdvisorProfile;
        $usr->AdvUser()->save($advsr);

        $usr->rolename=$usr->getRole()->rolename;
        return response()->json($usr);
    }

    function deleteAdvisor(Request $request){
        $usr = User::where('id',$request->id)->first();
        $usr->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete"]);
    }

    // function getRoles(){
        
    //     $role=Auth::user()->getRoleLevel();
    //     $roles= role::where('rolelevel','>=',$role)->get();
    //     return response()->json($roles);
    // }
    function getRoles(){
        
        $role=Auth::user()->getRoleLevel();
        $roles= role::where('rolelevel','>=',5)->get();
        return response()->json($roles);
    }
    function addUser(Request $request){
        // Auth::id()
        $role=Auth::user()->getRoleLevel();
        
       if($role==4){
        if($request->id && $request->id == Auth::id()){
            $usr = User::where('id',$request->id)->first();
            if($request->password!="default"){
                $usr->password =Hash::make($request->password);
            }
        }
        else{
            return response()->json(['isSuccess' =>false,'message'=>"You are not allowed to perform this action"],401);
        }
        }
        else{
            if($request->id){
                $usr = User::where('id',$request->id)->first();
                if($request->password!="default"){
                $usr->password =Hash::make($request->password) ;}
            }
            else{
                $usr = new User;
                $usr->password =Hash::make($request->password) ;
            }
            // $usr->lastLoginIP =$request->getClientIp();
            if($request->cmpnyid){
                $usr->cmpnyFK=$request->cmpnyid;
            }
            if($request->role){
                $usr->roleFK=$request->role;
            }
        }

        
        $usr->username = $request->username;
        $usr->name = $request->name;
        
        
        $usr->save();

        $usr->rolename=$usr->getRole()->rolename;

        return response()->json($usr);
    }


    function deleteUser(Request $request){
        $usr = User::where('id',$request->id)->first();
        $usr->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete"]);
    }
    
    function addcompany(){

        $users= profile::where('profilePK', '>', 5)->select('profilePK as id','name')->get();
        $myObj=(object)array(
            "address"=>"Level 6, Bangunan TH, Damansara Uptown 3, No. 3, Jalan SS21/39, 47400 Petaling Jaya, Selangor Darul Ehsan.",
            $users
        );

        $usr = new company;
        $usr->cmpnyName = "Gerbang Alaf Restaurants Sdn Bhd";
        $usr->cmpnyDetails = json_encode($myObj);
        $usr->save();
        return response()->json($usr);
    }

    function updateCompany(){
        $cmpny= company::get();
        foreach ($cmpny as $c) {
            $usr;
            if($c == "1"){
                $usr = profile::where('profilePK', '<', 6)->select('profilePK as id','name')->get();
            }
            else{
                $usr = profile::where('profilePK', '>', 5)->select('profilePK as id','name')->get();
            }
            $c->cmpnyStaff =json_encode($usr) ;
            $c->save();
        }

    }

    function updateUser(){

        $users= company::where('cmpnyPK', '=', 2)->select('cmpnyPK as id','cmpnyName')->get();
      
        $usr = profile::where('profilePK', '>', 5)->get();
        foreach ($usr as $lalala) {
            $lalala->accounts =json_encode($users) ;
            $lalala->save();
        }
      
        return response()->json($usr);
    }

    function getuser(){

        $usr=Auth::user()->profile();
      
        return response()->json($usr);
    }
}
