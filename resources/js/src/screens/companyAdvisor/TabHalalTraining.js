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
  Button,Label,Divider
} from 'semantic-ui-react';

import * as moment from 'moment';


import {Switch,Route,Link,useRouteMatch} from "react-router-dom";
import { PDFDownloadLink, Document, Page } from 'react-pdf'

import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

import { ClientContext } from '../client/client';

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const TabHalalTraining = () => {
 
  const { premises,inhalalcom,training } = React.useContext(ClientContext);

const halaltrainingschedule=()=>{
    let dd = {
      alignment:'center',
      content: [
        {text: 'Halal Training Record', style: 'header', bold: true, alignment:'center'},
            ' ',
            {
                style: 'tableExample',
                color: '#444',
                table: {
                    widths: [35,84,84,84,84,84],
                    headerRows: 1,
                    // keepWithHeaderRows: 1,
                    body: [

                [{text: 'SCHEDULE OF TRAINING', colSpan: 6, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {}, 
                    {},
                    {},
                    {},
                    {},


                ], //HEADER
                [
                    {text: 'No', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {text: 'Type Of Training', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {text: 'Participants', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {text: 'Frequency', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {text: 'Suggested Date', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {text: 'Trainer', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'},
                ],
                
                [
                    {text:' \n \n  '}, 
                    {}, 
                    {}, 
                    {}, 
                    {}, 
                    {},

                ],
                [
                    {text:' \n \n '}, 
                    {}, 
                    {}, 
                    {}, 
                    {},
                    {}, 

                ],
                [
                    {text:' \n \n '}, 
                    {}, 
                    {}, 
                    {}, 
                    {}, 
                    {},
                ],
                [
                    {text:' \n \n '}, 
                    {}, 
                    {}, 
                    {}, 
                    {}, 
                    {},
                ],
                [
                    {text:' \n \n '}, 
                    {}, 
                    {}, 
                    {}, 
                    {}, 
                    {},
                ],
                [
                    {text:' \n \n '}, 
                    {}, 
                    {}, 
                    {}, 
                    {}, 
                    {},
                ],
                [
                    {text:' \n \n '}, 
                    {}, 
                    {}, 
                    {}, 
                    {}, 
                    {},
                ],
                [
                  {text:' \n \n '}, 
                  {}, 
                  {}, 
                  {}, 
                  {}, 
                  {},
              ],
              [
                {text:' \n \n '}, 
                {}, 
                {}, 
                {}, 
                {}, 
                {},
              ],
              [
                {text:' \n \n '}, 
                {}, 
                {}, 
                {}, 
                {}, 
                {},
              ],
              [
                {text:' \n \n '}, 
                {}, 
                {}, 
                {}, 
                {}, 
                {},
              ],
              [
                {text:' \n \n '}, 
                {}, 
                {}, 
                {}, 
                {}, 
                {},
              ],
              [
                {text:' \n \n '}, 
                {}, 
                {}, 
                {}, 
                {}, 
                {},
              ],
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
      pdf.text(75, 6, "Senarai Latihan Halal");  
      pdf.save("Latihan Halal.pdf");  
    });  
}  

const RenderClientTraining = ({data})=> {


  const listItems = Object.keys(data).map((pg,i) =>
  <Table.Row key={pg}>
      <Table.Cell>{i+1}</Table.Cell>
   <Table.Cell>{data[pg].trainingname}</Table.Cell>
   <Table.Cell>{data[pg].notes}</Table.Cell>
  <Table.Cell> </Table.Cell>
  <Table.Cell>{moment(data[pg].sdate).format('DD/MM/YYYY')}</Table.Cell>
  <Table.Cell>{data[pg].trainer}</Table.Cell>
 </Table.Row>
  );
  return <Table id="pdfdiv">
<Table.Header>
 <Table.Row>
 <Table.HeaderCell>No</Table.HeaderCell>
 <Table.HeaderCell>Jenis Latihan</Table.HeaderCell>
        <Table.HeaderCell>Peserta</Table.HeaderCell>
        <Table.HeaderCell>Kekerapan</Table.HeaderCell>
        <Table.HeaderCell>Tarikh</Table.HeaderCell>
        <Table.HeaderCell>Pelatih</Table.HeaderCell>
 </Table.Row>
</Table.Header>

<Table.Body>
  {listItems}
</Table.Body>
</Table>
}

  return (

  <Transition transitionOnMount={true} animation="fade" duration={1000}>
    <div className="in innerContainer" style={{height:'70vh', overflowY:'auto'}}>   

    <Header as='h3'>Senarai Latihan</Header> 
        <Button color="teal" fluid onClick={()=>printDocument()}>Muat Turun</Button>
        {training &&
          <RenderClientTraining data={training}/>
        }
        <Divider></Divider>


    <Header as='h3'>Templat Latihan</Header>
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
            <Table.Cell><Button color="teal" fluid onClick={()=>halaltrainingschedule()}>Muat Turun</Button></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  </Transition>
  );
}

export default TabHalalTraining
