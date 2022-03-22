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

const TabTraceability = () => {
  const {supplier} = useContext(HalalFileContext);
  let { path, url } = useRouteMatch();


const traceabilitygeneral=()=>{
    let dd =  {
      pageOrientation: 'landscape',
      alignment:'center',
      content: [
        {text: 'TRACEABILITY RECORD', style: 'header', bold: true, alignment:'center'},
            ' ',
            {
                style: 'tableExample',
                color: '#444',
                table: {
                    widths: [69,69,69,69,69,69,69,69,69,69],
                    headerRows: 1,
                    // keepWithHeaderRows: 1,
                    body: [

                [{text: 'PRE-PROCESSING TRACEABILITY RECORD', colSpan: 10, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {}, 
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                ], //HEADER

                [
                    {text: 'Purchase Of Raw Material ',colSpan:3, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {}, 
                    {}, 
                    {text: 'Reception Of Raw Material ',colSpan:4, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {}, 
                    {},
                    {}, 
                    {text: 'Storage Of Raw Material ',colSpan:3, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {}, 
                    {},
                ],
                
                [
                    {text: 'Invoice', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {text: 'Halal Certificate', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {text: 'Flow Chart', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {text: 'Delivery Order', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {text: 'Certification of Analysis', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {text: 'Consignment Note', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'},
                    {text: 'Import Permit', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {text: 'Stock Card', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {text: 'Checklist Material', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                    {text: 'Packaging Label', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'},
                ],
                
                [
                    {text:' \n \n  '}, 
                    {}, 
                    {}, 
                    {}, 
                    {}, 
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
                    {}, 
                    {}, 
                    {}, 
                    {},
                ],
              ]
          }
      },
  ' ',' ',
        {
            style: 'tableExample',
            color: '#444',
            table: {
                widths: [69,69,69,69,69,69,69,69,69,69],
                headerRows: 1,
                // keepWithHeaderRows: 1,
                body: [

            [{text: 'PROCESSING TRACEABILITY RECORD', colSpan: 10, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
            ], //HEADER

            [
                {text: 'Processing ',colSpan:3, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                {}, 
                {text: 'Packaging',colSpan:5, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                {},
                {}, 
                {},
                {text: 'Finished Product Storage',colSpan:2, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                
            ],
            
            [
                {text: 'Batch Manufacturing Record',colSpan:2, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                {text: 'Certification of Analysis', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {text: 'Halal Certificate Holders Name and Address',colSpan:3,style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                {},
                {text: 'Batch Number', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {text: 'Expiry Date', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {text: 'Stock Card', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {text: 'Release Note', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'},
            ],
            
            [
                {text:' \n \n ',colSpan:2}, 
                {}, 
                {}, 
                {text:' ',colSpan:3}, 
                {}, 
                {},
                {}, 
                {}, 
                {}, 
                {},
            ],
            [
                {text:'  \n \n ',colSpan:2}, 
                {}, 
                {}, 
                {text:' ',colSpan:3},  
                {}, 
                {},
                {}, 
                {}, 
                {}, 
                {},
            ],
            [
                {text:'  \n \n ',colSpan:2}, 
                {}, 
                {}, 
                {text:' ',colSpan:3},  
                {}, 
                {},
                {}, 
                {}, 
                {}, 
                {},
            ],
            [
                {text:'  \n \n ',colSpan:2}, 
                {}, 
                {}, 
                {text:' ',colSpan:3},  
                {}, 
                {},
                {}, 
                {}, 
                {}, 
                {},
            ],
            [
                {text:'  \n \n ',colSpan:2}, 
                {}, 
                {}, 
                {text:' ',colSpan:3},  
                {}, 
                {},
                {}, 
                {}, 
                {}, 
                {},
            ],
            [
                {text:'  \n \n ',colSpan:2}, 
                {}, 
                {}, 
                {text:' ',colSpan:3},  
                {}, 
                {},
                {}, 
                {}, 
                {}, 
                {},
            ],
            [
                {text:'  \n \n ',colSpan:2}, 
                {}, 
                {}, 
                {text:' ',colSpan:3},  
                {}, 
                {},
                {}, 
                {}, 
                {}, 
                {},
            ],
            [
                {text:'  \n \n ',colSpan:2}, 
                {}, 
                {}, 
                {text:' ',colSpan:3},  
                {}, 
                {},
                {}, 
                {}, 
                {}, 
                {},
            ],
            [
                {text:'  \n \n ',colSpan:2}, 
                {}, 
                {}, 
                {text:' ',colSpan:3},  
                {}, 
                {},
                {}, 
                {}, 
                {}, 
                {},
            ],
            
          ]
      }
  },
  ' ',' ',
        {
            style: 'tableExample',
            color: '#444',
            table: {
                widths: [69,69,69,69,69,69,69,69,69,69],
                headerRows: 1,
                // keepWithHeaderRows: 1,
                body: [

            [{text: 'POST-PROCESSING TRACEABILITY RECORD', colSpan: 10, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
            ], //HEADER

            [
                {text: 'Distribution ',colSpan:4, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                {}, 
                {}, 
                {text: 'Consumer',colSpan:6, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {},
                {}, 
                {},
                {}, 
                {}, 
                
            ],
            
            [
                {text: 'External Logistics Contract',colSpan:2, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                {text: 'Delivery Notes',colSpan:2, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                {text: 'Packaging Label',colSpan:2, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {},
                {text: 'Batch Number',colSpan:2, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                {text: 'Customer Complaint Record',colSpan:2, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {},
            ],
            
            [
                {text:' \n \n ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},  
                {text:' ',colSpan:2}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},  
                {text:' ',colSpan:2}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},  
                {text:' ',colSpan:2}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},  
                {text:' ',colSpan:2}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},  
                {text:' ',colSpan:2}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},  
                {text:' ',colSpan:2}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},  
                {text:' ',colSpan:2}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
                ]
            }
        },
        ' ',' ',' ',' ',' ',' ',
        {
            style: 'tableExample',
            color: '#444',
            table: {
                widths: [15,75,75,75,75,75,75,75,75,75],
                headerRows: 1,
                // keepWithHeaderRows: 1,
                body: [

            [{text: 'PRODUCT RECALL RECORD', colSpan: 10, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
            ], //HEADER

            [
                {text: 'No ', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {text: 'Name of Product', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {text: 'Batch Number', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {text: 'Expiry Date', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {text: 'Recall Date', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {text: 'Recall Coordinator', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'},
                {text: 'Reason of Recall',colSpan:2, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {},
                {text: 'Description',colSpan:2, style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
                {}, 
                
            ],
            [
                {text:' \n \n '}, 
                {}, 
                {text:' '}, 
                {}, 
                {text:' '}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n '}, 
                {}, 
                {text:' '}, 
                {}, 
                {text:' '}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n '}, 
                {}, 
                {text:' '}, 
                {}, 
                {text:' '}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n '}, 
                {}, 
                {text:' '}, 
                {}, 
                {text:' '}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n '}, 
                {}, 
                {text:' '}, 
                {}, 
                {text:' '}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n '}, 
                {}, 
                {text:' '}, 
                {}, 
                {text:' '}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n '}, 
                {}, 
                {text:' '}, 
                {}, 
                {text:' '}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
                {},
            ],
            [
                {text:' \n \n '}, 
                {}, 
                {text:' '}, 
                {}, 
                {text:' '}, 
                {},
                {text:' ',colSpan:2}, 
                {}, 
                {text:' ',colSpan:2}, 
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
    <Header as='h3'>Kebolehkesanan</Header>
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
            <Table.Cell><Button color="teal" fluid onClick={()=>traceabilitygeneral()}>Muat Turun</Button></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Header as='h3'>Prosedur Operasi Standard Kebolehkesanan</Header>
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
            <Table.Cell><Button color="teal" fluid href="/files/TRACEABILITY_SOP.pdf" target="_blank">Muat Turun</Button>
</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Header as='h3'>Prosedur Operasi Standard panggil semula produk</Header>
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
            <Table.Cell><Button color="teal" fluid href="/files/PRODUCT RECALL SOP.docx" target="_blank">Muat Turun</Button></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  </Transition>
  );
}

export default TabTraceability