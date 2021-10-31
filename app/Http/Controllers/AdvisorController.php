<?php

namespace App\Http\Controllers;

use App\Models\Advisor;
use App\Models\AdvisorRating;
use App\Models\advisorlevel;
use App\Models\AdvisorProfile;

use App\Models\AdvisorExperience;
use App\Models\AdvisorAcademic;
use App\Models\AdvisorAchievement;
use App\Models\AdvisorActivities;

use App\Models\user;

use App\Models\company;
use App\Models\lvlofadvisor;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;

class AdvisorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $id = $id;
        // $productdetail= productdetail::get();
        $advisordetail = DB::table('tbl_ac_advisor_has_company')
            ->join('users', 'tbl_ac_advisor_has_company.ad_fk_user_id', '=', 'users.id')
            ->Leftjoin('companies', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'companies.cmpnyPK')
            ->select('companies.cmpnyName')
            ->where('ad_fk_user_id',$id)
            ->get();  
        $returnObj = (object)['isSuccess' =>false,'advisordetail'=>$advisordetail];

        return response()->json($returnObj);
    }

    public function getAdvisorAD() //ini untuk get data advisor profile
    {
        $sessionid=Auth::user()->advisorPK;
        // $productdetail= productdetail::get();
        $profile = AdvisorProfile::where('userFK',$sessionid)->get();

        return response()->json($profile);
    }

    //advisorexperience
    public function getAdvisorExp() 
    {
        $sessionid=Auth::user()->id;
        $advsrExperience = AdvisorExperience::where('userFK',$sessionid)->get();

        return response()->json($advsrExperience);
    }
    public function addAdvisorExp(Request $request)
    {
        $sessionid=Auth::user()->id;

        $advsrExp = new AdvisorExperience;
        $advsrExp->userFK = $sessionid;
        $advsrExp->advExperience =$request->advExperience;
        $advsrExp->advExpDesc =$request->advExpDesc;
        $advsrExp->advExpSdate =$request->advExpSdate;
        $advsrExp->advExpEdate =$request->advExpEdate;

        $advsrExp->save();
        
       return response()->json($advsrExp);
    }
    function updAdvisorProfile(Request $request){
        $sessionid=Auth::user()->id;
        $advsrprofile = AdvisorProfile::where('userFK',$sessionid)->first();
        // $advsrprofile->userFK = $sessionid;
        $advsrprofile->advImg=json_encode($request->advImg);
        $advsrprofile->advIcno = $request->advIcno;
        $advsrprofile->advAddress = $request->advAddress;
        $advsrprofile->advPreflocation = $request->advPreflocation;
        $advsrprofile->advDescription = $request->advDescription;
        $advsrprofile->advTelno = $request->advTelno;
        $advsrprofile->advGender = $request->advGender;
        $advsrprofile->advBirthdate = $request->advBirthdate;
        $advsrprofile->save();

        $advsrprofile->advImg=$request->advImg;
        return response()->json($advsrprofile);
    }

    //advisoracademic
    public function getAdvisorAca() 
    {
        $sessionid=Auth::user()->id;
        $advsrAcademic = AdvisorAcademic::where('userFK',$sessionid)->get();

        return response()->json($advsrAcademic);
    }
    public function addAdvisorAca(Request $request)
    {
        $sessionid=Auth::user()->id;

        $advsrAca = new AdvisorAcademic;
        $advsrAca->userFK = $sessionid;
        $advsrAca->acaLevel =$request->acaLevel;
        $advsrAca->acaPlace =$request->acaPlace;
        $advsrAca->acaSdate =$request->acaSdate;
        $advsrAca->acaEdate =$request->acaEdate;
        $advsrAca->save();
        
       return response()->json($advsrAca);
    }

    //advisorachievement
    public function getAdvisorAch() 
    {
        $sessionid=Auth::user()->id;
        $advsrAch = AdvisorAchievement::where('userFK',$sessionid)->get();

        return response()->json($advsrAch);
    }
    public function addAdvisorAch(Request $request)
    {
        $sessionid=Auth::user()->id;

        $advsrAch = new AdvisorAchievement;
        $advsrAch->userFK = $sessionid;
        $advsrAch->achTitle =$request->achTitle;
        $advsrAch->achDesc =$request->achDesc;
        $advsrAch->achYear =$request->achYear;

        $advsrAch->save();
        
       return response()->json($advsrAch);
    }

    //advisoractivities
    public function getAdvisorAct() 
    {
        $sessionid=Auth::user()->id;
        $advsrAct = AdvisorActivities::where('userFK',$sessionid)->get();

        return response()->json($advsrAct);
    }
    public function addAdvisorAct(Request $request)
    {
        $sessionid=Auth::user()->id;

        $advsrAct = new AdvisorActivities;
        $advsrAct->userFK = $sessionid;
        $advsrAct->actTitle =$request->actTitle;
        $advsrAct->actDesc =$request->actDesc;
        $advsrAct->actYear =$request->actYear;

        $advsrAct->save();
        
       return response()->json($advsrAct);
    }

    //get semua data advisor
    function getAdvisorData(){

        $sessionid = Auth::user()->id;
        
        $usr= user::leftJoin('advisor','advisor.userFK','id')
        ->leftJoin('advisor_experience','advisor_experience.userFK','id')
        ->leftJoin('advisor_achievement','advisor_achievement.userFK','id')
        ->leftJoin('advisor_academic','advisor_academic.userFK','id')
        ->select('id','name','advImg','advIcno','advAddress','advPrefLocation','advTelno','advGender','advBirthdate','advDescription','advExperience','advExpDesc','advExpSdate','advExpEdate','achTitle','achDesc','achYear','acaLevel','acaPlace','acaSdate','acaEdate','lastLogin','lastLoginIP','roleFK')
        ->where('id',$sessionid)
        ->get();
        return response()->json($usr);
    }

    public function getAdvisorAll() //get all list of advisor 
    {

        // $productdetail= productdetail::get();
        $cmpny = company::get();

        return response()->json($cmpny);
    }

    public function getDDlevel() //get all list of advisor 
    {

        // $productdetail= productdetail::get();
        $lvl = advisorlevel::get();

        return response()->json($lvl);
    }

    public function getClientAdvisor() //get all list of advisor via session
    {
        $sessionid=Auth::user()->getCompany()->cmpnyPK;
        // $productdetail= productdetail::get();
        $advisordetail = DB::table('tbl_ac_advisor_has_company')
            ->join('users', 'tbl_ac_advisor_has_company.ad_fk_user_id', '=', 'users.id')
            ->Leftjoin('companies', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'companies.cmpnyPK')
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
            ->select('users.name','tbl_hc_has_checklist.hc_file_name','tbl_hla_has_lab_analysis.hla_file_name','tbl_hpr_has_product_recall.hpr_file_name','tbl_hrm_has_raw_mat.hrm_file_name','tbl_hsrm_has_sop_raw_mat.hsrm_file_name','tbl_hss_has_sop_sertu.hss_file_name','tbl_hst_has_sop_traceability.hst_file_name','tbl_hs_has_sertu.hs_file_name','tbl_ht_has_traceability.ht_file_name','has_halalpolicy.halalpolicy_filename','has_orgchart.orgchart_filename','has_tor.tor_filename','has_empletter.empletter_filename','has_audit.audit_filename','has_halalrisk.halalrisk_filename','has_training.training_filename')
            ->where('ad_fk_user_id',$id)
            ->get();  
        $returnObj = (object)['isSuccess' =>false,'advisordetail'=>$advisordetail,'advisorprofile'=>null];
        $id=dechex($id);
        if(Storage::exists($id.'\data\advsrprofile')){
            $contents = Storage::get($id.'\data\advsrprofile');
            $returnObj->advisorprofile=$this->unencodeMaster($contents);
        }

        return response()->json($returnObj);
    }

    function addAdvisorProfile(Request $request){
        $cmpny=dechex($request->cmpnyid);
        $data;
        if(Storage::exists($cmpny.'\data\advsrprofile')){
            $contents = Storage::get($cmpny.'\data\advsrprofile');
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
            $data->{'p'.$key}=$request->data;
            }
        }
        else{
            $data = (object)['p1'=>$request->data];
        }
        
        Storage::put($cmpny.'\data\advsrprofile', $this->encodeMaster($data));
       
       return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
              
        $sessionid=Auth::user()->getCompany()->cmpnyPK;
        $advisordetails = new Advisor;
        $advisordetails->ad_fk_user_id = $request->id;
        $advisordetails->ad_fk_company_id = $sessionid;
        $advisordetails->ad_status = 0;
        $advisordetails->save();

        return response()->json($advisordetails);
    }

    public function createRating(Request $request)
    {
              
        $sessionid=Auth::user()->getCompany()->cmpnyPK;

        $advisorrating = new AdvisorRating;
        $advisorrating->ar_fk_advisor_id = $request->id;
        $advisorrating->ar_fk_company_id = $sessionid;
        $advisorrating->ar_rating = $request->ar_rating;
        $advisorrating->ar_comment = $request->ar_comment;
        $advisorrating->save();

        return response()->json($advisorrating);
    }

    public function addAdvisorLevel(Request $request, Advisor $advisor)
    {            

        $advisordetails = new lvlofadvisor;
        $advisordetails->adl_fk_user_id = $request->id;
        $advisordetails->adl_fk_level = $request->adl_fk_level;     
        $advisordetails->save();

        return response()->json($advisordetails);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Advisor  $advisor
     * @return \Illuminate\Http\Response
     */
    public function show(Advisor $advisor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Advisor  $advisor
     * @return \Illuminate\Http\Response
     */
    public function edit(Advisor $advisor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Advisor  $advisor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Advisor $advisor)
    {
        $sessionid=Auth::user()->id;

        $advisordetails = Advisor::where('id',$request->id)->first();
        $advisordetails->ad_fk_user_id = $sessionid;
        $advisordetails->ad_fk_company_id = $request->cmpnyPK;
        $advisordetails->ad_status = $request->ad_status;
        $advisordetails->ad_memo = $request->ad_memo;
        $advisordetails->save();

        return response()->json($advisordetails);
    }

    public function UpdateAdvisorLevel(Request $request, Advisor $advisor)
    {
        $advisordetails = lvlofadvisor::where('adl_fk_user_id',$request->id)->first();
        $advisordetails->adl_fk_user_id = $request->id;
        $advisordetails->adl_fk_level = $request->adl_fk_level;   
        $advisordetails->save();

        return response()->json($advisordetails);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Advisor  $advisor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Advisor $advisor)
    {
        //
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
