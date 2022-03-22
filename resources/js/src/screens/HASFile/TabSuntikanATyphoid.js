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
import {HASFileContext, getHASFile, postHASFile} from './HASFile';



const TabSuntikanATyphoid = () => {
  let { path, url } = useRouteMatch();


  return (

  <Transition transitionOnMount={true} animation="fade" duration={1000}>
    <div className="in innerContainer" style={{height:'68vh', overflowY:'auto'}}> 
   <Header as='h3'>Rekod Suntikan Anti Typhoid</Header>
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
            <Table.Cell>Skim Umum </Table.Cell>
            <Table.Cell><Button color="teal" 
                                fluid 
                                href="/files/Anti-typhoid Record.docx"
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


export default TabSuntikanATyphoid

