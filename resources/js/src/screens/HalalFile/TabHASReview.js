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
import { PDFDownloadLink, Document, Page } from 'react-pdf'

import {deleteSupplier, HalalFileContext, getSupplier, postMaterial} from './HalalFile';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

const TabHASReview = () => {
  const {supplier} = useContext(HalalFileContext);
  let { path, url } = useRouteMatch();


const hasreview=()=>{
    let dd = {
        content: [
            {text: 'HAS REVIEW', style: 'header', bold: true, alignment:'center'},
              ' ',
              
      {
        // for numbered lists set the ol key
        ol: [
          'The purpose of HAS Review is to ensure that all the elements included in HAS Manual are well implemented.\n ',
          'Management must ensure the efficiency and effectiveness of halal management system.\n ',
          'Review details must be documented and kept in Halal Assurance System Manual.\n ',
          'Each signatory must sign at the documents acknowledging that the review has been conducted\n ',
        ],
      },' ',
            {
              style: 'tableExample',
              color: '#444',
              table: {
                  widths: [150,150,150],
                  headerRows: 1,
                  // keepWithHeaderRows: 1,
                  body: [
                [
                  {text: 'Description', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'},
                  {text: 'Task', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'},
                  {text: 'Verification', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 
  
                ],               
                [
                  {text:' Halal Assurance System Plan\n ', alignment: 'center'}, 
                  {text:' Halal Executive\n ', alignment: 'center'}, 
                  {}, 
                ],
                [
                  {text:' Internal Halal Committee establishment & role\n ', alignment: 'center'}, 
                  {text:' IHC Members\n ', alignment: 'center'}, 
                  {},
                ],
                [
                  {text:' Process of the production\n\n ', alignment: 'center'}, 
                  {text:' Production Department\n ', alignment: 'center'}, 
                  {},
                ],
                [
                  {text:' Internal Halal Audit\n\n ', alignment: 'center'}, 
                  {text:' Halal Executive\n ', alignment: 'center'}, 
                  {},
                ],
                [
                  {text:' Minutes of IHC meetings\n\n ', alignment: 'center'}, 
                  {text:' Halal Executive\n ', alignment: 'center'}, 
                  {},
                ],
                [
                  {text:' Halal Training Manual\n\n ', alignment: 'center'}, 
                  {text:' Halal Executive\n ', alignment: 'center'}, 
                  {},
                ],
                [
                  {text:' Non-Conformance Report Documentation\n ', alignment: 'center'}, 
                  {text:' Halal Executive\n ', alignment: 'center'}, 
                  {}, 
                ],
                [
                  {text:' Procedure on Corrective Action\n ', alignment: 'center'}, 
                  {text:' Halal Executive\n ', alignment: 'center'}, 
                  {},  
                ],
                [
                  {text:' Deviation & Correction Action\n ', alignment: 'center'}, 
                  {text:' Quality Assurance\n ', alignment: 'center'}, 
                  {}, 
                ],
                [
                  {text:' Hygiene & Sanitation Program\n ', alignment: 'center'}, 
                  {text:' Quality Control\n ', alignment: 'center'}, 
                  {}, 
                ],
                [
                  {text:' Risk management plan\n \n  ', alignment: 'center'}, 
                  {text:' Quality Assurance & Quality Control\n ', alignment: 'center'}, 
                  {}, 
                ],
          ]
        },
        
      }, //ending table 
      ' ',' ',
            {
                style: 'tableExample',
                color: '#444',
                table: {
                    widths: [150,150,150],
                    headerRows: 1,
                    // keepWithHeaderRows: 1,
                    body: [
                [
                    {text: 'Description', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'},
                    {text: 'Task', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'},
                    {text: 'Verification', style: 'tableHeader', alignment: 'center',fillColor: '#add8e6'}, 

                ],               
                [
                    {text:' Material / Ingredient Purchasing\n ', alignment: 'center'}, 
                    {text:' Procurement Department\n ', alignment: 'center'}, 
                    {}, 
                ],
                [
                    {text:' Material / Ingredient Receiving\n ', alignment: 'center'}, 
                    {text:' Procurement Department\n ', alignment: 'center'}, 
                    {}, 
                ],
                [
                    {text:' Chemical Sampling & Testing\n ', alignment: 'center'}, 
                    {text:' Bio Tech Engineering\n ', alignment: 'center'}, 
                    {}, 
                ],
                [
                    {text:' Storage Documentation\n\n ', alignment: 'center'}, 
                    {text:' Halal Executive\n ', alignment: 'center'}, 
                    {}, 
                ],
                [
                    {text:' Distribution Documentation\n\n ', alignment: 'center'}, 
                    {text:' Halal Executive\n ', alignment: 'center'}, 
                    {}, 
                ],
                [
                    {text:' Training Program (Halal Training)\n\n ', alignment: 'center'}, 
                    {text:' Halal Executive\n ', alignment: 'center'}, 
                    {}, 
                ],//end of table
                [
                    {text: 'Notice:\n\n i. The HAS review needs to be conducted annually by the top management.\n ii. The review needs to be carried out by the appointed person in each description.\n iii. Details in the review must be documented as how it was implemented.\n iv. The review must be acknowledged by all employees that are involved in the HAS development\n \n \nComment: \n \n \n \n \n \n\n \n \n \n \n \n Verified By: \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t Date:'+moment().format("DD/MM/YYYY")+'\n \n \n \n \n \n ..............................\n(TOP MANAGEMENT)', colSpan: 3, alignment: 'left'}, 
                    {}, 
                    {}, 
                ],
            ]
        },
        
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
    <Header as='h3'>Semakan HAS</Header>
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
                                href="/files/HAS REVIEW.docx"
                                target="_blank">Muat Turun
                        </Button>
            </Table.Cell>
            {/* <Table.Cell><Button color="teal" fluid onClick={()=>hasreview()}>Muat Turun</Button></Table.Cell> */}
          </Table.Row>
        </Table.Body>
      </Table>
{/*//////////////////////////////////////////////////////////////////////table hasreview//////////////////////////////////////////////////////////////////////////////////////////////*/}


    </div>
  </Transition>
  );
}

export default TabHASReview
