<?php

namespace App\Http\Controllers;

use App\Models\UploadHAS;
use App\Models\HASChecklist;
use App\Models\HASLabAnalysis;
use App\Models\HASRawMat;
use App\Models\HASSertu;
use App\Models\HASSOPProductRecall;
use App\Models\HASSOPRawMat;
use App\Models\HASSOPSertu;
use App\Models\HASSOPTraceability;
use App\Models\HASTraceability;
use App\Models\HAShalalpolicy;
use App\Models\HASorgchart;
use App\Models\HAStor;
use App\Models\HASempletter;
use App\Models\HASaudit;
use App\Models\HAShalalrisk;
use App\Models\HAStraining;
use App\Models\HASSOP;
use App\Models\HASProductHalalCert;
use App\Models\HASOthers;
use ZipArchive;
use File;
use Response;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UploadHASController extends Controller
{
    public function index()
    {
        //
    }
///////////////////////////////////////////////////////GET SECTION/////////////////////////////////////////////////////////////////////
    public function indexHASChecklist()
    {
        $companyID=Auth::user()->getCompany()->cmpnyPK;

        $HASChecklist= HASChecklist::where('hc_fk_company_id',$companyID)->get();
        return response()->json($HASChecklist);
    }

    public function indexHASLabAnalysis()
    {
        $companyID=Auth::user()->getCompany()->cmpnyPK;

        $HASLabAnalysis= HASLabAnalysis::where('hla_fk_company_id',$companyID)->get();
        return response()->json($HASLabAnalysis);
    }

    public function indexHASRawMat()
    {
        $companyID=Auth::user()->getCompany()->cmpnyPK;

        $HASRawMat= HASRawMat::where('hrm_fk_company_id',$companyID)->get();
        return response()->json($HASRawMat);
    }

    public function indexHASSertu()
    {
        $companyID=Auth::user()->getCompany()->cmpnyPK;

        $HASSertu= HASSertu::where('hs_fk_company_id',$companyID)->get();
        return response()->json($HASSertu);
    }

    public function indexHASSOPProductRecall()
    {
        $companyID=Auth::user()->getCompany()->cmpnyPK;

        $HASSOPProductRecall= HASSOPProductRecall::where('hpr_fk_company_id',$companyID)->get();
        return response()->json($HASSOPProductRecall);
    }

    public function indexHASSOPRawMat()
    {
        $companyID=Auth::user()->getCompany()->cmpnyPK;

        $HASSOPRawMat= HASSOPRawMat::where('hsrm_fk_company_id',$companyID)->get();
        return response()->json($HASSOPRawMat);
    }

    public function indexHASSOPSertu()
    {
        $companyID=Auth::user()->getCompany()->cmpnyPK;

        $HASSOPSertu= HASSOPSertu::where('hss_fk_company_id',$companyID)->get();
        return response()->json($HASSOPSertu);
    }

    public function indexHASSOPTraceability()
    {
        $companyID=Auth::user()->getCompany()->cmpnyPK;

        $HASSOPTraceability= HASSOPTraceability::where('hst_fk_company_id',$companyID)->get();
        return response()->json($HASSOPTraceability);
    }

    public function indexHASTraceability()
    {
        $companyID=Auth::user()->getCompany()->cmpnyPK;

        $HASTraceability= HASTraceability::where('ht_fk_company_id',$companyID)->get();
        return response()->json($HASTraceability);
    }

    public function getHAShalalpolicy()
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

        $HAShalalpolicy= HAShalalpolicy::where('cmpnyFK',$cmpnyPK)->get();
        return response()->json($HAShalalpolicy);
    }

    public function getHASorgchart()
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

        $HASorgchart= HASorgchart::where('cmpnyFK',$cmpnyPK)->get();
        return response()->json($HASorgchart);
    }

    public function getHAStor()
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

        $HAStor= HAStor::where('cmpnyFK',$cmpnyPK)->get();
        return response()->json($HAStor);
    }

    public function getHASempletter()
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

        $HASempletter= HASempletter::where('cmpnyFK',$cmpnyPK)->get();
        return response()->json($HASempletter);
    }

    public function getHASaudit()
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

        $HASaudit= HASaudit::where('cmpnyFK',$cmpnyPK)->get();
        return response()->json($HASaudit);
    }

    public function getHAShalalrisk()
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

        $HAShalalrisk= HAShalalrisk::where('cmpnyFK',$cmpnyPK)->get();
        return response()->json($HAShalalrisk);
    }

    public function getHAStraining()
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

        $HAStraining= HAStraining::where('cmpnyFK',$cmpnyPK)->get();
        return response()->json($HAStraining);
    }

    public function getHASSOP()
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

        $HAStraining= HASSOP::where('cmpnyFK',$cmpnyPK)->get();
        return response()->json($HAStraining);
    }

    public function getHASPRoductHalalCert()
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

        $HAStraining= HASProductHalalCert::where('cmpnyFK',$cmpnyPK)->get();
        return response()->json($HAStraining);
    }

    public function getHASOthers()
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

        $HAStraining= HASOthers::where('cmpnyFK',$cmpnyPK)->get();
        return response()->json($HAStraining);
    }
///////////////////////////////////////////////////////GET SECTION/////////////////////////////////////////////////////////////////////
    

///////////////////////////////////////////////////////UPLOAD SECTION/////////////////////////////////////////////////////////////////////
    public function createHASChecklist(Request $request) //upload HAS RAW MAT
    {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        
        $crs=$request->id;
        if ($request->hasFile('HASChecklist')) {
            $file      = $request->file('HASChecklist');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();

        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HASChecklist;
            $rawmaterial->hc_fk_company_id = $cmpnyPK;
            $rawmaterial->hc_file_name = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function createHASLabAnalysis(Request $request) //upload HAS RAW MAT
    {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        
        $crs=$request->id;
        if ($request->hasFile('HASLabAnalysis')) {
            $file      = $request->file('HASLabAnalysis');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();

        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HASLabAnalysis;
            $rawmaterial->hla_fk_company_id = $cmpnyPK;
            $rawmaterial->hla_file_name = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function createHASRawMat(Request $request) //upload HAS RAW MAT
    {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        
        $crs=$request->id;
        if ($request->hasFile('HASRawMat')) {
            $file      = $request->file('HASRawMat');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();

        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HASRawMat;
            $rawmaterial->hrm_fk_company_id = $cmpnyPK;
            $rawmaterial->hrm_file_name = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function createHASSertu(Request $request) //upload HAS RAW MAT
    {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        
        $crs=$request->id;
        if ($request->hasFile('HASSertu')) {
            $file      = $request->file('HASSertu');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();

        
            $dir="$ENcmpnyPK/HASFILE";      
            
            $path = Storage::putFileAs($dir, $file, $fileName);
            $rawmaterial = new HASSertu;
            $rawmaterial->hs_fk_company_id = $cmpnyPK;
            $rawmaterial->hs_file_name = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function createHASSOPProductRecall(Request $request) //upload HAS RAW MAT
    {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        
        $crs=$request->id;
        if ($request->hasFile('HASSOPProductRecall')) {
            $file      = $request->file('HASSOPProductRecall');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();

        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HASSOPProductRecall;
            $rawmaterial->hpr_fk_company_id = $cmpnyPK;
            $rawmaterial->hpr_file_name = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function createHASSOPRawMat(Request $request) //upload HAS RAW MAT
    {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        
        $crs=$request->id;
        if ($request->hasFile('HASSOPRawMat')) {
            $file      = $request->file('HASSOPRawMat');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();

        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HASSOPRawMat;
            $rawmaterial->hsrm_fk_company_id = $cmpnyPK;
            $rawmaterial->hsrm_file_name = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function createHASSOPSertu(Request $request) //upload HAS RAW MAT
    {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        
        $crs=$request->id;
        if ($request->hasFile('HASSOPSertu')) {
            $file      = $request->file('HASSOPSertu');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();

        
            $dir="$ENcmpnyPK/HASFILE";            
            $path = Storage::putFileAs($dir, $file, $fileName);
            $rawmaterial = new HASSOPSertu;
            $rawmaterial->hss_fk_company_id = $cmpnyPK;
            $rawmaterial->hss_file_name = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function createHASSOPTraceability(Request $request) //upload HAS RAW MAT
    {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        
        $crs=$request->id;
        if ($request->hasFile('HASSOPTraceability')) {
            $file      = $request->file('HASSOPTraceability');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();

        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HASSOPTraceability;
            $rawmaterial->hst_fk_company_id = $cmpnyPK;
            $rawmaterial->hst_file_name = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function createHASTraceability(Request $request) //upload HAS RAW MAT
    {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        
        $crs=$request->id;
        if ($request->hasFile('HASTraceability')) {
            $file      = $request->file('HASTraceability');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();

        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HASTraceability;
            $rawmaterial->ht_fk_company_id = $cmpnyPK;
            $rawmaterial->ht_file_name = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function postHAShalalpolicy(Request $request) {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);

        $crs=$request->id;
        if ($request->hasFile('HAShalalpolicy')) {
            $file      = $request->file('HAShalalpolicy');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();

            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HAShalalpolicy;
            $rawmaterial->cmpnyFK = $cmpnyPK;
            $rawmaterial->halalpolicy_filename = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function postHASorgchart(Request $request) {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);

        $crs=$request->id;
        if ($request->hasFile('HASorgchart')) {
            $file      = $request->file('HASorgchart');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();

            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HASorgchart;
            $rawmaterial->cmpnyFK = $cmpnyPK;
            $rawmaterial->orgchart_filename = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function postHAStor(Request $request) {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);

        $ENcmpnyPK=dechex($cmpnyPK);
        $crs=$request->id;
        if ($request->hasFile('HAStor')) {
            $file      = $request->file('HAStor');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HAStor;
            $rawmaterial->cmpnyFK = $cmpnyPK;
            $rawmaterial->tor_filename = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function postHASempletter(Request $request) {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);

        $crs=$request->id;
        if ($request->hasFile('HASempletter')) {
            $file      = $request->file('HASempletter');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HASempletter;
            $rawmaterial->cmpnyFK = $cmpnyPK;
            $rawmaterial->empletter_filename = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function postHASaudit(Request $request) {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);

        $crs=$request->id;
        if ($request->hasFile('HASaudit')) {
            $file      = $request->file('HASaudit');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HASaudit;
            $rawmaterial->cmpnyFK = $cmpnyPK;
            $rawmaterial->audit_filename = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function postHAShalalrisk(Request $request) {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);

        $crs=$request->id;
        if ($request->hasFile('HAShalalrisk')) {
            $file      = $request->file('HAShalalrisk');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HAShalalrisk;
            $rawmaterial->cmpnyFK = $cmpnyPK;
            $rawmaterial->halalrisk_filename = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function postHAStraining(Request $request) {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);

        $crs=$request->id;
        if ($request->hasFile('HAStraining')) {
            $file      = $request->file('HAStraining');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HAStraining;
            $rawmaterial->cmpnyFK = $cmpnyPK;
            $rawmaterial->training_filename = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function postHASSOP(Request $request) {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);

        $crs=$request->id;
        if ($request->hasFile('HASSOP')) {
            $file      = $request->file('HASSOP');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HASSOP;
            $rawmaterial->cmpnyFK = $cmpnyPK;
            $rawmaterial->filename = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function postHASProductHalalCert(Request $request) {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);

        $crs=$request->id;
        if ($request->hasFile('HASProductHalalCert')) {
            $file      = $request->file('HASProductHalalCert');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HASProductHalalCert;
            $rawmaterial->cmpnyFK = $cmpnyPK;
            $rawmaterial->filename = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function postHASOthers(Request $request) {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);

        $crs=$request->id;
        if ($request->hasFile('HASOthers')) {
            $file      = $request->file('HASOthers');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
        
            $dir="$ENcmpnyPK/HASFILE";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HASOthers;
            $rawmaterial->cmpnyFK = $cmpnyPK;
            $rawmaterial->filename = $fileName;
            $rawmaterial->date = Carbon::now();
            $rawmaterial->refno = $request->refno;
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }
///////////////////////////////////////////////////////UPLOAD SECTION/////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////DOWNLOAD SECTION/////////////////////////////////////////////////////////////////////
    public function downloadHASRawMat(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASRawMat::where('id',$request->id)->value('hrm_file_name');
        $rawmaterial = HASRawMat::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASSOPRawMat(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASSOPRawMat::where('id',$request->id)->value('hsrm_file_name');
        $rawmaterial = HASSOPRawMat::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASTraceability(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASTraceability::where('id',$request->id)->value('ht_file_name');
        $rawmaterial = HASTraceability::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASSOPTraceability(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASSOPTraceability::where('id',$request->id)->value('hst_file_name');
        $rawmaterial = HASSOPTraceability::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASSOPProductRecall(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASSOPProductRecall::where('id',$request->id)->value('hpr_file_name');
        $rawmaterial = HASSOPProductRecall::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASChecklist(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASChecklist::where('id',$request->id)->value('hc_file_name');
        $rawmaterial = HASChecklist::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASLabAnalysis(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASLabAnalysis::where('id',$request->id)->value('hla_file_name');
        $rawmaterial = HASLabAnalysis::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASSertu(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASSertu::where('id',$request->id)->value('hs_file_name');
        $rawmaterial = HASSertu::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASSOPSertu(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASSOPSertu::where('id',$request->id)->value('hss_file_name');
        $rawmaterial = HASSOPSertu::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASHalalpolicy(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HAShalalpolicy::where('id',$request->id)->value('halalpolicy_filename');
        $rawmaterial = HAShalalpolicy::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASOrgchart(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASorgchart::where('id',$request->id)->value('orgchart_filename');
        $rawmaterial = HASorgchart::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASTor(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HAStor::where('id',$request->id)->value('tor_filename');
        $rawmaterial = HAStor::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASEmpletter(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASempletter::where('id',$request->id)->value('empletter_filename');
        $rawmaterial = HASempletter::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASAudit(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASaudit::where('id',$request->id)->value('audit_filename');
        $rawmaterial = HASaudit::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASHalalrisk(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HAShalalrisk::where('id',$request->id)->value('halalrisk_filename');
        $rawmaterial = HAShalalrisk::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASTraining(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HAStraining::where('id',$request->id)->value('training_filename');
        $rawmaterial = HAStraining::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASSOP(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASSOP::where('id',$request->id)->value('filename');
        $rawmaterial = HASSOP::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASProductHalalCert(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASProductHalalCert::where('id',$request->id)->value('filename');
        $rawmaterial = HASProductHalalCert::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function downloadHASOthers(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASOthers::where('id',$request->id)->value('filename');
        $rawmaterial = HASOthers::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
            
        return response()->download($file_path);  
    }

    public function zipFolder()
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $cmpnyName=Auth::user()->getCompany()->cmpnyName;

        $zip = new ZipArchive;
        $fileName = storage_path('app/cache/HASFile_'.$cmpnyName.'.zip');
        $file = ('HASFILE/').$cmpnyPK;
        if($zip->open($fileName,ZipArchive::CREATE) === TRUE)
        {
            $files = File::files(storage_path('app/'.$ENcmpnyPK.'/HASFILE/'));
            foreach($files as $key => $value){
                $relativeNameinZipFile = basename($value);
                $zip->addFile($value, $relativeNameinZipFile);
            }
            $zip->close();
        }
        return response()->download($fileName)->deleteFileAfterSend(true);
    }
///////////////////////////////////////////////////////DOWNLOAD SECTION/////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////DELETE SECTION/////////////////////////////////////////////////////////////////////
    public function deleteHASChecklist(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASChecklist::where('id',$request->id)->value('hc_file_name');
        $rawmaterial = HASChecklist::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
        
    }

    public function deleteHASLabAnalysis(Request $request)
    {
    

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASLabAnalysis::where('id',$request->id)->value('hla_file_name');
        $rawmaterial = HASLabAnalysis::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }

    public function deleteHASRawMat(Request $request)
    {


        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASRawMat::where('id',$request->id)->value('hr_file_name');
        $rawmaterial = HASRawMat::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }

    public function deleteHASSertu(Request $request)
    {

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASSertu::where('id',$request->id)->value('hs_file_name');
        $rawmaterial = HASSertu::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }

    public function deleteHASSOPProductRecall(Request $request)
    {
        

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASSOPProductRecall::where('id',$request->id)->value('hspr_file_name');
        $rawmaterial = HASSOPProductRecall::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }

    public function deleteHASSOPRawMat(Request $request)
    {
    

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASSOPRawMat::where('id',$request->id)->value('hsrm_file_name');
        $rawmaterial = HASSOPRawMat::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }

    public function deleteHASSOPSertu(Request $request)
    {
        

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASSOPSertu::where('id',$request->id)->value('hss_file_name');
        $rawmaterial = HASSOPSertu::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }

    public function deleteHASSOPTraceability(Request $request)
    {

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASSOPTraceability::where('id',$request->id)->value('hst_file_name');
        $rawmaterial = HASSOPTraceability::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }

    public function deleteHASTraceability(Request $request)
    {

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASTraceability::where('id',$request->id)->value('ht_file_name');
        $rawmaterial = HASTraceability::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }

    public function deleteHAShalalpolicy(Request $request)
    {

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HAShalalpolicy::where('id',$request->id)->value('halalpolicy_filename');
        $rawmaterial = HAShalalpolicy::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }

    public function deleteHASorgchart(Request $request)
    {
        
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASorgchart::where('id',$request->id)->value('orgchart_filename');
        $rawmaterial = HASorgchart::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }
    public function deleteHAStor(Request $request)
    {

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HAStor::where('id',$request->id)->value('tor_filename');
        $rawmaterial = HAStor::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }
    public function deleteHASempletter(Request $request)
    {

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASempletter::where('id',$request->id)->value('empletter_filename');
        $rawmaterial = HASempletter::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }
    public function deleteHASaudit(Request $request)
    {

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASaudit::where('id',$request->id)->value('audit_filename');
        $rawmaterial = HASaudit::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }
    public function deleteHAShalalrisk(Request $request)
    {

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HAShalalrisk::where('id',$request->id)->value('halalrisk_filename');
        $rawmaterial = HAShalalrisk::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }
    public function deleteHAStraining(Request $request)
    {
        
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HAStraining::where('id',$request->id)->value('training_filename');
        $rawmaterial = HAStraining::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }
    public function deleteHASSOP(Request $request)
    {
        
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASSOP::where('id',$request->id)->value('filename');
        $rawmaterial = HASSOP::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }
    public function deleteHASProductHalalCert(Request $request)
    {
        
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASProductHalalCert::where('id',$request->id)->value('filename');
        $rawmaterial = HASProductHalalCert::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }
    public function deleteHASOthers(Request $request)
    {
        
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HASOthers::where('id',$request->id)->value('filename');
        $rawmaterial = HASOthers::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HASFILE/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }
///////////////////////////////////////////////////////DELETE SECTION/////////////////////////////////////////////////////////////////////

}
