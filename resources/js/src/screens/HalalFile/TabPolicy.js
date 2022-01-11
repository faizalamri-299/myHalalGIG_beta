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

import {useParams,Switch,Route,Link,useRouteMatch} from "react-router-dom";

import {AuthContext} from '../auth/auth';
// import { ClientContext,saveChecklist } from '..client/client';

import {deleteSupplier, HalalFileContext, getSupplier, postMaterial} from './HalalFile';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

import dp from '../../assets/img/defaultphoto.png';

const TabPolicy = ({id}) => {
  const {supplier} = useContext(HalalFileContext);
  let { path, url } = useRouteMatch();

  const { cmpny, profile} = React.useContext(AuthContext);

  const { index } = useParams();



const print1=()=>{
    let dd = {
        content: [
          { image: 'logo',
          width: 200,
          alignment: 'center'},
          // margin: [0, 150, 0, 30]},
            {
                stack: [
                    {text: cmpny.cmpnyName, style: 'header', bold: true, alignment:'center'},
                    {text: 'Halal Policy\n', style: 'header', bold: true, alignment:'center'},
                ],
                style: 'header'
            },
            {
                stack: [
                    '1. Company ' +cmpny.cmpnyName+ ' is committed to producing only halal products and ensuring that every product manufactured and sold in Malaysia is in a good quality and safe to consume to continually improve the service performance.\n\n',
                    '2. The Internal Halal Committee of ' +cmpny.cmpnyName+ ' will closely monitor and control the entire value chain of the consumer goods manufacturing process to ensure compliance with the halal certification requirements of Malaysia.\n\n',
                    '3. To keep and maintain the Halal Integrity of consumer goods products, we are committed to meet Halal regulatory requirements by ensuring all the ingredients that have been used for the consumer goods product are certified by the authorized Halal certification bodies and other related regulatory bodies.\n\n',
                    '4. The equipment, tools, utensils, and processing aids used by ' +cmpny.cmpnyName+ ' in terms of processing purposes are clean and free from contamination of non-Halal elements. The monitoring schedules and maintenance for equipment were also recorded.\n\n',
                    '5. We are committed to comply with the requirements of the halal assurance, and quality management system and working with our customers, suppliers, contractors, and employees.\n\n\n\n\n',
                ],
                margin: [0, 20, 0, 0],
                alignment: 'justify'
            },
            {
                stack: [
                    {text: 'Signature\n\n\n', style: 'header', bold: false, alignment:'right'},
                    {text: profile.name+ '\n', style: 'header', bold: false, alignment:'right'},
                    {text: '(Position)\n', style: 'header', bold: false, alignment:'right'},
                    {text: moment().format("DD/MM/YYYY")+'\n', style: 'header', bold: false, alignment:'right'}
                ],
            },
        ],
        images: {
          logo:cmpny.cmpnyConfig.headerLogo}
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

const printmalay=()=>{
  let dd = {
      content: [
        { image:'logo',
        width: 200,
        alignment: 'center'},
        ' ',' ',
          {
              stack: [
                  {text: cmpny.cmpnyName, style: 'header', bold: true, alignment:'center'},
                  ' ',
                  {text: 'Polisi Halal\n', style: 'header', bold: true, alignment:'center'},
              ],
              style: 'header'
          },
          {
              stack: [
                  '1. ' +cmpny.cmpnyName+ ' komited dalam mengeluarkan dan membekalkan produk/ perkhidmatan halal yang mematuhi keperluan Pensijilan Halal Malaysia.\n\n',
                  '2. ' +cmpny.cmpnyName+ ' komited dalam menghasilkan produk yang berkualiti bagi memenuhi keperluan pelanggan, selamat digunakan dan disahkan halal oleh JAKIM/ JAIN.\n\n',
                  '3. ' +cmpny.cmpnyName+ ' menjamin bahawa keseluruhan rantaian pengeluaran produk/ perkhidmatan adalah halal.\n\n',
                  '4. ' +cmpny.cmpnyName+ ' bertanggungjawab untuk mengambil tindakan pembetulan atau sebarang tindakan lain yang perlu termasuklah proses penarikan balik produk di pasaran sekiranya berlaku sebarang ketidakakuran pada mana-mana peringkat pengeluaran/ perkhidmatan halal.\n\n',
                  '5. ' +cmpny.cmpnyName+ ' memastikan bahawa polisi dan prosedur Pensijilan Halal Malaysia dipatuhi sepenuhnya secara berterusan di semua peringkat organisasi.\n\n\n\n\n',
              ],
              margin: [0, 20, 0, 0],
              alignment: 'justify'
          },
          {
              stack: [
                  {text: 'Tandatangan\n\n\n', style: 'header', bold: false, alignment:'right'},
                  {text: profile.name+ '\n', style: 'header', bold: false, alignment:'right'},
                  {text: '(Jawatan)\n', style: 'header', bold: false, alignment:'right'},
                  {text: moment().format("DD/MM/YYYY")+'\n', style: 'header', bold: false, alignment:'right'}
              ],
          },
      ],
      images: {
        logo:cmpny.cmpnyConfig.headerLogo}        
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

const print3=()=>{
    let dd = {
        content: [
          { image:'logo',
          width: 200,
          alignment: 'center'},
          ' ', ' ',
            {
                stack: [
                    {text: cmpny.cmpnyName, style: 'header', bold: true, alignment:'center'},
                    ' ',
                    {text: 'Halal Policy\n', style: 'header', bold: true, alignment:'center'},
                ],
                style: 'header'
            },
            {
                stack: [
                    '1. ' +cmpny.cmpnyName+ ' is committed to serve a safe and clean (Name of Product/Scheme)  by establishing clear objectives and goals in all areas of our operation, including cooking and preparation process in accordance with halal and safety.\n\n',
                    '2. ' +cmpny.cmpnyName+ ' also committed in complying with all related halal regulatory requirements by ensuring the supply chain and the process of preparing (Name of Product/Scheme) from the supplier of raw materials until the consumers are applied with the halal concepts and standards.\n\n',
                    '3. We also target in constantly enhancing our (Name of Product) quality to achieve high quality standards of (Name of Product/Scheme).\n\n',
                    '4. Our performance is continually monitored and evaluated, and the outcomes are used by the management to provide a better quality of halal (Name of Product/Scheme) for our consumers.\n\n',
                    '5. ' +cmpny.cmpnyName+ ' will strive to ensure that our policy is applied and sustained to our consumers, suppliers and employees, and it is subject to continuous review to ensure the applicability.\n\n\n\n\n',
                ],
                margin: [0, 20, 0, 0],
                alignment: 'justify'
            },
            {
                stack: [
                    {text: 'Signature\n\n\n', style: 'header', bold: false, alignment:'right'},
                    {text: profile.name+ '\n', style: 'header', bold: false, alignment:'right'},
                    {text: '(Position)\n', style: 'header', bold: false, alignment:'right'},
                    {text: moment().format("DD/MM/YYYY")+'\n', style: 'header', bold: false, alignment:'right'}
                ],
            },
        ],
        images: {
          logo:cmpny.cmpnyConfig.headerLogo}
          // logo:cmpny.cmpnyConfig && cmpny.cmpnyConfig.headerLogo? cmpny.cmpnyConfig.headerLogo:dp}

          
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

const print4=()=>{
    let dd = {
        content: [
          { image: 'logo',
          width: 200,
          alignment: 'center'},
            {
                stack: [
                    {text: cmpny.cmpnyName, style: 'header', bold: true, alignment:'center'},
                    {text: 'Halal Policy\n', style: 'header', bold: true, alignment:'center'},
                ],
                style: 'header'
            },
            {
                stack: [
                    '1. ' +cmpny.cmpnyName+ ' is committed to serve with obedience and passion toward Halal Logistics in Malaysia and ASEAN region.\n\n',
                    '2. We pledge to uphold the Halal Assurance System (HAS) and ensure sustainability of Halal production processes according to JAKIM requirements and standards.\n\n',
                    '3. ' +cmpny.cmpnyName+ ' is ready to provide services based on Halal and certified by the Department of Islamic Development Malaysia (JAKIM) and others relevant authorised Islamic certification bodies. In accordance with the Halalan Toyyiban standards and the Islamic Syariah Law requirements.\n\n',
                    '4. ' +cmpny.cmpnyName+ ' is committed to provide unparalleled Halal Services on logistics to all industries and we are a highly committed company to provide services based on halal principle utilizing local resources, environmentally friendly services, inspiring positive impact to people and communities.\n\n',
                    '5. ' +cmpny.cmpnyName+ ' is fully committed to meet the Halal standards and requirements through continuous strengthening of the Internal Halal Control System (IHCS), employee’s understanding and implementing Halal in accordance with legal and Halalan Toyyiban requirements.\n\n\n\n\n',
                ],
                margin: [0, 20, 0, 0],
                alignment: 'justify'
            },
            {
                stack: [
                    {text: 'Signature\n\n\n', style: 'header', bold: false, alignment:'right'},
                    {text: profile.name+ '\n', style: 'header', bold: false, alignment:'right'},
                    {text: '(Position)\n', style: 'header', bold: false, alignment:'right'},
                    {text: moment().format("DD/MM/YYYY")+'\n', style: 'header', bold: false, alignment:'right'}
                ],
            },
        ],
        images: {
          logo:cmpny.cmpnyConfig.headerLogo}
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

const print5=()=>{
    let dd = {
        content: [
          { image: 'logo',
          width: 200,
          alignment: 'center'},
            {
                stack: [
                    {text: cmpny.cmpnyName, style: 'header', bold: true, alignment:'center'},
                    {text: 'Halal Policy\n', style: 'header', bold: true, alignment:'center'},
                ],
                style: 'header'
            },
            {
                stack: [
                    '1. ' +cmpny.cmpnyName+ ' is committed to provide halal, safe and high quality medical devices by establishing clear objectives and goals in all areas of our operation, including manufacturing processes which are in accordance with halal standards and procedures.\n\n',
                    '2. ' +cmpny.cmpnyName+ ' also committed in complying with all related halal regulatory requirements by ensuring the supply chain and distribution process of medical device products are applied with halal concepts and standard.\n\n',
                    '3. We also target in constantly enhancing our products quality to achieve high quality standards of medical devices products.\n\n',
                    '4. Our performance is continually monitored and evaluated, and the outcomes are used by the management to provide better quality of halal medical device products for our consumers.\n\n',
                    '5. ' +cmpny.cmpnyName+ ' will strive to ensure that our policy is applied and sustained to our consumers, suppliers, vendors and employees, and it is subject to continuous review to ensure the applicability.\n\n\n\n\n',
                ],
                margin: [0, 20, 0, 0],
                alignment: 'justify'
            },
            {
                stack: [
                    {text: 'Signature\n\n\n', style: 'header', bold: false, alignment:'right'},
                    {text: profile.name+ '\n', style: 'header', bold: false, alignment:'right'},
                    {text: '(Position)\n', style: 'header', bold: false, alignment:'right'},
                    {text: moment().format("DD/MM/YYYY")+'\n', style: 'header', bold: false, alignment:'right'}
                ],
            },
        ],
        images: {
          logo:cmpny.cmpnyConfig.headerLogo}
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

const print6=()=>{
    let dd = {
        content: [
          { image: 'logo',
          width: 200,
          alignment: 'center'},
            {
                stack: [
                    {text: cmpny.cmpnyName, style: 'header', bold: true, alignment:'center'},
                    {text: 'Halal Policy\n', style: 'header', bold: true, alignment:'center'},
                ],
                style: 'header'
            },
            {
                stack: [
                    '1. ' +cmpny.cmpnyName+ ' is committed to produce only halal products and ensuring that every product manufactured and sold in Malaysia of good quality and safe to consume to continually improve the service performance.\n\n',
                    '2. The Internal Halal Committee of ' +cmpny.cmpnyName+ ' will closely monitor and control the entire value chain of the manufacturing process to ensure compliance with the halal certification requirements of Malaysia.\n\n',
                    '3. To keep and maintain the Halal Integrity of the products, we are committed to meet Halal regulatory requirements by ensuring all the ingredients, materials, and equipment that have been used for the produced product are certified by the authorized Halal certification bodies and other related regulatory bodies.\n\n',
                    '4. The equipment, tools, utensils, and processing aids used by ' +cmpny.cmpnyName+ ' in terms of processing purposes are clean and free from contamination of non-Halal elements. The monitoring schedules and maintenance for equipment were also recorded.\n\n',
                    '5. We are committed to comply with the requirements of the halal assurance, and quality management system and working with our customers, suppliers, distributors, contractors, and employees. \n\n\n\n\n',
                ],
                margin: [0, 20, 0, 0],
                alignment: 'justify'
            },
            {
                stack: [
                    {text: 'Signature\n\n\n', style: 'header', bold: false, alignment:'right'},
                    {text: profile.name+ '\n', style: 'header', bold: false, alignment:'right'},
                    {text: '(Position)\n', style: 'header', bold: false, alignment:'right'},
                    {text: moment().format("DD/MM/YYYY")+'\n', style: 'header', bold: false, alignment:'right'}
                ],
            },
        ],
        images: {
          logo:cmpny.cmpnyConfig.headerLogo}
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

const print7=()=>{
    let dd = {
        content: [
          { image: 'logo',
          width: 200,
          alignment: 'center'},
            {
                stack: [
                    {text: cmpny.cmpnyName, style: 'header', bold: true, alignment:'center'},
                    {text: '(Pharmaceutical Product)\n', style: 'header', bold: true, alignment:'center'},
                    {text: 'HALAL POLICY\n', style: 'header', bold: true, alignment:'left'}
                ],
                style: 'header'
            },
            {
                stack: [
                    '1. ' +cmpny.cmpnyName+ ' is committed to ensure that all goods and products are safe and the quality of the products will be according to the global pharmaceutical safety and standard.\n\n',
                    '2. ' +cmpny.cmpnyName+ ' is committed to meet the needs, preferences and demands of consumers worldwide which can vary at the markets.\n\n',
                    '3. Consideration of various aspects including the religious pharmaceutical requirements like Halal is our main priorities in order to cater the specific needs of our consumers.\n\n',
                    '4. The priority of our company is to ensure and guarantee our pharmaceutical products can be used by everyone with minimal adverse effects.\n\n',
                    '5. ' +cmpny.cmpnyName+ ' working alongside the authorities and certification bodies of MS 2424:2019 in the respective of the Halal market in order to ensure that our pharmaceutical products meet the highest standard of compliance and ethical quality. \n\n\n\n\n',
                ],
                margin: [0, 20, 0, 0],
                alignment: 'justify'
            },
            {
                stack: [
                    {text: 'Signature\n\n\n', style: 'header', bold: false, alignment:'right'},
                    {text: profile.name+ '\n', style: 'header', bold: false, alignment:'right'},
                    {text: '(Position)\n', style: 'header', bold: false, alignment:'right'},
                    {text: moment().format("DD/MM/YYYY")+'\n', style: 'header', bold: false, alignment:'right'}
                ],
            },
        ],
        images: {
          logo:cmpny.cmpnyConfig.headerLogo}
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

const print8=()=>{
    let dd = {
        content: [
          { image: 'logo',
          width: 200,
          alignment: 'center'},
            {
                stack: [
                    {text: cmpny.cmpnyName, style: 'header', bold: true, alignment:'center'},
                    {text: 'Halal Policy\n', style: 'header', bold: true, alignment:'center'}
                ],
                style: 'header'
            },
            {
                stack: [
                    '1. ' +cmpny.cmpnyName+ ' is committed to provide top quality  halal slaughterhouse by establishing clear objectives and goals in all areas of our operation, including slaughtering process and distribution in accordance with halal and food safety.\n\n',
                    '2. ' +cmpny.cmpnyName+ ' also committed in complying with all related halal regulatory requirements by ensuring all slaughtering processes from the supplier of animal until the consumers are applied with halal concepts and standard.\n\n',
                    '3. We also target in constantly enhancing our slaughterhouse productivity to achieve high quality standards of slaughtering house.\n\n',
                    '4. Our performance is continually monitored and evaluated, and the outcomes are used by the management to provide better quality of halal slaughtering house services for our consumers.\n\n',
                    '5. ' +cmpny.cmpnyName+ ' will strive to ensure that our policy is applied and sustained to our consumers, suppliers, vendors and employees, and it is subject to continuous review to ensure the applicability.\n\n\n\n\n',
                ],
                margin: [0, 20, 0, 0],
                alignment: 'justify'
            },
            {
                stack: [
                    {text: 'Signature\n\n\n', style: 'header', bold: false, alignment:'right'},
                    {text: profile.name+ '\n', style: 'header', bold: false, alignment:'right'},
                    {text: '(Position)\n', style: 'header', bold: false, alignment:'right'},
                    {text: moment().format("DD/MM/YYYY")+'\n', style: 'header', bold: false, alignment:'right'}
                ],
            },
        ],
        images: {
          logo:cmpny.cmpnyConfig.headerLogo}
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


  return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer" style={{height:'70vh', overflowY:'auto'}}>
        <Header as='h3'>Polisi Halal</Header>

        <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>No</Table.HeaderCell>
        <Table.HeaderCell>Senarai Polisi Halal</Table.HeaderCell>
        <Table.HeaderCell>Templat</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {/* <Table.Row>
        <Table.Cell>1</Table.Cell>
        <Table.Cell>Consumer Goods</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print1()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>Cosmetics Scheme</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print1()}>Muat Turun</Button></Table.Cell>
      </Table.Row> */}
      <Table.Row>
        <Table.Cell>1</Table.Cell>
        <Table.Cell>Skim Umum (Versi Bahasa Inggeris)</Table.Cell>
        <Table.Cell><Button color="teal" 
                                fluid 
                                href="/files/HALAL POLISI (VERSI BI).docx"
                                target="_blank">Muat Turun
                        </Button>
            </Table.Cell>
        {/* <Table.Cell><Button color="teal" fluid onClick={()=>print3()}>Muat Turun</Button></Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>1</Table.Cell>
        <Table.Cell>Skim Umum (Versi Bahasa Melayu)</Table.Cell>
        <Table.Cell><Button color="teal" 
                                fluid 
                                href="/files/HALAL POLISI (VERSI BM).docx"
                                target="_blank">Muat Turun
                        </Button>
            </Table.Cell>
        {/* <Table.Cell><Button color="teal" fluid onClick={()=>printmalay()}>Muat Turun</Button></Table.Cell> */}
      </Table.Row>
      {/* <Table.Row>
        <Table.Cell>4</Table.Cell>
        <Table.Cell>Logistics</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print4()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>5</Table.Cell>
        <Table.Cell>Medical Devices Scheme</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print5()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>6</Table.Cell>
        <Table.Cell>OEM Scheme</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print6()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>7</Table.Cell>
        <Table.Cell>Pharmaceutical Scheme</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print7()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>8</Table.Cell>
        <Table.Cell>Slaugterhouse Scheme</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print8()}>Muat Turun</Button></Table.Cell>
      </Table.Row> */}
    </Table.Body>
  </Table>
      </div>
    </Transition>
  );
}

export default TabPolicy