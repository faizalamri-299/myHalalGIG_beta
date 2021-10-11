<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\company;
use  App\Models\Advisor;
use  App\Models\User;
use Illuminate\Support\Facades\Auth;
use DB;

use App\Models\cmpnyPremise;
use App\Models\cmpnyIHC;
use App\Models\cmpnyTraining;

class companyController extends Controller
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
    
    public function getCompanyAdvisorRequest(){ //list of the company yang request kepada advisor
        
        $sessionid=Auth::user()->id;

        // $productdetail= productdetail::get();

        $cmpny = DB::table('tbl_ac_advisor_has_company')
            ->join('users', 'tbl_ac_advisor_has_company.ad_fk_user_id', '=', 'users.id')
            ->join('companies', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'companies.cmpnyPK')
            ->select('tbl_ac_advisor_has_company.id','companies.cmpnyPK','companies.cmpnyName','companies.cmpnyDetails','companies.cmpnyConfig','ad_status')
            ->where('ad_fk_user_id',$sessionid)
            ->where('ad_status', '=', 0)
            ->get(); 

        foreach ($cmpny as $c) {
            $c->cmpnyDetails=json_decode($c->cmpnyDetails);
            $c->cmpnyConfig=json_decode($c->cmpnyConfig);
            // $c->cmpnyPK=encrypt($c->cmpnyPK);
        }
        return response()->json($cmpny);
    }

    
    
    function getCompanyAdvisor(){ //list of the company yang diassign kepada advisor
        

        $sessionid=Auth::user()->id;

        // $productdetail= productdetail::get();
        $cmpny = DB::table('tbl_ac_advisor_has_company')
            ->join('users', 'tbl_ac_advisor_has_company.ad_fk_user_id', '=', 'users.id')
            ->join('companies', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'companies.cmpnyPK')
            ->Leftjoin('has_halalpolicy', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_halalpolicy.cmpnyFK')
            ->Leftjoin('has_orgchart', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_orgchart.cmpnyFK')
            ->Leftjoin('has_tor', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_tor.cmpnyFK')
            ->Leftjoin('has_empletter', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_empletter.cmpnyFK')
            ->Leftjoin('has_audit', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_audit.cmpnyFK')
            ->Leftjoin('has_halalrisk', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_halalrisk.cmpnyFK')
            ->Leftjoin('has_training', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_training.cmpnyFK')
            ->Leftjoin('tbl_hc_has_checklist', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hc_has_checklist.hc_fk_company_id')
            ->Leftjoin('tbl_hla_has_lab_analysis', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hla_has_lab_analysis.hla_fk_company_id')
            ->Leftjoin('tbl_hpr_has_product_recall', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hpr_has_product_recall.hpr_fk_company_id')
            ->Leftjoin('tbl_hrm_has_raw_mat', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hrm_has_raw_mat.hrm_fk_company_id')
            ->Leftjoin('tbl_hsrm_has_sop_raw_mat', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hsrm_has_sop_raw_mat.hsrm_fk_company_id')
            ->Leftjoin('tbl_hss_has_sop_sertu', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hss_has_sop_sertu.hss_fk_company_id')
            ->Leftjoin('tbl_hst_has_sop_traceability', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hst_has_sop_traceability.hst_fk_company_id')
            ->Leftjoin('tbl_hs_has_sertu', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hs_has_sertu.hs_fk_company_id')
            ->Leftjoin('tbl_ht_has_traceability', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_ht_has_traceability.ht_fk_company_id')
            ->select('tbl_ac_advisor_has_company.ad_fk_company_id','companies.cmpnyName','companies.cmpnyConfig','tbl_hc_has_checklist.hc_file_name','tbl_hla_has_lab_analysis.hla_file_name','tbl_hpr_has_product_recall.hpr_file_name'
                    ,'tbl_hrm_has_raw_mat.hrm_file_name','tbl_hsrm_has_sop_raw_mat.hsrm_file_name','tbl_hss_has_sop_sertu.hss_file_name'
                    ,'tbl_hst_has_sop_traceability.hst_file_name','tbl_hs_has_sertu.hs_file_name','tbl_ht_has_traceability.ht_file_name','has_halalpolicy.halalpolicy_filename','has_orgchart.orgchart_filename','has_tor.tor_filename','has_empletter.empletter_filename','has_audit.audit_filename','has_halalrisk.halalrisk_filename','has_training.training_filename')
            ->where('tbl_ac_advisor_has_company.ad_fk_user_id',$sessionid)
            ->where('tbl_ac_advisor_has_company.ad_status', '=', 1)
            ->get(); 

        return response()->json($cmpny);
    }

    function getAdvisorClient(){ //data advisor untuk client tengok
        
        // $productdetail= productdetail::get();
        $sessionid=Auth::user()->getCompany()->cmpnyPK;

        $cmpny = DB::table('users')
            ->leftJoin('tbl_ac_advisor_has_company', 'users.id', '=', 'tbl_ac_advisor_has_company.ad_fk_user_id')
            ->leftJoin('tbl_adl_advisor_level','tbl_adl_advisor_level.adl_fk_user_id','users.id')
            ->leftJoin('tbl_level','tbl_adl_advisor_level.adl_fk_level','tbl_level.id')
            ->leftJoin('advisor','users.id','advisor.userFK')
            ->leftJoin('tbl_ar_advisor_rating','users.id','tbl_ar_advisor_rating.ar_fk_advisor_id')
            // ->where('ad_status', '<', 1)created_atcreated_at
            ->select('users.id','users.name',DB::raw('count(case when ad_status = 1 then 1 else null end) as total'),DB::raw('(SUM(ar_rating) / count(ar_fk_advisor_id))as rating'),'users.created_at','users.username','tbl_ac_advisor_has_company.ad_fk_user_id','tbl_ac_advisor_has_company.ad_status','level_name','level_max_user','advisor.advImg','tbl_ac_advisor_has_company.ad_fk_company_id')
            ->groupBy('users.name')
            ->where([
                ['roleFK', '=', 3],
                ['level_max_user', '<>', ''],]) // where advisor level is not null
            ->get(); 

        return response()->json($cmpny);
    }

    function getAdSelected(){ //data advisor yang dah sah untuk client tengok
        

        $sessionid=Auth::user()->getCompany()->cmpnyPK;
        // $productdetail= productdetail::get();
        $advisor = DB::table('tbl_ac_advisor_has_company')
            ->join('users', 'tbl_ac_advisor_has_company.ad_fk_user_id', '=', 'users.id')
            ->leftJoin('advisor','tbl_ac_advisor_has_company.ad_fk_user_id','advisor.userFK')
            ->join('companies', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'companies.cmpnyPK')
            ->select('tbl_ac_advisor_has_company.ad_fk_user_id','users.id','users.name','users.username','tbl_ac_advisor_has_company.ad_status','tbl_ac_advisor_has_company.ad_memo','advisor.advImg')
            ->where('ad_fk_company_id', $sessionid)
            //->where('ad_status', '=',1)
            ->get(); 

        return response()->json($advisor);
    }

    function getCArecord(){ //data all advisor
        

        //$sessionid=Auth::user()->getCompany()->cmpnyPK;
        // $productdetail= productdetail::get();
        $advisor = DB::table('tbl_ac_advisor_has_company')
            ->join('users', 'tbl_ac_advisor_has_company.ad_fk_user_id', '=', 'users.id')
            ->leftJoin('advisor','tbl_ac_advisor_has_company.ad_fk_user_id','advisor.userFK')
            ->leftJoin('tbl_ar_advisor_rating','users.id','tbl_ar_advisor_rating.ar_fk_advisor_id')
            ->join('companies', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'companies.cmpnyPK')
            ->select('tbl_ac_advisor_has_company.ad_fk_user_id','users.name','users.username','tbl_ac_advisor_has_company.ad_status','tbl_ac_advisor_has_company.ad_memo','advisor.advImg','companies.cmpnyName','tbl_ar_advisor_rating.ar_rating','tbl_ar_advisor_rating.ar_comment')
            // ->sortBy('tbl_ac_advisor_has_company.ad_fk_user_id')
            ->orderBy("name")
            ->get(); 

        return response()->json($advisor);
    }

    function getStaffCompany($id){
        // $id=decrypt($id);

        $usr= User::where('cmpnyFK',$id)->get();
        // foreach ($cmpny as $c) {
        //     $c->cmpnyDetails=json_decode($c->cmpnyDetails);
        //     $c->cmpnyPK=encrypt($c->cmpnyPK);
        // }
        return response()->json($usr);
    }

    // function updCompany(Request $request){    
        
    //     $cmpny=  new company;
    //     $cmpny->cmpnyName=$request->cmpnyName;
    //     $cmpny->cmpnyDetails=json_encode($request->cmpnyDetails);
    //     $cmpny->cmpnyLink=$request->cmpnyLink;
    //     $cmpny->cmpnyConfig=json_encode($request->cmpnyConfig);
    //     $cmpny->save();
        
    //     $cmpny->cmpnyDetails=$request->cmpnyDetails;
    //     $cmpny->cmpnyConfig=$request->cmpnyConfig;
    //     return response()->json($cmpny);
    // }

    function updCompany(Request $request){    
        
        $cmpny=company::where('cmpnyPK',$request->id)->first();
        $cmpny->cmpnyName=$request->cmpnyName;
        $cmpny->cmpnyRefNo=$request->cmpnyRefNo;
        $cmpny->cmpnyDetails=json_encode($request->cmpnyDetails);
        $cmpny->cmpnyConfig=json_encode($request->cmpnyConfig);
        $cmpny->save();
        
        $cmpny->cmpnyDetails=$request->cmpnyDetails;
        $cmpny->cmpnyConfig=$request->cmpnyConfig;
        return response()->json($cmpny);
    }

    function registerCompany(Request $request){    
        
        $cmpny_status=company::where('cmpnyName',$request->cmpnyName)->first();

        if(!is_null($cmpny_status)) {
            return response()->json(['isSuccess' =>false,'message'=>"Nama syarikat '".$request->cmpnyName."' telah berdaftar didalam sistem"],417);
        }

        $cmpny= new company;
        $cmpny->cmpnyName=$request->cmpnyName;
        $cmpny->cmpnyDetails=json_encode($request->cmpnyDetails);
        $cmpny->save();
        $cmpny->cmpnyDetails=$request->cmpnyDetails;
      
        $user = Auth::user();
        $user->cmpnyFK = $cmpny->cmpnyPK;
        $user->save();

        return response()->json(['isSuccess' =>true,'session'=>$request->session()->all(),'user' =>$user,'cmpny'=>Auth::user()->getCompany(),'accesslevel'=>Auth::user()->getRoleLevel()]);
      }

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

    function addIHC(Request $request){
        $cmpny=dechex($request->cmpnyid);
        $data;
        if(Storage::exists($cmpny.'\data\ihc')){
            $contents = Storage::get($cmpny.'\data\ihc');
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
        
        Storage::put($cmpny.'\data\ihc', $this->encodeMaster($data));
       
       return response()->json($data);
        // array_search($post_title, array_column($data, 'id'));
    }

    function addTraining(Request $request){
        $cmpny=dechex($request->cmpnyid);
        $data;
        if(Storage::exists($cmpny.'\data\training')){
            $contents = Storage::get($cmpny.'\data\training');
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

        Storage::put($cmpny.'\data\training', $this->encodeMaster($data));
       
       return response()->json($data);
        // array_search($post_title, array_column($data, 'id'));
    }

    public function fileUpload(Request $req){
        $req->validate([
        'file' => 'required|mimes:csv,txt,xlx,xls,pdf|max:2048'
        ]);

        $fileModel = new File;

        if($req->file()) {
            $fileName = time().'_'.$req->file->getClientOriginalName();
            $filePath = $req->file('file')->storeAs('uploads', $fileName, 'public');

            $fileModel->name = time().'_'.$req->file->getClientOriginalName();
            $fileModel->file_path = '/storage/' . $filePath;
            $fileModel->save();

            return back()
            ->with('success','File has been uploaded.')
            ->with('file', $fileName);
        }
   }

   public function deleteApplication(Request $request)
   {
       $product = Advisor::where('ad_fk_user_id',$request->pk)->first();
       $product->delete();
       return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete"]);
   }

    // public function download()
    // {
    //     $render = view('chart')->render();
  
    //     $pdf = new Pdf;
    //     $pdf->addPage($render);
    //     $pdf->setOptions(['javascript-delay' => 5000]);
    //     $pdf->saveAs(public_path('report.pdf'));
   
    //     return response()->download(public_path('report.pdf'));
    // }
    
}
