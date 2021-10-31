<?php

namespace App\Http\Controllers;

use DB;
use Response;
use  App\Models\company;
use  App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\product;
use App\Models\supplier;
use App\Models\RawMaterial;
use App\Models\productdetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sessionid=Auth::user()->getCompany()->cmpnyPK;

        $product= product::where('prsp_fk_company_id',$sessionid)->get();       
        foreach ($product as $p){

        }

        return response()->json($product);

        // return response()->json([$product]);        
    }

    function getProductDetails($id){ //ini display table kat dalam produk

        $id = $id;
       // $productdetail= productdetail::get();
       $productdetail = DB::table('tbl_prsp_product_has_supplier')
            ->join('tbl_sprm_supplier_has_raw_mat', 'tbl_prsp_product_has_supplier.prsp_fk_rawmat_id', '=', 'tbl_sprm_supplier_has_raw_mat.id')
            ->Leftjoin('tbl_sp_supplier', 'tbl_sprm_supplier_has_raw_mat.sprm_fk_supplier_id', '=', 'tbl_sp_supplier.id')
            ->select('tbl_prsp_product_has_supplier.id','tbl_sp_supplier.sp_name','tbl_sp_supplier.sp_address','tbl_sprm_supplier_has_raw_mat.sprm_name','tbl_sprm_supplier_has_raw_mat.sprm_scientific_name', 'tbl_sprm_supplier_has_raw_mat.sprm_material_source')
            ->where('prsp_fk_product_id',$id)
            ->get();  
    //$productdetail= productdetail::select('*')->where('prsp_fk_product_id',$id)->get();
        $returnObj = (object)['isSuccess' =>false,'productdetail'=>$productdetail];

        return response()->json($returnObj);
    }

    public function getProductDetailsHFP(){ //for halal file print

        $sessionid=Auth::user()->getCompany()->cmpnyPK;

        $productdetail = DB::table('tbl_prsp_product_has_supplier')
            // ->join('tbl_sp_supplier', 'tbl_prsp_product_has_supplier.prsp_fk_supplier_id', '=', 'tbl_sp_supplier.id')//join table supplier
            ->join('tbl_sprm_supplier_has_raw_mat', 'tbl_prsp_product_has_supplier.prsp_fk_rawmat_id', '=', 'tbl_sprm_supplier_has_raw_mat.id')//join table raw mat
            ->Leftjoin('tbl_sp_supplier', 'tbl_sprm_supplier_has_raw_mat.sprm_fk_supplier_id', '=', 'tbl_sp_supplier.id')
            ->join('tbl_pr_product', 'tbl_prsp_product_has_supplier.prsp_fk_product_id', '=', 'tbl_pr_product.id')//join table product
            ->Leftjoin('tbl_spcb_supplier_has_cert_bodies', 'tbl_sprm_supplier_has_raw_mat.sprm_fk_id_halal_cert', '=', 'tbl_spcb_supplier_has_cert_bodies.id')//join table cert bodies
            ->select('tbl_pr_product.prsp_fk_company_id','tbl_sp_supplier.sp_name','tbl_sp_supplier.sp_address','tbl_sprm_supplier_has_raw_mat.sprm_name','tbl_sprm_supplier_has_raw_mat.sprm_scientific_name', 'tbl_sprm_supplier_has_raw_mat.sprm_material_source','tbl_spcb_supplier_has_cert_bodies.spcb_cert_bodies',
            DB::raw('DATE_FORMAT(tbl_spcb_supplier_has_cert_bodies.spcb_date_cert, "%d/%m/%Y") AS spcb_date_cert'))
            ->where('tbl_pr_product.prsp_fk_company_id',$sessionid)
            ->groupBy('tbl_prsp_product_has_supplier.prsp_fk_rawmat_id') //groupkan senarai raw material yg digunakan
            ->get();  

        return response()->json($productdetail);
    }

    
    public function getCompanyAdvisorRM(Request $request){ //for list of raw material for company in advisor

        $sessionid = $request->ad_fk_company_id;

        $productdetail = DB::table('tbl_prsp_product_has_supplier')
            // ->join('tbl_sp_supplier', 'tbl_prsp_product_has_supplier.prsp_fk_supplier_id', '=', 'tbl_sp_supplier.id')//join table supplier
            ->join('tbl_sprm_supplier_has_raw_mat', 'tbl_prsp_product_has_supplier.prsp_fk_rawmat_id', '=', 'tbl_sprm_supplier_has_raw_mat.id')//join table raw mat
            ->Leftjoin('tbl_sp_supplier', 'tbl_sprm_supplier_has_raw_mat.sprm_fk_supplier_id', '=', 'tbl_sp_supplier.id')
            ->join('tbl_pr_product', 'tbl_prsp_product_has_supplier.prsp_fk_product_id', '=', 'tbl_pr_product.id')//join table product
            ->Leftjoin('tbl_spcb_supplier_has_cert_bodies', 'tbl_sprm_supplier_has_raw_mat.sprm_fk_id_halal_cert', '=', 'tbl_spcb_supplier_has_cert_bodies.id')//join table cert bodies
            ->select('tbl_sp_supplier.sp_name','tbl_sp_supplier.sp_address','tbl_sprm_supplier_has_raw_mat.sprm_name','tbl_sprm_supplier_has_raw_mat.sprm_scientific_name', 'tbl_sprm_supplier_has_raw_mat.sprm_material_source','tbl_spcb_supplier_has_cert_bodies.spcb_cert_bodies','tbl_spcb_supplier_has_cert_bodies.spcb_date_cert')
            ->where('tbl_pr_product.prsp_fk_company_id',$sessionid)
            ->groupBy('tbl_prsp_product_has_supplier.prsp_fk_rawmat_id') //groupkan senarai raw material yg digunakan
            ->get();  

        return response()->json($productdetail);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $sessionid=Auth::user()->getCompany()->cmpnyPK;
        

        $product = new product;
        $product->prsp_fk_company_id = $sessionid;
        $product->prsp_name =$request->prsp_name;
        $product->save();
        
       return response()->json($product);
    }

    public function createProductDetails(Request $request)
    {
        // $rawmatexist=productdetail::where([
        //     ['prsp_fk_product_id',$request->prsp_fk_product_id],
        //     ['prsp_fk_rawmat_id',$request->supplierwithrawmat],
        // ])->first();

        // if(!is_null($prsp_fk_rawmat_id)) {
        //     return response()->json(['isSuccess' =>false,'message'=>"Nama syarikat telah berdaftar didalam sistem"],417);
        // }

        $productdetail = new productdetail;
        $productdetail->prsp_fk_product_id = $request->prsp_fk_product_id;
        $productdetail->prsp_fk_rawmat_id = $request->supplierwithrawmat;
        $productdetail->save();

        return response()->json($productdetail);
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
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(product $product)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, productdetail $productdetail)
    {
        $product = product::where('id',$request->id)->first();
        $product->prsp_name =$request->prsp_name;
        $product->save();
        return response()->json($product);
    }

    public function updateProductDetails(Request $request, product $product)
    {
        $productdetail = productdetail::where('id',$request->id)->first();
        $productdetail->prsp_fk_product_id = $request->prsp_fk_product_id;
        $productdetail->prsp_fk_rawmat_id = $request->supplierwithrawmat;
        $productdetail->save();
        

        return response()->json($productdetail);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $product = product::where('id',$request->pk)->first();
        $product->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete"]);
    }

    public function destroyProductDetails(Request $request,$id)
    {
        $id = $id;
        $productdetail = productdetail::where('id',$request->id)->first();
        $productdetail->delete();

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
