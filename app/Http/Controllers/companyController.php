<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\company;
use  App\Models\Advisor;
use  App\Models\User;
use Illuminate\Support\Facades\Auth;
use DB;
use ZipArchive;
use File;
use App\Models\cmpnyPremise;
use App\Models\cmpnyIHC;
use App\Models\cmpnyTraining;

class companyController extends Controller
{
    //
    function getAllCompany(){
        
        // $cmpny= company::get();
        $cmpny = DB::table('companies')
            ////////////////////////////////////////////////////////////join dengan HAS File////////////////////////////////////////////
            ->Leftjoin('has_halalpolicy', 'companies.cmpnyPK', '=', 'has_halalpolicy.cmpnyFK')
            ->Leftjoin('has_orgchart', 'companies.cmpnyPK', '=', 'has_orgchart.cmpnyFK')
            ->Leftjoin('has_tor', 'companies.cmpnyPK', '=', 'has_tor.cmpnyFK')
            ->Leftjoin('has_empletter', 'companies.cmpnyPK', '=', 'has_empletter.cmpnyFK')
            ->Leftjoin('has_audit', 'companies.cmpnyPK', '=', 'has_audit.cmpnyFK')
            ->Leftjoin('has_halalrisk', 'companies.cmpnyPK', '=', 'has_halalrisk.cmpnyFK')
            ->Leftjoin('has_training', 'companies.cmpnyPK', '=', 'has_training.cmpnyFK')
            ->Leftjoin('tbl_hc_has_checklist', 'companies.cmpnyPK', '=', 'tbl_hc_has_checklist.hc_fk_company_id')
            ->Leftjoin('tbl_hla_has_lab_analysis', 'companies.cmpnyPK', '=', 'tbl_hla_has_lab_analysis.hla_fk_company_id')
            ->Leftjoin('tbl_hpr_has_product_recall', 'companies.cmpnyPK', '=', 'tbl_hpr_has_product_recall.hpr_fk_company_id')
            ->Leftjoin('tbl_hrm_has_raw_mat', 'companies.cmpnyPK', '=', 'tbl_hrm_has_raw_mat.hrm_fk_company_id')
            ->Leftjoin('tbl_hsrm_has_sop_raw_mat', 'companies.cmpnyPK', '=', 'tbl_hsrm_has_sop_raw_mat.hsrm_fk_company_id')
            ->Leftjoin('tbl_hss_has_sop_sertu', 'companies.cmpnyPK', '=', 'tbl_hss_has_sop_sertu.hss_fk_company_id')
            ->Leftjoin('tbl_hst_has_sop_traceability', 'companies.cmpnyPK', '=', 'tbl_hst_has_sop_traceability.hst_fk_company_id')
            ->Leftjoin('tbl_hs_has_sertu', 'companies.cmpnyPK', '=', 'tbl_hs_has_sertu.hs_fk_company_id')
            ->Leftjoin('tbl_ht_has_traceability', 'companies.cmpnyPK', '=', 'tbl_ht_has_traceability.ht_fk_company_id')
            ////////////////////////////////////////////////////////////join dengan HAS File////////////////////////////////////////////
            
            ////////////////////////////////////////////////////////////join dengan HAS File////////////////////////////////////////////
            ->Leftjoin('halal_batchmanufacturing', 'companies.cmpnyPK', '=', 'halal_batchmanufacturing.cmpnyFK')
            ->Leftjoin('halal_certificatejpv', 'companies.cmpnyPK', '=', 'halal_certificatejpv.cmpnyFK')
            ->Leftjoin('halal_employeehealthrecords', 'companies.cmpnyPK', '=', 'halal_employeehealthrecords.cmpnyFK')
            ->Leftjoin('halal_foodhandler', 'companies.cmpnyPK', '=', 'halal_foodhandler.cmpnyFK')
            ->Leftjoin('halal_halaltracking', 'companies.cmpnyPK', '=', 'halal_halaltracking.cmpnyFK')
            ->Leftjoin('halal_manufacturerlicense', 'companies.cmpnyPK', '=', 'halal_manufacturerlicense.cmpnyFK')
            ->Leftjoin('halal_msdocuments', 'companies.cmpnyPK', '=', 'halal_msdocuments.cmpnyFK')
            ->Leftjoin('halal_notnobfk', 'companies.cmpnyPK', '=', 'halal_notnobfk.cmpnyFK')
            ->Leftjoin('halal_operationsflow', 'companies.cmpnyPK', '=', 'halal_operationsflow.cmpnyFK')
            ->Leftjoin('halal_productmanufacturing', 'companies.cmpnyPK', '=', 'halal_productmanufacturing.cmpnyFK')
            ->Leftjoin('halal_productregistration', 'companies.cmpnyPK', '=', 'halal_productregistration.cmpnyFK')
            ->Leftjoin('halal_serturecords', 'companies.cmpnyPK', '=', 'halal_serturecords.cmpnyFK')
            ->Leftjoin('halal_slaughterercredentials', 'companies.cmpnyPK', '=', 'halal_slaughterercredentials.cmpnyFK')
            ->Leftjoin('halal_slaughterrecords', 'companies.cmpnyPK', '=', 'halal_slaughterrecords.cmpnyFK')
            ->Leftjoin('halal_warehousinglicense', 'companies.cmpnyPK', '=', 'halal_warehousinglicense.cmpnyFK')

            ->Leftjoin('tbl_hi_halal_invois', 'companies.cmpnyPK', '=', 'tbl_hi_halal_invois.hi_fk_company_id')
            ->Leftjoin('tbl_hjh_halal_jaminan_halal', 'companies.cmpnyPK', '=', 'tbl_hjh_halal_jaminan_halal.hjh_fk_company_id')
            ->Leftjoin('tbl_hlp_halal_lesen_perniagaan', 'companies.cmpnyPK', '=', 'tbl_hlp_halal_lesen_perniagaan.hlp_fk_company_id')
            ->Leftjoin('tbl_hmp_halal_maklumat_pekerja', 'companies.cmpnyPK', '=', 'tbl_hmp_halal_maklumat_pekerja.hmp_fk_company_id')
            ->Leftjoin('tbl_hpc_halal_pest_control', 'companies.cmpnyPK', '=', 'tbl_hpc_halal_pest_control.hpc_fk_company_id')
            ->Leftjoin('tbl_hpi_halal_permit_import', 'companies.cmpnyPK', '=', 'tbl_hpi_halal_permit_import.hpi_fk_company_id')
            ->Leftjoin('tbl_hpk_halal_penyata_kewangan', 'companies.cmpnyPK', '=', 'tbl_hpk_halal_penyata_kewangan.hpk_fk_company_id')
            ->Leftjoin('tbl_hpl_halal_permohonan_lengkap', 'companies.cmpnyPK', '=', 'tbl_hpl_halal_permohonan_lengkap.hpl_fk_company_id')
            ->Leftjoin('tbl_hpl_halal_peta_lokasi', 'companies.cmpnyPK', '=', 'tbl_hpl_halal_peta_lokasi.hpl_fk_company_id')
            ->Leftjoin('tbl_hpp_halal_pengeluaran_produk', 'companies.cmpnyPK', '=', 'tbl_hpp_halal_pengeluaran_produk.hpp_fk_company_id')
            ->Leftjoin('tbl_hp_halal_pembungkusan', 'companies.cmpnyPK', '=', 'tbl_hp_halal_pembungkusan.hp_fk_company_id')
            ->Leftjoin('tbl_hsa_halal_susun_atur', 'companies.cmpnyPK', '=', 'tbl_hsa_halal_susun_atur.hsa_fk_company_id')
            ->Leftjoin('tbl_hsh_halal_sijil_halal', 'companies.cmpnyPK', '=', 'tbl_hsh_halal_sijil_halal.hsh_fk_company_id')
            ->Leftjoin('tbl_hsk_halal_surat_kkm', 'companies.cmpnyPK', '=', 'tbl_hsk_halal_surat_kkm.hsk_fk_company_id')
            ->Leftjoin('tbl_hsl_halal_surat_lantikan', 'companies.cmpnyPK', '=', 'tbl_hsl_halal_surat_lantikan.hsl_fk_company_id')
            ->Leftjoin('tbl_hsp_halal_sijil_pendaftaran', 'companies.cmpnyPK', '=', 'tbl_hsp_halal_sijil_pendaftaran.hsp_fk_company_id')
            ->Leftjoin('tbl_hst_halal_suntikan_thypoid', 'companies.cmpnyPK', '=', 'tbl_hst_halal_suntikan_thypoid.hst_fk_company_id')
            ->Leftjoin('users', 'companies.cmpnyPK', '=', 'users.cmpnyFK')
            ///////////////////////////////////////////////////////////join dengan HAS File////////////////////////////////////////////

            ->select('companies.cmpnyPK','companies.cmpnyName','companies.cmpnyConfig','companies.cmpnyDetails','tbl_hc_has_checklist.hc_file_name','tbl_hla_has_lab_analysis.hla_file_name','tbl_hpr_has_product_recall.hpr_file_name','tbl_hrm_has_raw_mat.hrm_file_name','tbl_hsrm_has_sop_raw_mat.hsrm_file_name','tbl_hss_has_sop_sertu.hss_file_name','tbl_hst_has_sop_traceability.hst_file_name','tbl_hs_has_sertu.hs_file_name','tbl_ht_has_traceability.ht_file_name','has_halalpolicy.halalpolicy_filename','has_orgchart.orgchart_filename','has_tor.tor_filename','has_empletter.empletter_filename','has_audit.audit_filename','has_halalrisk.halalrisk_filename','has_training.training_filename','tbl_hc_has_checklist.date AS date_checklist','tbl_hla_has_lab_analysis.date AS date_lab','tbl_hpr_has_product_recall.date AS date_recall','tbl_hrm_has_raw_mat.date AS date_raw_mat','tbl_hsrm_has_sop_raw_mat.date AS date_sop_raw_mat','tbl_hss_has_sop_sertu.date AS date_sop_sertu','tbl_hst_has_sop_traceability.date AS date_sop_traceability','tbl_hs_has_sertu.date AS date_sertu','tbl_ht_has_traceability.date AS date_traceability','has_halalpolicy.date AS date_halal_policy','has_orgchart.date AS date_orgchart','has_tor.date AS date_tor','has_empletter.date AS date_empletter','has_audit.date AS date_audit','has_halalrisk.date AS date_halal_risk','has_training.date AS date_training',
            
            'halal_batchmanufacturing.filename AS batch_filename','halal_certificatejpv.filename AS jpv_filename','halal_employeehealthrecords.filename AS emphealth_filename','halal_foodhandler.filename AS foodhandler_filename','halal_halaltracking.filename AS tracking_filename','halal_manufacturerlicense.filename AS manu_filename','halal_msdocuments.filename AS ms_filename','halal_notnobfk.filename AS bfk_filename','halal_operationsflow.filename AS flow_filename','halal_productmanufacturing.filename AS productmanu_filename','halal_productregistration.filename AS productreg_filename','halal_serturecords.filename AS sertu_filename','halal_slaughterercredentials.filename AS slaughter_filename','halal_slaughterrecords.filename AS slaughterrec_filename','halal_warehousinglicense.filename AS warehouse_filename',
            'tbl_hi_halal_invois.hi_filename','tbl_hjh_halal_jaminan_halal.hjh_filename','tbl_hlp_halal_lesen_perniagaan.hlp_filename','tbl_hmp_halal_maklumat_pekerja.hmp_filename','tbl_hpc_halal_pest_control.hpc_filename','tbl_hpi_halal_permit_import.hpi_filename','tbl_hpk_halal_penyata_kewangan.hpk_filename','tbl_hpl_halal_permohonan_lengkap.hpl_filename','tbl_hpl_halal_peta_lokasi.hpl_filename AS hplk_filename','tbl_hpp_halal_pengeluaran_produk.hpp_filename','tbl_hp_halal_pembungkusan.hp_filename','tbl_hsa_halal_susun_atur.hsa_filename','tbl_hsh_halal_sijil_halal.hsh_filename','tbl_hsk_halal_surat_kkm.hsk_filename','tbl_hsl_halal_surat_lantikan.hsl_filename','tbl_hsp_halal_sijil_pendaftaran.hsp_filename','tbl_hst_halal_suntikan_thypoid.hst_filename','users.created_at','users.username')
            ->groupBy('companies.cmpnyName')
            ->where([
                ['users.created_at', '>', '2021-10-24'],
            ])
            ->get();

        foreach ($cmpny as $c) {
            $c->cmpnyDetails=json_decode($c->cmpnyDetails);
            $c->cmpnyConfig=json_decode($c->cmpnyConfig);
            // $c->cmpnyPK=encrypt($c->cmpnyPK);
        }
        return response()->json($cmpny);
    }
    
    public function getCompanyAdvisorRequest(){ //list of the company yang request kepada advisor
        
        $sessionid=Auth::user()->id;

        // $productdetail= productdetail::get();

        $cmpny = DB::table('tbl_ac_advisor_has_company')
            ->join('users', 'tbl_ac_advisor_has_company.ad_fk_user_id', '=', 'users.id')
            ->join('companies', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'companies.cmpnyPK')
            ->select('tbl_ac_advisor_has_company.id','companies.cmpnyPK','companies.cmpnyName','companies.cmpnyDetails','companies.cmpnyConfig','ad_status')
            ->where('ad_fk_user_id',$sessionid)
            ->where('ad_status', '=', 0)
            ->get(); 

        foreach ($cmpny as $c) {
            $c->cmpnyDetails=json_decode($c->cmpnyDetails);
            $c->cmpnyConfig=json_decode($c->cmpnyConfig);
            // $c->cmpnyPK=encrypt($c->cmpnyPK);
        }
        return response()->json($cmpny);
    }
 
    
    function getCompanyAdvisor(){ //list of the company yang diassign kepada advisor

        $sessionid=Auth::user()->id;

        // $productdetail= productdetail::get();
        $cmpny = DB::table('tbl_ac_advisor_has_company')
            ->join('users', 'tbl_ac_advisor_has_company.ad_fk_user_id', '=', 'users.id')
            ->join('companies', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'companies.cmpnyPK')
            ////////////////////////////////////////////////////////////join dengan HAS File////////////////////////////////////////////
            ->Leftjoin('has_halalpolicy', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_halalpolicy.cmpnyFK')
            ->Leftjoin('has_orgchart', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_orgchart.cmpnyFK')
            ->Leftjoin('has_tor', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_tor.cmpnyFK')
            ->Leftjoin('has_empletter', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_empletter.cmpnyFK')
            ->Leftjoin('has_audit', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_audit.cmpnyFK')
            ->Leftjoin('has_halalrisk', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_halalrisk.cmpnyFK')
            ->Leftjoin('has_training', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'has_training.cmpnyFK')
            ->Leftjoin('tbl_hc_has_checklist', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hc_has_checklist.hc_fk_company_id')
            ->Leftjoin('tbl_hla_has_lab_analysis', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hla_has_lab_analysis.hla_fk_company_id')
            ->Leftjoin('tbl_hpr_has_product_recall', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hpr_has_product_recall.hpr_fk_company_id')
            ->Leftjoin('tbl_hrm_has_raw_mat', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hrm_has_raw_mat.hrm_fk_company_id')
            ->Leftjoin('tbl_hsrm_has_sop_raw_mat', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hsrm_has_sop_raw_mat.hsrm_fk_company_id')
            ->Leftjoin('tbl_hss_has_sop_sertu', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hss_has_sop_sertu.hss_fk_company_id')
            ->Leftjoin('tbl_hst_has_sop_traceability', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hst_has_sop_traceability.hst_fk_company_id')
            ->Leftjoin('tbl_hs_has_sertu', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hs_has_sertu.hs_fk_company_id')
            ->Leftjoin('tbl_ht_has_traceability', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_ht_has_traceability.ht_fk_company_id')
            ////////////////////////////////////////////////////////////join dengan HAS File////////////////////////////////////////////
            
            ////////////////////////////////////////////////////////////join dengan HAS File////////////////////////////////////////////
            ->Leftjoin('halal_batchmanufacturing', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_batchmanufacturing.cmpnyFK')
            ->Leftjoin('halal_certificatejpv', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_certificatejpv.cmpnyFK')
            ->Leftjoin('halal_employeehealthrecords', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_employeehealthrecords.cmpnyFK')
            ->Leftjoin('halal_foodhandler', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_foodhandler.cmpnyFK')
            ->Leftjoin('halal_halaltracking', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_halaltracking.cmpnyFK')
            ->Leftjoin('halal_manufacturerlicense', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_manufacturerlicense.cmpnyFK')
            ->Leftjoin('halal_msdocuments', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_msdocuments.cmpnyFK')
            ->Leftjoin('halal_notnobfk', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_notnobfk.cmpnyFK')
            ->Leftjoin('halal_operationsflow', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_operationsflow.cmpnyFK')
            ->Leftjoin('halal_productmanufacturing', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_productmanufacturing.cmpnyFK')
            ->Leftjoin('halal_productregistration', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_productregistration.cmpnyFK')
            ->Leftjoin('halal_serturecords', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_serturecords.cmpnyFK')
            ->Leftjoin('halal_slaughterercredentials', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_slaughterercredentials.cmpnyFK')
            ->Leftjoin('halal_slaughterrecords', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_slaughterrecords.cmpnyFK')
            ->Leftjoin('halal_warehousinglicense', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'halal_warehousinglicense.cmpnyFK')
            
            ->Leftjoin('tbl_hi_halal_invois', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hi_halal_invois.hi_fk_company_id')
            ->Leftjoin('tbl_hjh_halal_jaminan_halal', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hjh_halal_jaminan_halal.hjh_fk_company_id')
            ->Leftjoin('tbl_hlp_halal_lesen_perniagaan', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hlp_halal_lesen_perniagaan.hlp_fk_company_id')
            ->Leftjoin('tbl_hmp_halal_maklumat_pekerja', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hmp_halal_maklumat_pekerja.hmp_fk_company_id')
            ->Leftjoin('tbl_hpc_halal_pest_control', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hpc_halal_pest_control.hpc_fk_company_id')
            ->Leftjoin('tbl_hpi_halal_permit_import', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hpi_halal_permit_import.hpi_fk_company_id')
            ->Leftjoin('tbl_hpk_halal_penyata_kewangan', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hpk_halal_penyata_kewangan.hpk_fk_company_id')
            ->Leftjoin('tbl_hpl_halal_permohonan_lengkap', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hpl_halal_permohonan_lengkap.hpl_fk_company_id')
            ->Leftjoin('tbl_hpl_halal_peta_lokasi', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hpl_halal_peta_lokasi.hpl_fk_company_id')
            ->Leftjoin('tbl_hpp_halal_pengeluaran_produk', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hpp_halal_pengeluaran_produk.hpp_fk_company_id')
            ->Leftjoin('tbl_hp_halal_pembungkusan', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hp_halal_pembungkusan.hp_fk_company_id')
            ->Leftjoin('tbl_hsa_halal_susun_atur', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hsa_halal_susun_atur.hsa_fk_company_id')
            ->Leftjoin('tbl_hsh_halal_sijil_halal', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hsh_halal_sijil_halal.hsh_fk_company_id')
            ->Leftjoin('tbl_hsk_halal_surat_kkm', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hsk_halal_surat_kkm.hsk_fk_company_id')
            ->Leftjoin('tbl_hsl_halal_surat_lantikan', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hsl_halal_surat_lantikan.hsl_fk_company_id')
            ->Leftjoin('tbl_hsp_halal_sijil_pendaftaran', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hsp_halal_sijil_pendaftaran.hsp_fk_company_id')
            ->Leftjoin('tbl_hst_halal_suntikan_thypoid', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'tbl_hst_halal_suntikan_thypoid.hst_fk_company_id')
            ////////////////////////////////////////////////////////////join dengan HAS File////////////////////////////////////////////
            ->select('tbl_ac_advisor_has_company.ad_fk_company_id','companies.cmpnyName','companies.cmpnyConfig',
            'tbl_hc_has_checklist.hc_file_name','tbl_hla_has_lab_analysis.hla_file_name','tbl_hpr_has_product_recall.hpr_file_name'
                    ,'tbl_hrm_has_raw_mat.hrm_file_name','tbl_hsrm_has_sop_raw_mat.hsrm_file_name','tbl_hss_has_sop_sertu.hss_file_name'
                    ,'tbl_hst_has_sop_traceability.hst_file_name','tbl_hs_has_sertu.hs_file_name','tbl_ht_has_traceability.ht_file_name','has_halalpolicy.halalpolicy_filename','has_orgchart.orgchart_filename','has_tor.tor_filename','has_empletter.empletter_filename','has_audit.audit_filename','has_halalrisk.halalrisk_filename','has_training.training_filename',
                    
                    'halal_batchmanufacturing.filename','halal_certificatejpv.filename','halal_employeehealthrecords.filename','halal_foodhandler.filename','halal_halaltracking.filename','halal_manufacturerlicense.filename','halal_msdocuments.filename','halal_notnobfk.filename','halal_operationsflow.filename','halal_productmanufacturing.filename','halal_productregistration.filename','halal_serturecords.filename','halal_slaughterercredentials.filename','halal_slaughterrecords.filename','halal_warehousinglicense.filename',

                    'tbl_hi_halal_invois.hi_filename','tbl_hjh_halal_jaminan_halal.hjh_filename','tbl_hlp_halal_lesen_perniagaan.hlp_filename','tbl_hmp_halal_maklumat_pekerja.hmp_filename','tbl_hpc_halal_pest_control.hpc_filename','tbl_hpi_halal_permit_import.hpi_filename','tbl_hpk_halal_penyata_kewangan.hpk_filename','tbl_hpl_halal_permohonan_lengkap.hpl_filename','tbl_hpl_halal_peta_lokasi.hpl_filename','tbl_hpp_halal_pengeluaran_produk.hpp_filename','tbl_hp_halal_pembungkusan.hp_filename','tbl_hsa_halal_susun_atur.hsa_filename','tbl_hsh_halal_sijil_halal.hsh_filename','tbl_hsk_halal_surat_kkm.hsk_filename','tbl_hsl_halal_surat_lantikan.hsl_filename','tbl_hsp_halal_sijil_pendaftaran.hsp_filename','tbl_hst_halal_suntikan_thypoid.hst_filename',
                    )
            ->where('tbl_ac_advisor_has_company.ad_fk_user_id',$sessionid)
            ->where('tbl_ac_advisor_has_company.ad_status', '=', 1)
            ->get(); 

        return response()->json($cmpny);
    }

    function getAdvisorClient(){ //data advisor untuk client tengok
        
        // $productdetail= productdetail::get();
        $sessionid=Auth::user()->getCompany()->cmpnyPK;

        $cmpny = DB::table('users')
            ->leftJoin('tbl_ac_advisor_has_company', 'users.id', '=', 'tbl_ac_advisor_has_company.ad_fk_user_id')
            ->leftJoin('tbl_adl_advisor_level','tbl_adl_advisor_level.adl_fk_user_id','users.id')
            ->leftJoin('tbl_level','tbl_adl_advisor_level.adl_fk_level','tbl_level.id')
            ->leftJoin('advisor','users.id','advisor.userFK')
            ->leftJoin('tbl_ar_advisor_rating','users.id','tbl_ar_advisor_rating.ar_fk_advisor_id')
            // ->where('ad_status', '<', 1)created_atcreated_at
            ->select('users.id','users.name',DB::raw('count(case when ad_status = 1 then 1 else null end) as total'),DB::raw('(SUM(ar_rating) / count(ar_fk_advisor_id))as rating'),'users.created_at','users.username','tbl_ac_advisor_has_company.ad_fk_user_id','tbl_ac_advisor_has_company.ad_status','level_name','level_max_user','advisor.advImg','tbl_ac_advisor_has_company.ad_fk_company_id')
            ->groupBy('users.name')
            ->where([
                ['roleFK', '=', 3],
                ['level_max_user', '<>', ''],]) // where advisor level is not null
            ->get(); 

            foreach ($cmpny as $c){
                $c->advImg=json_decode($c->advImg);
            }

        return response()->json($cmpny);
    }

    function getAdSelected(){ //data advisor yang dah sah untuk client tengok
        

        $sessionid=Auth::user()->getCompany()->cmpnyPK;
        // $productdetail= productdetail::get();
        $advisor = DB::table('tbl_ac_advisor_has_company')
            ->join('users', 'tbl_ac_advisor_has_company.ad_fk_user_id', '=', 'users.id')
            ->leftJoin('advisor','tbl_ac_advisor_has_company.ad_fk_user_id','advisor.userFK')
            ->join('companies', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'companies.cmpnyPK')
            ->select('tbl_ac_advisor_has_company.ad_fk_user_id','users.id','users.name','users.username','tbl_ac_advisor_has_company.ad_status','tbl_ac_advisor_has_company.ad_memo','advisor.advImg')
            ->where('ad_fk_company_id', $sessionid)
            //->where('ad_status', '=',1)
            ->get(); 

            foreach ($advisor as $c){
                $c->advImg=json_decode($c->advImg);
            }

        return response()->json($advisor);
    }

    function getCArecord(){ //data all advisor
        

        //$sessionid=Auth::user()->getCompany()->cmpnyPK;
        // $productdetail= productdetail::get();
        $advisor = DB::table('tbl_ac_advisor_has_company')
            ->join('users', 'tbl_ac_advisor_has_company.ad_fk_user_id', '=', 'users.id')
            ->leftJoin('advisor','tbl_ac_advisor_has_company.ad_fk_user_id','advisor.userFK')
            ->leftJoin('tbl_ar_advisor_rating','users.id','tbl_ar_advisor_rating.ar_fk_advisor_id')
            ->join('companies', 'tbl_ac_advisor_has_company.ad_fk_company_id', '=', 'companies.cmpnyPK')
            ->select('tbl_ac_advisor_has_company.ad_fk_user_id','users.name','users.username','tbl_ac_advisor_has_company.ad_status','tbl_ac_advisor_has_company.ad_memo','advisor.advImg','companies.cmpnyName','tbl_ar_advisor_rating.ar_rating','tbl_ar_advisor_rating.ar_comment')
            // ->sortBy('tbl_ac_advisor_has_company.ad_fk_user_id')
            ->orderBy("name")
            ->get(); 

            foreach ($advisor as $c){
                $c->advImg=json_decode($c->advImg);
            }

        return response()->json($advisor);
    }

    function getStaffCompany($id){
        // $id=decrypt($id);

        $usr= User::where('cmpnyFK',$id)->get();
        // foreach ($cmpny as $c) {
        //     $c->cmpnyDetails=json_decode($c->cmpnyDetails);
        //     $c->cmpnyPK=encrypt($c->cmpnyPK);
        // }
        return response()->json($usr);
    }

    // function updCompany(Request $request){    
        
    //     $cmpny=  new company;
    //     $cmpny->cmpnyName=$request->cmpnyName;
    //     $cmpny->cmpnyDetails=json_encode($request->cmpnyDetails);
    //     $cmpny->cmpnyLink=$request->cmpnyLink;
    //     $cmpny->cmpnyConfig=json_encode($request->cmpnyConfig);
    //     $cmpny->save();
        
    //     $cmpny->cmpnyDetails=$request->cmpnyDetails;
    //     $cmpny->cmpnyConfig=$request->cmpnyConfig;
    //     return response()->json($cmpny);
    // }

    function updCompany(Request $request){    
        
        $cmpny=company::where('cmpnyPK',$request->id)->first();
        $cmpny->cmpnyName=$request->cmpnyName;
        $cmpny->cmpnyRefNo=$request->cmpnyRefNo;
        $cmpny->cmpnyDetails=json_encode($request->cmpnyDetails);
        $cmpny->cmpnyConfig=json_encode($request->cmpnyConfig);
        $cmpny->save();
        
        $cmpny->cmpnyDetails=$request->cmpnyDetails;
        $cmpny->cmpnyConfig=$request->cmpnyConfig;
        return response()->json($cmpny);
    }

    function registerCompany(Request $request){    
        
        $cmpny_status=company::where('cmpnyName',$request->cmpnyName)->first();

        if(!is_null($cmpny_status)) {
            return response()->json(['isSuccess' =>false,'message'=>"Nama syarikat '".$request->cmpnyName."' telah berdaftar didalam sistem"],417);
        }

        $cmpny= new company;
        $cmpny->cmpnyName=$request->cmpnyName;
        $cmpny->cmpnyDetails=json_encode($request->cmpnyDetails);
        $cmpny->save();
        $cmpny->cmpnyDetails=$request->cmpnyDetails;
      
        $user = Auth::user();
        $user->cmpnyFK = $cmpny->cmpnyPK;
        $user->save();

        return response()->json(['isSuccess' =>true,'session'=>$request->session()->all(),'user' =>$user,'cmpny'=>Auth::user()->getCompany(),'accesslevel'=>Auth::user()->getRoleLevel()]);
      }

      function addPremise(Request $request){
        $cmpny=dechex($request->cmpnyid);
        $data;
        if(Storage::exists($cmpny.'\data\prms')){
            $contents = Storage::get($cmpny.'\data\prms');
            $data=$this->unencodeMaster($contents);
            $key=$request->id;
            // $key=array_search($request->id, array_column($data, 'id'));
            if($key){
                if($request->action=="delete"){
                    unset( $data->{$key});
                }
                else{
                    $data->{$key}=$request->data;
                }
            }
            else{
                $keylist=array_keys(get_object_vars($data));
            $lastkey=end($keylist);
            $key=(int)substr($lastkey,1)+1;
            $data->{'p'.$key}=$request->data;
            }
        }
        else{
            $data = (object)['p1'=>$request->data];
        }
        
        Storage::put($cmpny.'\data\prms', $this->encodeMaster($data));
       
       return response()->json($data);
        // array_search($post_title, array_column($data, 'id'));
    }

    function addIHC(Request $request){
        $cmpny=dechex($request->cmpnyid);
        $data;
        if(Storage::exists($cmpny.'\data\ihc')){
            $contents = Storage::get($cmpny.'\data\ihc');
            $data=$this->unencodeMaster($contents);
            $key=$request->id;
            // $key=array_search($request->id, array_column($data, 'id'));
            if($key){
                if($request->action=="delete"){
                    unset( $data->{$key});
                }
                else{
                    $data->{$key}=$request->data;
                }
            }
            else{
                $keylist=array_keys(get_object_vars($data));
            $lastkey=end($keylist);
            $key=(int)substr($lastkey,1)+1;
            $data->{'p'.$key}=$request->data;
            }
        }
        else{
            $data = (object)['p1'=>$request->data];
        }
        
        Storage::put($cmpny.'\data\ihc', $this->encodeMaster($data));
       
       return response()->json($data);
        // array_search($post_title, array_column($data, 'id'));
    }

    function addTraining(Request $request){
        $cmpny=dechex($request->cmpnyid);
        $data;
        if(Storage::exists($cmpny.'\data\training')){
            $contents = Storage::get($cmpny.'\data\training');
            $data=$this->unencodeMaster($contents);
            $key=$request->id;
            // $key=array_search($request->id, array_column($data, 'id'));
            if($key){
                if($request->action=="delete"){
                    unset( $data->{$key});
                }
                else{
                    $data->{$key}=$request->data;
                }
            }
            else{
                $keylist=array_keys(get_object_vars($data));
            $lastkey=end($keylist);
            $key=(int)substr($lastkey,1)+1;
            $data->{'p'.$key}=$request->data;
            }
        }
        else{
            $data = (object)['p1'=>$request->data];
          
        }

        Storage::put($cmpny.'\data\training', $this->encodeMaster($data));
       
       return response()->json($data);
        // array_search($post_title, array_column($data, 'id'));
    }

    public function fileUpload(Request $req){
        $req->validate([
        'file' => 'required|mimes:csv,txt,xlx,xls,pdf|max:2048'
        ]);

        $fileModel = new File;

        if($req->file()) {
            $fileName = time().'_'.$req->file->getClientOriginalName();
            $filePath = $req->file('file')->storeAs('uploads', $fileName, 'public');

            $fileModel->name = time().'_'.$req->file->getClientOriginalName();
            $fileModel->file_path = '/storage/' . $filePath;
            $fileModel->save();

            return back()
            ->with('success','File has been uploaded.')
            ->with('file', $fileName);
        }
   }


   public function zipHAS($id)
   {
       $id=$id;
       $ENcmpnyPK=dechex($id);
    //    $cmpnyName=Auth::user()->getCompany()->cmpnyName;

       $zip = new ZipArchive;
       $fileName = storage_path('app/cache/HASFile_'.$id.'.zip');
       $file = ('HASFILE/').$id;
       if($zip->open($fileName,ZipArchive::CREATE) === TRUE)
       {
           $files = File::files(storage_path('app/'.$ENcmpnyPK.'/HASFILE/'));
           foreach($files as $key => $value){
               $relativeNameinZipFile = basename($value);
               $zip->addFile($value, $relativeNameinZipFile);
           }
           $zip->close();
       }
       return response()->download($fileName)->deleteFileAfterSend(true);
   }

   public function zipHalal($id)
   {
       $id=$id;
       $ENcmpnyPK=dechex($id);
    //    $cmpnyName=Auth::user()->getCompany()->cmpnyName;

       $zip = new ZipArchive;
       $fileName = storage_path('app/cache/HalalFile_'.$id.'.zip');
       $file = ('HASFILE/').$id;
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

   public function deleteApplication(Request $request)
   {
       $product = Advisor::where('ad_fk_user_id',$request->pk)->first();
       $product->delete();
       return response()->json(['isSuccess' =>true,'message'=>"Successfull Delete"]);
   }

    // public function download()
    // {
    //     $render = view('chart')->render();
  
    //     $pdf = new Pdf;
    //     $pdf->addPage($render);
    //     $pdf->setOptions(['javascript-delay' => 5000]);
    //     $pdf->saveAs(public_path('report.pdf'));
   
    //     return response()->download(public_path('report.pdf'));
    // }
    
}
