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

const TabIHA = () => {
  const {supplier} = useContext(HalalFileContext);
  let { path, url } = useRouteMatch();

const print1=()=>{
    let dd = {
        content: [
              {text: 'INTERNAL HALAL AUDIT CHECKLIST', style: 'header', bold: true, alignment:'center'},
                ' ',
                {
                    style: 'tableExample',
                    color: '#444',
                    table: {
                        widths: [150, 100, 100,100],
                        headerRows: 2,
                        // keepWithHeaderRows: 1,
                        body: [
                                  [{text: 'DATE', style: 'tableHeader', alignment: 'left'}, {text: '  ', style: 'tableHeader', alignment: 'left'}, {text: 'LOCATION', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],
                                  [{text: 'TIME', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}, {text: 'AUDITOR', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],                     
                                  ['COMPANY/DEPARTMENT' ,{colSpan: 3, text: ' '}, '',''],
                                  ['AUDITEE' ,{colSpan: 3, text: ' '}, '',''],
                                  ['DOCUMENT REFERENCE' ,{colSpan: 3, text: ' '}, '',''],
                        ]
                    }
                },
                ' ',' ',' ',
                ////////////2nd table
                {
                    style: 'tableExample',
                    color: '#444',
                    table: {
                        widths: [50, 150, 75, 75, 100],
                        headerRows: 3,
                        // keepWithHeaderRows: 1,
                        body: [
                                  [{text: 'Department/ Process Flow: Refer to HAS/MANUAL/HCP - PROD/ \n Requirement in standards: MS 2634: 2019 (1st Revision)', colSpan: 5, style: 'tableHeader', alignment: 'center'}, {}, {}, {}, {}],
                                  [{text: 'NO.', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'SCOPE', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'RESULTS OF AUDIT', style: 'tableHeader', colSpan:3, alignment: 'center'}, {}, {}],
                                  [{}, {}, {text: 'YES', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'NO', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'DOCUMENTS REFERENCE', style: 'tableHeader', alignment: 'center'}],
                                  [{text: '1', alignment:'center'} ,{text: 'HAS System\n\n i. HAS manual is located in the area\n ii. HAS manual is up to date\n iii. Halal executive\n iv. Appointment letter\n v. Halal Committee\n vi. Minutes of meeting, organizational chart\n vii. Internal Halal Audit\n viii. Procedure, schedule, and report\n', alignment:'left'}, '','',''],
                                  [{text: '2', alignment:'center'} ,{text: 'Product Specification\n\n i. Product specification for all of the product	esp HCP products\n ii. Purchasing of Halal material is based on the product specification', alignment:'left'}, '','',''],					
                                  [{text: '3', alignment:'center'} ,{text: 'Halal process Flow\n\n i. Process flow is correct\n ii. Each of the HCP has control measure and corrective action', alignment:'left'}, '','',''],
                                  [{text: '4', alignment:'center'} ,{text: 'Documentation\n\n i. Documentation is in order\n ii. Documents are filed systematically', alignment:'left'}, '','',''],
                                  [{text: '5', alignment:'center'} ,{text: 'Personnel\n\n i. At least 2 Muslim workers\n ·Identity card\n ·Appointment letter', alignment:'left'}, '','',''],
                                  [{text: '6', alignment:'center'} ,{text: 'Plant Based Ingredients\n\n ·Halal certificate from Department Of Islamic Development Malaysia (JAKIM) / Certification Bodies recognized by Department Of Islamic Development Malaysia (JAKIM)\n ·Halal Certificate still valid', alignment:'left'}, '','',''],
                                  [{text: '7', alignment:'center'} ,{text: 'Halal File\n\n i. File exists\n ii. Contents are complete\n iii. Updated regularly', alignment:'left'}, '','',''],
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
      content: [
            {text: 'INTERNAL HALAL AUDIT CHECKLIST', style: 'header', bold: true, alignment:'center'},
              ' ',
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [150, 100, 100,100],
                      headerRows: 2,
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'DATE', style: 'tableHeader', alignment: 'left'}, {text: '  ', style: 'tableHeader', alignment: 'left'}, {text: 'LOCATION', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],
                                [{text: 'TIME', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}, {text: 'AUDITOR', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],                     
                                ['COMPANY/DEPARTMENT' ,{colSpan: 3, text: ' '}, '',''],
                                ['AUDITEE' ,{colSpan: 3, text: ' '}, '',''],
                                ['DOCUMENT REFERENCE' ,{colSpan: 3, text: ' '}, '',''],
                      ]
                  }
              },
              ' ',' ',' ',
              ////////////2nd table
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [40, 190, 60, 60, 100],
                      headerRows: 3,
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'Department/ process flow:\n Requirement in standards: MS1500:2019, DEPARTMENT OF ISLAMIC DEVELOPMENT MALAYSIA(JAKIM) MANUAL PROCEDURE FOR MALAYSIA HALAL CERTIFICATION (THIRD REVISION) 2014', colSpan: 5, style: 'tableHeader', alignment: 'center'}, {}, {}, {}, {}],
                                [{text: 'NO.', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'QUESTION', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'RESULTS OF AUDIT', style: 'tableHeader', colSpan:3, alignment: 'center'}, {}, {}],
                                [{}, {}, {text: 'YES', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'NO', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'REMARK / DOCUMENTS REFERENCE', style: 'tableHeader', alignment: 'center'}],
                                //1st question
                                [{text: '', alignment:'center'} ,{text: 'PREMISES', bold:true, alignment:'center'}, '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Are the premises designed and constructed or renovated so that enable the process flow to control the risk of product contamination and suitable for intended use?', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Is the layout of premises permit proper process flow, proper employee flow, good hygiene, and safety practices, include the protection against pest infestation and cross contamination between and during operations?', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Does it have adequate sanitary facilities and proper supervision of food hygiene?', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Are the premises separated from pig’s farm or	potential najs contamination area?', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Are the premises have effective control system from the other premises that process or prepare non-halal material or product?', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Are the premises dedicated for halal processing only?', alignment:'left'}, '','',''],
                                [{text: '7', alignment:'center'} ,{text: 'Are there any pets or other animals entering the premises?', alignment:'left'}, '','',''],
                                //2nd question
                                [{text: '', alignment:'center'} ,{text: 'HYGIENE, SANITATION AND FOOD SAFETY', bold:true, alignment:'center'}, '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Did the halal food manufacturers implement the following measures to?', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Are there any document/system/methods that inspect and sort raw material, ingredients, and packaging material before processing?', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Is the waste management implemented and managed effectively?', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Is the storage segregated properly between harmful or chemical substance and halal food product?', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Are the permitted food additives measured accordingly and do not use excessively?', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Is there any control system to prevent risk of cross-contamination between halal and non halal material?', alignment:'left'}, '','',''],
                                [{text: '7', alignment:'center'} ,{text: 'Is there any	implementation of screening devices in production area?', alignment:'left'}, '','',''],
                                [{text: '8', alignment:'center'} ,{text: 'Is there any preventive measure and control over the limitation of food contaminated by foreign matter likely plastic, glass or metal shards from machinery, dust, harmful gases, or any unwanted chemicals and biological substance?', alignment:'left'}, '','',''],
                                //3rd question
                                [{text: '', alignment:'center'} ,{text: 'DEVICES,	UTENSILS, MACHINES AND PROCESSING AIDS', bold:true, alignment:'center'}, '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Are the devices, machines, utensils, and processing aids used for processing halal production only?', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Are all the devices, machines, utensils, and processing aids free from any najs, not harmful and results in side effects to the products produced?', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Are the devices, utensils, machines, and processing aids used constructed to facilitate cleaning?', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Did the devices, utensils, machines, and processing aids which previously used for or in contact with najs mughallazah washed and ritually cleansed as required by Shariah Law?', alignment:'left'}, '','',''],
                                 //4th question
                                 [{text: '', alignment:'center'} ,{text: 'PROCESSING OF HALAL FOOD', bold:true, alignment:'center'}, '','',''],
                                 [{text: '1', alignment:'center'} ,{text: 'Is there a possibility that product which is not halal certified container pork or its derivatives?', alignment:'left'}, '','',''],
                                 [{text: '2', alignment:'center'} ,{text: 'Does the production department only produce products that are declared and certified halal by department of Islamic development Malaysia (JAKIM)?', alignment:'left'}, '','',''],
                                 [{text: '3', alignment:'center'} ,{text: 'Are there any separation of production’s equipment if halal status of certain product is not yet clear?', alignment:'left'}, '','',''],
                                 [{text: '4', alignment:'center'} ,{text: 'Are all the materials recorded in the list of materials approved by JAKIM?', alignment:'left'}, '','',''],
                                 [{text: '5', alignment:'center'} ,{text: 'If the products that are not halal certified by JAKIM do not contained pigs and its derivatives, do sanitation procedure of production instrument conform to JAKIM’S rules and does the process being monitored by Internal Halal Committee?', alignment:'left'}, '','',''],
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

const print3=()=>{
  let dd = {
      content: [
            {text: 'INTERNAL HALAL AUDIT CHECKLIST', style: 'header', bold: true, alignment:'center'},
              ' ',
            {text: 'ON-SITE/COMPLIANCE', style: 'header', bold: true, alignment:'center'},
              ' ',
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [150, 100, 100,100],
                      headerRows: 2,
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'DATE', style: 'tableHeader', alignment: 'left'}, {text: '  ', style: 'tableHeader', alignment: 'left'}, {text: 'LOCATION', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],
                                [{text: 'TIME', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}, {text: 'AUDITOR', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],                     
                                ['PERSON IN CHARGE' ,{colSpan: 3, text: ' '}, '',''],
                                ['DOCUMENT REFERENCES' ,{colSpan: 3, text: ' '}, '',''],
                                ['' ,'Prepared By:', 'Verified By:\n\n\n ','Acknowledge By:'],
                      ]
                  }
              },
              ' ',' ',' ',
              ////////////2nd table
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                    widths: [45, 150, 50, 50, 155],
                    headerRows: 3,
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'Department/ Process Flow:\n Requirement in standards: MS1500:2009, Department of Islamic Development Malaysia (JAKIM) Manual Procedure (3rd Revision)', colSpan: 5, style: 'tableHeader', alignment: 'center'}, {}, {}, {}, {}],
                                [{text: 'NO.', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'QUESTION', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'RESULTS OF AUDIT', style: 'tableHeader', colSpan:3, alignment: 'center'}, {}, {}],
                                [{}, {}, {text: 'YES', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'NO', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'DOCUMENTS REFERENCES/REMARKS/EVIDENCE', style: 'tableHeader', alignment: 'center'}],
                                [{text: '1', alignment:'center'} ,{text: 'Does the kitchen layout require and comply with the specific requirement on plan layout for examples on process layout and the position of every station like dry and wet area?', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Are the kitchen environment, the work station (dry and wet section), equipment and utensils used are cleaned and well arranged/composed?', alignment:'left'}, '','',''],					
                                [{text: '3', alignment:'center'} ,{text: 'Does the waste management is properly thrown and managed, and not at the place that is near to the food processing area?', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Are the devices, equipment, utensils, machine and all processing aid that is used for halal food or product is only used for halal product processing only?', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Does their kitchen only produce or cook only halal food menu/product only as they claimed during registration?', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Does the premise obey by using only products that have halal certification?', alignment:'left'}, '','',''],
                                [{text: '7', alignment:'center'} ,{text: 'Is there any preventive measure made by the premise whenever unpredictable issues happen for example spoiled food, contaminated food, or natural disaster?', alignment:'left'}, '','',''],
                                [{text: '8', alignment:'center'} ,{text: 'Are they using food additives that is halal certified or using it in a permissible measurement/amount?', alignment:'left'}, '','',''],
                                [{text: '9', alignment:'center'} ,{text: 'Are all of the ingredients used registered to the Department of Islamic Development (JAKIM)?', alignment:'left'}, '','',''],
                                [{text: '10', alignment:'center'} ,{text: 'Are all raw materials recorded systematically and honest for traceability?', alignment:'left'}, '','',''],
                      ]
                  }
              },
              ' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',

              {text: 'INTERNAL HALAL AUDIT CHECKLIST', style: 'header', bold: true, alignment:'center'},
              ' ',
            {text: 'ADEQUACY', style: 'header', bold: true, alignment:'center'},
              ' ',
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [150, 100, 100,100],
                      headerRows: 2,
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'DATE', style: 'tableHeader', alignment: 'left'}, {text: '  ', style: 'tableHeader', alignment: 'left'}, {text: 'LOCATION', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],
                                [{text: 'TIME', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}, {text: 'AUDITOR', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],                     
                                ['PERSON IN CHARGE' ,{colSpan: 3, text: ' '}, '',''],
                                ['DOCUMENT REFERENCES' ,{colSpan: 3, text: ' '}, '',''],
                                ['' ,'Prepared By:', 'Verified By:\n\n\n ','Acknowledge By:'],
                      ]
                  }
              },
              ' ',' ',' ',
              ////////////2nd table
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [45, 150, 50, 50, 155],
                      headerRows: 3,
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'Department/ Process Flow:\n Requirement in standards: MS1500:2009, Department of Islamic Development Malaysia (JAKIM) Manual Procedure (3rd Revision)', colSpan: 5, style: 'tableHeader', alignment: 'center'}, {}, {}, {}, {}],
                                [{text: 'NO.', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'QUESTION', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'RESULTS OF AUDIT', style: 'tableHeader', colSpan:3, alignment: 'center'}, {}, {}],
                                [{}, {}, {text: 'YES', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'NO', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'DOCUMENTS REFERENCES/REMARKS/EVIDENCE', style: 'tableHeader', alignment: 'center'}],
                                [{text: '1', alignment:'center'} ,{text: 'HAS System\n\n - Minute meeting on halal matters\n - Internal halal audit records', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Product Specification\n\n - Does the product meet all of requirement stated in MPPHM?\n - Does the purchasing of raw material is from Halal certified company?', alignment:'left'}, '','',''],					
                                [{text: '3', alignment:'center'} ,{text: 'Halal Process Flow\n\n - Process flow chart is correct\n - Each of the HCP has its own control measure and corrective action', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Documentation\n\n - Arranged in order and systematically', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Personnel\n\n - Having at least 2 Muslims worker\n - Have an appointment letter\n - Workers’ typhoid injection medical records', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Halal File\n\n - File are exist, complete and update regularly', alignment:'left'}, '','',''],
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

const print5=()=>{
  let dd = {
      content: [
        {text: 'PROFESSIONAL HALAL EXECUTIVE PROGRAM\n HOLISTICS LAB SDN BHD', style: 'header', bold: true, alignment:'right'},
              ' ',
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [120, 105, 120,105],
                      headerRows: 2,
                      // color: ['blue','white','blue','white'],
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'DEPARTMENT', style: 'tableHeader', alignment: 'left'}, {text: 'Internal Halal Committee (HIC)', style: 'tableHeader', alignment: 'left'}, {text: 'DATE OF IMPLEMENTATION', style: 'tableHeader', alignment: 'left'}, {text: '30 OCT 2020', style: 'tableHeader', alignment: 'left'}],
                                [{text: 'PROCESS OWNER', style: 'tableHeader', alignment: 'left'}, {text: 'Head of HIC', style: 'tableHeader', alignment: 'left'}, {text: 'VERSION', style: 'tableHeader', alignment: 'left'}, {text: 'HAS/MAN/HALPOLICY/01-2020', style: 'tableHeader', alignment: 'left'}],
                      ]
                  }
              },
              ' ',' ',
              ////////////2nd TOP table
            {text: 'INTERNAL HALAL AUDIT', style: 'header', bold: true, alignment:'center'},
            {text: 'Internal Halal Audit Checklist', style: 'header',alignment:'center'},
              ' ',
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [150, 100, 100,100],
                      headerRows: 2,
                      // keepWithHeaderRows: 1,
                      body: [
                              [{text: 'Date', style: 'tableHeader', alignment: 'left'}, {text: '  ', style: 'tableHeader', alignment: 'left'}, {text: 'Location', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],
                              [{text: 'Time', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}, {text: 'Auditor', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],                     
                              ['Company/Department' ,{colSpan: 3, text: ' '}, '',''],
                              ['Auditee' ,{colSpan: 3, text: ' '}, '',''],
                              ['Document Reference' ,{colSpan: 3, text: ' '}, '',''],
                      ]
                  }
              },
              ' ',' ',
              ////////////2nd table
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [40, 250, 40, 40, 80],
                      headerRows: 2,
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'No', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'Scope', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'Audit Findings', style: 'tableHeader', colSpan:3, alignment: 'center'}, {}, {}],
                                [{}, {}, {text: '/', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'X', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'Remarks', style: 'tableHeader', alignment: 'center'}],
                                //1st question
                                [{text: 'Documentations', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Halal file', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Halal Assurance System (HAS)', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Certified halal certification for raw materials', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Any related records', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Certificate and valid permit of slaughterman (slaughterhouse)', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Import permit for import meat products', alignment:'left'}, '','',''],
                                [{text: '7', alignment:'center'} ,{text: 'Halal training record', alignment:'left'}, '','',''],
                                [{text: '8', alignment:'center'} ,{text: 'Invoice of purchasing raw materials', alignment:'left'}, '','',''],
                                [{text: '9', alignment:'center'} ,{text: 'Sertu record', alignment:'left'}, '','',''],
                                [{text: '10', alignment:'center'} ,{text: 'Specification for water filter (information of carbon filter sources', alignment:'left'}, '','',''],
                                [{text: '11', alignment:'center'} ,{text: 'Slaughtering record', alignment:'left'}, '','',''],
                                [{text: '12', alignment:'center'} ,{text: 'VHM certification (slaughterhouse)', alignment:'left'}, '','',''],
                                [{text: '13', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //2nd question
                                [{text: 'Workers', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Certified Halal Executive by HPB', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Sufficient Muslim workers for every shift in processing/kitchen.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Have Muslim supervisor for each restaurant', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Sufficient halal training in accordance with MHMS requirements.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Have certificate and valid permit of slaughterman (slaughterhouse)', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Workers are allowed to perform daily prayers', alignment:'left'}, '','',''],
                                [{text: '7', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //3rd question
                                [{text: 'Building and Facilities', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Located far from residential area and not contaminated with animal breeding center, sewage and premise that process non-halal products', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Have prayer room/ canteen/ changing room and etc', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Have pest and pet control', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Not receiving any haram raw materials in the premises.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                 //4th question
                                 [{text: 'Raw materials / Processing Aids and R&D Materials', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'All of the raw materials used are certified halal', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Raw materials that were used in the production are the same as declared.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Manufacturer’s information of raw materials is identified.', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Have any changes of manufacturers or raw materials used.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //5th question
                                [{text: 'Processing', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Process only halal products.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'The processing area must be free from najs.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'No elements or worship tools', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'No entrance/usage of raw materials or tools where the halal status is doubted.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Ensure that the slaughtered animal is deemed alive during before and after stunning.', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Ensure that the parameter of electric current (stunning) used is accordance with the standards.', alignment:'left'}, '','',''],
                                [{text: '7', alignment:'center'} ,{text: 'Ensure that the slaughtered animals are slaughtered in accordance with the standards.', alignment:'left'}, '','',''],
                                [{text: '8', alignment:'center'} ,{text: 'Ensure the bleeding time is according to the standards.', alignment:'left'}, '','',''],
                                [{text: '9', alignment:'center'} ,{text: 'Separating the animals that are not slaughtered perfectly according with the standards.', alignment:'left'}, '','',''],
                                [{text: '10', alignment:'center'} ,{text: 'Ensure the animals are dead before the scalding process.', alignment:'left'}, '','',''],
                                [{text: '11', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //6th question
                                [{text: 'Tools', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Use only for halal products.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Usage of brush is according to standards and well-known about the sources and the halal status.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Tools and equipment are free from najs.', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'No entrance/usage of raw materials or tools where the halal status is doubted.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Ensure the knife is sharp, clean and washed through flowing water (slaughterhouse).', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //7th question
                                [{text: 'Packaging And Labelling', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Fulfil the specifications and requirements of halal.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Illustration is according to syarak.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Do not use product names / menu, logo / emblems, product claim statements, motto, slogans or advertisements synonymous with non-halal / divine and religious terms', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'The halal logo is not used on labels for the purpose of promoting other religious celebrations.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'The product name on the label is same as the certified name.', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //8th question
                                [{text: 'Storage', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'No mixing between halal and non-halal or doubted products.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Clear segregation between raw materials, finished products, R&D materials and trading items.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'No elements or tools of worship.', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Raw materials received is halal and same as declared.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //9th question
                                [{text: 'Transportation', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Used halal logistics.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'No mixing between halal and non-halal or doubted products.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Have contracts agreement.', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Have sertu records (if contaminations happened)', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
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

const print6=()=>{
  let dd = {
      content: [
            {text: 'INTERNAL HALAL AUDIT', style: 'header', bold: true, alignment:'center'},
            {text: 'Internal Halal Audit Checklist', style: 'header',alignment:'center'},
              ' ',
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [150, 100, 100,100],
                      headerRows: 2,
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'Date', style: 'tableHeader', alignment: 'left'}, {text: '  ', style: 'tableHeader', alignment: 'left'}, {text: 'Location', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],
                                [{text: 'Time', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}, {text: 'Auditor', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],                     
                                ['Company/Department' ,{colSpan: 3, text: ' '}, '',''],
                                ['Auditee' ,{colSpan: 3, text: ' '}, '',''],
                                ['Document Reference' ,{colSpan: 3, text: ' '}, '',''],
                      ]
                  }
              },
              ' ',' ',
              ////////////2nd table
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [40, 250, 40, 40, 80],
                      headerRows: 2,
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'No', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'Scope', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'Audit Findings', style: 'tableHeader', colSpan:3, alignment: 'center'}, {}, {}],
                                [{}, {}, {text: '/', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'X', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'Remarks', style: 'tableHeader', alignment: 'center'}],
                                //1st question
                                [{text: 'Documentations', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Halal file', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Halal Assurance System (HAS)', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Certified halal certification for raw materials', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Any related records', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Certificate and valid permit of slaughterman (slaughterhouse)', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Import permit for import meat products', alignment:'left'}, '','',''],
                                [{text: '7', alignment:'center'} ,{text: 'Halal training record', alignment:'left'}, '','',''],
                                [{text: '8', alignment:'center'} ,{text: 'Invoice of purchasing raw materials', alignment:'left'}, '','',''],
                                [{text: '9', alignment:'center'} ,{text: 'Sertu record', alignment:'left'}, '','',''],
                                [{text: '10', alignment:'center'} ,{text: 'Specification for water filter (information of carbon filter sources', alignment:'left'}, '','',''],
                                [{text: '11', alignment:'center'} ,{text: 'Slaughtering record', alignment:'left'}, '','',''],
                                [{text: '12', alignment:'center'} ,{text: 'VHM certification (slaughterhouse)', alignment:'left'}, '','',''],
                                [{text: '13', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //2nd question
                                [{text: 'Workers', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Certified Halal Executive by HPB', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Sufficient Muslim workers for every shift in processing/kitchen.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Have Muslim supervisor for each restaurant', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Sufficient halal training in accordance with MHMS requirements.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Have certificate and valid permit of slaughterman (slaughterhouse)', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Workers are allowed to perform daily prayers', alignment:'left'}, '','',''],
                                [{text: '7', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //3rd question
                                [{text: 'Building and Facilities', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Located far from residential area and not contaminated with animal breeding center, sewage and premise that process non-halal products', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Have prayer room/ canteen/ changing room and etc', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Have pest and pet control', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Not receiving any haram raw materials in the premises.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                 //4th question
                                 [{text: 'Raw materials / Processing Aids and R&D Materials', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'All of the raw materials used are certified halal', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Raw materials that were used in the production are the same as declared.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Manufacturer’s information of raw materials is identified.', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Have any changes of manufacturers or raw materials used.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //5th question
                                [{text: 'Processing', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Process only halal products.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'The processing area must be free from najs.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'No elements or worship tools', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'No entrance/usage of raw materials or tools where the halal status is doubted.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Ensure that the slaughtered animal is deemed alive during before and after stunning.', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Ensure that the parameter of electric current (stunning) used is accordance with the standards.', alignment:'left'}, '','',''],
                                [{text: '7', alignment:'center'} ,{text: 'Ensure that the slaughtered animals are slaughtered in accordance with the standards.', alignment:'left'}, '','',''],
                                [{text: '8', alignment:'center'} ,{text: 'Ensure the bleeding time is according to the standards.', alignment:'left'}, '','',''],
                                [{text: '9', alignment:'center'} ,{text: 'Separating the animals that are not slaughtered perfectly according with the standards.', alignment:'left'}, '','',''],
                                [{text: '10', alignment:'center'} ,{text: 'Ensure the animals are dead before the scalding process.', alignment:'left'}, '','',''],
                                [{text: '11', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //6th question
                                [{text: 'Tools', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Use only for halal products.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Usage of brush is according to standards and well-known about the sources and the halal status.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Tools and equipment are free from najs.', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'No entrance/usage of raw materials or tools where the halal status is doubted.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Ensure the knife is sharp, clean and washed through flowing water (slaughterhouse).', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //7th question
                                [{text: 'Packaging And Labelling', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Fulfil the specifications and requirements of halal.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Illustration is according to syarak.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Do not use product names / menu, logo / emblems, product claim statements, motto, slogans or advertisements synonymous with non-halal / divine and religious terms', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'The halal logo is not used on labels for the purpose of promoting other religious celebrations.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'The product name on the label is same as the certified name.', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //8th question
                                [{text: 'Storage', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'No mixing between halal and non-halal or doubted products.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Clear segregation between raw materials, finished products, R&D materials and trading items.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'No elements or tools of worship.', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Raw materials received is halal and same as declared.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //9th question
                                [{text: 'Transportation', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Used halal logistics.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'No mixing between halal and non-halal or doubted products.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Have contracts agreement.', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Have sertu records (if contaminations happened)', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
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

const print7=()=>{
  let dd = {
      content: [
            {text: 'SENARAI SEMAK AUDIT HALAL DALAMAN', style: 'header', bold: true, alignment:'center'},
              ' ',
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [150, 100, 100,100],
                      headerRows: 2,
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'TARIKH', style: 'tableHeader', alignment: 'left'}, {text: '  ', style: 'tableHeader', alignment: 'left'}, {text: 'LOKASI', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],
                                [{text: 'MASA', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}, {text: 'JURUAUDIT', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],                     
                                ['SYARIKAT/BAHAGIAN' ,{colSpan: 3, text: ' '}, '',''],
                                ['AUDITEE' ,{colSpan: 3, text: ' '}, '',''],
                                ['DOKUMEN RUJUKAN' ,{colSpan: 3, text: ' '}, '',''],
                      ]
                  }
              },
              ' ',' ',
              ////////////2nd table
              {text: 'Sila Tandakan (/) Pada Perkara Di Bawah', style: 'header', bold: true, alignment:'center'}, ' ',
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [45, 200, 40, 40, 125],
                      headerRows: 3,
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'Jabatan / Aliran Proses: refer to HAS/MANUAL/HCP - PROD/\n Keperluan Dalam standards : MS ', colSpan: 5, style: 'tableHeader', alignment: 'center'}, {}, {}, {}, {}],
                                [{text: 'Bil.', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'Skop', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'PENEMUAN AUDIT', style: 'tableHeader', colSpan:3, alignment: 'center'}, {}, {}],
                                [{}, {}, {text: '/', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'X', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'Catatan', style: 'tableHeader', alignment: 'center'}],
                                [{text: '1', alignment:'center'} ,{text: 'DOKUMENTASI\n\n 1. Fail Halal\n 2. Sistem Jaminan Halal (HAS)\n 3. Sijil halal ramuan dalam tempoh sah laku dan diiktiraf\n 4. Rekod-rekod berkaitan\n 5. Sijil dan Kad Tauliah Penyembelih masih dalam tempoh sah laku (rumah sembelih)\n 6. Permit import untuk produk berasaskan daging import\n 7. Rekod latihan halal\n 8. Invois pembelian bahan mentah\n 9. Rekod sertu\n 10. Spesifikasi penapis air (maklumat sumber carbon filter)\n 11. Rekod sembelihan\n 12. Sijil VHM (rumah sembelih)\n 13. Lain-lain', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'PEKERJA\n\n 1. Eksekutif Halal diiktiraf HPB\n 2. Bilangan pekerja muslim mencukupi bagi setiap shif di kawasan pemprosesan/ dapur\n 3. Mempunyai penyelia muslim bagi setiap restoran\n 4. Latihan berkaitan halal terhadap pekerja mematuhi keperluan MHMS\n 5. Mempunyai sijil dan kad tauliah penyembelih (rumah sembelih)\n 6. Pekerja dibenarkan untuk mengerjakan solat\n 7. Lain-lain', alignment:'left'}, '','',''],					
                                [{text: '3', alignment:'center'} ,{text: 'BANGUNAN DAN FASILITI\n\n 1. Jauh dan tidak tercemar dari pusat ternakan haiwan/ loji kumbahan dan premis yang memproses bahan tidak halal\n 2. Mempunyai kemudahan surau/ kantin /bilik persalinan dll\n 3. Mempunyai kawalan kemasukan haiwan dari masuk ke kawasan premis (pest & pet)\n 4. Tiada kemasukan bahan haram ke kawasan premis 5. Lain-lain', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'BAHAN MENTAH/ PROCESSING AID / BAHAN R&D\n\n 1. Bahan mentah mempunyai Sijil Pengesahan Halal yang diiktiraf dan masih sah tempoh\n 2. Bahan mentah yang digunakan sama seperti yang diisytiharkan\n 3. Maklumat pengeluar bahan mentah dapat dikenal pasti\n 4. Mempunyai maklumat perubahan ramuan/ pengeluar\n 5. Lain-lain', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'PEMPROSESAN\n\n 1. Memproses produk halal sahaja\n 2.Kawasan dalam keadaan suci dari najis\n 3. Tiada unsur dan alat penyembahan\n 4. Tiada penggunaan/ kemasukan ramuan atau peralatan diragui status halal\n 5. Memastikan haiwan sembelihan masih dalam keadaan hayat mustaqirah sebelum dan selepas proses stunning dijalankan (rumah sembelih)\n 6. Memastikan parameter arus elektrik (stunning) yang digunakan mengikut standard yang ditetapkan (rumah sembelih)\n 7. Memastikan haiwan sembelihan disembelih mengikut standard yang ditetapkan (rumah sembelih)\n 8. Memastikan tempoh pendarahan (bleeding time) mematuhi standard yang ditetapkan (rumah sembelih)\n 9. Mengasingkan haiwan yang tidak sempurna sembelihan mengikut standard yang ditetapkan (rumah sembelih)\n 10. Memastikan haiwan sembelihan mati sepenuhnya sebelum proses penceluran dilakukan (rumah sembelih)\n 11. Lain-lain', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'PERALATAN\n\n 1. Kegunaan untuk produk halal sahaja\n 2. Penggunaan berus mematuhi peraturan dan diketahui sumber dan status halal\n 3. Peralatan suci dari najis\n 4. Tiada penggunaan / kemasukan peralatan diragui status halal\n 5. Memastikan pisau sentiasa tajam, bersih dan dicuci dengan air yang mengalir (rumah sembelih)\n 6. Lain-lain', alignment:'left'}, '','',''],
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

const print8=()=>{
  let dd = {
      content: [
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [120, 105, 120,105],
                      headerRows: 2,
                      // color: ['blue','white','blue','white'],
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'DEPARTMENT', style: 'tableHeader', alignment: 'left'}, {text: 'Internal Halal Committee (IHC)', style: 'tableHeader', alignment: 'left'}, {text: 'DATE OF IMPLEMENTATION', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],
                                [{text: 'PROCESS OWNER', style: 'tableHeader', alignment: 'left'}, {text: 'Head of IHC', style: 'tableHeader', alignment: 'left'}, {text: 'VERSION', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],
                      ]
                  }
              },
              ' ',' ',
              ////////////2nd TOP table
            {text: 'INTERNAL HALAL AUDIT', style: 'header', bold: true, alignment:'center'},
            {text: 'Internal Halal Audit Checklist', style: 'header',alignment:'center'},
              ' ',
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [150, 100, 100,100],
                      headerRows: 2,
                      // keepWithHeaderRows: 1,
                      body: [
                              [{text: 'Date', style: 'tableHeader', alignment: 'left'}, {text: '  ', style: 'tableHeader', alignment: 'left'}, {text: 'Location', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],
                              [{text: 'Time', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}, {text: 'Auditor', style: 'tableHeader', alignment: 'left'}, {text: ' ', style: 'tableHeader', alignment: 'left'}],                     
                              ['Company/Department' ,{colSpan: 3, text: ' '}, '',''],
                              ['Auditee' ,{colSpan: 3, text: ' '}, '',''],
                              ['Document Reference' ,{colSpan: 3, text: ' '}, '',''],
                      ]
                  }
              },
              ' ',' ',
              ////////////2nd table
              {
                  style: 'tableExample',
                  color: '#444',
                  table: {
                      widths: [40, 250, 40, 40, 80],
                      headerRows: 2,
                      // keepWithHeaderRows: 1,
                      body: [
                                [{text: 'No', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'Scope', style: 'tableHeader', alignment: 'center', rowSpan:2, margin:12}, {text: 'Audit Findings', style: 'tableHeader', colSpan:3, alignment: 'center'}, {}, {}],
                                [{}, {}, {text: '/', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'X', style: 'tableHeader', alignment: 'center', margin:5}, {text: 'Remarks', style: 'tableHeader', alignment: 'center'}],
                                //1st question
                                [{text: 'Documentations', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Halal file', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Halal Assurance System (HAS)', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Certified halal certification for raw materials', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Any related records', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Certificate and valid permit of slaughterman (slaughterhouse)', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Import permit for import meat products', alignment:'left'}, '','',''],
                                [{text: '7', alignment:'center'} ,{text: 'Halal training record', alignment:'left'}, '','',''],
                                [{text: '8', alignment:'center'} ,{text: 'Invoice of purchasing raw materials', alignment:'left'}, '','',''],
                                [{text: '9', alignment:'center'} ,{text: 'Sertu record', alignment:'left'}, '','',''],
                                [{text: '10', alignment:'center'} ,{text: 'Specification for water filter (information of carbon filter sources', alignment:'left'}, '','',''],
                                [{text: '11', alignment:'center'} ,{text: 'Slaughtering record', alignment:'left'}, '','',''],
                                [{text: '12', alignment:'center'} ,{text: 'VHM certification (slaughterhouse)', alignment:'left'}, '','',''],
                                [{text: '13', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //2nd question
                                [{text: 'Workers', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Certified Halal Executive by HPB', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Sufficient Muslim workers for every shift in processing/kitchen.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Have Muslim supervisor for each restaurant', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Sufficient halal training in accordance with MHMS requirements.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Have certificate and valid permit of slaughterman (slaughterhouse)', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Workers are allowed to perform daily prayers', alignment:'left'}, '','',''],
                                [{text: '7', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //3rd question
                                [{text: 'Building and Facilities', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Located far from residential area and not contaminated with animal breeding center, sewage and premise that process non-halal products', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Have prayer room/ canteen/ changing room and etc', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Have pest and pet control', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Not receiving any haram raw materials in the premises.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                 //4th question
                                 [{text: 'Raw materials / Processing Aids and R&D Materials', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'All of the raw materials used are certified halal', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Raw materials that were used in the production are the same as declared.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Manufacturer’s information of raw materials is identified.', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Have any changes of manufacturers or raw materials used.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //5th question
                                [{text: 'Processing', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Process only halal products.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'The processing area must be free from najs.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'No elements or worship tools', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'No entrance/usage of raw materials or tools where the halal status is doubted.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Ensure that the slaughtered animal is deemed alive during before and after stunning.', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Ensure that the parameter of electric current (stunning) used is accordance with the standards.', alignment:'left'}, '','',''],
                                [{text: '7', alignment:'center'} ,{text: 'Ensure that the slaughtered animals are slaughtered in accordance with the standards.', alignment:'left'}, '','',''],
                                [{text: '8', alignment:'center'} ,{text: 'Ensure the bleeding time is according to the standards.', alignment:'left'}, '','',''],
                                [{text: '9', alignment:'center'} ,{text: 'Separating the animals that are not slaughtered perfectly according with the standards.', alignment:'left'}, '','',''],
                                [{text: '10', alignment:'center'} ,{text: 'Ensure the animals are dead before the scalding process.', alignment:'left'}, '','',''],
                                [{text: '11', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //6th question
                                [{text: 'Tools', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Use only for halal products.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Usage of brush is according to standards and well-known about the sources and the halal status.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Tools and equipment are free from najs.', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'No entrance/usage of raw materials or tools where the halal status is doubted.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Ensure the knife is sharp, clean and washed through flowing water (slaughterhouse).', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //7th question
                                [{text: 'Packaging And Labelling', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Fulfil the specifications and requirements of halal.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Illustration is according to syarak.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Do not use product names / menu, logo / emblems, product claim statements, motto, slogans or advertisements synonymous with non-halal / divine and religious terms', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'The halal logo is not used on labels for the purpose of promoting other religious celebrations.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'The product name on the label is same as the certified name.', alignment:'left'}, '','',''],
                                [{text: '6', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //8th question
                                [{text: 'Storage', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'No mixing between halal and non-halal or doubted products.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'Clear segregation between raw materials, finished products, R&D materials and trading items.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'No elements or tools of worship.', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Raw materials received is halal and same as declared.', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
                                //9th question
                                [{text: 'Transportation', bold:true, alignment:'Left', colSpan:5}, '', '','',''],
                                [{text: '1', alignment:'center'} ,{text: 'Used halal logistics.', alignment:'left'}, '','',''],
                                [{text: '2', alignment:'center'} ,{text: 'No mixing between halal and non-halal or doubted products.', alignment:'left'}, '','',''],
                                [{text: '3', alignment:'center'} ,{text: 'Have contracts agreement.', alignment:'left'}, '','',''],
                                [{text: '4', alignment:'center'} ,{text: 'Have sertu records (if contaminations happened)', alignment:'left'}, '','',''],
                                [{text: '5', alignment:'center'} ,{text: 'Others', alignment:'left'}, '','',''],
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
      <div className="in innerContainer" style={{height:'70vh', overflowY:'auto'}}>
        <Header as='h3'>Senarai Semak Audit Halal Dalaman</Header>

        <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>No</Table.HeaderCell>
        <Table.HeaderCell>Senarai Semak Audit Halal Dalaman</Table.HeaderCell>
        <Table.HeaderCell>Templat</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {/* <Table.Row>
        <Table.Cell>1</Table.Cell>
        <Table.Cell>Cosmetics</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print1()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>Food and Beverages</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print2()}>Muat Turun</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>3</Table.Cell>
        <Table.Cell>Food Premise</Table.Cell>
        <Table.Cell><Button color="teal" fluid onClick={()=>print3()}>Muat Turun</Button></Table.Cell>
      </Table.Row> */}
      <Table.Row>
        <Table.Cell>1</Table.Cell>
        <Table.Cell>Skim Umum (Versi Bahasa Inggeris)</Table.Cell>
        <Table.Cell><Button color="teal" 
                                fluid 
                                href="/files/GENERAL (INTERNAL HALAL AUDIT).docx"
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
                                href="/files/SENARAI SEMAK AUDIT HALAL DALAMAN.docx"
                                target="_blank">Muat Turun
                        </Button>
            </Table.Cell>
        {/* <Table.Cell><Button color="teal" fluid onClick={()=>print1()}>Muat Turun</Button></Table.Cell> */}
      </Table.Row>
      {/* <Table.Row>
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
        <Table.Cell>Skim Umum (Versi Bahasa Melayu)</Table.Cell>
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
  );
}

export default TabIHA