import React ,{useContext, useState,useEffect} from 'react'
import {
  Input, Menu, Segment,
  Checkbox,
  Grid,
  Card,
  Icon,
  Image,
  Sidebar,
  Transition,
  Label,
  Button,
  Table,
  Tab,
  Modal,
  Form,Dropdown,Header

} from 'semantic-ui-react';
// import the progress bar
import StepProgressBar from 'react-step-progress';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'react-step-progress/dist/index.css';
//import tab untuk download tu

import TabSijilPendaftaran from './TabSijilPendaftaran';
import TabLesenPerniagaan from './TabLesenPerniagaan';
import TabSuratLantikan from './TabSuratLantikan';
import TabPetaLokasi from './TabPetaLokasi';
import TabSusunAtur from './TabSusunAtur';

import TabCartaAlir from './TabCartaAlir';
import TabInvois from './TabInvois';
import TabJaminanHalal from './TabJaminanHalal';
import TabMaklumatPekerja from './TabMaklumatPekerja';
import TabPembungkus from './TabPembungkus';

import TabPengeluaranProduk from './TabPengeluaranProduk';
import TabPenyataKewangan from './TabPenyataKewangan';
import TabPermitImport from './TabPermitImport';
import TabPermohonanLengkap from './TabPermohonanLengkap';
import TabPestControl from './TabPestControl';

import TabSijilHalal from './TabSijilHalal';
import TabSuratKKM from './TabSuratKKM';
import TabSuntikanThypoid from './TabSuntikanThypoid';

import TabAliranPergerakan from './TabAliranPergerakan';
import TabDokumenMS from './TabDokumenMS';
import TabKumpulanPembuatan from './TabKumpulanPembuatan';
import TabLesenPengilang from './TabLesenPengilang';
import TabLesenPergudangan from './TabLesenPergudangan';
import TabMaklumatKesihatan from './TabMaklumatKesihatan';
import TabNotaNotifikasiProduk from './TabNotaNotifikasiProduk';
import TabPengendaliMakanan from './TabPengendaliMakanan';
import TabPengesananHalal from './TabPengesananHalal';
import TabPengilanganProduk from './TabPengilanganProduk';
import TabPerakuanProduk from './TabPerakuanProduk';
import TabRekodSembelihan from './TabRekodSembelihan';
import TabRekodSertu from './TabRekodSertu';
import TabSuratPerakuanJPV from './TabSuratPerakuanJPV';
import TabSuratTauliahPenyembelih from './TabSuratTauliahPenyembelih';

//import authentication client (user) tu
import {AuthContext} from '../auth/auth';

import {getData,ClientContext,getAdvisorClient,getAdSelected} from '../client/client';
import {UploadHalalContext} from './UploadHalal';
import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

//import function@variable dalam HALALFile.js tu 
const UploadHalalList = () => {
  const [activeItem, setactiveItem] = React.useState(window.location.pathname.split("/")[1])

  const { profile,cmpny,signOut,changeAccess } = React.useContext(AuthContext);
  const {HALALSijilPendaftaran,HALALCartaAlir,HALALJaminanHalal,HALALLesenPerniagaan,HALALMaklumatPekerja,HALALPembungkusan,HALALPengeluaranProduk,HALALPenyataKewangan,HALALPermitImport,HALALPermohonanLesen,HALALPestControl,HALALPetaLokasi,HALALSijilHalal,HALALSusunAtur,HALALSuntikanThypoid,HALALSuratKKM,HALALSuratLantikan,HALALInvois,HALALPermohonanLengkap,HALALAliranPergerakan,HALALDokumenMS,HALALKumpulanPembuatan,HALALLesenPengilang,HALALLesenPergudangan,HALALMaklumatKesihatan,HALALNotaNotifikasiProduk,HALALPengendaliMakanan,HALALPengesananHalal,HALALPengilanganProduk,HALALPerakuanProduk,HALALRekodSembelihan,HALALRekodSertu,HALALSuratPerakuanJPV,HALALSuratTauliahPenyembelih} = React.useContext(UploadHalalContext);
  const [subcrData, setsubcrData] = React.useState([]);
  const [users, setusers] = React.useState([]);
  const [schmlist, setschmlist] = React.useState([]);
  const [activeDraft, setDraft] = React.useState(null);
  const [active_subcr, setactive_subcr] = React.useState(null);
  const [sideBarOpen, openSidebar] = React.useState(false);
  const [loading,setloading] = React.useState(true);

  const [premises, setpremises] = React.useState([]);
  const [inhalalcom, setinhalalcom] = React.useState([]);
  const [training, settraining] = React.useState([]);
  const [advisorclient, setadvisorclient] = React.useState([]);
  const [adselected, setadselected] = React.useState([]);

  let percentage = 0;
  let count = 0;

const bootstrapAsync = async () => {
  let cklistDraft = localStorage.getItem(cmpny.cmpnyPK + "_cklistDraft");
  if (cklistDraft) {
    cklistDraft = JSON.parse(cklistDraft);
    setDraft(cklistDraft);
  }
  getData().then(x=>{
    setsubcrData(x.data);
    setusers(x.users);

    setpremises(x.premises);
    setinhalalcom(x.inhalalcom);
    settraining(x.training);

    setschmlist(x.schmlist);
    setactive_subcr(x.active_subcr);
    setloading(false);
  }).catch(e=>{
    console.log(e)
    setloading(false);
  })

  getAdvisorClient().then(x => {
    setadvisorclient(x);
  });

  getAdSelected().then(x => {
    setadselected(x);
  });
};

React.useEffect(() => {
bootstrapAsync();

}, []);

const clientContext = React.useMemo(
  () => ({subcrData,users,premises,inhalalcom,training,schmlist,activeDraft,active_subcr,
    reloadData:setschmlist,
    reloadSubcr:setsubcrData,

    reloadPremise:setpremises,
    reloadInhalalcom:setinhalalcom,
    reloadTraining:settraining,

    reloadUser:setusers,
  clearDraft:()=>{localStorage.removeItem(cmpny.cmpnyPK + "_cklistDraft"); setDraft(null);}
  ,advisorclient}),
  [subcrData,users,premises,inhalalcom,training,schmlist,activeDraft,active_subcr,advisorclient]
);

useEffect(() => {
  percentage
});

const panes = [
  {
    menuItem: { key: 'sijildaftar', content: '1. Sijil Pendaftaran' },
    render: () => <Tab.Pane>
                    <TabSijilPendaftaran/>
                  </Tab.Pane>,
  },
  
  {
    menuItem: { key: 'lesenniaga', content: '2. Lesen Perniagaan' },
    render: () => <Tab.Pane>
                    <TabLesenPerniagaan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '3. Surat Lantikan' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'petalokasi', content: '4. Peta Lokasi' },
    render: () => <Tab.Pane>
                    <TabPetaLokasi/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'susunatur', content: '5. Pelan Susun Atur' },
    render: () => <Tab.Pane>
                    <TabSusunAtur/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'cartaalir', content: '6. Carta Alir' },
    render: () => <Tab.Pane>
                    <TabCartaAlir/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'invois', content: '7. Rekod Invois' },
    render: () => <Tab.Pane>
                    <TabInvois/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'jaminanhalal', content: '8. Sistem Jaminan Halal' },
    render: () => <Tab.Pane>
                    <TabJaminanHalal/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'maklumatpekerja', content: '9. Rekod Maklumat Pekerja' },
    render: () => <Tab.Pane>
                    <TabMaklumatPekerja/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pembungkusan', content: '10. Label Pembungkusan' },
    render: () => <Tab.Pane>
                    <TabPembungkus/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pengeluaran', content: '11. Rekod Pengeluaran Produk' },
    render: () => <Tab.Pane>
                    <TabPengeluaranProduk/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'penyata', content: '12. Penyata Kewangan' },
    render: () => <Tab.Pane>
                    <TabPenyataKewangan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'permitimport', content: '13. Permit Import' },
    render: () => <Tab.Pane>
                    <TabPermitImport/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'permohonanlengkap', content: '14. Fail Permohonan Halal Lengkap' },
    render: () => <Tab.Pane>
                    <TabPermohonanLengkap/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pest', content: '15. Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabPestControl/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'sijilhalal', content: '16. Sijil Halal' },
    render: () => <Tab.Pane>
                    <TabSijilHalal/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'suratkkm', content: '17. Surat Kebenaran' },
    render: () => <Tab.Pane>
                    <TabSuratKKM/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'thypoid', content: '18. Suntikan Anti-Thypoid' },
    render: () => <Tab.Pane>
                    <TabSuntikanThypoid/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '19', content: '19. Sijil Kursus Pengendali Makanan' },
    render: () => <Tab.Pane>
                    <TabPengendaliMakanan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '20', content: '20. Rekod Pengilangan Produk' },
    render: () => <Tab.Pane>
                    <TabPengilanganProduk/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '21', content: '21. Surat Perakuan JPV' },
    render: () => <Tab.Pane>
                    <TabSuratPerakuanJPV/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '22', content: '22. Surat Tauliah Penyembelih Dari Jabatan Agama Islam' },
    render: () => <Tab.Pane>
                    <TabSuratTauliahPenyembelih/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '23', content: '23. Rekod Sembelihan' },
    render: () => <Tab.Pane>
                    <TabRekodSembelihan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '24', content: '24. Nota Notifikasi Produk Dikeluarkan BPFK' },
    render: () => <Tab.Pane>
                    <TabNotaNotifikasiProduk/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '25', content: '25. Dokumen Berkaitan MS 2400:2019' },
    render: () => <Tab.Pane>
                    <TabDokumenMS/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '26', content: '26. Rekod Sistem Pengesanan Halal' },
    render: () => <Tab.Pane>
                    <TabPengesananHalal/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '27', content: '27. Rekod Sertu' },
    render: () => <Tab.Pane>
                    <TabRekodSertu/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '28', content: '28. Aliran Pergerakan Operasi' },
    render: () => <Tab.Pane>
                    <TabAliranPergerakan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '29', content: '29. Lesen Pengilang/Pengimport (BPFK)' },
    render: () => <Tab.Pane>
                    <TabLesenPengilang/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '30', content: '30. Sijil Perakuan Pendaftaran Produk (BPFK), KKM' },
    render: () => <Tab.Pane>
                    <TabPerakuanProduk/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '31', content: '31. Rekod Maklumat Kesihatan Pekerja' },
    render: () => <Tab.Pane>
                    <TabMaklumatKesihatan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '32', content: '32. Rekod Kumpulan Pembuatan' },
    render: () => <Tab.Pane>
                    <TabKumpulanPembuatan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '33', content: '33. Lesen Pergudangan' },
    render: () => <Tab.Pane>
                    <TabLesenPergudangan/>
                  </Tab.Pane>,
  },
]

const panesConsumerGood = [
  {
    menuItem: { key: 'sijildaftar', content: '1. Sijil Pendaftaran' },
    render: () => <Tab.Pane>
                    <TabSijilPendaftaran/>
                  </Tab.Pane>,
  },
  
  {
    menuItem: { key: 'lesenniaga', content: '2. Lesen Perniagaan' },
    render: () => <Tab.Pane>
                    <TabLesenPerniagaan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '3. Surat Lantikan' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'petalokasi', content: '4. Peta Lokasi' },
    render: () => <Tab.Pane>
                    <TabPetaLokasi/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'susunatur', content: '5. Pelan Susun Atur' },
    render: () => <Tab.Pane>
                    <TabSusunAtur/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'cartaalir', content: '6. Carta Alir' },
    render: () => <Tab.Pane>
                    <TabCartaAlir/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'invois', content: '7. Rekod Invois' },
    render: () => <Tab.Pane>
                    <TabInvois/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'jaminanhalal', content: '8. Sistem Jaminan Halal' },
    render: () => <Tab.Pane>
                    <TabJaminanHalal/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'maklumatpekerja', content: '9. Rekod Maklumat Pekerja' },
    render: () => <Tab.Pane>
                    <TabMaklumatPekerja/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pembungkusan', content: '10. Label Pembungkusan' },
    render: () => <Tab.Pane>
                    <TabPembungkus/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pengeluaran', content: '11. Rekod Pengeluaran Produk' },
    render: () => <Tab.Pane>
                    <TabPengeluaranProduk/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'penyata', content: '12. Penyata Kewangan' },
    render: () => <Tab.Pane>
                    <TabPenyataKewangan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'permohonanlengkap', content: '13. Fail Permohonan Halal Lengkap' },
    render: () => <Tab.Pane>
                    <TabPermohonanLengkap/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pest', content: '14. Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabPestControl/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'sijilhalal', content: '15. Sijil Halal' },
    render: () => <Tab.Pane>
                    <TabSijilHalal/>
                  </Tab.Pane>,
  }
]

const panesFoodAndBeverage = [
  {
    menuItem: { key: 'sijildaftar', content: '1. Sijil Pendaftaran' },
    render: () => <Tab.Pane>
                    <TabSijilPendaftaran/>
                  </Tab.Pane>,
  },
  
  {
    menuItem: { key: 'lesenniaga', content: '2. Lesen Perniagaan' },
    render: () => <Tab.Pane>
                    <TabLesenPerniagaan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '3. Surat Lantikan' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'petalokasi', content: '4. Peta Lokasi' },
    render: () => <Tab.Pane>
                    <TabPetaLokasi/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'susunatur', content: '5. Pelan Susun Atur' },
    render: () => <Tab.Pane>
                    <TabSusunAtur/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'cartaalir', content: '6. Carta Alir' },
    render: () => <Tab.Pane>
                    <TabCartaAlir/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'invois', content: '7. Rekod Invois' },
    render: () => <Tab.Pane>
                    <TabInvois/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'jaminanhalal', content: '8. Sistem Jaminan Halal' },
    render: () => <Tab.Pane>
                    <TabJaminanHalal/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pembungkusan', content: '9. Label Pembungkusan' },
    render: () => <Tab.Pane>
                    <TabPembungkus/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'penyata', content: '10. Penyata Kewangan' },
    render: () => <Tab.Pane>
                    <TabPenyataKewangan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'permitimport', content: '11. Permit Import' },
    render: () => <Tab.Pane>
                    <TabPermitImport/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'permohonanlengkap', content: '12. Fail Permohonan Halal Lengkap' },
    render: () => <Tab.Pane>
                    <TabPermohonanLengkap/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pest', content: '13. Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabPestControl/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'suratkkm', content: '14. Surat Kebenaran' },
    render: () => <Tab.Pane>
                    <TabSuratKKM/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'thypoid', content: '15. Suntikan Anti-Thypoid' },
    render: () => <Tab.Pane>
                    <TabSuntikanThypoid/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '19', content: '16. Sijil Kursus Pengendali Makanan' },
    render: () => <Tab.Pane>
                    <TabPengendaliMakanan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '20', content: '17. Rekod Pengilangan Produk' },
    render: () => <Tab.Pane>
                    <TabPengilanganProduk/>
                  </Tab.Pane>,
  }
]

const panesFoodPremise = [
  {
    menuItem: { key: 'sijildaftar', content: '1. Sijil Pendaftaran' },
    render: () => <Tab.Pane>
                    <TabSijilPendaftaran/>
                  </Tab.Pane>,
  },
  
  {
    menuItem: { key: 'lesenniaga', content: '2. Lesen Perniagaan' },
    render: () => <Tab.Pane>
                    <TabLesenPerniagaan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '3. Surat Lantikan' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'petalokasi', content: '4. Peta Lokasi' },
    render: () => <Tab.Pane>
                    <TabPetaLokasi/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'susunatur', content: '5. Pelan Susun Atur' },
    render: () => <Tab.Pane>
                    <TabSusunAtur/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'invois', content: '6. Rekod Invois' },
    render: () => <Tab.Pane>
                    <TabInvois/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'jaminanhalal', content: '7. Sistem Jaminan Halal' },
    render: () => <Tab.Pane>
                    <TabJaminanHalal/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'maklumatpekerja', content: '8. Rekod Maklumat Pekerja' },
    render: () => <Tab.Pane>
                    <TabMaklumatPekerja/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pembungkusan', content: '9. Label Pembungkusan' },
    render: () => <Tab.Pane>
                    <TabPembungkus/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'permitimport', content: '10. Permit Import' },
    render: () => <Tab.Pane>
                    <TabPermitImport/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'permohonanlengkap', content: '11. Fail Permohonan Halal Lengkap' },
    render: () => <Tab.Pane>
                    <TabPermohonanLengkap/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pest', content: '12. Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabPestControl/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'thypoid', content: '13. Suntikan Anti-Thypoid' },
    render: () => <Tab.Pane>
                    <TabSuntikanThypoid/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '19', content: '14. Sijil Kursus Pengendali Makanan' },
    render: () => <Tab.Pane>
                    <TabPengendaliMakanan/>
                  </Tab.Pane>,
  }
]

const panesSlaughterHouse = [
  {
    menuItem: { key: 'sijildaftar', content: '1. Sijil Pendaftaran' },
    render: () => <Tab.Pane>
                    <TabSijilPendaftaran/>
                  </Tab.Pane>,
  },
  
  {
    menuItem: { key: 'lesenniaga', content: '2. Lesen Perniagaan' },
    render: () => <Tab.Pane>
                    <TabLesenPerniagaan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '3. Surat Lantikan' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'petalokasi', content: '4. Peta Lokasi' },
    render: () => <Tab.Pane>
                    <TabPetaLokasi/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'susunatur', content: '5. Pelan Susun Atur' },
    render: () => <Tab.Pane>
                    <TabSusunAtur/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'invois', content: '6. Rekod Invois' },
    render: () => <Tab.Pane>
                    <TabInvois/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'jaminanhalal', content: '7. Sistem Jaminan Halal' },
    render: () => <Tab.Pane>
                    <TabJaminanHalal/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pembungkusan', content: '8. Label Pembungkusan' },
    render: () => <Tab.Pane>
                    <TabPembungkus/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'permohonanlengkap', content: '9. Fail Permohonan Halal Lengkap' },
    render: () => <Tab.Pane>
                    <TabPermohonanLengkap/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pest', content: '10. Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabPestControl/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'thypoid', content: '11. Suntikan Anti-Thypoid' },
    render: () => <Tab.Pane>
                    <TabSuntikanThypoid/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '21', content: '12. Surat Perakuan JPV' },
    render: () => <Tab.Pane>
                    <TabSuratPerakuanJPV/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '22', content: '13. Surat Tauliah Penyembelih Dari Jabatan Agama Islam' },
    render: () => <Tab.Pane>
                    <TabSuratTauliahPenyembelih/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '23', content: '14. Rekod Sembelihan' },
    render: () => <Tab.Pane>
                    <TabRekodSembelihan/>
                  </Tab.Pane>,
  },
]

const panesCosmetics = [
  {
    menuItem: { key: 'sijildaftar', content: '1. Sijil Pendaftaran' },
    render: () => <Tab.Pane>
                    <TabSijilPendaftaran/>
                  </Tab.Pane>,
  },
  
  {
    menuItem: { key: 'lesenniaga', content: '2. Lesen Perniagaan' },
    render: () => <Tab.Pane>
                    <TabLesenPerniagaan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '3. Surat Lantikan' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'petalokasi', content: '4. Peta Lokasi' },
    render: () => <Tab.Pane>
                    <TabPetaLokasi/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'susunatur', content: '5. Pelan Susun Atur' },
    render: () => <Tab.Pane>
                    <TabSusunAtur/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'cartaalir', content: '6. Carta Alir' },
    render: () => <Tab.Pane>
                    <TabCartaAlir/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'invois', content: '7. Rekod Invois' },
    render: () => <Tab.Pane>
                    <TabInvois/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'jaminanhalal', content: '8. Sistem Jaminan Halal' },
    render: () => <Tab.Pane>
                    <TabJaminanHalal/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'maklumatpekerja', content: '9. Rekod Maklumat Pekerja' },
    render: () => <Tab.Pane>
                    <TabMaklumatPekerja/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pembungkusan', content: '10. Label Pembungkusan' },
    render: () => <Tab.Pane>
                    <TabPembungkus/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pengeluaran', content: '11. Rekod Pengeluaran Produk' },
    render: () => <Tab.Pane>
                    <TabPengeluaranProduk/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'penyata', content: '12. Penyata Kewangan' },
    render: () => <Tab.Pane>
                    <TabPenyataKewangan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'permohonanlengkap', content: '13. Fail Permohonan Halal Lengkap' },
    render: () => <Tab.Pane>
                    <TabPermohonanLengkap/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pest', content: '14. Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabPestControl/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'sijilhalal', content: '15. Sijil Halal' },
    render: () => <Tab.Pane>
                    <TabSijilHalal/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '24', content: '16. Nota Notifikasi Produk Dikeluarkan BPFK' },
    render: () => <Tab.Pane>
                    <TabNotaNotifikasiProduk/>
                  </Tab.Pane>,
  },
]

const panesLogistics = [
  {
    menuItem: { key: 'sijildaftar', content: '1. Sijil Pendaftaran' },
    render: () => <Tab.Pane>
                    <TabSijilPendaftaran/>
                  </Tab.Pane>,
  },
  
  {
    menuItem: { key: 'lesenniaga', content: '2. Lesen Perniagaan' },
    render: () => <Tab.Pane>
                    <TabLesenPerniagaan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '3. Surat Lantikan' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'petalokasi', content: '4. Peta Lokasi' },
    render: () => <Tab.Pane>
                    <TabPetaLokasi/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'susunatur', content: '5. Pelan Susun Atur' },
    render: () => <Tab.Pane>
                    <TabSusunAtur/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'penyata', content: '6. Penyata Kewangan' },
    render: () => <Tab.Pane>
                    <TabPenyataKewangan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'permitimport', content: '7. Permit Import' },
    render: () => <Tab.Pane>
                    <TabPermitImport/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '25', content: '8. Dokumen Berkaitan MS 2400:2019' },
    render: () => <Tab.Pane>
                    <TabDokumenMS/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '26', content: '9. Rekod Sistem Pengesanan Halal' },
    render: () => <Tab.Pane>
                    <TabPengesananHalal/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '27', content: '10. Rekod Sertu' },
    render: () => <Tab.Pane>
                    <TabRekodSertu/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '28', content: '11. Aliran Pergerakan Operasi' },
    render: () => <Tab.Pane>
                    <TabAliranPergerakan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '33', content: '12. Lesen Pergudangan' },
    render: () => <Tab.Pane>
                    <TabLesenPergudangan/>
                  </Tab.Pane>,
  },
]

const panesPharmaceutical = [
  {
    menuItem: { key: 'sijildaftar', content: '1. Sijil Pendaftaran' },
    render: () => <Tab.Pane>
                    <TabSijilPendaftaran/>
                  </Tab.Pane>,
  },
  
  {
    menuItem: { key: 'lesenniaga', content: '2. Lesen Perniagaan' },
    render: () => <Tab.Pane>
                    <TabLesenPerniagaan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '3. Surat Lantikan' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'petalokasi', content: '4. Peta Lokasi' },
    render: () => <Tab.Pane>
                    <TabPetaLokasi/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'susunatur', content: '5. Pelan Susun Atur' },
    render: () => <Tab.Pane>
                    <TabSusunAtur/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'cartaalir', content: '6. Carta Alir' },
    render: () => <Tab.Pane>
                    <TabCartaAlir/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'invois', content: '7. Rekod Invois' },
    render: () => <Tab.Pane>
                    <TabInvois/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'jaminanhalal', content: '8. Sistem Jaminan Halal' },
    render: () => <Tab.Pane>
                    <TabJaminanHalal/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'maklumatpekerja', content: '9. Rekod Maklumat Pekerja' },
    render: () => <Tab.Pane>
                    <TabMaklumatPekerja/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pembungkusan', content: '10. Label Pembungkusan' },
    render: () => <Tab.Pane>
                    <TabPembungkus/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pengeluaran', content: '11. Rekod Pengeluaran Produk' },
    render: () => <Tab.Pane>
                    <TabPengeluaranProduk/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'penyata', content: '12. Penyata Kewangan' },
    render: () => <Tab.Pane>
                    <TabPenyataKewangan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'permohonanlengkap', content: '13. Fail Permohonan Halal Lengkap' },
    render: () => <Tab.Pane>
                    <TabPermohonanLengkap/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'pest', content: '14. Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabPestControl/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '29', content: '15. Lesen Pengilang/Pengimport (BPFK)' },
    render: () => <Tab.Pane>
                    <TabLesenPengilang/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '30', content: '16. Sijil Perakuan Pendaftaran Produk (BPFK), KKM' },
    render: () => <Tab.Pane>
                    <TabPerakuanProduk/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '31', content: '17. Rekod Maklumat Kesihatan Pekerja' },
    render: () => <Tab.Pane>
                    <TabMaklumatKesihatan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: '32', content: '18. Rekod Kumpulan Pembuatan' },
    render: () => <Tab.Pane>
                    <TabKumpulanPembuatan/>
                  </Tab.Pane>,
  },
]

  return (
    <Transition transitionOnMount={true} animation="fade" duration={1000}>
    <div className="container-fluid">
      <>
      {cmpny.cmpnyDetails.skimproduk==='Barang Gunaan'?
     (<Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Header as='h3' dividing>Skim Produk: Barang Gunaan</Header>
          <Tab panes={panesConsumerGood} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>
          <br></br>
          <Button floated='right'icon labelPosition='left' color='violet' href={'/zipHalal'}><Icon name='briefcase'/>Download All File</Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <Card style={{ marginTop: '0.1em',marginRight: '0.1em'}}>
            <div style={{ margin: '1em 1em 1em 1em'}}>
            {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALCartaAlir && HALALCartaAlir.slice(0, 1).map(function(x){return x.hca_fk_company_id}) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id}) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALMaklumatPekerja && HALALMaklumatPekerja.slice(0, 1).map(function(x){return x.hmp_fk_company_id }) == cmpny.cmpnyPK ?  <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPengeluaranProduk && HALALPengeluaranProduk.slice(0, 1).map(function(x){return x.hpp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPenyataKewangan && HALALPenyataKewangan.slice(0, 1).map(function(x){return x.hpk_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALSijilHalal && HALALSijilHalal.slice(0, 1).map(function(x){return x.hsh_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            
            <CircularProgressbar
              value={percentage}
              text={`${percentage.toFixed(2)}%`}
              styles={buildStyles({
                strokeLinecap: 'butt',
                textSize: '16px',
                pathTransitionDuration: 0.5,
                pathColor: `rgba(51, 224, 71, ${percentage / 100})`,
                textColor: '#20373F',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
            />
            </div>
             
            <Card.Content>
              <Card.Header textAlign='center'>Progress of {cmpny.cmpnyName}</Card.Header>
              <Card.Meta textAlign='center'>{count} File From 15</Card.Meta>
            </Card.Content>
            <Card.Content extra>
            <a> 1. Sijil Pendaftaran {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' />: <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 2. Lesen Perniagaan {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 3. Surat Lantikan {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 4. Peta Lokasi {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 5. Pelan Susun Atur {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 6. Carta Alir {HALALCartaAlir && HALALCartaAlir.slice(0, 1).map(function(x){return x.hca_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 7. Rekod Invois {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 8. Sistem Jaminan Halal {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 9. Rekod Maklumat Pekerja {HALALMaklumatPekerja && HALALMaklumatPekerja.slice(0, 1).map(function(x){return x.hmp_fk_company_id }) == cmpny.cmpnyPK ?  <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 10. Label Pembungkusan {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 11. Rekod Pengeluaran Produk {HALALPengeluaranProduk && HALALPengeluaranProduk.slice(0, 1).map(function(x){return x.hpp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 12. Penyata Kewangan {HALALPenyataKewangan && HALALPenyataKewangan.slice(0, 1).map(function(x){return x.hpk_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 13. Fail Permohonan Halal Lengkap {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 14. Kawalan Makhluk Perosak {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 15. Sijil Halal {HALALSijilHalal && HALALSijilHalal.slice(0, 1).map(function(x){return x.hsh_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      </Grid>) :

      cmpny.cmpnyDetails.skimproduk==='Produk Makanan / Minuman / Makanan Tambahan'?
      (<Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Header as='h3' dividing>Skim Produk: Produk Makanan/Minuman/Makanan Tambahan</Header>
          <Tab panes={panesFoodAndBeverage} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>
          <br></br>
          <Button floated='right'icon labelPosition='left' color='violet' href={'/zipHalal'}><Icon name='briefcase'/>Download All File</Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <Card style={{ marginTop: '0.1em',marginRight: '0.1em'}}>
            <div style={{ margin: '1em 1em 1em 1em'}}>
            {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALCartaAlir && HALALCartaAlir.slice(0, 1).map(function(x){return x.hca_fk_company_id}) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id}) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALPenyataKewangan && HALALPenyataKewangan.slice(0, 1).map(function(x){return x.hpk_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALPermitImport && HALALPermitImport.slice(0, 1).map(function(x){return x.hpi_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALSuntikanThypoid && HALALSuntikanThypoid.slice(0, 1).map(function(x){return x.hst_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALSuratKKM && HALALSuratKKM.slice(0, 1).map(function(x){return x.hsk_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALPengendaliMakanan && HALALPengendaliMakanan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6}; {count = count +1}</div> : null}
            {HALALPengilanganProduk && HALALPengilanganProduk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 4}; {count = count +1}</div> : null}
            <CircularProgressbar
              value={percentage}
              text={`${percentage.toFixed(2)}%`}
              styles={buildStyles({
                strokeLinecap: 'butt',
                textSize: '16px',
                pathTransitionDuration: 0.5,
                pathColor: `rgba(51, 224, 71, ${percentage / 100})`,
                textColor: '#20373F',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
            />
            </div>
              
            <Card.Content>
              <Card.Header textAlign='center'>Progress of {cmpny.cmpnyName}</Card.Header>
              <Card.Meta textAlign='center'>{count} File From 17</Card.Meta>
            </Card.Content>
            <Card.Content extra>
            <a> 1. Sijil Pendaftaran {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' />: <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 2. Lesen Perniagaan {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 3. Surat Lantikan {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 4. Peta Lokasi {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 5. Pelan Susun Atur {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 6. Carta Alir {HALALCartaAlir && HALALCartaAlir.slice(0, 1).map(function(x){return x.hca_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 7. Rekod Invois {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 8. Sistem Jaminan Halal {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 9. Label Pembungkusan {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 10. Penyata Kewangan {HALALPenyataKewangan && HALALPenyataKewangan.slice(0, 1).map(function(x){return x.hpk_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 11. Permit Import {HALALPermitImport && HALALPermitImport.slice(0, 1).map(function(x){return x.hpi_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 12. Fail Permohonan Halal Lengkap {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 13. Kawalan Makhluk Perosak {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 14. Surat Kebenaran {HALALSuratKKM && HALALSuratKKM.slice(0, 1).map(function(x){return x.hsk_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 15. Suntikan Anti-Thypoid {HALALSuntikanThypoid && HALALSuntikanThypoid.slice(0, 1).map(function(x){return x.hst_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a>  16. Sijil Kursus Pengendali Makanan {HALALPengendaliMakanan && HALALPengendaliMakanan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 17. Rekod Pengilangan Produk {HALALPengilanganProduk && HALALPengilanganProduk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      </Grid>) :


      cmpny.cmpnyDetails.skimproduk==='Premis Makanan'?
      (<Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Header as='h3' dividing>Skim Produk: Premis Makanan</Header>
          <Tab panes={panesFoodPremise} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>
          <br></br>
          <Button floated='right'icon labelPosition='left' color='violet' href={'/zipHalal'}><Icon name='briefcase'/>Download All File</Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <Card style={{ marginTop: '0.1em',marginRight: '0.1em'}}>
            <div style={{ margin: '1em 1em 1em 1em'}}>
            {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id}) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALMaklumatPekerja && HALALMaklumatPekerja.slice(0, 1).map(function(x){return x.hmp_fk_company_id }) == cmpny.cmpnyPK ?  <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPermitImport && HALALPermitImport.slice(0, 1).map(function(x){return x.hpi_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALSuntikanThypoid && HALALSuntikanThypoid.slice(0, 1).map(function(x){return x.hst_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPengendaliMakanan && HALALPengendaliMakanan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 9}; {count = count +1}</div> : null}
            <CircularProgressbar
              value={percentage}
              text={`${percentage.toFixed(2)}%`}
              styles={buildStyles({
                strokeLinecap: 'butt',
                textSize: '16px',
                pathTransitionDuration: 0.5,
                pathColor: `rgba(51, 224, 71, ${percentage / 100})`,
                textColor: '#20373F',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
            />
            </div>
              
            <Card.Content>
              <Card.Header textAlign='center'>Progress of {cmpny.cmpnyName}</Card.Header>
              <Card.Meta textAlign='center'>{count} File From 14</Card.Meta>
            </Card.Content>
            <Card.Content extra>
            <a> 1. Sijil Pendaftaran {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' />: <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 2. Lesen Perniagaan {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 3. Surat Lantikan {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 4. Peta Lokasi {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 5. Pelan Susun Atur {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 6. Rekod Invois {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 7. Sistem Jaminan Halal {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 8. Rekod Maklumat Pekerja {HALALMaklumatPekerja && HALALMaklumatPekerja.slice(0, 1).map(function(x){return x.hmp_fk_company_id }) == cmpny.cmpnyPK ?  <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 9. Label Pembungkusan {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 10. Permit Import {HALALPermitImport && HALALPermitImport.slice(0, 1).map(function(x){return x.hpi_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 11. Fail Permohonan Halal Lengkap {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 12. Kawalan Makhluk Perosak {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 13. Suntikan Anti-Thypoid {HALALSuntikanThypoid && HALALSuntikanThypoid.slice(0, 1).map(function(x){return x.hst_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 14. Sijil Kursus Pengendali Makanan {HALALPengendaliMakanan && HALALPengendaliMakanan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      </Grid>) :

      cmpny.cmpnyDetails.skimproduk==='Rumah Sembelihan'?
      (<Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Header as='h3' dividing>Skim Produk: Rumah Sembelihan</Header>
          <Tab panes={panesSlaughterHouse} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>
          <br></br>
          <Button floated='right'icon labelPosition='left' color='violet' href={'/zipHalal'}><Icon name='briefcase'/>Download All File</Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <Card style={{ marginTop: '0.1em',marginRight: '0.1em'}}>
            <div style={{ margin: '1em 1em 1em 1em'}}>
            {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id}) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALSuntikanThypoid && HALALSuntikanThypoid.slice(0, 1).map(function(x){return x.hst_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALRekodSembelihan && HALALRekodSembelihan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 7}; {count = count +1}</div> : null}
            {HALALSuratPerakuanJPV && HALALSuratPerakuanJPV.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 9}; {count = count +1}</div> : null}
            {HALALSuratTauliahPenyembelih && HALALSuratTauliahPenyembelih.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 4}; {count = count +1}</div> : null}
            <CircularProgressbar
              value={percentage}
              text={`${percentage.toFixed(2)}%`}
              styles={buildStyles({
                strokeLinecap: 'butt',
                textSize: '16px',
                pathTransitionDuration: 0.5,
                pathColor: `rgba(51, 224, 71, ${percentage / 100})`,
                textColor: '#20373F',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
            />
            </div>
              
            <Card.Content>
              <Card.Header textAlign='center'>Progress of {cmpny.cmpnyName}</Card.Header>
              <Card.Meta textAlign='center'>{count} File From 14</Card.Meta>
            </Card.Content>
            <Card.Content extra>
            <a> 1. Sijil Pendaftaran {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' />: <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 2. Lesen Perniagaan {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 3. Surat Lantikan {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 4. Peta Lokasi {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 5. Pelan Susun Atur {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 6. Rekod Invois {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 7. Sistem Jaminan Halal {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 8. Label Pembungkusan {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 9. Fail Permohonan Halal Lengkap {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 10. Kawalan Makhluk Perosak {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 11. Suntikan Anti-Thypoid {HALALSuntikanThypoid && HALALSuntikanThypoid.slice(0, 1).map(function(x){return x.hst_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 12. Surat Perakuan JPV {HALALSuratPerakuanJPV && HALALSuratPerakuanJPV.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 13. Surat Tauliah Penyembelih Dari Jabatan Agama Islam {HALALSuratTauliahPenyembelih && HALALSuratTauliahPenyembelih.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 14. Rekod Sembelihan {HALALRekodSembelihan && HALALRekodSembelihan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      </Grid>) :

      cmpny.cmpnyDetails.skimproduk==='Kosmetik dan Dandanan Diri'?
      (<Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Header as='h3' dividing>Skim Produk: Kosmetik dan Dandanan Diri</Header>
          <Tab panes={panesCosmetics} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>
          <br></br>
          <Button floated='right'icon labelPosition='left' color='violet' href={'/zipHalal'}><Icon name='briefcase'/>Download All File</Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <Card style={{ marginTop: '0.1em',marginRight: '0.1em'}}>
            <div style={{ margin: '1em 1em 1em 1em'}}>
            {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALCartaAlir && HALALCartaAlir.slice(0, 1).map(function(x){return x.hca_fk_company_id}) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id}) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALMaklumatPekerja && HALALMaklumatPekerja.slice(0, 1).map(function(x){return x.hmp_fk_company_id }) == cmpny.cmpnyPK ?  <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALPengeluaranProduk && HALALPengeluaranProduk.slice(0, 1).map(function(x){return x.hpp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALPenyataKewangan && HALALPenyataKewangan.slice(0, 1).map(function(x){return x.hpk_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALSijilHalal && HALALSijilHalal.slice(0, 1).map(function(x){return x.hsh_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HALALNotaNotifikasiProduk && HALALNotaNotifikasiProduk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            <CircularProgressbar
              value={percentage}
              text={`${percentage.toFixed(2)}%`}
              styles={buildStyles({
                strokeLinecap: 'butt',
                textSize: '16px',
                pathTransitionDuration: 0.5,
                pathColor: `rgba(51, 224, 71, ${percentage / 100})`,
                textColor: '#20373F',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
            />
            </div>
              
            <Card.Content>
              <Card.Header textAlign='center'>Progress of {cmpny.cmpnyName}</Card.Header>
              <Card.Meta textAlign='center'>{count} File From 16</Card.Meta>
            </Card.Content>
            <Card.Content extra>
            <a> 1. Sijil Pendaftaran {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' />: <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 2. Lesen Perniagaan {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 3. Surat Lantikan {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 4. Peta Lokasi {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 5. Pelan Susun Atur {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 6. Carta Alir {HALALCartaAlir && HALALCartaAlir.slice(0, 1).map(function(x){return x.hca_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 7. Rekod Invois {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 8. Sistem Jaminan Halal {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 9. Rekod Maklumat Pekerja {HALALMaklumatPekerja && HALALMaklumatPekerja.slice(0, 1).map(function(x){return x.hmp_fk_company_id }) == cmpny.cmpnyPK ?  <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 10. Label Pembungkusan {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 11. Rekod Pengeluaran Produk {HALALPengeluaranProduk && HALALPengeluaranProduk.slice(0, 1).map(function(x){return x.hpp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 12. Penyata Kewangan {HALALPenyataKewangan && HALALPenyataKewangan.slice(0, 1).map(function(x){return x.hpk_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 13. Fail Permohonan Halal Lengkap {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 14. Kawalan Makhluk Perosak {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 15. Sijil Halal {HALALSijilHalal && HALALSijilHalal.slice(0, 1).map(function(x){return x.hsh_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 16. Nota Notifikasi Produk Dikeluarkan BPFK {HALALNotaNotifikasiProduk && HALALNotaNotifikasiProduk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      </Grid>) :

      cmpny.cmpnyDetails.skimproduk==='Logistik'?
      (<Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Header as='h3' dividing>Skim Produk: Logistik</Header>
          <Tab panes={panesLogistics} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>
          <br></br>
          <Button floated='right'icon labelPosition='left' color='violet' href={'/zipHalal'}><Icon name='briefcase'/>Download All File</Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <Card style={{ marginTop: '0.1em',marginRight: '0.1em'}}>
            <div style={{ margin: '1em 1em 1em 1em'}}>
            {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 8}; {count = count +1}</div> : null}
            {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 8}; {count = count +1}</div> : null}
            {HALALPenyataKewangan && HALALPenyataKewangan.slice(0, 1).map(function(x){return x.hpk_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 8}; {count = count +1}</div> : null}
            {HALALPermitImport && HALALPermitImport.slice(0, 1).map(function(x){return x.hpi_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 8}; {count = count +1}</div> : null}
            {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 8}; {count = count +1}</div> : null}
            {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 8}; {count = count +1}</div> : null}
            {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 8}; {count = count +1}</div> : null}
            {HALALAliranPergerakan && HALALAliranPergerakan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 8}; {count = count +1}</div> : null}
            {HALALDokumenMS && HALALDokumenMS.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 9}; {count = count +1}</div> : null}
            {HALALLesenPergudangan && HALALLesenPergudangan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 9}; {count = count +1}</div> : null}
            {HALALPengesananHalal && HALALPengesananHalal.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 9}; {count = count +1}</div> : null}
            {HALALRekodSertu && HALALRekodSertu.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 9}; {count = count +1}</div> : null}
            <CircularProgressbar
              value={percentage}
              text={`${percentage.toFixed(2)}%`}
              styles={buildStyles({
                strokeLinecap: 'butt',
                textSize: '16px',
                pathTransitionDuration: 0.5,
                pathColor: `rgba(51, 224, 71, ${percentage / 100})`,
                textColor: '#20373F',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
            />
            </div>
              
            <Card.Content>
              <Card.Header textAlign='center'>Progress of {cmpny.cmpnyName}</Card.Header>
              <Card.Meta textAlign='center'>{count} File From 12</Card.Meta>
            </Card.Content>
            <Card.Content extra>
            <a> 1. Sijil Pendaftaran {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' />: <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 2. Lesen Perniagaan {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 3. Surat Lantikan {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 4. Peta Lokasi {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 5. Pelan Susun Atur {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 6. Penyata Kewangan {HALALPenyataKewangan && HALALPenyataKewangan.slice(0, 1).map(function(x){return x.hpk_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 7. Permit Import {HALALPermitImport && HALALPermitImport.slice(0, 1).map(function(x){return x.hpi_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 8. Dokumen Berkaitan MS 2400:2019 {HALALDokumenMS && HALALDokumenMS.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 9. Rekod Sistem Pengesanan Halal {HALALPengesananHalal && HALALPengesananHalal.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 10. Rekod Sertu {HALALRekodSertu && HALALRekodSertu.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 11. Aliran Pergerakan Operasi {HALALAliranPergerakan && HALALAliranPergerakan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 12. Lesen Pergudangan {HALALLesenPergudangan && HALALLesenPergudangan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      </Grid>) :

      cmpny.cmpnyDetails.skimproduk==='Farmaseutikal'?
      (<Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Header as='h3' dividing>Skim Produk: Farmaseutikal</Header>
          <Tab panes={panesPharmaceutical} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>
          <br></br>
          <Button floated='right'icon labelPosition='left' color='violet' href={'/zipHalal'}><Icon name='briefcase'/>Download All File</Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <Card style={{ marginTop: '0.1em',marginRight: '0.1em'}}>
            <div style={{ margin: '1em 1em 1em 1em'}}>
            {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALCartaAlir && HALALCartaAlir.slice(0, 1).map(function(x){return x.hca_fk_company_id}) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id}) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALMaklumatPekerja && HALALMaklumatPekerja.slice(0, 1).map(function(x){return x.hmp_fk_company_id }) == cmpny.cmpnyPK ?  <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALPengeluaranProduk && HALALPengeluaranProduk.slice(0, 1).map(function(x){return x.hpp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALPenyataKewangan && HALALPenyataKewangan.slice(0, 1).map(function(x){return x.hpk_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALKumpulanPembuatan && HALALKumpulanPembuatan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALLesenPengilang && HALALLesenPengilang.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALMaklumatKesihatan && HALALMaklumatKesihatan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 5.5}; {count = count +1}</div> : null}
            {HALALPerakuanProduk && HALALPerakuanProduk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.5}; {count = count +1}</div> : null}
            <CircularProgressbar
              value={percentage}
              text={`${percentage.toFixed(2)}%`}
              styles={buildStyles({
                strokeLinecap: 'butt',
                textSize: '16px',
                pathTransitionDuration: 0.5,
                pathColor: `rgba(51, 224, 71, ${percentage / 100})`,
                textColor: '#20373F',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
            />
            </div>
              
            <Card.Content>
              <Card.Header textAlign='center'>Progress of {cmpny.cmpnyName}</Card.Header>
              <Card.Meta textAlign='center'>{count} File From 18</Card.Meta>
            </Card.Content>
            <Card.Content extra>
            <a> 1. Sijil Pendaftaran {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' />: <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 2. Lesen Perniagaan {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 3. Surat Lantikan {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 4. Peta Lokasi {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 5. Pelan Susun Atur {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 6. Carta Alir {HALALCartaAlir && HALALCartaAlir.slice(0, 1).map(function(x){return x.hca_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 7. Rekod Invois {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 8. Sistem Jaminan Halal {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 9. Rekod Maklumat Pekerja {HALALMaklumatPekerja && HALALMaklumatPekerja.slice(0, 1).map(function(x){return x.hmp_fk_company_id }) == cmpny.cmpnyPK ?  <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 10. Label Pembungkusan {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 11. Rekod Pengeluaran Produk {HALALPengeluaranProduk && HALALPengeluaranProduk.slice(0, 1).map(function(x){return x.hpp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 12. Penyata Kewangan {HALALPenyataKewangan && HALALPenyataKewangan.slice(0, 1).map(function(x){return x.hpk_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 13. Fail Permohonan Halal Lengkap {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 14. Kawalan Makhluk Perosak {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 15. Lesen Pengilang/Pengimport (BPFK) {HALALLesenPengilang && HALALLesenPengilang.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 16. Sijil Perakuan Pendaftaran Produk (BPFK), KKM {HALALPerakuanProduk && HALALPerakuanProduk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 17. Rekod Maklumat Kesihatan Pekerja {HALALMaklumatKesihatan && HALALMaklumatKesihatan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 18. Rekod Kumpulan Pembuatan {HALALKumpulanPembuatan && HALALKumpulanPembuatan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      </Grid>) :


      <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          
          <Tab panes={panes} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>
          <br></br>
          <Button floated='right'icon labelPosition='left' color='violet' href={'/zipHalal'}><Icon name='briefcase'/>Download All File</Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <Card style={{ marginTop: '0.1em',marginRight: '0.1em'}}>
            <div style={{ margin: '1em 1em 1em 1em'}}>
            {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALCartaAlir && HALALCartaAlir.slice(0, 1).map(function(x){return x.hca_fk_company_id}) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id}) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALMaklumatPekerja && HALALMaklumatPekerja.slice(0, 1).map(function(x){return x.hmp_fk_company_id }) == cmpny.cmpnyPK ?  <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALPengeluaranProduk && HALALPengeluaranProduk.slice(0, 1).map(function(x){return x.hpp_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALPenyataKewangan && HALALPenyataKewangan.slice(0, 1).map(function(x){return x.hpk_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALPermitImport && HALALPermitImport.slice(0, 1).map(function(x){return x.hpi_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALSijilHalal && HALALSijilHalal.slice(0, 1).map(function(x){return x.hsh_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALSuntikanThypoid && HALALSuntikanThypoid.slice(0, 1).map(function(x){return x.hst_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALSuratKKM && HALALSuratKKM.slice(0, 1).map(function(x){return x.hsk_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALAliranPergerakan && HALALAliranPergerakan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALDokumenMS && HALALDokumenMS.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALKumpulanPembuatan && HALALKumpulanPembuatan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALLesenPengilang && HALALLesenPengilang.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALLesenPergudangan && HALALLesenPergudangan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALMaklumatKesihatan && HALALMaklumatKesihatan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALNotaNotifikasiProduk && HALALNotaNotifikasiProduk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALPengendaliMakanan && HALALPengendaliMakanan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALPengesananHalal && HALALPengesananHalal.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALPengilanganProduk && HALALPengilanganProduk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALPerakuanProduk && HALALPerakuanProduk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALRekodSembelihan && HALALRekodSembelihan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALRekodSertu && HALALRekodSertu.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALSuratPerakuanJPV && HALALSuratPerakuanJPV.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 3}; {count = count +1}</div> : null}
            {HALALSuratTauliahPenyembelih && HALALSuratTauliahPenyembelih.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 4}; {count = count +1}</div> : null}
            <CircularProgressbar
              value={percentage}
              text={`${percentage.toFixed(2)}%`}
              styles={buildStyles({
                strokeLinecap: 'butt',
                textSize: '16px',
                pathTransitionDuration: 0.5,
                pathColor: `rgba(51, 224, 71, ${percentage / 100})`,
                textColor: '#20373F',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
            />
            </div>
             
            <Card.Content>
              <Card.Header textAlign='center'>Progress of {cmpny.cmpnyName}</Card.Header>
              <Card.Meta textAlign='center'>{count} File From 33</Card.Meta>
            </Card.Content>
            <Card.Content extra>
            <a> 1. Sijil Pendaftaran {HALALSijilPendaftaran && HALALSijilPendaftaran.slice(0, 1).map(function(x){return x.hsp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' />: <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 2. Lesen Perniagaan {HALALLesenPerniagaan && HALALLesenPerniagaan.slice(0, 1).map(function(x){return x.hlp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 3. Surat Lantikan {HALALSuratLantikan && HALALSuratLantikan.slice(0, 1).map(function(x){return x.hsl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 4. Peta Lokasi {HALALPetaLokasi && HALALPetaLokasi.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 5. Pelan Susun Atur {HALALSusunAtur && HALALSusunAtur.slice(0, 1).map(function(x){return x.hsa_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 6. Carta Alir {HALALCartaAlir && HALALCartaAlir.slice(0, 1).map(function(x){return x.hca_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 7. Rekod Invois {HALALInvois && HALALInvois.slice(0, 1).map(function(x){return x.hi_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 8. Sistem Jaminan Halal {HALALJaminanHalal && HALALJaminanHalal.slice(0, 1).map(function(x){return x.hjh_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 9. Rekod Maklumat Pekerja {HALALMaklumatPekerja && HALALMaklumatPekerja.slice(0, 1).map(function(x){return x.hmp_fk_company_id }) == cmpny.cmpnyPK ?  <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 10. Label Pembungkusan {HALALPembungkusan && HALALPembungkusan.slice(0, 1).map(function(x){return x.hp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 11. Rekod Pengeluaran Produk {HALALPengeluaranProduk && HALALPengeluaranProduk.slice(0, 1).map(function(x){return x.hpp_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 12. Penyata Kewangan {HALALPenyataKewangan && HALALPenyataKewangan.slice(0, 1).map(function(x){return x.hpk_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 13. Permit Import {HALALPermitImport && HALALPermitImport.slice(0, 1).map(function(x){return x.hpi_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 14. Fail Permohonan Halal Lengkap {HALALPermohonanLengkap && HALALPermohonanLengkap.slice(0, 1).map(function(x){return x.hpl_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 15. Kawalan Makhluk Perosak {HALALPestControl && HALALPestControl.slice(0, 1).map(function(x){return x.hpc_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 16. Sijil Halal {HALALSijilHalal && HALALSijilHalal.slice(0, 1).map(function(x){return x.hsh_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 17. Surat Kebenaran {HALALSuratKKM && HALALSuratKKM.slice(0, 1).map(function(x){return x.hsk_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 18. Suntikan Anti-Thypoid {HALALSuntikanThypoid && HALALSuntikanThypoid.slice(0, 1).map(function(x){return x.hst_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 19. Sijil Kursus Pengendali Makanan {HALALPengendaliMakanan && HALALPengendaliMakanan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 20. Rekod Pengilangan Produk {HALALPengilanganProduk && HALALPengilanganProduk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 21. Surat Perakuan JPV {HALALSuratPerakuanJPV && HALALSuratPerakuanJPV.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 22. Surat Tauliah Penyembelih Dari Jabatan Agama Islam {HALALSuratTauliahPenyembelih && HALALSuratTauliahPenyembelih.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 23. Rekod Sembelihan {HALALRekodSembelihan && HALALRekodSembelihan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 24. Nota Notifikasi Produk Dikeluarkan BPFK {HALALNotaNotifikasiProduk && HALALNotaNotifikasiProduk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 25. Dokumen Berkaitan MS 2400:2019 {HALALDokumenMS && HALALDokumenMS.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 26. Rekod Sistem Pengesanan Halal {HALALPengesananHalal && HALALPengesananHalal.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 27. Rekod Sertu {HALALRekodSertu && HALALRekodSertu.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 28. Aliran Pergerakan Operasi {HALALAliranPergerakan && HALALAliranPergerakan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 29. Lesen Pengilang/Pengimport (BPFK) {HALALLesenPengilang && HALALLesenPengilang.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 30. Sijil Perakuan Pendaftaran Produk (BPFK), KKM {HALALPerakuanProduk && HALALPerakuanProduk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 31. Rekod Maklumat Kesihatan Pekerja {HALALMaklumatKesihatan && HALALMaklumatKesihatan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 32. Rekod Kumpulan Pembuatan {HALALKumpulanPembuatan && HALALKumpulanPembuatan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 33. Lesen Pergudangan {HALALLesenPergudangan && HALALLesenPergudangan.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>}

      </>      
      </div>
  </Transition>
  )
}

export default UploadHalalList