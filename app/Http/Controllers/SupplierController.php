<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\supplier;
use App\Models\RawMaterial;
use App\Models\SupplierCert;
use App\Models\CertBodies;
use App\Models\RawMatSuppDoc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use DB;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * 
     */
    public function index()
    {
        // $id = $request->sprm_fk_supplier_id;

        $supplier= supplier::select('*')->orderBy('sp_name','asc')->get();
        $User= User::select('*')->get();

        $returnObj = (object)['isSuccess' =>false,'supplier'=>$supplier,'User'=>$User];

        return response()->json($supplier); 
    }

    public function getSupplierCert() // ini utk dropdown pilih senarai cb
    {
        $SupplierCert= SupplierCert::orderBy('spcb_cert_bodies','asc')->get();
        return response()->json($SupplierCert);
    }

    public function getCertExp() 
    {
        
        $SupplierCert= DB::table('tbl_spcb_supplier_has_cert_bodies')
        ->Leftjoin('tbl_sp_supplier', 'tbl_spcb_supplier_has_cert_bodies.spcb_fk_supplier_id', '=', 'tbl_sp_supplier.id')//join table cert bodies
        ->select('tbl_sp_supplier.sp_name','spcb_fk_supplier_id','spcb_cert_bodies','spcb_date_cert',DB::raw("DATEDIFF(spcb_date_cert,now()) as days_left"))
        ->orderBy('spcb_cert_bodies','desc')
        ->where([
            ['spcb_date_cert', '>', Carbon::now()],
            ['spcb_date_cert', '<', Carbon::now()->addMonth(6)],
        ])
        ->get();
        return response()->json($SupplierCert); 
    }

    public function getSupportDoc()
    {
        $supportdoc= RawMatSuppDoc::get();
        return response()->json($supportdoc); 
    }

    public function getRawMat() // ini untuk dropdown bagi pilih raw material dalam produk
    {
        $rawmaterial= DB::table('tbl_sprm_supplier_has_raw_mat')
        ->Leftjoin('tbl_sp_supplier', 'tbl_sprm_supplier_has_raw_mat.sprm_fk_supplier_id', '=', 'tbl_sp_supplier.id')//join table cert bodies
        ->select('tbl_sprm_supplier_has_raw_mat.id',DB::raw('CONCAT("(",tbl_sp_supplier.sp_name,") - ",tbl_sprm_supplier_has_raw_mat.sprm_name) AS supplierwithrawmat'))
        ->where('tbl_sp_supplier.sp_status','=','0')
        ->get();
        return response()->json($rawmaterial);
    }

    public function getCertBodies()
    {
        $CertBodies= CertBodies::orderBy('cb_name','asc')->where('cb_status','=','0')->get();
        return response()->json($CertBodies);
    }

    function getSupplierData($id){ //ini display data yang dalam supplier details

        $id = $id;
        $rawmaterial= DB::table('tbl_sprm_supplier_has_raw_mat')
        ->Leftjoin('tbl_spcb_supplier_has_cert_bodies', 'tbl_sprm_supplier_has_raw_mat.sprm_fk_id_halal_cert', '=', 'tbl_spcb_supplier_has_cert_bodies.id')//join table cert bodies
        ->select('tbl_sprm_supplier_has_raw_mat.id','tbl_sprm_supplier_has_raw_mat.sprm_fk_supplier_id','tbl_sprm_supplier_has_raw_mat.sprm_name','tbl_sprm_supplier_has_raw_mat.sprm_scientific_name','tbl_sprm_supplier_has_raw_mat.sprm_material_source','tbl_spcb_supplier_has_cert_bodies.spcb_cert_bodies','tbl_sprm_supplier_has_raw_mat.sprm_fk_id_halal_cert_2')
        ->where('tbl_sprm_supplier_has_raw_mat.sprm_fk_supplier_id',$id)
        ->get();
        if(Storage::exists('\support_doc\raw_mat\a')){
            $contents = Storage::get($id.'\data\advsrprofile');
            $returnObj->advisorprofile=$this->unencodeMaster($contents);
        }
        $suppliercert= SupplierCert::select('id','spcb_fk_supplier_id','spcb_cert_bodies', 'spcb_date_cert')->where('spcb_fk_supplier_id',$id)->orderBy('spcb_cert_bodies','asc')->get();
        $returnObj = (object)['isSuccess' =>false,'rawmaterial'=>$rawmaterial,'suppliercert'=>$suppliercert];

        return response()->json($returnObj);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $supplier = new supplier;
        $supplier->sp_name =$request->sp_name;
        $supplier->sp_address =$request->sp_address;
        $supplier->sp_origin_country =$request->sp_origin_country;
        $supplier->sp_status =0;
        $supplier->save();

        return response()->json($supplier);
    }

    public function createSupplierCert(Request $request)
    {
        $suppliercert = new SupplierCert;
        $suppliercert->spcb_fk_supplier_id = $request->spcb_fk_supplier_id;
        $suppliercert->spcb_cert_bodies = $request->spcb_cert_bodies;
        $suppliercert->spcb_date_cert = $request->spcb_date_cert;
        $suppliercert->save();

        return response()->json($suppliercert);
    }

    public function createRawMat(Request $request)
    {  
        $rawmaterial = new RawMaterial;
        $rawmaterial->sprm_fk_supplier_id = $request->sprm_fk_supplier_id;
        $rawmaterial->sprm_name = $request->sprm_name;
        $rawmaterial->sprm_scientific_name = $request->sprm_scientific_name;
        $rawmaterial->sprm_material_source = $request->sprm_material_source;
        $rawmaterial->sprm_fk_id_halal_cert = $request->sprm_fk_id_halal_cert;
        $rawmaterial->sprm_fk_id_halal_cert_2 = $request->sprm_fk_id_halal_cert_2;
        $rawmaterial->save();
        return response()->json($rawmaterial);
    }

    public function createSupportDoc(Request $request)
    {  
        $crs=$request->id;
        if ($request->hasFile('rmsd_name')) {
            $file      = $request->file('rmsd_name');
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();

        
            $dir="support_doc/$crs/raw_mat/$request->sprm_fk_supplier_id/$request->id";
            $path = Storage::disk('public_uploads')->putFileAs($dir, $file, $fileName);

            $suppdoc = new RawMatSuppDoc;
            $suppdoc->fk_rmsd_raw_mat_id = $request->sprm_fk_supplier_id;
            $suppdoc->rmsd_name = $fileName;
            $suppdoc->save();
            $objdata = (object)['fileDir'=>$path,'suppdoc'=>$suppdoc];

        return response()->json($objdata);
        }
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
     * @param  \App\Models\supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function show(supplier $supplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function edit(supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, supplier $supplier)
    {
        $supplier = supplier::where('id',$request->id)->first();
        $supplier->sp_name =$request->sp_name;
        $supplier->sp_address =$request->sp_address;
        $supplier->sp_origin_country =$request->sp_origin_country;
        $supplier->sp_status =$request->sp_status;
        $supplier->save();

        return response()->json($supplier);
    }

    public function updateStatusSupplier(Request $request, supplier $supplier)
    {
        $supplier = supplier::where('id',$request->id)->first();
        $supplier->sp_status =$request->sp_status;
        $supplier->save();

        return response()->json($supplier);
    }

    public function updateSupplierCert(Request $request, SupplierCert $suppliercert)
    {
        $suppliercert = SupplierCert::where('id',$request->id)->first();
        $suppliercert->spcb_fk_supplier_id = $request->spcb_fk_supplier_id;
        $suppliercert->spcb_cert_bodies = $request->spcb_cert_bodies;
        $suppliercert->spcb_date_cert = $request->spcb_date_cert;
        $suppliercert->save();

        return response()->json($suppliercert);
    }

    public function updateRawMat(Request $request, RawMaterial $rawmaterial)
    {
        $rawmaterial = RawMaterial::where('id',$request->id)->first();
        $rawmaterial->sprm_fk_supplier_id = $request->sprm_fk_supplier_id;
        $rawmaterial->sprm_name = $request->sprm_name;
        $rawmaterial->sprm_scientific_name = $request->sprm_scientific_name;
        $rawmaterial->sprm_material_source = $request->sprm_material_source;
        $rawmaterial->sprm_fk_id_halal_cert = $request->sprm_fk_id_halal_cert;
        $rawmaterial->sprm_fk_id_halal_cert_2 = $request->sprm_fk_id_halal_cert_2;
        $rawmaterial->save();

        return response()->json($rawmaterial);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $supplier = supplier::where('id',$request->pk)->firstOrFail();
        $supplier->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete"]);
    }

    public function deleteSupplierCert(Request $request){
        $suppliercert = SupplierCert::where('id',$request->id)->first();
        $suppliercert->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete"]);
    }

    public function deleteRawMat(Request $request){
        $rawmaterial = RawMaterial::where('id',$request->id)->first();
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete"]);
    }

    public function deleteSupportDoc(Request $request){
        $supportdoc = RawMatSuppDoc::where('rmsd_name',$request->pk)->first();
        $supportdoc->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete"]);
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
