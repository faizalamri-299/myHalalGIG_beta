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

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import {deleteSupplier, HalalFileContext, getSupplier, postMaterial} from './HalalFile';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

const TabHalalRiskControl = () => {
  const {supplier} = useContext(HalalFileContext);
  let { path, url } = useRouteMatch();

const print1=()=>{
    let dd = {
        pageOrientation: 'landscape',
        content: [
              {text: 'HALAL RISK CONTROL', style: 'header', bold: true, alignment:'center'},
                ' ',
                {
                    style: 'tableExample',
                    color: '#444',
                    table: {
                        widths: [100, 100, 100, 100, 90, 100, 100],
                        headerRows: 2,
                        // keepWithHeaderRows: 1,
                        body: [
                                  [{text: 'HALAL CONTROL POINT (HCP)', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'HALAL RISK', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'CONTROL MECHANISM', style: 'tableHeader', colSpan:3, alignment: 'center'}, {}, {},{text: 'CORRECTIVE ACTION', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12},{text: 'RECORD', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}],
                                  [{}, {}, {text: 'METHOD', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'CONSTANCY', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'WHO', style: 'tableHeader', alignment: 'center'},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
                                  [{text:' '},{},{},{},{},{},{}],
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

const print2=()=>{
  let dd = {
    pageOrientation: 'landscape',
      content: [
        {text: 'PELAN PENGURUSAN RISIKO HALAL', style: 'header', bold: true, alignment:'center'},
        ' ',
        {
            style: 'tableExample',
            color: '#444',
            table: {
                widths: [100, 100, 100, 100, 90, 105, 95],
                headerRows: 2,
                // keepWithHeaderRows: 1,
                body: [
                          [{text: 'TITIK KAWALAN HALAL (HCP)', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'RISIKO HALAL', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'MEKANISMA KAWALAN', style: 'tableHeader', colSpan:3, alignment: 'center'}, {}, {},{text: 'TINDAKAN PEMBETULAN', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12},{text: 'REKOD', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}],
                          [{}, {}, {text: 'KAEDAH', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'KEKERAPAN', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'SIAPA', style: 'tableHeader', alignment: 'center'},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
                          [{text:' '},{},{},{},{},{},{}],
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


  return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer" style={{height:'68vh', overflowY:'auto'}}>
        <Header as='h3'>Risiko Kawalan Halal</Header>

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
        <Table.Cell>Skim Umum (Versi Bahasa Inggeris)</Table.Cell>
        <Table.Cell><Button color="teal" 
                                fluid 
                                href="/files/General Scheme HRMP.docx"
                                target="_blank">Muat Turun
                        </Button>
            </Table.Cell>
        {/* <Table.Cell><Button color="teal" fluid onClick={()=>print1()}>Muat Turun</Button></Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>Skim Umum (Versi Bahasa Melayu)</Table.Cell>
        <Table.Cell><Button color="teal" 
                                fluid 
                                href="/files/MalayVersion PELAN PENGURUSAN RISIKO HALAL.docx"
                                target="_blank">Muat Turun
                        </Button>
            </Table.Cell>
        {/* <Table.Cell><Button color="teal" fluid onClick={()=>print2()}>Muat Turun</Button></Table.Cell> */}
      </Table.Row>
    
    </Table.Body>
  </Table>
      </div>
    </Transition>
  );
}

export default TabHalalRiskControl