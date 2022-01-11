<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\subscription;
use  App\Models\user;
use  App\Models\checklist;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class subscriptionController extends Controller
{
    public function index()
    {             
        $supplier = DB::table('subscriptions')
            ->leftJoin('trainings', 'trainings.subcrFK', '=', 'subscriptions.subcrPK')
            ->select('*')
            ->get();

        $supplier->groupBy('subcrPK');

        return response()->json($supplier);
    }

    public function getTraining()
    {
        $usertraining= training::get();
        foreach ($usertraining as $u){

        }
        return response()->json($usertaining);
    }

    function getAllSubcription(){
        $test= subscription::select('dateStart','dateEnd','subcrDetails','cmpnyFK','subcrPK')
        ->orderBy('subcrPK','desc')
        ->get();
        foreach ($test as $t) {
            $t->id=encrypt($t->cmpnyFK);
            $t->subcrDetails=json_decode($t->subcrDetails);
        }
        return response()->json($test);
    }

    function getclientdata(){
        
        $id=Auth::user()->getCompany()->cmpnyPK;

        $usr= user::select('id','name','username','roleFK','lastLogin','lastLoginIP','rolename')
        ->leftJoin('roles','rolePK','roleFK')
        ->where('cmpnyFK',$id)->get();
        $subcr= subscription::select('dateStart','dateEnd','subcrDetails','cmpnyFK',
        'subcrPK')->where('cmpnyFK',$id)->orderBy('dateEnd','desc')->first();
        if($subcr) $subcr->subcrDetails=json_decode($subcr->subcrDetails);
        // $cklist= checklist::get();
        // foreach ($cklist as $c) {
        //     $c->cklistData=json_decode($c->cklistData);
        //     }
            
        // $returnObj = (object)['isSuccess' =>false,'active_subcr'=>$subcr,'users'=>null,'data'=>null,'premises'=>null,'schmlist'=>null,'stockCkList'=>$cklist];
        $returnObj = (object)['isSuccess' =>false,'active_subcr'=>$subcr,'users'=>null,'data'=>null,'premises'=>null,'inhalalcom'=>null,'training'=>null,'schmlist'=>null,'stockCkList'=>null];
        $id=dechex($id);
        if(Storage::exists($id.'\data\subcr')){
            $contents = Storage::get($id.'\data\subcr');
            $returnObj->data=$this->unencodeMaster($contents);
        }
        if(Storage::exists($id.'\data\usrs')){
            $contents = Storage::get($id.'\data\usrs');
            $returnObj->users=$this->unencodeMaster($contents);
        }
        if(Storage::exists($id.'\data\prms')){
            $contents = Storage::get($id.'\data\prms');
            $returnObj->premises=$this->unencodeMaster($contents);
        }
        if(Storage::exists($id.'\data\ihc')){
            $contents = Storage::get($id.'\data\ihc');
            $returnObj->inhalalcom=$this->unencodeMaster($contents);
        }
        if(Storage::exists($id.'\data\trng')){
            $contents = Storage::get($id.'\data\trng');
            $returnObj->training=$this->unencodeMaster($contents);
        }
        if(Storage::exists($id.'\data\training')){
            $contents = Storage::get($id.'\data\training');
            $returnObj->schmlist=$this->unencodeMaster($contents);
        }
        return response()->json($returnObj);
    }

    function getSubscriptionData($id){
        $id=decrypt($id);
        $usr= user::select('id','name','username','lastLogin','lastLoginIP')->where('cmpnyFK',$id)->get();
        $cklist= checklist::select('cklistPK as id','cklistName','cklistLang')->get();
        foreach ($cklist as $c) {
            $c->id=encrypt($c->id);
            }
        // $obj3 = (object)['data'=>"test",'rata'=>"best"];
        // Storage::put($id.'\datar', $this->encodeMaster($obj3));

        // $contents = Storage::get($id.'\datar');
        $returnObj = (object)['isSuccess' =>false,'users'=>$usr,'stockCkList'=>$cklist];

        $id=dechex($id);
        if(Storage::exists($id.'\data\subcr')){
            $contents = Storage::get($id.'\data\subcr');
            $returnObj->data=$this->unencodeMaster($contents);
        }
        if(Storage::exists($id.'\data\prms')){
            $contents = Storage::get($id.'\data\prms');
            $returnObj->premises=$this->unencodeMaster($contents);
        }
        if(Storage::exists($id.'\data\ihc')){
            $contents = Storage::get($id.'\data\ihc');
            $returnObj->inhalalcom=$this->unencodeMaster($contents);
        }
        if(Storage::exists($id.'\data\trng')){
            $contents = Storage::get($id.'\data\trng');
            $returnObj->training=$this->unencodeMaster($contents);
        }
        if(Storage::exists($id.'\data\schemelist')){
            $contents = Storage::get($id.'\data\schemelist');
            $returnObj->schmlist=$this->unencodeMaster($contents);
        }
        return response()->json($returnObj);
    }

    ////////////////Premise////////////////////
    function addPremise(Request $request){
        $cmpny=dechex($request->cmpnyid);
        $data;
        if(Storage::exists($cmpny.'\data\prms')){
            $contents = Storage::get($cmpny.'\data\prms');
            $data=$this->unencodeMaster($contents);
            $key=$request->id;
            // $key=array_search($request->id, array_column($data, 'id'));
            if($key){
                if($request->action=="delete"){
                    unset( $data->{$key});
                }
                else{
                    $data->{$key}=$request->data;
                }
            }
            else{
                $keylist=array_keys(get_object_vars($data));
            $lastkey=end($keylist);
            $key=(int)substr($lastkey,1)+1;
            $data->{'p'.$key}=$request->data;
            }
        }
        else{
            $data = (object)['p1'=>$request->data];
        }
        
        Storage::put($cmpny.'\data\prms', $this->encodeMaster($data));
       
       return response()->json($data);
        // array_search($post_title, array_column($data, 'id'));
    }

    /////////////////////////IHC///////////////////////
    function addIHC(Request $request){
        $cmpny=dechex($request->cmpnyid);
        $data;
        if(Storage::exists($cmpny.'\data\ihc')){
            $contents = Storage::get($cmpny.'\data\ihc');
            $data=$this->unencodeMaster($contents);
            $key=$request->id;
            if($key){
                if($request->action=="delete"){
                    unset( $data->{$key});
                }
                else{
                    $data->{$key}=$request->data;
                }
            }
            else{
                $keylist=array_keys(get_object_vars($data));
                $lastkey=end($keylist);
                $key=(int)substr($lastkey,1)+1;
                $data->{'h'.$key}=$request->data;
            }
        }
        else{
            $data = (object)['h1'=>$request->data];
        }
        
        Storage::put($cmpny.'\data\ihc', $this->encodeMaster($data));
       
       return response()->json($data);
    }

    /////////////////////////Training///////////////////////
    function addTraining(Request $request){
        $cmpny=dechex($request->cmpnyid);
        $data;
        if(Storage::exists($cmpny.'\data\trng')){
            $contents = Storage::get($cmpny.'\data\trng');
            $data=$this->unencodeMaster($contents);
            $key=$request->id;
            // $key=array_search($request->id, array_column($data, 'id'));
            if($key){
                if($request->action=="delete"){
                    unset( $data->{$key});
                }
                else{
                    $data->{$key}=$request->data;
                }
            }
            else{
                $keylist=array_keys(get_object_vars($data));
            $lastkey=end($keylist);
            $key=(int)substr($lastkey,1)+1;
            $data->{'t'.$key}=$request->data;
            }
        }
        else{
            $data = (object)['t1'=>$request->data];
        }
        
        Storage::put($cmpny.'\data\trng', $this->encodeMaster($data));
       
       return response()->json($data);
        // array_search($post_title, array_column($data, 'id'));
    }


    
    function postSubcription (Request $request){
        $cmpny=dechex($request->cmpnyid);
        $data;
        if(Storage::exists($cmpny.'\data\subcr')){
            $contents = Storage::get($cmpny.'\data\subcr');
            $data=$this->unencodeMaster($contents);
            $key=$request->id;
            // $key=array_search($request->id, array_column($data, 'id'));
            if($key){
                if($request->action=="delete"){
                    unset( $data->{$key});
                }
                else{
                    $data->{$key}=$request->data;
                }
            }
            else{
                $keylist=array_keys(get_object_vars($data));
            $lastkey=end($keylist);
            $key=(int)substr($lastkey,1)+1;
            $data->{'s'.$key}=$request->data;
            }
        }
        else{
            $data = (object)['s1'=>$request->data];
        }
        
        Storage::put($cmpny.'\data\subcr', $this->encodeMaster($data));
       
       return response()->json($data);
        // array_search($post_title, array_column($data, 'id'));

    }

    function createSubscription(Request $request){

        if($request->subcrPK){
            $subcr = subscription::where('subcrPK',$request->subcrPK)->first();
        }
        else{
            $subcr = new subscription;
        }
        
        $subcr->cmpnyFK =$request->company;
        $subcr->dateStart =$request->datestart;
        $subcr->dateEnd =$request->dateend;
        $subcr->subcrDetails = json_encode($request->details);
        $subcr->save();
      $subcr->subcrDetails = json_decode($subcr->subcrDetails);
        return response()->json($subcr);

    }

    function deleteSubscription(Request $request){
        
        $subcr = subscription::where('subcrPK',$request->pk)->first();
        $subcr->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete"]);

    }

    function getIndSubscription(){
        $id=Auth::user()->getCompany()->cmpnyPK;


        $subcr= subscription::select('dateStart','dateEnd')->where('cmpnyFK',$id)->where('dateStart', '<=', Carbon::now())->where('dateEnd', '>=', Carbon::now())->orderBy('dateEnd','desc')->first();
        
        $returnObj = (object)['isSuccess' =>true,'subscription' =>$subcr];
        if($subcr){

            $id=dechex($id);
            $premises;
            $schmlist;

            $returnObj->premises=array();
            $returnObj->cklists=array();

            if(Storage::exists($id.'\data\prms')){
                $contents = Storage::get($id.'\data\prms');
                $premises=$this->unencodeMaster($contents);
                $premises=json_decode(json_encode($premises));

            }
            if(Storage::exists($id.'\data\schemelist')){
                $contents = Storage::get($id.'\data\schemelist');
                $schmlist=$this->unencodeMaster($contents);
            }

            if(Storage::exists($id.'\data\subcr')){
                $contents = Storage::get($id.'\data\subcr');
                $data=$this->unencodeMaster($contents);
                foreach ($data as $key => $value) {
                    $value=(object)$value;
                    $idx=array_search(Auth::id(),$value->users);
                  if($idx>-1){
                    foreach ($value->cklists as $v) {
                        if(!is_array($v) &&  property_exists($schmlist, $v)){
                        if(array_search($v, array_column($returnObj->cklists, 'id'))==false){
                        $schmlist->{$v}->id=$v;
                        array_push($returnObj->cklists,$schmlist->{$v} );
                    }}
                    }
                    foreach ($value->premises as $v) {
                        if(array_search($v, array_column($returnObj->premises, 'id'))==false){
                        $premises->{$v}->id=$v;
                        array_push($returnObj->premises,$premises->{$v});

                         }
                    }
                  } 
                }

                $returnObj->isSuccess=true;
            }

        }
        
       return response()->json($returnObj);
    }

    function encodeMaster( $obj ) 
    { 
    return base64_encode(gzcompress(serialize($obj))); 
    } 

    //function to unserialize the serialized text
    function unencodeMaster($txt) 
    { 
    return unserialize(gzuncompress(base64_decode($txt))); 
    }


}
