import React,{useContext } from 'react'
import {
  Input, Menu, Segment,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Sidebar,
  Transition,
  List,
  Table,
  Button,Label
} from 'semantic-ui-react';

import * as moment from 'moment';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import {deleteSupplier, HalalFileContext, getSupplier, postMaterial} from './HalalFile';

import {EditableLabel, HeaderAction, PromptModal} from '../../components/simplifyUi';
import {AuthContext} from '../auth/auth';
import {ClientContext, updateCompany, getData} from '../client/client';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

const TabTOR = () => {
  const {supplier} = useContext(HalalFileContext);
  let { path, url } = useRouteMatch();

  const { profile,cmpny,signOut } = React.useContext(AuthContext);
  const [cmpnydata, setCmpny] = React.useState(null);
  const [cmpnyPK, setcmpnyPK] = React.useState(0);

  React.useEffect(() => {

    const bootstrapAsync = async () => {
      
      setcmpnyPK(cmpny);
    };

    bootstrapAsync();
  }, [cmpny]);

  const updCmpnyRefNo =x=>{
  setCmpny({...cmpny,id:cmpnyPK,cmpnyRefNo:x})
  updateCompany({...cmpny,id:cmpnyPK,cmpnyRefNo:x}).then(k=>{
     console.log(k);
})
location.reload()
}

const print1=()=>{
    let dd = {
        content: [
          {text: 'TERMA RUJUKAN JAWATANKUASA HALAL DALAMAN (JKHD)', style: 'header', bold: true, alignment:'center'},
                ' ',' ',
                {
                  stack: [
                      {text: '(1) Pengenalan\n', style: 'header', bold: true, alignment:'left'},
                  ],
                  style: 'header'
              },
              {
                  stack: [
                      'Jawatankuasa Halal Dalaman (JKHD) merupakan satu jawatankuasa yang dilantik oleh pengurusan tertinggi syarikat. JKHD ditubuhkan bagi memenuhi keperluan Sistem Jaminan Halal (HAS) berdasarkan Manual Sistem Pengurusan Halal Malaysia (MHMS) 2020 yang ditetapkan oleh pihak berkuasa berwibawa.\n',
                  ],
                  margin: [0, 20, 0, 0],
                  alignment: 'justify'
              },' ',' ',
              {
                stack: [
                    {text: '(2) Objektif\n', style: 'header', bold: true, alignment:'left'},
                ],
                style: 'header'
            },
            {
                stack: [
                    'Terma rujukan ini bertujuan untuk dijadikan panduan kepada JKHD dalam memastikan HAS dilaksanakan dengan berkesan.\n',
                ],
                margin: [0, 20, 0, 0],
                alignment: 'justify'
            },' ',' ',
            {
              stack: [
                  {text: '(3) Peranan\n', style: 'header', bold: true, alignment:'left'},
              ],
              style: 'header'
          },
          {
              stack: [
                  '(a)	Membangunkan HAS dan dokumen berkaitan;\n\n (b)	Memastikan HAS dilaksanakan secara berkesan;\n\n (c)	Memastikan keberkesanan HAS sentiasa dikawal selia secara berterusan;\n\n (d)	Menyemak dan mengesahkan SOP;\n\n (e)	Membincang dan menetapkan Polisi Halal, Senarai Utama Bahan Mentah (Raw Material Masterlist), Pelan Pengurusan Risiko Halal, dan lain-lain aktiviti HAS yang berkaitan;\n\n (f)	Menyemak semula keberkesanan dan mengemaskini HAS syarikat;\n\n (g)	Bertanggungjawab memastikan keseluruhan proses Pensijilan Halal Malaysia dilaksanakan dengan sempurna.\n',
              ],
              margin: [0, 20, 0, 0],
              alignment: 'justify'
          },' ',' ',
          {
            stack: [
                {text: '(4) Tatacara Mesyuarat\n', style: 'header', bold: true, alignment:'left'},
            ],
            style: 'header'
        },
        {
            stack: [
                '(a)	Kekerapan mesyuarat JKHD adalah sekurang-kurang dua (2) kali setahun dan bergantung kepada keperluan dari semasa ke semasa;\n\n (b) Pengerusi JKHD boleh menurunkan kuasa kepada ahli yang difikirkan layak untuk mempengerusikan mesyuarat semasa ketiadaannya;\n\n (c)	Korum bagi ahli mesyuarat hendaklah sekurang-kurangnya empat (4) orang untuk bersidang;\n\n (d)	Keputusan mesyuarat hendaklah diputuskan secara persetujuan bersama;\n\n (e)	Hasil	perbincangan	dan	keputusan	mesyuarat	hendaklah didokumenkan secara bertulis melalui minit mesyuarat dan disahkan; dan\n\n (f)	Keputusan mesyuarat	 JKHD hendaklah dibentangkan kepada pengurusan tertinggi untuk sebarang kelulusan.\n',
            ],
            margin: [0, 20, 0, 0],
            alignment: 'justify'
        },' ',' ',
        {
          stack: [
              {text: '(5) Pelantikan Dan Syarat Keanggotaan\n', style: 'header', bold: true, alignment:'left'},
          ],
          style: 'header'
      },' ',
      {
        stack: [
            {text: '(a) Pelantikan\n', style: 'header', bold: true, alignment:'left'},
        ],
        style: 'header'
    },
      {
          stack: [
              '(i)	pelantikan	anggota	JKHD	dibuat	oleh	pengurusan	tertinggi syarikat; dan\n\n (ii)	pelantikan boleh terbatal sekiranya anggota telah meletak jawatan atau berpindah atau diarahkan oleh pengurusan tertinggi.\n\n',
          ],
          margin: [0, 20, 0, 0],
          alignment: 'justify'
      },' ',
      {
        stack: [
            {text: '(b) Keanggotaan\n', style: 'header', bold: true, alignment:'left'},
        ],
        style: 'header'
    },,
      {
          stack: [
              'Keanggotaan terdiri daripada:\n\n (i)	Wakil	daripada	pengurusan	tertinggi	yang	beragama	Islam sebagai    Pengerusi;\n\n (ii)	Eksekutif Halal yang diiktiraf HPB dan berjawatan tetap sebagai penyelaras;\n\n (iii)	Seorang wakil dari Bahagian Pembelian; dan\n\n (iv)	Seorang wakil dari Bahagian Pemprosesan/ Penyelia Halal.\n\n',
          ],
          margin: [0, 20, 0, 0],
          alignment: 'justify'
      },' ',
      {
        stack: [
            {text: '(c) Perubahan\n', style: 'header', bold: true, alignment:'left'},
        ],
        style: 'header'
    },
      {
          stack: [
              'Sebarang perubahan yang melibatkan keanggotaan akan disemak semula dan akan dibuat perlantikan baru. Perubahan juga akan dilakukan sekiranya terdapat JKHD tidak berfungsi atau berkesan.\n',
          ],
          margin: [0, 20, 0, 0],
          alignment: 'justify'
      },' ',' ',
      {
        stack: [
            {text: '(6) Penutup\n', style: 'header', bold: true, alignment:'left'},
        ],
        style: 'header'
    },
      {
          stack: [
              'Terma rujukan ini juga tertakluk kepada sebarang pindaan dari semasa ke semasa.\n',
          ],
          margin: [0, 20, 0, 0],
          alignment: 'justify'
      },' ',' ',' ',' ',
      {
        stack: [
            {text: 'Dikemaskini pada '+moment().format("DD/MM/YYYY")+'\n', style: 'header', bold: false, alignment:'right'},
            {text: cmpny.cmpnyRefNo && cmpny.cmpnyRefNo? cmpny.cmpnyRefNo:"<No. Rujukan>"+ '\n', style: 'header', bold: false, alignment:'right'},
        ],
    },' ',' ',' ',' ',' ',' ',' ',' ',' ',

              {text: 'PERANAN/ TANGGUNGJAWAB JAWATANKUASA HALAL DALAMAN', style: 'header', bold: true, alignment:'center'},
                ' ',
                {
                    style: 'tableExample',
                    color: '#444',
                    table: {
                        widths: [150, 320],
                        headerRows: 1,
                        // keepWithHeaderRows: 1,
                        body: [
                                  [{text: 'Jawatan', style: 'tableHeader', alignment: 'center', bold:true}, {text: 'Peranan/Tanggungjawab', style: 'tableHeader', alignment: 'center', bold:true}],
                                  [{text: 'Pengerusi', style: 'tableHeader', alignment: 'left'}, {text: '(1) Mendapatkan komitmen dan kelulusan daripada pengurusan tertinggi syarikat untuk membangun dan melaksanakan HAS.\n (3) Mengesahkan dokumen dan aktiviti berkaitan HAS.\n (4) Mengetuai mesyuarat JKHD.\n (5) Memastikan JKHD berfungsi dengan berkesan.\n (6) Membuat pengesahan ke atas perubahan bahan mentah, pembekal, produk dan proses serta Senarai Utama Bahan Mentah (Raw Material Masterlist).\n (7) Bertanggungjawab memastikan keseluruhan proses Pensijilan Halal Malaysia dilaksanakan dengan sempurna oleh JKHD.\n (8) Bertanggungjawab memastikan HAS dilaksanakan secara berkesan berdasarkan keperluan MHMS 2020.', style: 'tableHeader', alignment: 'left'}],
                                  [{text: 'Eksekutif Halal', style: 'tableHeader', alignment: 'left'}, {text: '(1) Mengetuai atau menganggotai JKHD.\n (2) Bertanggungjawab menguruskan permohonan Pensijilan Halal Malaysia.\n (3) Bertanggungjawab menguruskan dokumentasi dan rekod berkaitan halal.\n (4) Bertanggungjawab mengawal dan mengemaskini Manual HAS mengikut keperluan MHMS 2020.\n (5) Bertanggungjawab memastikan Manual HAS dilaksanakan secara berkesan.\n kelulusan daripada pengurusan tertinggi syarikat untuk membangun dan melaksanakan HAS.\n (7) Bertanggungjawab sebagai koordinator yang menguruskan aktiviti JKHD.\n (8) Mengetuai kumpulan kerja pembangunan HAS.\n (9) Mengesahkan dokumen dan aktiviti berkaitan HAS.', style: 'tableHeader', alignment: 'left'}],
                                  
                                  [{text: 'Wakil bahagian/ unit pembelian atau perolehan', style: 'tableHeader', alignment: 'left'}, {text: '(1) Menganggotai jawatankuasa kerja pembangunan HAS\n(2) Bertanggungjawab mengawal dan mengemaskini rekod dan dokumen pembelian berdasarkan keperluan MHMS 2020.\n (3) Bertanggungjawab menyelaras aktiviti berkaitan HAS:\n (a) membangunkan SOP pembelian bahan mentah;\n (b) memilih dan mencadangkan senarai pembekal bahan	mentah, processing	aid, bahan R&D, trading item, pembungkusan dan peralatan yang mematuhi keperluan Pensijilan Halal Malaysia;\n (c) mewujud dan melaksanakan penggunaan Borang Soal Selidik Bahan Mentah (Ingredient Questionaire Form) atau Kontrak Perjanjian Jual Beli kepada pembekal bahan mentah;\n (d) mengesyorkan senarai pembekal untuk disahkan oleh JKHD;\n (e) membantu	dalam	pelaksanaan	audit	halal dalaman syarikat;\n (f) merancang,	melaksana	dan	menilai	audit pembekal		dan	menyemak		semula		status pembekal sekiranya perlu;\n (g) mengawal	dan	memantau	Pelan	Pengurusan Risiko Halal untuk pemilihan bahan mentah dan pembekal; dan\n (h) lain-lain yang berkaitan HAS.\n (4) Bertanggungjawab	membantu	melancarkan	proses permohonan Pensijilan Halal Malaysia.\n (5) Bertanggungjawab	memastikan	HAS	dilaksanakan secara berkesan berdasarkan keperluan MHMS 2020.', style: 'tableHeader', alignment: 'left'}],
                                  
                        ]
                    }
                },
              ]
    }
  try
    { 
     pdfMake.createPdf(dd).open();
    }
     catch(e){
    console.log(e)
    alert(e);
  }
}

if (cmpny)
  {
  return (
   
    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer" style={{height:'70vh', overflowY:'auto'}}>
        <Header as='h3'>Jawatankuasa Halal Dalaman</Header>

        
        <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>No</Table.HeaderCell>
        <Table.HeaderCell>Senarai Peranan Jawatankuasa Halal Dalaman</Table.HeaderCell>
        <Table.HeaderCell>Nombor Rujukan Dokumen</Table.HeaderCell>
        <Table.HeaderCell>Templat</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>1</Table.Cell>
        <Table.Cell>Terma Rujukan Jawatankuasa Halal Dalaman (JKHD)</Table.Cell>
        <Table.Cell><EditableLabel
                        fluid
                        placeholder="No Rujukan Dokumen"
                        value={cmpny.cmpnyRefNo && cmpny.cmpnyRefNo? cmpny.cmpnyRefNo:"<No. Rujukan>"}
                        onSave={updCmpnyRefNo}
                      /></Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print1()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      {/* <Table.Row>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>Food and Beverages</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print2()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>3</Table.Cell>
        <Table.Cell>Food Premise</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print3()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>4</Table.Cell>
        <Table.Cell>General (Internal Halal Audit)</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print1()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>5</Table.Cell>
        <Table.Cell>General Audit Checklist</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print5()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>6</Table.Cell>
        <Table.Cell>Internal Halal Audit Checklist</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print6()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>7</Table.Cell>
        <Table.Cell>Internal Halal Audit Checklist (BM Version)</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print7()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>8</Table.Cell>
        <Table.Cell>Template: Internal Halal Audit Checklist</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print8()}>Muat Turun</Button></Table.Cell>
      </Table.Row> */}
    </Table.Body>
  </Table>
      </div>
    </Transition>
  )
}
else
return (<Header as='h3' >Loading....</Header>)
}

export default TabTOR