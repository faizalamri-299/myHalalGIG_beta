<?php

namespace App\Http\Controllers;

use App\Models\LabAnalysis;
use Illuminate\Http\Request;
use Auth;

class LabAnalysisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sessionid=Auth::user()->getCompany()->cmpnyPK;

        $LabAnalysis= LabAnalysis::where('la_fk_company_id', $sessionid)->get();
        return response()->json($LabAnalysis);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $sessionid=Auth::user()->getCompany()->cmpnyPK;

        $LabAnalysis = new LabAnalysis;
        $LabAnalysis->la_fk_company_id = $sessionid;
        $LabAnalysis->la_document_name =$request->la_document_name;
        $LabAnalysis->save();
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
     * @param  \App\Models\LabAnalysis  $labAnalysis
     * @return \Illuminate\Http\Response
     */
    public function show(LabAnalysis $labAnalysis)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\LabAnalysis  $labAnalysis
     * @return \Illuminate\Http\Response
     */
    public function edit(LabAnalysis $labAnalysis)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\LabAnalysis  $labAnalysis
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LabAnalysis $labAnalysis)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LabAnalysis  $labAnalysis
     * @return \Illuminate\Http\Response
     */
    public function destroy(LabAnalysis $labAnalysis)
    {
        //
    }
}
