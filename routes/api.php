<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::resource('fileupload','subscriptionController');

Route::post('/signup', "authController@userSignUp");

Route::post('/login', 'authController@login');

Route::post('/mcdlogin', 'authController@mcdlogin');
Route::post('/deleteHASChecklist',"UploadHASController@deleteHASChecklist");

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

