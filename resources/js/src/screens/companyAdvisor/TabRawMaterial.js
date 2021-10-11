import React,{useContext } from 'react'
import {
  Input, Menu, Segment,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Table,
  Transition,
  List,
  Button,
  Divider
} from 'semantic-ui-react';

import * as moment from 'moment';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import {deleteSupplier, CompanyAdvisorContext, getSupplier, postMaterial} from './companyAdvisor';

import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import {AuthContext} from '../auth/auth'; 

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Tab } from '@material-ui/core';

pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

const TabRawMaterial = (data,id) => {

  const companyrm = useContext(CompanyAdvisorContext);
  let { path, url } = useRouteMatch();

  let printDocument=()=>{  
    const input = document.getElementById('pdfdiv');  
    html2canvas(input)  
      .then((canvas) => {  
        var imgWidth = 200;  
        var pageHeight = 290;  
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF('p', 'mm', 'a4')  
        var position = 10;  
        pdf.addImage(imgData, 'JPEG', 5, position, imgWidth, imgHeight);
        pdf.setFont("times");
        pdf.text(75, 6, "Senarai Bahan Mentah");  
        pdf.save("raw_material_"+cmpny.cmpnyName+".pdf");  
      });  
  }  

  const RenderSupplier = props => {

    const data = props.data;
    
    //console.log("asdasdasdasdas",data)
    const listItems = data.map((x) =>
    <Table.Row >
     <Table.Cell>{x.cmpnyName}</Table.Cell>
     <Table.Cell>{x.sp_address}</Table.Cell>
     <Table.Cell></Table.Cell>
     <Table.Cell>{x.sprm_name}</Table.Cell>
     <Table.Cell>{x.sprm_scientific_name}</Table.Cell>
     <Table.Cell>{x.ad_fk_company_id}</Table.Cell>
     <Table.Cell>{x.spcb_cert_bodies == null ? "Tiada": x.spcb_cert_bodies}</Table.Cell>
     <Table.Cell>{x.spcb_date_cert == null ? "Tiada": moment(x.spcb_date_cert).format('DD/MM/YYYY')}</Table.Cell>
     <Table.Cell>{x.sprm_support_doc == null ? "Tiada": x.sprm_support_doc}</Table.Cell>
   </Table.Row>
    );
    return <Table id="pdfdiv">
  <Table.Header>
   <Table.Row>
     <Table.HeaderCell>Nama Pembekal</Table.HeaderCell>
     <Table.HeaderCell>Alamat Pembekal</Table.HeaderCell>
      <Table.HeaderCell>Status Pengisytiharan Bahan Mentah Kepada Pihak Berkuasa Berwibawa(Ya / Tidak)</Table.HeaderCell>
     <Table.HeaderCell>Nama Bahan Mentah</Table.HeaderCell>
     <Table.HeaderCell>Nama Saintifik</Table.HeaderCell>
     <Table.HeaderCell>Sumber Bahan</Table.HeaderCell>
     <Table.HeaderCell>Badan Pengeluar Sijil Halal</Table.HeaderCell>
     <Table.HeaderCell>Tarikh Tamat Sijil</Table.HeaderCell>
     <Table.HeaderCell>Dokumen Sokongan</Table.HeaderCell>
   </Table.Row>
 </Table.Header>

  <Table.Body>
    {listItems}
  </Table.Body>
</Table>
  }
  return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer">
        <Header as='h3'>Senarai Bahan Mentah</Header> 
        <Button color="teal" fluid onClick={()=>printDocument()}>Cetak</Button>
        {companyrm &&
          <RenderSupplier data={companyrm}/>
        }
        <Divider></Divider>
        
      <Header as='h3'>Prosedur Operasi Standard Kawalan Bahan Mentah</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Senarai</Table.HeaderCell>
            <Table.HeaderCell>Templat</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Skim Umum</Table.Cell>
            <Table.Cell><Button color="teal" 
                                fluid 
                                href="/files/PROSEDUR KAWALAN BAHAN MENTAH.docx" 
                                target="_blank">Muat Turun
                        </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>   
      </div>
    </Transition>
  )
}

export default TabRawMaterial