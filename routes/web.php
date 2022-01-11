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
    Route::post('/registercompanysu',"companyController@registerCompanySU");


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


    Route::get('/getsubuserdata',"subscriptionController@getclientdata");
    Route::get('/getalluser',"AuditorController@getAllUser");


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
    Route::get('/getrawmaterial', "SupplierController@getRawMat"); //drop down dalam product
    Route::post('/postmaterial', "SupplierController@createRawMat");
    Route::post('/postmaterialsuppdoc', "SupplierController@createRawMatSuppDoc");
    Route::post('/downloadmaterialsuppdoc', "SupplierController@downloadSupportDoc");
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
    Route::post('/postRawMat', "ProductController@postRawMat");


    Route::get('/pdfimg', "SupplierController@pdfimg");

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
    Route::post('/downloadHASHalalpolicy', "UploadHASController@downloadHASHalalpolicy");
    Route::post('/postHASHalalpolicy', "UploadHASController@postHAShalalpolicy");
    Route::post('/deleteHASHalalpolicy',"UploadHASController@deleteHAShalalpolicy");

    //-----------------------------------------------------FILE NO 2.1--------------------------------------------------------------------//
    Route::get('/getHASOrgchart', "UploadHASController@getHASorgchart");
    Route::post('/downloadHASOrgchart', "UploadHASController@downloadHASOrgchart");
    Route::post('/postHASOrgchart', "UploadHASController@postHASorgchart");
    Route::post('/deleteHASOrgchart',"UploadHASController@deleteHASorgchart");
    //-----------------------------------------------------FILE NO 2.2--------------------------------------------------------------------//
    Route::get('/getHASTor', "UploadHASController@getHAStor");
    Route::post('/downloadHASTor', "UploadHASController@downloadHASTor");
    Route::post('/postHASTor', "UploadHASController@postHAStor");
    Route::post('/deleteHASTor',"UploadHASController@deleteHAStor");
    //-----------------------------------------------------FILE NO 2.3--------------------------------------------------------------------//
    Route::get('/getHASEmpletter', "UploadHASController@getHASempletter");
    Route::post('/downloadHASEmpletter', "UploadHASController@downloadHASEmpletter");
    Route::post('/postHASEmpletter', "UploadHASController@postHASempletter");
    Route::post('/deleteHASEmpletter',"UploadHASController@deleteHASempletter");
    //-----------------------------------------------------FILE NO 3--------------------------------------------------------------------//
    Route::get('/getHASAudit', "UploadHASController@getHASaudit");
    Route::post('/downloadHASAudit', "UploadHASController@downloadHASAudit");
    Route::post('/postHASAudit', "UploadHASController@postHASaudit");
    Route::post('/deleteHASAudit',"UploadHASController@deleteHASaudit");
    //-----------------------------------------------------FILE NO 4--------------------------------------------------------------------//
    Route::get('/getHASHalalrisk', "UploadHASController@getHAShalalrisk");
    Route::post('/downloadHASHalalrisk', "UploadHASController@downloadHASHalalrisk");
    Route::post('/postHASHalalrisk', "UploadHASController@postHAShalalrisk");
    Route::post('/deleteHASHalalrisk',"UploadHASController@deleteHAShalalrisk");
    //-----------------------------------------------------FILE NO 5.1--------------------------------------------------------------------//
    Route::get('/getHASRawMat', "UploadHASController@indexHASRawMat");
    Route::post('/downloadHASRawMat', "UploadHASController@downloadHASRawMat");
    Route::post('/postHASRawMat', "UploadHASController@createHASRawMat");
    Route::post('/deleteHASRawMat',"UploadHASController@deleteHASRawMat");
    //-----------------------------------------------------FILE NO 5.1--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 5.2--------------------------------------------------------------------//
    Route::get('/getHASSOPRawMat', "UploadHASController@indexHASSOPRawMat");
    Route::post('/downloadHASSOPRawMat', "UploadHASController@downloadHASSOPRawMat");
    Route::post('/postHASSOPRawMat', "UploadHASController@createHASSOPRawMat");
    Route::post('/deleteHASSOPRawMat',"UploadHASController@deleteHASSOPRawMat");
    //-----------------------------------------------------FILE NO 5.2--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 6--------------------------------------------------------------------//
    Route::get('/getHASTraining', "UploadHASController@getHAStraining");
    Route::post('/downloadHASTraining', "UploadHASController@downloadHASTraining");
    Route::post('/postHASTraining', "UploadHASController@postHAStraining");
    Route::post('/deleteHASTraining',"UploadHASController@deleteHAStraining");
    //-----------------------------------------------------FILE NO 7.1--------------------------------------------------------------------//
    Route::get('/getHASTraceability', "UploadHASController@indexHASTraceability");
    Route::post('/downloadHASTraceability', "UploadHASController@downloadHASTraceability");
    Route::post('/postHASTraceability', "UploadHASController@createHASTraceability");
    Route::post('/deleteHASTraceability',"UploadHASController@deleteHASTraceability");
    //-----------------------------------------------------FILE NO 7.1--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 7.2--------------------------------------------------------------------//
    Route::get('/getHASSOPTraceability', "UploadHASController@indexHASSOPTraceability");
    Route::post('/downloadHASSOPTraceability', "UploadHASController@downloadHASSOPTraceability");
    Route::post('/postHASSOPTraceability', "UploadHASController@createHASSOPTraceability");
    Route::post('/deleteHASSOPTraceability',"UploadHASController@deleteHASSOPTraceability");
    //-----------------------------------------------------FILE NO 7.2--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 7.3--------------------------------------------------------------------//
    Route::get('/getHASSOPProductRecall', "UploadHASController@indexHASSOPProductRecall");
    Route::post('/downloadHASSOPProductRecall', "UploadHASController@downloadHASSOPProductRecall");
    Route::post('/postHASSOPProductRecall', "UploadHASController@createHASSOPProductRecall");
    Route::post('/deleteHASSOPProductRecall',"UploadHASController@deleteHASSOPProductRecall");
    //-----------------------------------------------------FILE NO 7.3--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 8--------------------------------------------------------------------//
    Route::get('/getHASChecklist', "UploadHASController@indexHASChecklist");
    Route::post('/downloadHASChecklist', "UploadHASController@downloadHASChecklist");
    Route::post('/postHASChecklist', "UploadHASController@createHASChecklist");
    Route::post('/deleteHASChecklist',"UploadHASController@deleteHASChecklist");

    //-----------------------------------------------------FILE NO 8--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 9--------------------------------------------------------------------//
    Route::get('/getHASLabAnalysis', "UploadHASController@indexHASLabAnalysis");
    Route::post('/downloadHASLabAnalysis', "UploadHASController@downloadHASLabAnalysis");
    Route::post('/postHASLabAnalysis', "UploadHASController@createHASLabAnalysis");
    Route::post('/deleteHASLabAnalysis',"UploadHASController@deleteHASLabAnalysis");
    //-----------------------------------------------------FILE NO 9--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 10.1--------------------------------------------------------------------//
    Route::get('/getHASSertu', "UploadHASController@indexHASSertu");
    Route::post('/downloadHASSertu', "UploadHASController@downloadHASSertu");
    Route::post('/postHASSertu', "UploadHASController@createHASSertu");
    Route::post('/deleteHASSertu',"UploadHASController@deleteHASSertu");
    //-----------------------------------------------------FILE NO 10.1--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 10.2--------------------------------------------------------------------//
    Route::get('/getHASSOPSertu', "UploadHASController@indexHASSOPSertu");
    Route::post('/downloadHASSOPSertu', "UploadHASController@downloadHASSOPSertu");
    Route::post('/postHASSOPSertu', "UploadHASController@createHASSOPSertu");
    Route::post('/deleteHASSOPSertu',"UploadHASController@deleteHASSOPSertu");
    //-----------------------------------------------------FILE NO 10.2--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 11.2--------------------------------------------------------------------//
    Route::get('/getHASSOP', "UploadHASController@getHASSOP");
    Route::post('/downloadHASSOP', "UploadHASController@downloadHASSOP");
    Route::post('/postHASSOP', "UploadHASController@postHASSOP");
    Route::post('/deleteHASSOP',"UploadHASController@deleteHASSOP");
    //-----------------------------------------------------FILE NO 11.2--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 12.2--------------------------------------------------------------------//
    Route::get('/getHASProductHalalCert', "UploadHASController@getHASProductHalalCert");
    Route::post('/downloadHASProductHalalCert', "UploadHASController@downloadHASProductHalalCert");
    Route::post('/postHASProductHalalCert', "UploadHASController@postHASProductHalalCert");
    Route::post('/deleteHASProductHalalCert',"UploadHASController@deleteHASProductHalalCert");
    //-----------------------------------------------------FILE NO 12.2--------------------------------------------------------------------//
    //-----------------------------------------------------FILE NO 13.2--------------------------------------------------------------------//
    Route::get('/getHASOthers', "UploadHASController@getHASOthers");
    Route::post('/downloadHASOthers', "UploadHASController@downloadHASOthers");
    Route::post('/postHASOthers', "UploadHASController@postHASOthers");
    Route::post('/deleteHASOthers',"UploadHASController@deleteHASOthers");
    //-----------------------------------------------------FILE NO 13.2--------------------------------------------------------------------//
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////UPLOAD HALAL FILE ROUTES////////////////////////////////////////////////////////////////
    //-----------------------------------------------------SIJIL PENDAFTARAN--------------------------------------------------------------//
    Route::get('/getHALALSijilPendaftaran', "UploadHalalController@getHALALSijilPendaftaran");
    Route::post('/downloadHALALSijilPendaftaran', "UploadHalalController@downloadHALALSijilPendaftaran");
    Route::post('/postHALALSijilPendaftaran', "UploadHalalController@postHALALSijilPendaftaran");
    Route::post('/deleteHALALSijilPendaftaran',"UploadHalalController@deleteHALALSijilPendaftaran");
    //-----------------------------------------------------SIJIL PENDAFTARAN--------------------------------------------------------------//

    //-----------------------------------------------------LESEN PERNIAGAAN--------------------------------------------------------------//
    Route::get('/getHALALLesenPerniagaan', "UploadHalalController@getHALALLesenPerniagaan");
    Route::post('/downloadHALALLesenPerniagaan', "UploadHalalController@downloadHALALLesenPerniagaan");
    Route::post('/postHALALLesenPerniagaan', "UploadHalalController@postHALALLesenPerniagaan");
    Route::post('/deleteHALALLesenPerniagaan',"UploadHalalController@deleteHALALLesenPerniagaan");
    //-----------------------------------------------------LESEN PERNIAGAAN--------------------------------------------------------------//

    //-----------------------------------------------------SURAT LANTIKAN--------------------------------------------------------------//
    Route::get('/getHALALSuratLantikan', "UploadHalalController@getHALALSuratLantikan");
    Route::post('/downloadHALALSuratLantikan', "UploadHalalController@downloadHALALSuratLantikan");
    Route::post('/postHALALSuratLantikan', "UploadHalalController@postHALALSuratLantikan");
    Route::post('/deleteHALALSuratLantikan',"UploadHalalController@deleteHALALSuratLantikan");
    //-----------------------------------------------------SURAT LANTIKAN--------------------------------------------------------------//

    //-----------------------------------------------------PETA LOKASI--------------------------------------------------------------//
    Route::get('/getHALALPetaLokasi', "UploadHalalController@getHALALPetaLokasi");
    Route::post('/downloadHALALPetaLokasi', "UploadHalalController@downloadHALALPetaLokasi");
    Route::post('/postHALALPetaLokasi', "UploadHalalController@postHALALPetaLokasi");
    Route::post('/deleteHALALPetaLokasi',"UploadHalalController@deleteHALALPetaLokasi");
    //-----------------------------------------------------PETA LOKASI--------------------------------------------------------------//

    //-----------------------------------------------------PENYATA KEWANGAN--------------------------------------------------------------//
    Route::get('/getHALALPenyataKewangan', "UploadHalalController@getHALALPenyataKewangan");
    Route::post('/downloadHALALPenyataKewangan', "UploadHalalController@downloadHALALPenyataKewangan");
    Route::post('/postHALALPenyataKewangan', "UploadHalalController@postHALALPenyataKewangan");
    Route::post('/deleteHALALPenyataKewangan',"UploadHalalController@deleteHALALPenyataKewangan");
    //-----------------------------------------------------PENYATA KEWANGAN--------------------------------------------------------------//

    //-----------------------------------------------------SIJIL HALAL--------------------------------------------------------------//
    Route::get('/getHALALSijilHalal', "UploadHalalController@getHALALSijilHalal");
    Route::post('/downloadHALALSijilHalal', "UploadHalalController@downloadHALALSijilHalal");
    Route::post('/postHALALSijilHalal', "UploadHalalController@postHALALSijilHalal");
    Route::post('/deleteHALALSijilHalal',"UploadHalalController@deleteHALALSijilHalal");
    //-----------------------------------------------------SIJIL HALAL--------------------------------------------------------------//

    //-----------------------------------------------------CARTA ALIR--------------------------------------------------------------//
    Route::get('/getHALALCartaAlir', "UploadHalalController@getHALALCartaAlir");
    Route::post('/downloadHALALCartaAlir', "UploadHalalController@downloadHALALCartaAlir");
    Route::post('/postHALALCartaAlir', "UploadHalalController@postHALALCartaAlir");
    Route::post('/deleteHALALCartaAlir',"UploadHalalController@deleteHALALCartaAlir");
    //-----------------------------------------------------CARTA ALIR--------------------------------------------------------------//

    //-----------------------------------------------------PEMBUNGKUSAN--------------------------------------------------------------//
    Route::get('/getHALALPembungkusan', "UploadHalalController@getHALALPembungkusan");
    Route::post('/downloadHALALPembungkusan', "UploadHalalController@downloadHALALPembungkusan");
    Route::post('/postHALALPembungkusan', "UploadHalalController@postHALALPembungkusan");
    Route::post('/deleteHALALPembungkusan',"UploadHalalController@deleteHALALPembungkusan");
    //-----------------------------------------------------PEMBUNGKUSAN--------------------------------------------------------------//

    //-----------------------------------------------------PERMOHONAN LENGKAP--------------------------------------------------------------//
    Route::get('/getHALALPermohonanLengkap', "UploadHalalController@getHALALPermohonanLengkap");
    Route::post('/downloadHALALPermohonanLengkap', "UploadHalalController@downloadHALALPermohonanLengkap");
    Route::post('/postHALALPermohonanLengkap', "UploadHalalController@postHALALPermohonanLengkap");
    Route::post('/deleteHALALPermohonanLengkap',"UploadHalalController@deleteHALALPermohonanLengkap");
    //-----------------------------------------------------PERMOHONAN LENGKAP--------------------------------------------------------------//

    //-----------------------------------------------------JAMINAN HALAL--------------------------------------------------------------//
    Route::get('/getHALALJaminanHalal', "UploadHalalController@getHALALJaminanHalal");
    Route::post('/downloadHALALJaminanHalal', "UploadHalalController@downloadHALALJaminanHalal");
    Route::post('/postHALALJaminanHalal', "UploadHalalController@postHALALJaminanHalal");
    Route::post('/deleteHALALJaminanHalal',"UploadHalalController@deleteHALALJaminanHalal");
    //-----------------------------------------------------JAMINAN HALAL--------------------------------------------------------------//

    //-----------------------------------------------------PEST CONTROL--------------------------------------------------------------//
    Route::get('/getHALALPestControl', "UploadHalalController@getHALALPestControl");
    Route::post('/downloadHALALPestControl', "UploadHalalController@downloadHALALPestControl");
    Route::post('/postHALALPestControl', "UploadHalalController@postHALALPestControl");
    Route::post('/deleteHALALPestControl',"UploadHalalController@deleteHALALPestControl");
    //-----------------------------------------------------PEST CONTROL--------------------------------------------------------------//

    //-----------------------------------------------------MAKLUMAT PEKERJA--------------------------------------------------------------//
    Route::get('/getHALALMaklumatPekerja', "UploadHalalController@getHALALMaklumatPekerja");
    Route::post('/downloadHALALMaklumatPekerja', "UploadHalalController@downloadHALALMaklumatPekerja");
    Route::post('/postHALALMaklumatPekerja', "UploadHalalController@postHALALMaklumatPekerja");
    Route::post('/deleteHALALMaklumatPekerja',"UploadHalalController@deleteHALALMaklumatPekerja");
    //-----------------------------------------------------MAKLUMAT PEKERJA--------------------------------------------------------------//

    //-----------------------------------------------------PENGELUARAN PRODUK--------------------------------------------------------------//
    Route::get('/getHALALPengeluaranProduk', "UploadHalalController@getHALALPengeluaranProduk");
    Route::post('/downloadHALALPengeluaranProduk', "UploadHalalController@downloadHALALPengeluaranProduk");
    Route::post('/postHALALPengeluaranProduk', "UploadHalalController@postHALALPengeluaranProduk");
    Route::post('/deleteHALALPengeluaranProduk',"UploadHalalController@deleteHALALPengeluaranProduk");
    //-----------------------------------------------------PENGELUARAN PRODUK--------------------------------------------------------------//

    //-----------------------------------------------------INVOIS--------------------------------------------------------------//
    Route::get('/getHALALInvois', "UploadHalalController@getHALALInvois");
    Route::post('/downloadHALALInvois', "UploadHalalController@downloadHALALInvois");
    Route::post('/postHALALInvois', "UploadHalalController@postHALALInvois");
    Route::post('/deleteHALALInvois',"UploadHalalController@deleteHALALInvois");
    //-----------------------------------------------------INVOIS--------------------------------------------------------------//

    //-----------------------------------------------------SURAT KKM--------------------------------------------------------------//
    Route::get('/getHALALSuratKKM', "UploadHalalController@getHALALSuratKKM");
    Route::post('/downloadHALALSuratKKM', "UploadHalalController@downloadHALALSuratKKM");
    Route::post('/postHALALSuratKKM', "UploadHalalController@postHALALSuratKKM");
    Route::post('/deleteHALALSuratKKM',"UploadHalalController@deleteHALALSuratKKM");
    //-----------------------------------------------------SURAT KKM--------------------------------------------------------------//

    //-----------------------------------------------------PERMIT IMPORT--------------------------------------------------------------//
    Route::get('/getHALALPermitImport', "UploadHalalController@getHALALPermitImport");
    Route::post('/downloadHALALPermitImport', "UploadHalalController@downloadHALALPermitImport");
    Route::post('/postHALALPermitImport', "UploadHalalController@postHALALPermitImport");
    Route::post('/deleteHALALPermitImport',"UploadHalalController@deleteHALALPermitImport");
    //-----------------------------------------------------PERMIT IMPORT--------------------------------------------------------------//

    //-----------------------------------------------------SUNTIKAN THYPOID--------------------------------------------------------------//
    Route::get('/getHALALSuntikanThypoid', "UploadHalalController@getHALALSuntikanThypoid");
    Route::post('/downloadHALALSuntikanThypoid', "UploadHalalController@downloadHALALSuntikanThypoid");
    Route::post('/postHALALSuntikanThypoid', "UploadHalalController@postHALALSuntikanThypoid");
    Route::post('/deleteHALALSuntikanThypoid',"UploadHalalController@deleteHALALSuntikanThypoid");
    //-----------------------------------------------------SUNTIKAN THYPOID--------------------------------------------------------------//

    //-----------------------------------------------------HALALSusunAtur--------------------------------------------------------------//
    Route::get('/getHALALSusunAtur', "UploadHalalController@getHALALSusunAtur");
    Route::post('/downloadHALALSusunAtur', "UploadHalalController@downloadHALALSusunAtur");
    Route::post('/postHALALSusunAtur', "UploadHalalController@postHALALSusunAtur");
    Route::post('/deleteHALALSusunAtur',"UploadHalalController@deleteHALALSusunAtur");
    //-----------------------------------------------------HALALSusunAtur--------------------------------------------------------------//

     //-----------------------------------------------------HALALAliranPergerakan--------------------------------------------------------------//
     Route::get('/getHALALAliranPergerakan', "UploadHalalController@getHALALAliranPergerakan");
     Route::post('/downloadHALALAliranPergerakan', "UploadHalalController@downloadHALALAliranPergerakan");
     Route::post('/postHALALAliranPergerakan', "UploadHalalController@postHALALAliranPergerakan");
     Route::post('/deleteHALALAliranPergerakan',"UploadHalalController@deleteHALALAliranPergerakan");
     //-----------------------------------------------------HALALAliranPergerakan--------------------------------------------------------------//

      //-----------------------------------------------------HALALDokumenMS--------------------------------------------------------------//
    Route::get('/getHALALDokumenMS', "UploadHalalController@getHALALDokumenMS");
    Route::post('/downloadHALALDokumenMS', "UploadHalalController@downloadHALALDokumenMS");
    Route::post('/postHALALDokumenMS', "UploadHalalController@postHALALDokumenMS");
    Route::post('/deleteHALALDokumenMS',"UploadHalalController@deleteHALALDokumenMS");
    //-----------------------------------------------------HALALDokumenMS--------------------------------------------------------------//

     //-----------------------------------------------------HALALKumpulanPembuatan--------------------------------------------------------------//
     Route::get('/getHALALKumpulanPembuatan', "UploadHalalController@getHALALKumpulanPembuatan");
     Route::post('/downloadHALALKumpulanPembuatan', "UploadHalalController@downloadHALALKumpulanPembuatan");
     Route::post('/postHALALKumpulanPembuatan', "UploadHalalController@postHALALKumpulanPembuatan");
     Route::post('/deleteHALALKumpulanPembuatan',"UploadHalalController@deleteHALALKumpulanPembuatan");
     //-----------------------------------------------------HALALKumpulanPembuatan--------------------------------------------------------------//

      //-----------------------------------------------------HALALLesenPengilang--------------------------------------------------------------//
    Route::get('/getHALALLesenPengilang', "UploadHalalController@getHALALLesenPengilang");
    Route::post('/downloadHALALLesenPengilang', "UploadHalalController@downloadHALALLesenPengilang");
    Route::post('/postHALALLesenPengilang', "UploadHalalController@postHALALLesenPengilang");
    Route::post('/deleteHALALLesenPengilang',"UploadHalalController@deleteHALALLesenPengilang");
    //-----------------------------------------------------HALALLesenPengilang--------------------------------------------------------------//

     //-----------------------------------------------------HALALLesenPergudangan--------------------------------------------------------------//
     Route::get('/getHALALLesenPergudangan', "UploadHalalController@getHALALLesenPergudangan");
     Route::post('/downloadHALALLesenPergudangan', "UploadHalalController@downloadHALALLesenPergudangan");
     Route::post('/postHALALLesenPergudangan', "UploadHalalController@postHALALLesenPergudangan");
     Route::post('/deleteHALALLesenPergudangan',"UploadHalalController@deleteHALALLesenPergudangan");
     //-----------------------------------------------------HALALLesenPergudangan--------------------------------------------------------------//

      //-----------------------------------------------------HALALMaklumatKesihatan--------------------------------------------------------------//
    Route::get('/getHALALMaklumatKesihatan', "UploadHalalController@getHALALMaklumatKesihatan");
    Route::post('/downloadHALALMaklumatKesihatan', "UploadHalalController@downloadHALALMaklumatKesihatan");
    Route::post('/postHALALMaklumatKesihatan', "UploadHalalController@postHALALMaklumatKesihatan");
    Route::post('/deleteHALALMaklumatKesihatan',"UploadHalalController@deleteHALALMaklumatKesihatan");
    //-----------------------------------------------------HALALMaklumatKesihatan--------------------------------------------------------------//

     //-----------------------------------------------------HALALNotaNotifikasiProduk--------------------------------------------------------------//
     Route::get('/getHALALNotaNotifikasiProduk', "UploadHalalController@getHALALNotaNotifikasiProduk");
     Route::post('/downloadHALALNotaNotifikasiProduk', "UploadHalalController@downloadHALALNotaNotifikasiProduk");
     Route::post('/postHALALNotaNotifikasiProduk', "UploadHalalController@postHALALNotaNotifikasiProduk");
     Route::post('/deleteHALALNotaNotifikasiProduk',"UploadHalalController@deleteHALALNotaNotifikasiProduk");
     //-----------------------------------------------------HALALNotaNotifikasiProduk--------------------------------------------------------------//

      //-----------------------------------------------------HALALPengendaliMakanan--------------------------------------------------------------//
    Route::get('/getHALALPengendaliMakanan', "UploadHalalController@getHALALPengendaliMakanan");
    Route::post('/downloadHALALPengendaliMakanan', "UploadHalalController@downloadHALALPengendaliMakanan");
    Route::post('/postHALALPengendaliMakanan', "UploadHalalController@postHALALPengendaliMakanan");
    Route::post('/deleteHALALPengendaliMakanan',"UploadHalalController@deleteHALALPengendaliMakanan");
    //-----------------------------------------------------HALALPengendaliMakanan--------------------------------------------------------------//

     //-----------------------------------------------------HALALPengesananHalal--------------------------------------------------------------//
     Route::get('/getHALALPengesananHalal', "UploadHalalController@getHALALPengesananHalal");
     Route::post('/downloadHALALPengesananHalal', "UploadHalalController@downloadHALALPengesananHalal");
     Route::post('/postHALALPengesananHalal', "UploadHalalController@postHALALPengesananHalal");
     Route::post('/deleteHALALPengesananHalal',"UploadHalalController@deleteHALALPengesananHalal");
     //-----------------------------------------------------HALALPengesananHalal--------------------------------------------------------------//

      //-----------------------------------------------------HALALPengilanganProduk--------------------------------------------------------------//
    Route::get('/getHALALPengilanganProduk', "UploadHalalController@getHALALPengilanganProduk");
    Route::post('/downloadHALALPengilanganProduk', "UploadHalalController@downloadHALALPengilanganProduk");
    Route::post('/postHALALPengilanganProduk', "UploadHalalController@postHALALPengilanganProduk");
    Route::post('/deleteHALALPengilanganProduk',"UploadHalalController@deleteHALALPengilanganProduk");
    //-----------------------------------------------------HALALPengilanganProduk--------------------------------------------------------------//

     //-----------------------------------------------------HALALPerakuanProduk--------------------------------------------------------------//
     Route::get('/getHALALPerakuanProduk', "UploadHalalController@getHALALPerakuanProduk");
     Route::post('/downloadHALALPerakuanProduk', "UploadHalalController@downloadHALALPerakuanProduk");
     Route::post('/postHALALPerakuanProduk', "UploadHalalController@postHALALPerakuanProduk");
     Route::post('/deleteHALALPerakuanProduk',"UploadHalalController@deleteHALALPerakuanProduk");
     //-----------------------------------------------------HALALPerakuanProduk--------------------------------------------------------------//

      //-----------------------------------------------------HALALRekodSembelihan--------------------------------------------------------------//
    Route::get('/getHALALRekodSembelihan', "UploadHalalController@getHALALRekodSembelihan");
    Route::post('/downloadHALALRekodSembelihan', "UploadHalalController@downloadHALALRekodSembelihan");
    Route::post('/postHALALRekodSembelihan', "UploadHalalController@postHALALRekodSembelihan");
    Route::post('/deleteHALALRekodSembelihan',"UploadHalalController@deleteHALALRekodSembelihan");
    //-----------------------------------------------------HALALRekodSembelihan--------------------------------------------------------------//

     //-----------------------------------------------------HALALRekodSertu--------------------------------------------------------------//
     Route::get('/getHALALRekodSertu', "UploadHalalController@getHALALRekodSertu");
     Route::post('/downloadHALALRekodSertu', "UploadHalalController@downloadHALALRekodSertu");
     Route::post('/postHALALRekodSertu', "UploadHalalController@postHALALRekodSertu");
     Route::post('/deleteHALALRekodSertu',"UploadHalalController@deleteHALALRekodSertu");
     //-----------------------------------------------------HALALRekodSertu--------------------------------------------------------------//

      //-----------------------------------------------------HALALSuratPerakuanJPV--------------------------------------------------------------//
    Route::get('/getHALALSuratPerakuanJPV', "UploadHalalController@getHALALSuratPerakuanJPV");
    Route::post('/downloadHALALSuratPerakuanJPV', "UploadHalalController@downloadHALALSuratPerakuanJPV");
    Route::post('/postHALALSuratPerakuanJPV', "UploadHalalController@postHALALSuratPerakuanJPV");
    Route::post('/deleteHALALSuratPerakuanJPV',"UploadHalalController@deleteHALALSuratPerakuanJPV");
    //-----------------------------------------------------HALALSuratPerakuanJPV--------------------------------------------------------------//

     //-----------------------------------------------------HALALSuratTauliahPenyembelih--------------------------------------------------------------//
     Route::get('/getHALALSuratTauliahPenyembelih', "UploadHalalController@getHALALSuratTauliahPenyembelih");
     Route::post('/downloadHALALSuratTauliahPenyembelih', "UploadHalalController@downloadHALALSuratTauliahPenyembelih");
     Route::post('/postHALALSuratTauliahPenyembelih', "UploadHalalController@postHALALSuratTauliahPenyembelih");
     Route::post('/deleteHALALSuratTauliahPenyembelih',"UploadHalalController@deleteHALALSuratTauliahPenyembelih");
     //-----------------------------------------------------HALALSuratTauliahPenyembelih--------------------------------------------------------------//

     
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



});

Route::get('/zipHAS', "UploadHASController@zipFolder");
Route::get('/zipHalal', "UploadHalalController@zipFolderHalal");


//////////////////////////////////////////////////////////ADMIN SIDE API///////////////////////////////////////////////////////////////////
Route::get('/zipHAScmpny{id?}', "companyController@zipHAS"); // ini admin side utk download all data
Route::get('/zipHalalcmpny{id?}', "companyController@zipHalal"); // ini admin side utk download all data
Route::get('/zipSupportDoc{id?}', "productController@downloadSupportDoc"); //ini dekat dalam template HAS File
Route::get('/getnewuser', "userController@getNewUser");
Route::get('/getcountdata', "userController@getCountData");
//////////////////////////////////////////////////////////ADMIN SIDE API///////////////////////////////////////////////////////////////////

Route::get('/logout',function (){
    Auth::logout();
    Session::flush();
    return Redirect::to('/');
    //return response()->json(['logout' =>true]);
});
Route::get('/customlogin',"authController@getCustomLogin");
Route::get('/getcklist',"migrationController@getCklist");

Route::get('/policy', function () {
    return view('policy');
});

Route::get('/{path?}', function () {
    return view('app');
})->where('path', '.*');