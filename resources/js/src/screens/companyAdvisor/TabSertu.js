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
import { PDFDownloadLink, Document, Page } from 'react-pdf'



import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

const TabSertu = () => {

  let { path, url } = useRouteMatch();


  
const sertu=()=>{
    let dd = {
      alignment:'center',
        content: [
          {text: 'Sertu Record For General Scheme', style: 'header', bold: true, alignment:'left'},
            ' ',
          {
            style: 'tableExample',
            color: '#444',
            table: {
                widths: [35,105,105,105,105,],
                headerRows: 1,
                // keepWithHeaderRows: 1,
                body: [
              [
                {text: 'SERTU RECORD', colSpan: 5, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                {},
                {},
                {},
              ], //HEADER
              [
                {text: 'No', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'},
                {text: 'Date', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'},
                {text: 'Details', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {text: 'Officer In Charge', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {text: 'Remarks', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
              ],               
              [
                {text:' \n \n '}, 
                {}, 
                {}, 
                {}, 
                {}, 
              ],
              [
                {text:'  \n \n '}, 
                {}, 
                {}, 
                {}, 
                {}, 
              ],
              [
                {text:'  \n \n '}, 
                {}, 
                {}, 
                {}, 
                {}, 
              ],
              [
                {text:'   \n \n '}, 
                {}, 
                {}, 
                {}, 
                {}, 
              ],
              [
                {text:'   \n \n '}, 
                {}, 
                {}, 
                {}, 
                {}, 
              ],
              [
                {text:'  \n \n  '}, 
                {}, 
                {}, 
                {}, 
                {}, 
              ],
              [
                {text:'  \n \n  '}, 
                {}, 
                {}, 
                {}, 
                {}, 
              ],
              [
                {text:'  \n \n  '}, 
                {}, 
                {}, 
                {}, 
                {}, 
              ],
              [
                {text:'  \n \n  '}, 
                {}, 
                {}, 
                {}, 
                {}, 
              ],
              [
                {text:'  \n \n  '}, 
                {}, 
                {}, 
                {}, 
                {}, 
              ],
              [
                {text:'  \n \n  '}, 
                {}, 
                {}, 
                {}, 
                {}, 
              ],
              [
                {text:'  \n \n  '}, 
                {}, 
                {}, 
                {}, 
                {}, 
              ],
              [
                {text:'  \n \n  '}, 
                {}, 
                {}, 
                {}, 
                {}, 
              ],
              [
                {text:'  \n \n  '}, 
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

  return (

  <Transition transitionOnMount={true} animation="fade" duration={1000}>
    <div className="in innerContainer" style={{height:'68vh', overflowY:'auto'}}> 
{/*//////////////////////////////////////////////////////////////////////table sertu//////////////////////////////////////////////////////////////////////////////////////////////*/}  
    <Header as='h3'>Sertu</Header>
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
            <Table.Cell><Button color="teal" fluid onClick={()=>sertu()}>Muat Turun</Button></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
{/*//////////////////////////////////////////////////////////////////////table sertu//////////////////////////////////////////////////////////////////////////////////////////////*/}



      <Header as='h3'>Prosedur Operasi Standard Sertu</Header>
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
                                href="/files/SOP Of Sertu.docx"
                                target="_blank">Muat Turun
                        </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>


    </div>
  </Transition>
  );
}

export default TabSertu
