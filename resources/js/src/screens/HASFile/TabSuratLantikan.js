import React, {useContext, useState } from 'react'
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
import {HASFileContext, getHASFile, postHASFile} from './HASFile';

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
// import samplePDF from './sample.pdf';

const TabSuratLantikan = () => {
  let { path, url } = useRouteMatch();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState (1);

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
    setPageNumber(1);
  }


  return (

  <Transition transitionOnMount={true} animation="fade" duration={1000}>
    <div className="in innerContainer" style={{height:'70vh', overflowY:'auto'}}> 
    {/* <Header className="App-header">
      <Document file={samplePDF} onLoadSuccess={onDocumentLoadSuccess}>
        <Page height="600" pageNumber={pageNumber}/>
      </Document>
    </Header> */}

  <Header as='h3'>Surat Lantikan Pekerja</Header>
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
                                href="/files/SURAT PELANTIKAN PEKERJA.docx"
                                target="_blank">Muat Turun
                        </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <br></br>
      <h3>*<i>Sekurang kurangnya 2 surat pelantikan pekerja muslim yang diperlukan (Warganegara Malaysia). Sila kepilkan salinan IC bersama</i></h3>
    </div>
  </Transition>
  );
}


export default TabSuratLantikan

