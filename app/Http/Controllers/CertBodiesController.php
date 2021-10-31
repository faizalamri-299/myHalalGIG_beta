<?php

namespace App\Http\Controllers;

use App\Models\CertBodies;
use Illuminate\Http\Request;

class CertBodiesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $CertBodies= CertBodies::orderBy('cb_name','asc')->get();
        return response()->json($CertBodies);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $CertBodies = new CertBodies;
        $CertBodies->cb_name =$request->cb_name;
        $CertBodies->save();
        
       return response()->json($CertBodies);
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
     * @param  \App\Models\CertBodies  $certBodies
     * @return \Illuminate\Http\Response
     */
    public function show(CertBodies $certBodies)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CertBodies  $certBodies
     * @return \Illuminate\Http\Response
     */
    public function edit(CertBodies $certBodies)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CertBodies  $certBodies
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CertBodies $certBodies)
    {
        $certbodies = CertBodies::where('id',$request->id)->first();
        $certbodies->cb_name =$request->cb_name;
        $certbodies->cb_status =$request->cb_status;
        $certbodies->cb_memo =$request->cb_memo;
        $certbodies->cb_date_expired =$request->cb_date_expired;
        $certbodies->save();

        return response()->json($certbodies);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CertBodies  $certBodies
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $cb = CertBodies::where('id',$request->pk)->first();
        $cb->delete();
        return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete"]); 
    }
}
