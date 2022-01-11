<?php

namespace App\Http\Controllers;

use ZipArchive;
use File;
use Response;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\HALALSijilPendaftaran;
use App\Models\HALALCartaAlir;
use App\Models\HALALJaminanHalal;
use App\Models\HALALLesenPerniagaan;
use App\Models\HALALMaklumatPekerja;
use App\Models\HALALPembungkusan;
use App\Models\HALALPengeluaranProduk;
use App\Models\HALALPenyataKewangan;
use App\Models\HALALPermitImport;
use App\Models\HALALPermohonanLesen;
use App\Models\HALALPestControl;
use App\Models\HALALPetaLokasi;
use App\Models\HALALSijilHalal;
use App\Models\HALALSusunAtur;
use App\Models\HALALSuntikanThypoid;
use App\Models\HALALSuratKKM;
use App\Models\HALALSuratLantikan;
use App\Models\HALALInvois;
use App\Models\HALALPermohonanLengkap;

use App\Models\HALALAliranPergerakan;
use App\Models\HALALDokumenMS;
use App\Models\HALALKumpulanPembuatan;
use App\Models\HALALLesenPengilang;
use App\Models\HALALLesenPergudangan;
use App\Models\HALALMaklumatKesihatan;
use App\Models\HALALNotaNotifikasiProduk;
use App\Models\HALALPengendaliMakanan;
use App\Models\HALALPengesananHalal;
use App\Models\HALALPengilanganProduk;
use App\Models\HALALPerakuanProduk;
use App\Models\HALALRekodSembelihan;
use App\Models\HALALRekodSertu;
use App\Models\HALALSuratPerakuanJPV;
use App\Models\HALALSuratTauliahPenyembelih;



class UploadHalalController extends Controller
{
/////////////////////////////////////////////////////////////////////SIJIL PENDAFTARAN/////////////////////////////////////////////////
    public function getHALALSijilPendaftaran()
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

        $Sijil= HALALSijilPendaftaran::where('hsp_fk_company_id',$cmpnyPK)->get();
        return response()->json($Sijil);
    }

    public function postHALALSijilPendaftaran(Request $request) {  

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);

        $crs=$request->id;
        if ($request->hasFile('HALALSijilPendaftaran')) {         //ni tukar
            $file      = $request->file('HALALSijilPendaftaran'); //ni tukar
            $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
        
            $dir="$ENcmpnyPK/HalalFile";
            $path = Storage::putFileAs($dir, $file, $fileName);

            $rawmaterial = new HALALSijilPendaftaran;
            $rawmaterial->hsp_fk_company_id = $cmpnyPK;
            $rawmaterial->hsp_filename = $fileName;    //ni tukar
            $rawmaterial->hsp_date = Carbon::now();    //ni tukar
            $rawmaterial->hsp_refno = $request->hsp_refno; //ni tukar
            $rawmaterial->save();
            $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

        return response()->json($objdata);
        }
    }

    public function downloadHALALSijilPendaftaran(Request $request)
    {
        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HALALSijilPendaftaran::where('id',$request->id)->value('hsp_filename'); // ni tukar
        $rawmaterial = HALALSijilPendaftaran::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
            
        return response()->download($file_path);  
    }

    public function deleteHALALSijilPendaftaran(Request $request)
    {
    

        $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
        $ENcmpnyPK=dechex($cmpnyPK);
        $filename = HALALSijilPendaftaran::where('id',$request->id)->value('hsp_filename'); //ni tukar
        $rawmaterial = HALALSijilPendaftaran::where('id',$request->id)->firstOrFail();

        $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        if(File::exists($file_path)) {
            File::delete($file_path);
            $rawmaterial->delete();
            return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
        }
        else{
            return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
        }
    }
/////////////////////////////////////////////////////////////////////SIJIL PENDAFTARAN/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////LESEN PERNIAGAAN/////////////////////////////////////////////////
public function getHALALLesenPerniagaan()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALLesenPerniagaan::where('hlp_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALLesenPerniagaan(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALLesenPerniagaan')) {         //ni tukar
        $file      = $request->file('HALALLesenPerniagaan'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALLesenPerniagaan;
        $rawmaterial->hlp_fk_company_id = $cmpnyPK;
        $rawmaterial->hlp_filename = $fileName;    //ni tukar
        $rawmaterial->hlp_date = Carbon::now();    //ni tukar
        $rawmaterial->hlp_refno = $request->hlp_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALLesenPerniagaan(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALLesenPerniagaan::where('id',$request->id)->value('hlp_filename'); // ni tukar
    $rawmaterial = HALALLesenPerniagaan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALLesenPerniagaan(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALLesenPerniagaan::where('id',$request->id)->value('hlp_filename'); //ni tukar
    $rawmaterial = HALALLesenPerniagaan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////LESEN PERNIAGAAN/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////SURAT LANTIKAN/////////////////////////////////////////////////
public function getHALALSuratLantikan()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALSuratLantikan::where('hsl_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALSuratLantikan(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALSuratLantikan')) {         //ni tukar
        $file      = $request->file('HALALSuratLantikan'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALSuratLantikan;
        $rawmaterial->hsl_fk_company_id = $cmpnyPK;
        $rawmaterial->hsl_filename = $fileName;    //ni tukar
        $rawmaterial->hsl_date = Carbon::now();    //ni tukar
        $rawmaterial->hsl_refno = $request->hsl_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALSuratLantikan(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSuratLantikan::where('id',$request->id)->value('hsl_filename'); // ni tukar
    $rawmaterial = HALALSuratLantikan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALSuratLantikan(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSuratLantikan::where('id',$request->id)->value('hsl_filename'); //ni tukar
    $rawmaterial = HALALSuratLantikan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////SURAT LANTIKAN/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////PETA LOKASI/////////////////////////////////////////////////
public function getHALALPetaLokasi()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALPetaLokasi::where('hpl_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALPetaLokasi(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALPetaLokasi')) {         //ni tukar
        $file      = $request->file('HALALPetaLokasi'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALPetaLokasi;
        $rawmaterial->hpl_fk_company_id = $cmpnyPK;
        $rawmaterial->hpl_filename = $fileName;    //ni tukar
        $rawmaterial->hpl_date = Carbon::now();    //ni tukar
        $rawmaterial->hpl_refno = $request->hpl_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALPetaLokasi(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPetaLokasi::where('id',$request->id)->value('hpl_filename'); // ni tukar
    $rawmaterial = HALALPetaLokasi::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALPetaLokasi(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPetaLokasi::where('id',$request->id)->value('hpl_filename'); //ni tukar
    $rawmaterial = HALALPetaLokasi::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////PETA LOKASI/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////SUSUN ATUR/////////////////////////////////////////////////
public function getHALALSusunAtur()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALSusunAtur::where('hsa_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALSusunAtur(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALSusunAtur')) {         //ni tukar
        $file      = $request->file('HALALSusunAtur'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALSusunAtur;
        $rawmaterial->hsa_fk_company_id = $cmpnyPK;
        $rawmaterial->hsa_filename = $fileName;    //ni tukar
        $rawmaterial->hsa_date = Carbon::now();    //ni tukar
        $rawmaterial->hsa_refno = $request->hsa_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALSusunAtur(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSusunAtur::where('id',$request->id)->value('hsa_filename'); // ni tukar
    $rawmaterial = HALALSusunAtur::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALSusunAtur(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSusunAtur::where('id',$request->id)->value('hsa_filename'); //ni tukar
    $rawmaterial = HALALSusunAtur::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////SUSUN ATUR/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////PENYATA KEWANGAN/////////////////////////////////////////////////
public function getHALALPenyataKewangan()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALPenyataKewangan::where('hpk_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALPenyataKewangan(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALPenyataKewangan')) {         //ni tukar
        $file      = $request->file('HALALPenyataKewangan'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALPenyataKewangan;
        $rawmaterial->hpk_fk_company_id = $cmpnyPK;
        $rawmaterial->hpk_filename = $fileName;    //ni tukar
        $rawmaterial->hpk_date = Carbon::now();    //ni tukar
        $rawmaterial->hpk_refno = $request->hpk_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALPenyataKewangan(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPenyataKewangan::where('id',$request->id)->value('hpk_filename'); // ni tukar
    $rawmaterial = HALALPenyataKewangan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALPenyataKewangan(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPenyataKewangan::where('id',$request->id)->value('hpk_filename'); //ni tukar
    $rawmaterial = HALALPenyataKewangan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////PENYATA KEWANGAN/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////SIJIL HALAL/////////////////////////////////////////////////
public function getHALALSijilHalal()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALSijilHalal::where('hsh_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALSijilHalal(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALSijilHalal')) {         //ni tukar
        $file      = $request->file('HALALSijilHalal'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALSijilHalal;
        $rawmaterial->hsh_fk_company_id = $cmpnyPK;
        $rawmaterial->hsh_filename = $fileName;    //ni tukar
        $rawmaterial->hsh_date = Carbon::now();    //ni tukar
        $rawmaterial->hsh_refno = $request->hsh_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALSijilHalal(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSijilHalal::where('id',$request->id)->value('hsh_filename'); // ni tukar
    $rawmaterial = HALALSijilHalal::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALSijilHalal(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSijilHalal::where('id',$request->id)->value('hsh_filename'); //ni tukar
    $rawmaterial = HALALSijilHalal::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////SIJIL HALAL/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////CARTA ALIR/////////////////////////////////////////////////
public function getHALALCartaAlir()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALCartaAlir::where('hca_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALCartaAlir(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALCartaAlir')) {         //ni tukar
        $file      = $request->file('HALALCartaAlir'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALCartaAlir;
        $rawmaterial->hca_fk_company_id = $cmpnyPK;
        $rawmaterial->hca_filename = $fileName;    //ni tukar
        $rawmaterial->hca_date = Carbon::now();    //ni tukar
        $rawmaterial->hca_refno = $request->hca_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALCartaAlir(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALCartaAlir::where('id',$request->id)->value('hca_filename'); // ni tukar
    $rawmaterial = HALALCartaAlir::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALCartaAlir(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALCartaAlir::where('id',$request->id)->value('hca_filename'); //ni tukar
    $rawmaterial = HALALCartaAlir::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////CARTA ALIR/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////PEMBUNGKUSAN/////////////////////////////////////////////////
public function getHALALPembungkusan()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALPembungkusan::where('hp_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALPembungkusan(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALPembungkusan')) {         //ni tukar
        $file      = $request->file('HALALPembungkusan'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALPembungkusan;
        $rawmaterial->hp_fk_company_id = $cmpnyPK;
        $rawmaterial->hp_filename = $fileName;    //ni tukar
        $rawmaterial->hp_date = Carbon::now();    //ni tukar
        $rawmaterial->hp_refno = $request->hp_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALPembungkusan(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPembungkusan::where('id',$request->id)->value('hp_filename'); // ni tukar
    $rawmaterial = HALALPembungkusan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALPembungkusan(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPembungkusan::where('id',$request->id)->value('hp_filename'); //ni tukar
    $rawmaterial = HALALPembungkusan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////PEMBUNGKUSAN/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////PERMOHONAN LENGKAP/////////////////////////////////////////////////
public function getHALALPermohonanLengkap()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALPermohonanLengkap::where('hpl_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALPermohonanLengkap(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALPermohonanLengkap')) {         //ni tukar
        $file      = $request->file('HALALPermohonanLengkap'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALPermohonanLengkap;
        $rawmaterial->hpl_fk_company_id = $cmpnyPK;
        $rawmaterial->hpl_filename = $fileName;    //ni tukar
        $rawmaterial->hpl_date = Carbon::now();    //ni tukar
        $rawmaterial->hpl_refno = $request->hpl_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALPermohonanLengkap(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPermohonanLengkap::where('id',$request->id)->value('hpl_filename'); // ni tukar
    $rawmaterial = HALALPermohonanLengkap::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALPermohonanLengkap(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPermohonanLengkap::where('id',$request->id)->value('hpl_filename'); //ni tukar
    $rawmaterial = HALALPermohonanLengkap::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////PERMOHONAN LENGKAP/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////JAMINAN HALAL/////////////////////////////////////////////////
public function getHALALJaminanHalal()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALJaminanHalal::where('hjh_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALJaminanHalal(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALJaminanHalal')) {         //ni tukar
        $file      = $request->file('HALALJaminanHalal'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALJaminanHalal;
        $rawmaterial->hjh_fk_company_id = $cmpnyPK;
        $rawmaterial->hjh_filename = $fileName;    //ni tukar
        $rawmaterial->hjh_date = Carbon::now();    //ni tukar
        $rawmaterial->hjh_refno = $request->hjh_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALJaminanHalal(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALJaminanHalal::where('id',$request->id)->value('hjh_filename'); // ni tukar
    $rawmaterial = HALALJaminanHalal::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALJaminanHalal(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALJaminanHalal::where('id',$request->id)->value('hjh_filename'); //ni tukar
    $rawmaterial = HALALJaminanHalal::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////JAMINAN HALAL/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////PEST CONTROL/////////////////////////////////////////////////
public function getHALALPestControl()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALPestControl::where('hpc_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALPestControl(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALPestControl')) {         //ni tukar
        $file      = $request->file('HALALPestControl'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALPestControl;
        $rawmaterial->hpc_fk_company_id = $cmpnyPK;
        $rawmaterial->hpc_filename = $fileName;    //ni tukar
        $rawmaterial->hpc_date = Carbon::now();    //ni tukar
        $rawmaterial->hpc_refno = $request->hpc_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALPestControl(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPestControl::where('id',$request->id)->value('hpc_filename'); // ni tukar
    $rawmaterial = HALALPestControl::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALPestControl(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPestControl::where('id',$request->id)->value('hpc_filename'); //ni tukar
    $rawmaterial = HALALPestControl::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////PEST CONTROL/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////MAKLUMAT PEKERJA/////////////////////////////////////////////////
public function getHALALMaklumatPekerja()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALMaklumatPekerja::where('hmp_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALMaklumatPekerja(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALMaklumatPekerja')) {         //ni tukar
        $file      = $request->file('HALALMaklumatPekerja'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALMaklumatPekerja;
        $rawmaterial->hmp_fk_company_id = $cmpnyPK;
        $rawmaterial->hmp_filename = $fileName;    //ni tukar
        $rawmaterial->hmp_date = Carbon::now();    //ni tukar
        $rawmaterial->hmp_refno = $request->hmp_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALMaklumatPekerja(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALMaklumatPekerja::where('id',$request->id)->value('hmp_filename'); // ni tukar
    $rawmaterial = HALALMaklumatPekerja::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALMaklumatPekerja(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALMaklumatPekerja::where('id',$request->id)->value('hmp_filename'); //ni tukar
    $rawmaterial = HALALMaklumatPekerja::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////MAKLUMAT PEKERJA/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////PENGELUARAN PRODUK/////////////////////////////////////////////////
public function getHALALPengeluaranProduk()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALPengeluaranProduk::where('hpp_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALPengeluaranProduk(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALPengeluaranProduk')) {         //ni tukar
        $file      = $request->file('HALALPengeluaranProduk'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALPengeluaranProduk;
        $rawmaterial->hpp_fk_company_id = $cmpnyPK;
        $rawmaterial->hpp_filename = $fileName;    //ni tukar
        $rawmaterial->hpp_date = Carbon::now();    //ni tukar
        $rawmaterial->hpp_refno = $request->hpp_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALPengeluaranProduk(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPengeluaranProduk::where('id',$request->id)->value('hpp_filename'); // ni tukar
    $rawmaterial = HALALPengeluaranProduk::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALPengeluaranProduk(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPengeluaranProduk::where('id',$request->id)->value('hpp_filename'); //ni tukar
    $rawmaterial = HALALPengeluaranProduk::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////PENGELUARAN PRODUK/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////INVOIS/////////////////////////////////////////////////
public function getHALALInvois()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALInvois::where('hi_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALInvois(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALInvois')) {         //ni tukar
        $file      = $request->file('HALALInvois'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALInvois;
        $rawmaterial->hi_fk_company_id = $cmpnyPK;
        $rawmaterial->hi_filename = $fileName;    //ni tukar
        $rawmaterial->hi_date = Carbon::now();    //ni tukar
        $rawmaterial->hi_refno = $request->hi_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALInvois(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALInvois::where('id',$request->id)->value('hi_filename'); // ni tukar
    $rawmaterial = HALALInvois::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALInvois(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALInvois::where('id',$request->id)->value('hi_filename'); //ni tukar
    $rawmaterial = HALALInvois::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////INVOIS/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////SURAT KKM/////////////////////////////////////////////////
public function getHALALSuratKKM()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALSuratKKM::where('hsk_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALSuratKKM(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALSuratKKM')) {         //ni tukar
        $file      = $request->file('HALALSuratKKM'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALSuratKKM;
        $rawmaterial->hsk_fk_company_id = $cmpnyPK;
        $rawmaterial->hsk_filename = $fileName;    //ni tukar
        $rawmaterial->hsk_date = Carbon::now();    //ni tukar
        $rawmaterial->hsk_refno = $request->hsk_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALSuratKKM(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSuratKKM::where('id',$request->id)->value('hsk_filename'); // ni tukar
    $rawmaterial = HALALSuratKKM::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALSuratKKM(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSuratKKM::where('id',$request->id)->value('hsk_filename'); //ni tukar
    $rawmaterial = HALALSuratKKM::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////SURAT KKM/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////PERMIT IMPORT/////////////////////////////////////////////////
public function getHALALPermitImport()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALPermitImport::where('hpi_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALPermitImport(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALPermitImport')) {         //ni tukar
        $file      = $request->file('HALALPermitImport'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALPermitImport;
        $rawmaterial->hpi_fk_company_id = $cmpnyPK;
        $rawmaterial->hpi_filename = $fileName;    //ni tukar
        $rawmaterial->hpi_date = Carbon::now();    //ni tukar
        $rawmaterial->hpi_refno = $request->hpi_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALPermitImport(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPermitImport::where('id',$request->id)->value('hpi_filename'); // ni tukar
    $rawmaterial = HALALPermitImport::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALPermitImport(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPermitImport::where('id',$request->id)->value('hpi_filename'); //ni tukar
    $rawmaterial = HALALPermitImport::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////PERMIT IMPORT/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////SUNTIKAN THYPOID/////////////////////////////////////////////////
public function getHALALSuntikanThypoid()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALSuntikanThypoid::where('hst_fk_company_id',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALSuntikanThypoid(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALSuntikanThypoid')) {         //ni tukar
        $file      = $request->file('HALALSuntikanThypoid'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALSuntikanThypoid;
        $rawmaterial->hst_fk_company_id = $cmpnyPK;
        $rawmaterial->hst_filename = $fileName;    //ni tukar
        $rawmaterial->hst_date = Carbon::now();    //ni tukar
        $rawmaterial->hst_refno = $request->hst_refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALSuntikanThypoid(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSuntikanThypoid::where('id',$request->id)->value('hst_filename'); // ni tukar
    $rawmaterial = HALALSuntikanThypoid::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALSuntikanThypoid(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSuntikanThypoid::where('id',$request->id)->value('hst_filename'); //ni tukar
    $rawmaterial = HALALSuntikanThypoid::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////SUNTIKAN THYPOID/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALAliranPergerakan/////////////////////////////////////////////////
public function getHALALAliranPergerakan()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALAliranPergerakan::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALAliranPergerakan(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALAliranPergerakan')) {         //ni tukar
        $file      = $request->file('HALALAliranPergerakan'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALAliranPergerakan;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALAliranPergerakan(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALAliranPergerakan::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALAliranPergerakan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALAliranPergerakan(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALAliranPergerakan::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALAliranPergerakan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALAliranPergerakan/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALDokumenMS/////////////////////////////////////////////////
public function getHALALDokumenMS()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALDokumenMS::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALDokumenMS(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALDokumenMS')) {         //ni tukar
        $file      = $request->file('HALALDokumenMS'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALDokumenMS;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALDokumenMS(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALDokumenMS::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALDokumenMS::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALDokumenMS(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALDokumenMS::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALDokumenMS::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALDokumenMS/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALKumpulanPembuatan/////////////////////////////////////////////////
public function getHALALKumpulanPembuatan()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALKumpulanPembuatan::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALKumpulanPembuatan(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALKumpulanPembuatan')) {         //ni tukar
        $file      = $request->file('HALALKumpulanPembuatan'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALKumpulanPembuatan;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALKumpulanPembuatan(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALKumpulanPembuatan::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALKumpulanPembuatan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALKumpulanPembuatan(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALKumpulanPembuatan::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALKumpulanPembuatan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALKumpulanPembuatan/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALLesenPengilang/////////////////////////////////////////////////
public function getHALALLesenPengilang()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALLesenPengilang::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALLesenPengilang(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALLesenPengilang')) {         //ni tukar
        $file      = $request->file('HALALLesenPengilang'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALLesenPengilang;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALLesenPengilang(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALLesenPengilang::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALLesenPengilang::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALLesenPengilang(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALLesenPengilang::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALLesenPengilang::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALLesenPengilang/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALLesenPergudangan/////////////////////////////////////////////////
public function getHALALLesenPergudangan()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALLesenPergudangan::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALLesenPergudangan(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALLesenPergudangan')) {         //ni tukar
        $file      = $request->file('HALALLesenPergudangan'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALLesenPergudangan;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALLesenPergudangan(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALLesenPergudangan::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALLesenPergudangan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALLesenPergudangan(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALLesenPergudangan::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALLesenPergudangan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALLesenPergudangan/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALMaklumatKesihatan/////////////////////////////////////////////////
public function getHALALMaklumatKesihatan()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALMaklumatKesihatan::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALMaklumatKesihatan(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALMaklumatKesihatan')) {         //ni tukar
        $file      = $request->file('HALALMaklumatKesihatan'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALMaklumatKesihatan;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALMaklumatKesihatan(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALMaklumatKesihatan::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALMaklumatKesihatan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALMaklumatKesihatan(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALMaklumatKesihatan::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALMaklumatKesihatan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALMaklumatKesihatan/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALNotaNotifikasiProduk/////////////////////////////////////////////////
public function getHALALNotaNotifikasiProduk()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALNotaNotifikasiProduk::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALNotaNotifikasiProduk(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALNotaNotifikasiProduk')) {         //ni tukar
        $file      = $request->file('HALALNotaNotifikasiProduk'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALNotaNotifikasiProduk;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALNotaNotifikasiProduk(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALNotaNotifikasiProduk::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALNotaNotifikasiProduk::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALNotaNotifikasiProduk(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALNotaNotifikasiProduk::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALNotaNotifikasiProduk::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALNotaNotifikasiProduk/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALPengendaliMakanan/////////////////////////////////////////////////
public function getHALALPengendaliMakanan()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALPengendaliMakanan::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALPengendaliMakanan(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALPengendaliMakanan')) {         //ni tukar
        $file      = $request->file('HALALPengendaliMakanan'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALPengendaliMakanan;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALPengendaliMakanan(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPengendaliMakanan::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALPengendaliMakanan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALPengendaliMakanan(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPengendaliMakanan::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALPengendaliMakanan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALPengendaliMakanan/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALPengesananHalal/////////////////////////////////////////////////
public function getHALALPengesananHalal()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALPengesananHalal::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALPengesananHalal(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALPengesananHalal')) {         //ni tukar
        $file      = $request->file('HALALPengesananHalal'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALPengesananHalal;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALPengesananHalal(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPengesananHalal::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALPengesananHalal::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALPengesananHalal(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPengesananHalal::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALPengesananHalal::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALPengesananHalal/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALPengilanganProduk/////////////////////////////////////////////////
public function getHALALPengilanganProduk()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALPengilanganProduk::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALPengilanganProduk(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALPengilanganProduk')) {         //ni tukar
        $file      = $request->file('HALALPengilanganProduk'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALPengilanganProduk;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALPengilanganProduk(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPengilanganProduk::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALPengilanganProduk::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALPengilanganProduk(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPengilanganProduk::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALPengilanganProduk::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALPengilanganProduk/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALPerakuanProduk/////////////////////////////////////////////////
public function getHALALPerakuanProduk()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALPerakuanProduk::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALPerakuanProduk(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALPerakuanProduk')) {         //ni tukar
        $file      = $request->file('HALALPerakuanProduk'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALPerakuanProduk;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALPerakuanProduk(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPerakuanProduk::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALPerakuanProduk::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALPerakuanProduk(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALPerakuanProduk::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALPerakuanProduk::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALPerakuanProduk/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALRekodSembelihan/////////////////////////////////////////////////
public function getHALALRekodSembelihan()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALRekodSembelihan::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALRekodSembelihan(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALRekodSembelihan')) {         //ni tukar
        $file      = $request->file('HALALRekodSembelihan'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALRekodSembelihan;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALRekodSembelihan(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALRekodSembelihan::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALRekodSembelihan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALRekodSembelihan(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALRekodSembelihan::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALRekodSembelihan::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALRekodSembelihan/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALRekodSertu/////////////////////////////////////////////////
public function getHALALRekodSertu()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALRekodSertu::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALRekodSertu(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALRekodSertu')) {         //ni tukar
        $file      = $request->file('HALALRekodSertu'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALRekodSertu;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALRekodSertu(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALRekodSertu::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALRekodSertu::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALRekodSertu(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALRekodSertu::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALRekodSertu::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALRekodSertu/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALSuratPerakuanJPV////////////////////////////////////////////////
public function getHALALSuratPerakuanJPV()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALSuratPerakuanJPV::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALSuratPerakuanJPV(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALSuratPerakuanJPV')) {         //ni tukar
        $file      = $request->file('HALALSuratPerakuanJPV'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALSuratPerakuanJPV;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALSuratPerakuanJPV(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSuratPerakuanJPV::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALSuratPerakuanJPV::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALSuratPerakuanJPV(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSuratPerakuanJPV::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALSuratPerakuanJPV::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALSuratPerakuanJPV/////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////HALALSuratTauliahPenyembelih/////////////////////////////////////////////////
public function getHALALSuratTauliahPenyembelih()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;

    $Sijil= HALALSuratTauliahPenyembelih::where('cmpnyFK',$cmpnyPK)->get();
    return response()->json($Sijil);
}

public function postHALALSuratTauliahPenyembelih(Request $request) {  

    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);

    $crs=$request->id;
    if ($request->hasFile('HALALSuratTauliahPenyembelih')) {         //ni tukar
        $file      = $request->file('HALALSuratTauliahPenyembelih'); //ni tukar
        $fileName   = pathinfo($file->getClientOriginalName())['filename'].'_'.uniqid() . '.' . $file->getClientOriginalExtension();
    
        $dir="$ENcmpnyPK/HalalFile";
        $path = Storage::putFileAs($dir, $file, $fileName);

        $rawmaterial = new HALALSuratTauliahPenyembelih;
        $rawmaterial->cmpnyFK = $cmpnyPK;
        $rawmaterial->filename = $fileName;    //ni tukar
        $rawmaterial->date = Carbon::now();    //ni tukar
        $rawmaterial->refno = $request->refno; //ni tukar
        $rawmaterial->save();
        $objdata = (object)['name'=>$request->name,'fileDir'=>$path,'rawmaterial'=>$rawmaterial];

    return response()->json($objdata);
    }
}

public function downloadHALALSuratTauliahPenyembelih(Request $request)
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSuratTauliahPenyembelih::where('id',$request->id)->value('filename'); // ni tukar
    $rawmaterial = HALALSuratTauliahPenyembelih::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
        
    return response()->download($file_path);  
}

public function deleteHALALSuratTauliahPenyembelih(Request $request)
{


    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $filename = HALALSuratTauliahPenyembelih::where('id',$request->id)->value('filename'); //ni tukar
    $rawmaterial = HALALSuratTauliahPenyembelih::where('id',$request->id)->firstOrFail();

    $file_path = storage_path("app/$ENcmpnyPK/HalalFile/$filename");
    if(File::exists($file_path)) {
        File::delete($file_path);
        $rawmaterial->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete",'file_path'=>$file_path]);
    }
    else{
        return response()->json(['isSuccess' =>false ,'file_path'=>$file_path]);
    }
}
/////////////////////////////////////////////////////////////////////HALALSuratTauliahPenyembelih/////////////////////////////////////////////////

public function zipFolderHalal()
{
    $cmpnyPK=Auth::user()->getCompany()->cmpnyPK;
    $ENcmpnyPK=dechex($cmpnyPK);
    $cmpnyName=Auth::user()->getCompany()->cmpnyName;

    $zip = new ZipArchive;
    $fileName = storage_path('app/cache/HalalFile_'.$cmpnyName.'.zip');
    $file = ('HalalFile/').$cmpnyPK;
    if($zip->open($fileName,ZipArchive::CREATE) === TRUE)
    {
        $files = File::files(storage_path('app/'.$ENcmpnyPK.'/HalalFile/'));
        foreach($files as $key => $value){
            $relativeNameinZipFile = basename($value);
            $zip->addFile($value, $relativeNameinZipFile);
        }
        $zip->close();
    }
    return response()->download($fileName)->deleteFileAfterSend(true);
}

}
