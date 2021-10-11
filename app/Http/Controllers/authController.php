<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\company;
use App\Models\personal_access_token;
use App\Models\subscription;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Carbon\Carbon;
use App\Models\AdvisorProfile;

class authController extends Controller
{

  private $status_code = 200;

    public function authenticate(Request $request)
    {
        $credentials;
        if($request->id){
            $id=decrypt($request->id);
            $request->merge([
                'cmpnyFK' => $id,
            ]);
            $credentials = $request->only('username', 'password','cmpnyFK');
        }
        else {$credentials = $request->only('username', 'password');}

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            //return redirect()->intended('dashboard');
            $user = Auth::user();
            $user->lastLoginIP = $request->getClientIp();
            $user->lastLogin =  now()->toDateTimeString();
            $user->save();

            $user->accesslvl=Auth::user()->getRoleLevel();

            return response()->json(['isSuccess' =>true,'session'=>$request->session()->all(),'user' =>Auth::user(),'accesslevel'=>Auth::user()->getRoleLevel(),'cmpny'=>Auth::user()->getCompany(),'advsr'=>Auth::user()->getAdvisor()]);
        }
        else{
            return response()->json(['isSuccess' =>false,'message'=>"Invalid Username and Password"],401);
        }
    }
    public function getUser(Request $request)
    {
        $usr=Auth::user();
        $usr->accesslvl=Auth::user()->getRoleLevel();
            return response()->json(['isSuccess' =>true,'session'=>$request->session()->all(),'user' =>$usr,'cmpny'=>Auth::user()->getCompany(),'accesslevel'=>Auth::user()->getRoleLevel(),'advsr'=>Auth::user()->getAdvisor()]);
    }

    public function getCustomLogin()
    {
        $cmpny=company::select('cmpnyPK as id','cmpnyLink','cmpnyConfig')->whereNotNull('cmpnyLink')->get();
        foreach ($cmpny as $c) {
            $c->cmpnyConfig=json_decode($c->cmpnyConfig);
            $c->id=encrypt($c->id);
            // $c->cmpnyPK=encrypt($c->cmpnyPK);
        }
        return response()->json($cmpny);
    }

    
    public function login(Request $request)
  {
  try {
    
    $credentials = $request->only('username', 'password');
    if (!Auth::attempt($credentials)) {
      
      return response()->json(['isSuccess' =>false,'message'=>"Invalid Username and Password"],401);
    }
    $user = Auth::user();
    if ( ! Hash::check($request->password, $user->password, [])) {
       throw new \Exception('Error in Login');
    }
    $existtoken=$user->tokens()->first();

    if($existtoken){

        $existtoken->delete();

    }
    $tokenResult = $user->createToken('authToken')->plainTextToken;

    $user = Auth::user();
    $user->lastLoginIP = $request->getClientIp();
    $user->lastLogin =  now()->toDateTimeString();
    $user->save();

    $subcr= subscription::select('dateStart','dateEnd')->where('cmpnyFK',Auth::user()->getCompany()->cmpnyPK)->where('dateStart', '<=', Carbon::now())->where('dateEnd', '>=', Carbon::now())->orderBy('dateEnd','desc')->first();
    return response()->json(['isSuccess' =>true,'user' =>Auth::user(),'accesslevel'=>Auth::user()->getRoleLevel(),'cmpny'=>Auth::user()->getCompany(),'access_token' => $tokenResult,'subcr'=>$subcr]);
  
  } catch (Exception $error) {
    return response()->json([
      'isSuccess'=>false,
      'status_code' => 500,
      'message' => 'Error in Login',
      'error' => $error,
    ]);
  }
}

public function userSignUp(Request $request) {
  $validator              =        Validator::make($request->all(), [
      "name"         =>          "required",
      "username"      =>          "required",
      "password"        =>          "required",
  ]);

  if($validator->fails()) {
      return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
  }

  // $password = Hash::make("mhg2021");

  $userDataArray          =           array(
      "name"              =>          $request->name,
      "username"          =>          $request->username,
      "password"          =>          Hash::make($request->password)
  );

  $user_status            =           User::where("username", $request->username)->first();

  if(!is_null($user_status)) {
    //  return response()->json(["status" => "failed", "success" => false, "message" => "Username already registered"]);

      // $sessionid=Auth::user()->id; //declare first
      // $advisordetails = new AdvisorProfile;
      // $advisordetails->ad_fk_company_id = $sessionid;


    return response()->json(['isSuccess' =>false,'message'=>"Pengguna emel ini telah berdaftar didalam sistem"],417);

  }

  $user                   =           User::create($userDataArray);

  if(!is_null($user)) {
      // return response()->json(["status" => $this->status_code, "success" => true, "message" => "Registration successful", "data" => $user]);
      
      return response()->json(["status" => $this->status_code, "isSuccess" => true, "message" => "Pendaftaran berjaya. Sila masukkan Emel dan Katalaluan yang telah didaftarkan.", "data" => $user]);

  }

  else {
      // return response()->json(["status" => "failed", "success" => false, "message" => "Failed to register"]);
      return response()->json(['isSuccess' =>false,'message'=>"Pendaftaran gagal disebabkan oleh masalah teknikal. Sila hubungi kami bagi memaklumkan perkara ini."],401);

  }
}

public function advisorSignUp(Request $request) {
  $validator              =        Validator::make($request->all(), [
      "name"         =>          "required",
      "username"      =>          "required",
      "password"        =>          "required",
      "cmpnyFK"         =>          "required",
      "roleFK"          =>          "required",
  ]);

  if($validator->fails()) {
      return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
  }

  $userDataArray          =           array(
      "name"              =>          $request->name,
      "username"          =>          $request->username,
      "password"          =>          Hash::make($request->password),
      "cmpnyFK"           =>          $request->cmpnyFK,
      "roleFK"            =>          $request->roleFK,
  );

  $user_status            =           User::where("username", $request->username)->first();

  if(!is_null($user_status)) {
    return response()->json(['isSuccess' =>false,'message'=>"Pengguna emel ini telah berdaftar didalam sistem"],417);

  }

  $user                   =           User::create($userDataArray);

  $advsr = new AdvisorProfile;
  $user->AdvUser()->save($advsr);

  if(!is_null($user)) {
      
      return response()->json(["status" => $this->status_code, "isSuccess" => true, "message" => "Pendaftaran berjaya. Sila masukkan Emel dan Katalaluan yang telah didaftarkan.", "data" => $user]);

  }

  else {
      return response()->json(['isSuccess' =>false,'message'=>"Pendaftaran gagal disebabkan oleh masalah teknikal. Sila hubungi kami bagi memaklumkan perkara ini."],401);

  }
}


}
