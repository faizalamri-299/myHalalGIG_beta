<?php

namespace App\Http\Controllers;

use App\Models\RawMaterial;
use Illuminate\Http\Request;

class RawMaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rawmaterial= RawMaterial::get();
        foreach ($rawmaterial as $r){
        }
        
        return response()->json($rawmaterial);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
     * @param  \App\Models\RawMaterial  $rawMaterial
     * @return \Illuminate\Http\Response
     */
    public function show(RawMaterial $rawMaterial)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RawMaterial  $rawMaterial
     * @return \Illuminate\Http\Response
     */
    public function edit(RawMaterial $rawMaterial)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RawMaterial  $rawMaterial
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RawMaterial $rawMaterial)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RawMaterial  $rawMaterial
     * @return \Illuminate\Http\Response
     */
    public function destroy(RawMaterial $rawMaterial)
    {
        //
    }
}
