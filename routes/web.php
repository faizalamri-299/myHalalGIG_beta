<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/clear-cache', function() {
    Artisan::call('cache:clear');
    return "Cache is cleared";
});

Route::get('/config-cache', function() {
    Artisan::call('config:cache');
    return "create cache";
});

Route::post('/login', "authController@authenticate")->middleware('throttle:login');
Route::post('/signup', "authController@userSignUp");
Route::post('/advisorsignup', "authController@advisorSignUp");


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', "authController@getUser");
    Route::get('/getroles', "userController@getRoles");
    Route::get('/getprofile', "userController@getAllUser");
    Route::get('/getproduct', "ProductController@index");
    Route::get('/getscheme',"checklistController@getAllCklist");

    //////////////////////////////////////////////////ADVISOR REGISTER ROUTES/////////////////////////////////////////////////////////

    Route::get('/getadvisor', "userController@getAllAdvisor");
    Route::post('/postadvisor',"userController@addAdvisor");
    Route::post('/postadvisorlevel',"AdvisorController@addAdvisorLevel");
    Route::post('/updateadvisorlevel',"AdvisorController@UpdateAdvisorLevel");
    Route::post('/deleteadvisor',"userController@deleteAdvisor");
    Route::get('/getadvisorall', "AdvisorController@getAdvisorAll");
    Route::get('/getddlevel', "AdvisorController@getDDlevel");
    Route::get('/getprofilead', "AdvisorController@getAdvisorAD");

    //advisorexperience
    Route::post('/postadvsrexp', "AdvisorController@addAdvisorExp");
    Route::get('/getadvsrexp', "AdvisorController@getAdvisorExp");
    //advisoracademic
    Route::post('/postadvsraca', "AdvisorController@addAdvisorAca");
    Route::get('/getadvsraca', "AdvisorController@getAdvisorAca");
    //advisorachievement
    Route::post('/postadvsrach', "AdvisorController@addAdvisorAch");
    Route::get('/getadvsrach', "AdvisorController@getAdvisorAch");
    //advisoractivities
    Route::post('/postadvsract', "AdvisorController@addAdvisorAct");
    Route::get('/getadvsract', "AdvisorController@getAdvisorAct");
    //getsemuadataadvisor
    Route::get('/getadvsrdata',"AdvisorController@getAdvisorData");
    //update profil advisor
    Route::post('/updadvisorprofile',"AdvisorController@updAdvisorProfile");


        /////////////////////////////////////////////////ADVISOR DETAILS ROUTES////////////////////////////////////////////////////////////////
        Route::get('/getadvisordetails/{id?}',"AdvisorController@index");
        Route::post('/postadvisordetails', "AdvisorController@create"); //client request advisor
        Route::post('/updatecompnayadvisorstatus',"AdvisorController@update"); // update status requested
        Route::post('/deleteadvisordetails/{id?}',"AdvisorController@destroy");
        Route::post('/postadvisorprofile',"AdvisorController@addAdvisorProfile");
        Route::post('/postrating', "AdvisorController@createRating"); //client rate advisor
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Route::post('/postuser',"userController@addUser");
    Route::post('/deleteuser',"userController@deleteUser");

    Route::get('/getstaffcmpny/{id}',"companyController@getStaffCompany");
    Route::post('/updcompany',"companyController@updCompany");
    Route::get('/getcompany',"companyController@getAllCompany");

    /////////////////////////////////////////////////////////////////company advisor//////////////////////////////////////////////////////////////
    Route::get('/getcompanyadvisor',"companyController@getCompanyAdvisor");
    Route::get('/getcompanyadvisorrm',"ProductController@getCompanyAdvisorRM");
    Route::get('/getcompanyadvisorrequest',"companyController@getCompanyAdvisorRequest");
    Route::get('/getadvisorclient',"companyController@getAdvisorClient");
    Route::get('/getadselected',"companyController@getAdSelected");
    Route::get('/getcarecord',"companyController@getCArecord");
    Route::post('/deleteApplication',"companyController@deleteApplication");
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    Route::post('/registercompany',"companyController@registerCompany");

    // Route::post('/postpremise',"companyController@addPremise");
    // Route::post('/postihc',"companyController@addIHC");
    // Route::post('/posttraining',"companyController@addTraining");

    // Route::post('/file-upload',"companyController@fileUpload");

    // Route::get('download', 'companyController@download')->name('download');

    // Route::get('file-upload', [ companyController::class, 'fileUpload' ])->name('file.upload');
    // Route::post('file-upload', [ companyController::class, 'fileUploadPost' ])->name('file.upload.post');

    
    
    Route::get('/getsubscription',"subscriptionController@getAllSubcription");
    Route::get('/getsubcrdata/{id?}',"subscriptionController@getSubscriptionData");
    Route::post('/createsubscription',"subscriptionController@createSubscription");
    Route::post('/deletesubscription',"subscriptionController@deleteSubscription");

    Route::post('/postpremise',"subscriptionController@addPremise");
    Route::post('/postihc',"subscriptionController@addIHC");
    Route::post('/posttraining',"subscriptionController@addTraining");

    Route::post('/postsubcr',"subscriptionController@postSubcription");
    Route::post('/addsubcrcklist',"subscriptionController@addSubcrCklist");
    Route::post('/postcklist',"subscriptionController@postCklist");
    Route::post('/postclientcklist',"checklistController@postCklist");
    Route::post('/savecklist',"checklistController@savecklist");

    // Route::get('/getclientdata',"subscriptionController@getclientdata");
    // Route::get('/getindsubscr',"subscriptionController@getIndSubscription");


    Route::get('/gettraining',"TrainingController@getAllSubs");
    Route::get('/getalltraining',"TrainingController@getAllSubs");




    Route::post('/postsubcr',"subscriptionController@postSubcription");
    Route::post('/addsubcrcklist',"subscriptionController@addSubcrCklist");
    Route::post('/postcklist',"subscriptionController@postCklist");
    Route::get('/getclientdata',"subscriptionController@getclientdata");
    Route::get('/getclientadvisor',"AdvisorController@getClientAdvisor");
    Route::get('/getindsubscr',"subscriptionController@getIndSubscription");
    ////////////////////////////////////////////////start supplier Routes/////////////////////////////////////////////////////////////////
    Route::get('/getsupplier',"SupplierController@index");
    Route::post('/postsupplier', "SupplierController@create"); // create supplier
    Route::post('/updatesupplier',"SupplierController@update");
    Route::post('/updatesupplierstatus',"SupplierController@updateStatusSupplier");
    Route::post('/deletesupplier',"SupplierController@destroy");
    Route::get('/getsupplierdata/{id?}',"SupplierController@getSupplierData"); // get data in tab     
    Route::get('/getcertbodiesdd', "SupplierController@getCertBodies"); //for dropdown where status = 0
    Route::get('/getexp',"SupplierController@getCertExp");
    
    ////////////////////////////////////////////////end supplier Routes/////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////start cert bodies in supplier/////////////////////////////////////////////////////////////////
    Route::get('/getsupportdoc',"SupplierController@getSupportDoc");
    Route::post('/postsupportdoc', "SupplierController@createSupportDoc");
    Route::post('/updatesupportdoc',"SupplierController@updateSupportDoc");
    Route::post('/deletesupportdoc',"SupplierController@deleteSupportDoc");
    ////////////////////////////////////////////////end cert bodies in supplier/////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////start raw mat in supplier/////////////////////////////////////////////////////////////////
    Route::get('/getrawmaterial', "SupplierController@getRawMat");
    Route::post('/postmaterial', "SupplierController@createRawMat");
    Route::post('/postmaterialsuppdoc', "SupplierController@createRawMatSuppDoc");
    Route::post('/updaterawmaterial',"SupplierController@updateRawMat");
    Route::post('/deleterawmaterial',"SupplierController@deleteRawMat");
    ////////////////////////////////////////////////end raw mat in supplier/////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////start cert bodies in supplier/////////////////////////////////////////////////////////////////
    Route::get('/getsuppliercert', "SupplierController@getSupplierCert");
    Route::post('/postsuppliercert', "SupplierController@createSupplierCert");
    Route::post('/updatesuppliercert',"SupplierController@updateSupplierCert");
    Route::post('/deletesuppliercert',"SupplierController@deleteSupplierCert");
    ////////////////////////////////////////////////end cert bodies in supplier/////////////////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////PRODUCT ROUTES////////////////////////////////////////////////////////////////
    Route::post('/postproduct', "ProductController@create");
    Route::post('/updateproduct',"ProductController@update");
    Route::post('/deleteproduct',"ProductController@destroy");
        /////////////////////////////////////////////////////////////For Product Details//////////////////////////////////////////
    Route::get('/getproductdetails/{id?}',"ProductController@getProductDetails");
    Route::post('/postproductdetails', "ProductController@createProductDetails");
    Route::post('/updateproductdetails',"ProductController@updateProductDetails");
    Route::post('/deleteproductdetails/{id?}',"ProductController@destroyProductDetails");
        /////////////////////////////////////////////////////////////For Product Details//////////////////////////////////////////
    
    Route::get('/getproductdetailsHFP',"ProductController@getProductDetailsHFP"); //get for halal file print
    //Route::get('/gethasfile',"ProductController@gethasfile"); //download thing terai dulu okay takyah pun kat view je nurul fahammm baikkk
    /////////////////////////////////////////////////Halal File (Lab Analysis)////////////////////////////////////////////////////////////////
    // Route::get('/getlabanalysis', "LabAnalysisController@index");
    // Route::post('/postlabanalysis',"LabAnalysisController@create");
    // Route::post('/updatelabanalysis',"LabAnalysisController@update");
    // Route::post('/deletelabanalysis',"LabAnalysisController@destroy");
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////CERT BODIES ROUTES////////////////////////////////////////////////////////////////
    Route::get('/getcertbodies', "CertBodiesController@index");
    Route::post('/postcb',"CertBodiesController@create");
    Route::post('/updatecb',"CertBodiesController@update");
    Route::post('/deletecb',"CertBodiesController@destroy");
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////UPLOAD HAS FILE ROUTES////////////////////////////////////////////////////////////////
    //-----------------------------------------------------FILE NO 1--------------------------------------------------------------------//
    Route::get('/getHASHalalpolicy', "UploadHASController@getHAShalalpolicy");
    Route::post('/postHASHalalpolicy', "UploadHASController@postHAShalalpolicy");
    Route::post('/deleteHASHalalpolicy',"UploadHASController@deleteHAShalalpolicy");
    //-----------------------------------------------------FILE NO 2.1--------------------------------------------------------------------//
    Route::get('/getHASOrgchart', "UploadHASController@getHASorgchart");
    Route::post('/postHASOrgchart', "UploadHASController@postHASorgchart");
    Route::post('/deleteHASOrgchart',"UploadHASController@deleteHASorgchart");
    //-----------------------------------------------------FILE NO 2.2--------------------------------------------------------------------//
    Route::get('/getHASTor', "UploadHASController@getHAStor");
    Route::post('/postHASTor', "UploadHASController@postHAStor");
    Route::post('/deleteHASTor',"UploadHASController@deleteHAStor");
    //-----------------------------------------------------FILE NO 2.3--------------------------------------------------------------------//
    Route::get('/getHASEmpletter', "UploadHASController@getHASempletter");
    Route::post('/postHASEmpletter', "UploadHASController@postHASempletter");
    Route::post('/deleteHASEmpletter',"UploadHASController@deleteHASempletter");
    //-----------------------------------------------------FILE NO 3--------------------------------------------------------------------//
    Route::get('/getHASAudit', "UploadHASController@getHASaudit");
    Route::post('/postHASAudit', "UploadHASController@postHASaudit");
    Route::post('/deleteHASAudit',"UploadHASController@deleteHASaudit");
    //-----------------------------------------------------FILE NO 4--------------------------------------------------------------------//
    Route::get('/getHASHalalrisk', "UploadHASController@getHAShalalrisk");
    Route::post('/postHASHalalrisk', "UploadHASController@postHAShalalrisk");
    Route::post('/deleteHASHalalrisk',"UploadHASController@deleteHAShalalrisk");
    //-----------------------------------------------------FILE NO 5.1--------------------------------------------------------------------//
    Route::get('/getHASRawMat', "UploadHASController@indexHASRawMat");
    Route::post('/postHASRawMat', "UploadHASController@createHASRawMat");
    Route::post('/deleteHASRawMat',"UploadHASController@deleteHASRawMat");
    //-----------------------------------------------------FILE NO 5.1--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 5.2--------------------------------------------------------------------//
    Route::get('/getHASSOPRawMat', "UploadHASController@indexHASSOPRawMat");
    Route::post('/postHASSOPRawMat', "UploadHASController@createHASSOPRawMat");
    Route::post('/deleteHASSOPRawMat',"UploadHASController@deleteHASSOPRawMat");
    //-----------------------------------------------------FILE NO 5.2--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 6--------------------------------------------------------------------//
    Route::get('/getHASTraining', "UploadHASController@getHAStraining");
    Route::post('/postHASTraining', "UploadHASController@postHAStraining");
    Route::post('/deleteHASTraining',"UploadHASController@deleteHAStraining");
    //-----------------------------------------------------FILE NO 7.1--------------------------------------------------------------------//
    Route::get('/getHASTraceability', "UploadHASController@indexHASTraceability");
    Route::post('/postHASTraceability', "UploadHASController@createHASTraceability");
    Route::post('/deleteHASTraceability',"UploadHASController@deleteHASTraceability");
    //-----------------------------------------------------FILE NO 7.1--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 7.2--------------------------------------------------------------------//
    Route::get('/getHASSOPTraceability', "UploadHASController@indexHASSOPTraceability");
    Route::post('/postHASSOPTraceability', "UploadHASController@createHASSOPTraceability");
    Route::post('/deleteHASSOPTraceability',"UploadHASController@deleteHASSOPTraceability");
    //-----------------------------------------------------FILE NO 7.2--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 7.3--------------------------------------------------------------------//
    Route::get('/getHASSOPProductRecall', "UploadHASController@indexHASSOPProductRecall");
    Route::post('/postHASSOPProductRecall', "UploadHASController@createHASSOPProductRecall");
    Route::post('/deleteHASSOPProductRecall',"UploadHASController@deleteHASSOPProductRecall");
    //-----------------------------------------------------FILE NO 7.3--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 8--------------------------------------------------------------------//
    Route::get('/getHASChecklist', "UploadHASController@indexHASChecklist");
    Route::post('/postHASChecklist', "UploadHASController@createHASChecklist");
    Route::post('/deleteHASChecklist',"UploadHASController@deleteHASChecklist");
    Route::get('test', function() {

        $filename = App\Models\HASChecklist::select('hc_file_name')->where('id',27)->get();
    
        dd($filename);
    
    });
    //-----------------------------------------------------FILE NO 8--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 9--------------------------------------------------------------------//
    Route::get('/getHASLabAnalysis', "UploadHASController@indexHASLabAnalysis");
    Route::post('/postHASLabAnalysis', "UploadHASController@createHASLabAnalysis");
    Route::post('/deleteHASLabAnalysis',"UploadHASController@deleteHASLabAnalysis");
    //-----------------------------------------------------FILE NO 9--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 10.1--------------------------------------------------------------------//
    Route::get('/getHASSertu', "UploadHASController@indexHASSertu");
    Route::post('/postHASSertu', "UploadHASController@createHASSertu");
    Route::post('/deleteHASSertu',"UploadHASController@deleteHASSertu");
    //-----------------------------------------------------FILE NO 10.1--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 10.2--------------------------------------------------------------------//
    Route::get('/getHASSOPSertu', "UploadHASController@indexHASSOPSertu");
    Route::post('/postHASSOPSertu', "UploadHASController@createHASSOPSertu");
    Route::post('/deleteHASSOPSertu',"UploadHASController@deleteHASSOPSertu");
    //-----------------------------------------------------FILE NO 10.2--------------------------------------------------------------------//
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



});

Route::get('/zipHAS', "UploadHASController@zipFolder");

Route::get('/logout',function (){
    Auth::logout();
    return response()->json(['logout' =>true]);
});
Route::get('/customlogin',"authController@getCustomLogin");
Route::get('/getcklist',"migrationController@getCklist");

Route::get('/policy', function () {
    return view('policy');
});

Route::get('/{path?}', function () {
    return view('app');
})->where('path', '.*');