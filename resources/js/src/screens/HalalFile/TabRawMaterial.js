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

import {deleteSupplier, HalalFileContext, getSupplier, postMaterial} from './HalalFile';

import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import {AuthContext} from '../auth/auth'; 

import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Tab } from '@material-ui/core';
import { random } from 'lodash';
// import {PDFtoIMG} from 'react-pdf-to-image';
// import PDFJS from 'pdfjs-dist/webpack';

pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;



const TabRawMaterial = () => {

  const {product} = useContext(HalalFileContext);
  const { cmpny, profile} = React.useContext(AuthContext);
  let { path, url } = useRouteMatch();
  // console.log(props)
  // const data = props.data;

  const printDocument=()=>{
    var currentTime = new Date()
    var year = currentTime.getFullYear()
    //table data tarik dari array context
    var tabledata = product
    console.log(product,'asdas')
    // Get property value by key/nested key path
    Object.byString = function(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }
  // Table body builder
  function buildTableBody(data, columns, showHeaders, headers) {
      var body = [];
      // Inserting headers
      if(showHeaders) {
      body.push(headers);
      }
      
      // Inserting items from external data array
      data.forEach(function(row) {
          var dataRow = [];
          var i = 0;
  
          columns.forEach(function(column) {
              dataRow.push({text: Object.byString(row, column), alignment: headers[i].alignmentChild,fontSize: 10 });
              i++;
          })
          body.push(dataRow);
         
      });
  
      return body;
  }
  
  // Func to return generated table
  function table(data, columns, witdhsDef, showHeaders, headers, layoutDef) {
      return {
          table: {
              headerRows: 1,
              fontSize: 10,
              widths: witdhsDef,
              body: buildTableBody(data, columns, showHeaders, headers)
          },
          layout: layoutDef
      };
  }
  
  let dd = {

    // footer: function(currentPage, pageCount) { 
    //   return {
    //     margin: [20, 15],
    //     fontSize: 8,
    //     alignment: 'right',
        
    //     text: 'Page' + currentPage.toString() + ' Of ' + pageCount
    //   }; 
    // },
    footer: function(currentPage, pageCount) { 
      return {
        margin: [20, 15, 20, 15],
        height: 30,
        fontSize: 8,
        columns: [{
          alignment: "left",
          text: cmpny.cmpnyName+' © '+moment().format("YYYY") ,
        }, {
          alignment: "right",
          text: [
            { text: currentPage.toString(), italics: true },
              " of ",
            { text: pageCount.toString(), italics: true }
          ]
        }]
      }
    },

    pageOrientation: 'landscape',
    alignment:'center',
    fontSize  : 10,
      content: [
          { text: 'Senarai Bahan Mentah Syarikat '+cmpny.cmpnyName, fontSize: 14, bold:true, margin: [0, 0 ,0, 10]},
          table(
              // External data
              tabledata,['sp_name', 'sp_address', '', 'sprm_name', 'sprm_scientific_name', 'sprm_material_source', 'spcb_cert_bodies', 'spcb_date_cert'],
              // Custom columns widths
              [86, 86, 86, 86, 86, 86, 86, 86],
              // Show headers?
              true,
              // Custom headers
              [
                {text: 'Nama Pembekal', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6', fontSize: 10, }, 
                {text: 'Alamat Pembekal', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6', fontSize: 10}, 
                {text: 'Status Pengisytiharan Bahan Mentah Kepada Pihak Berkuasa   (Ya / Tidak)', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6', fontSize: 10}, 
                {text: 'Nama Bahan Mentah', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6', fontSize: 10}, 
                {text: 'Nama Saintifik', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6', fontSize: 10}, 
                {text: 'Sumber Bahan', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6', fontSize: 10},
                {text: 'Badan Pengeluar Sijil Halal', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6', fontSize: 10}, 
                {text: 'Tarikh Tamat Sijil', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6', fontSize: 10}, 
              ],
              // Custom layout, use '' for no layout
              ''),
              { text: 'Dikemaskini Pada '+moment().format("DD/MM/YYYY"), fontSize: 11, italics:true, margin: [25, 25 ,0 ,25], alignment: 'right'},
              // { text: 'data:image/jpeg;base64,'},
            ],
           
  }
  try
    { 
      pdfMake.createPdf(dd).open()
    }
  catch(err){
    console.log('error',err)
    swal("Error", "Something goes wrong!", err);
    //alert(err);
  }
}

const RenderSupplier = props => {

  const data = props.data;
  
  console.log("asdasdasdasdas",data)
  const listItems = data.map((x) =>
  <Table.Row > {x.fk_rmsd_raw_mat_id == null ? 
    null
    :
    <>
    <Table.Cell collapsing>{x.sp_name}</Table.Cell>
    <Table.Cell>{x.sprm_name}</Table.Cell>
    <Table.Cell collapsing><Button basic color='teal' content='black' href={'/zipSupportDoc'+x.fk_rmsd_raw_mat_id}>Download</Button>
    </Table.Cell>
    </>
  
  
  }
    
 </Table.Row>
  );
  return <Table basic>
<Table.Header>
 <Table.Row>
   <Table.HeaderCell>Nama Pembekal</Table.HeaderCell>
   <Table.HeaderCell>Bahan Mentah</Table.HeaderCell>
    <Table.HeaderCell>Support Document</Table.HeaderCell>
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
        {product &&
          <RenderSupplier data={product}/>
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