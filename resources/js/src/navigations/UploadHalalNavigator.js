import React from 'react'

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";
import UploadHalalList from '../screens/uploadHalal/UploadHalalList';

import {UploadHalalContext,getHALALSijilPendaftaran,getHALALLesenPerniagaan,getHALALSuratLantikan ,getHALALPetaLokasi  ,getHALALPenyataKewangan  ,getHALALSijilHalal  ,getHALALCartaAlir  ,getHALALPembungkusan  ,getHALALPermohonanLengkap  ,getHALALJaminanHalal  ,getHALALPestControl  ,getHALALMaklumatPekerja  ,getHALALPengeluaranProduk  ,getHALALInvois  ,getHALALSuratKKM  ,getHALALPermitImport  ,getHALALSusunAtur, getHALALSuntikanThypoid, getHALALAliranPergerakan, getHALALDokumenMS, getHALALKumpulanPembuatan, getHALALLesenPengilang, getHALALLesenPergudangan, getHALALMaklumatKesihatan, getHALALNotaNotifikasiProduk, getHALALPengendaliMakanan, getHALALPengesananHalal, getHALALPengilanganProduk, getHALALPerakuanProduk, getHALALRekodSembelihan, getHALALRekodSertu, getHALALSuratPerakuanJPV, getHALALSuratTauliahPenyembelih} from '../screens/uploadHalal/UploadHalal';


const UploadHalalNavigator = () => {
  
    const [HALALSijilPendaftaran, setHALALSijilPendaftaran] = React.useState(null);
    const [HALALLesenPerniagaan, setHALALLesenPerniagaan] = React.useState(null);
    const [HALALSuratLantikan, setHALALSuratLantikan] = React.useState(null);
    const [HALALPetaLokasi, setHALALPetaLokasi] = React.useState(null);
    const [HALALPenyataKewangan, setHALALPenyataKewangan] = React.useState(null);
    const [HALALSijilHalal, setHALALSijilHalal] = React.useState(null);
    const [HALALCartaAlir, setHALALCartaAlir] = React.useState(null);
    const [HALALPembungkusan, setHALALPembungkusan] = React.useState(null);
    const [HALALPermohonanLengkap, setHALALPermohonanLengkap] = React.useState(null);
    const [HALALJaminanHalal, setHALALJaminanHalal] = React.useState(null);
    const [HALALPestControl, setHALALPestControl] = React.useState(null);
    const [HALALMaklumatPekerja, setHALALMaklumatPekerja] = React.useState(null);
    const [HALALPengeluaranProduk, setHALALPengeluaranProduk] = React.useState(null);
    const [HALALInvois, setHALALInvois] = React.useState(null);
    const [HALALSuratKKM, setHALALSuratKKM] = React.useState(null);
    const [HALALPermitImport, setHALALPermitImport] = React.useState(null);
    const [HALALSusunAtur, setHALALSusunAtur] = React.useState(null);
    const [HALALSuntikanThypoid, setHALALSuntikanThypoid] = React.useState(null);
    
    const [HALALAliranPergerakan, setHALALAliranPergerakan] = React.useState(null);
    const [HALALDokumenMS, setHALALDokumenMS] = React.useState(null);
    const [HALALKumpulanPembuatan, setHALALKumpulanPembuatan] = React.useState(null);
    const [HALALLesenPengilang, setHALALLesenPengilang] = React.useState(null);
    const [HALALLesenPergudangan, setHALALLesenPergudangan] = React.useState(null);
    const [HALALMaklumatKesihatan, setHALALMaklumatKesihatan] = React.useState(null);
    const [HALALNotaNotifikasiProduk, setHALALNotaNotifikasiProduk] = React.useState(null);
    const [HALALPengendaliMakanan, setHALALPengendaliMakanan] = React.useState(null);
    const [HALALPengesananHalal, setHALALPengesananHalal] = React.useState(null);
    const [HALALPengilanganProduk, setHALALPengilanganProduk] = React.useState(null);
    const [HALALPerakuanProduk, setHALALPerakuanProduk] = React.useState(null);
    const [HALALRekodSembelihan, setHALALRekodSembelihan] = React.useState(null);
    const [HALALRekodSertu, setHALALRekodSertu] = React.useState(null);
    const [HALALSuratPerakuanJPV, setHALALSuratPerakuanJPV] = React.useState(null);
    const [HALALSuratTauliahPenyembelih, setHALALSuratTauliahPenyembelih] = React.useState(null);

    
    let { path, url } = useRouteMatch();

    
    React.useEffect(() => {

      const bootstrapAsync = async () => {
        getHALALSijilPendaftaran().then(x => {
          setHALALSijilPendaftaran(x);
        })

        getHALALLesenPerniagaan().then(x => {
          setHALALLesenPerniagaan(x);
        })

        getHALALSuratLantikan().then(x => {
          setHALALSuratLantikan(x);
        })

        getHALALPetaLokasi().then(x => {
          setHALALPetaLokasi(x);
        })

        getHALALPenyataKewangan().then(x => {
          setHALALPenyataKewangan(x);
        })

        getHALALSijilHalal().then(x => {
          setHALALSijilHalal(x);
        })

        getHALALCartaAlir().then(x => {
          setHALALCartaAlir(x);
        })

        getHALALPembungkusan().then(x => {
          setHALALPembungkusan(x);
        })

        getHALALPermohonanLengkap().then(x => {
          setHALALPermohonanLengkap(x);
        })

        getHALALJaminanHalal().then(x => {
          setHALALJaminanHalal(x);
        })

        getHALALPestControl().then(x => {
          setHALALPestControl(x);
        })

        getHALALMaklumatPekerja().then(x => {
          setHALALMaklumatPekerja(x);
        })

        getHALALPengeluaranProduk().then(x => {
          setHALALPengeluaranProduk(x);
        })

        getHALALInvois().then(x => {
          setHALALInvois(x);
        })

        getHALALSuratKKM().then(x => {
          setHALALSuratKKM(x);
        })

        getHALALPermitImport().then(x => {
          setHALALPermitImport(x);
        })

        getHALALSusunAtur().then(x => {
          setHALALSusunAtur(x);
        }) 

        getHALALSuntikanThypoid().then(x => {
          setHALALSuntikanThypoid(x);
        })    

        getHALALAliranPergerakan().then(x => {
          setHALALAliranPergerakan(x);
        })

        getHALALDokumenMS().then(x => {
          setHALALDokumenMS(x);
        })

        getHALALKumpulanPembuatan().then(x => {
          setHALALKumpulanPembuatan(x);
        })

        getHALALLesenPengilang().then(x => {
          setHALALLesenPengilang(x);
        })

        getHALALLesenPergudangan().then(x => {
          setHALALLesenPergudangan(x);
        })

        getHALALMaklumatKesihatan().then(x => {
          setHALALMaklumatKesihatan(x);
        })

        getHALALNotaNotifikasiProduk().then(x => {
          setHALALNotaNotifikasiProduk(x);
        })

        getHALALPengendaliMakanan().then(x => {
          setHALALPengendaliMakanan(x);
        })

        getHALALPengesananHalal().then(x => {
          setHALALPengesananHalal(x);
        })

        getHALALPengilanganProduk().then(x => {
          setHALALPengilanganProduk(x);
        })

        getHALALPerakuanProduk().then(x => {
          setHALALPerakuanProduk(x);
        })

        getHALALRekodSembelihan().then(x => {
          setHALALRekodSembelihan(x);
        })

        getHALALRekodSertu().then(x => {
          setHALALRekodSertu(x);
        })

        getHALALSuratPerakuanJPV().then(x => {
          setHALALSuratPerakuanJPV(x);
        })

        getHALALSuratTauliahPenyembelih().then(x => {
          setHALALSuratTauliahPenyembelih(x);
        })
      };
      bootstrapAsync();
  
    }, []);

  const halalfileContext = React.useMemo(
    () =>({HALALSijilPendaftaran, HALALLesenPerniagaan, HALALSuratLantikan , HALALPetaLokasi  , HALALPenyataKewangan  , HALALSijilHalal  , HALALCartaAlir  , HALALPembungkusan  , HALALPermohonanLengkap  , HALALJaminanHalal  , HALALPestControl  , HALALMaklumatPekerja  , HALALPengeluaranProduk  , HALALInvois  , HALALSuratKKM  , HALALPermitImport  ,HALALSusunAtur, HALALSuntikanThypoid, HALALAliranPergerakan, HALALDokumenMS, HALALKumpulanPembuatan, HALALLesenPengilang, HALALLesenPergudangan, HALALMaklumatKesihatan, HALALNotaNotifikasiProduk, HALALPengendaliMakanan, HALALPengesananHalal, HALALPengilanganProduk, HALALPerakuanProduk, HALALRekodSembelihan, HALALRekodSertu, HALALSuratPerakuanJPV, HALALSuratTauliahPenyembelih }),

    [HALALSijilPendaftaran, HALALLesenPerniagaan, HALALSuratLantikan , HALALPetaLokasi  , HALALPenyataKewangan  , HALALSijilHalal  , HALALCartaAlir  , HALALPembungkusan  , HALALPermohonanLengkap  , HALALJaminanHalal  , HALALPestControl  , HALALMaklumatPekerja  , HALALPengeluaranProduk  , HALALInvois  , HALALSuratKKM  , HALALPermitImport  ,HALALSusunAtur, HALALSuntikanThypoid, HALALAliranPergerakan, HALALDokumenMS, HALALKumpulanPembuatan, HALALLesenPengilang, HALALLesenPergudangan, HALALMaklumatKesihatan, HALALNotaNotifikasiProduk, HALALPengendaliMakanan, HALALPengesananHalal, HALALPengilanganProduk, HALALPerakuanProduk, HALALRekodSembelihan, HALALRekodSertu, HALALSuratPerakuanJPV, HALALSuratTauliahPenyembelih ]
);
  return (
    <UploadHalalContext.Provider value={halalfileContext}>
        <Switch>
            <Route exact path={path}>
                <UploadHalalList />
            </Route>
        </Switch>
    </UploadHalalContext.Provider>
  )
}

export default UploadHalalNavigator