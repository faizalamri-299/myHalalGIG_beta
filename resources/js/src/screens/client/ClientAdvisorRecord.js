import React,{useContext } from 'react'
import {
  Input, Menu, Segment,
  Checkbox,
  Button,
  Header,
  Icon,
  Image,
  Rating,
  Transition,
  Pagination,
  Message,
  Table
} from 'semantic-ui-react';

import {Switch,useParams,Link,useRouteMatch} from "react-router-dom";

import { getClientAdvisor,ClientContext,postAdvisorDetails,deleteApplication } from './client';
import { isNull } from 'lodash';

const ClientAdvisorRecord = () => { //client punya advisor yang dah lulus

  const {carecord} = useContext(ClientContext);
  const [id, setadvisor] = React.useState("");
  const [name, setname] = React.useState();
  let { path, url } = useRouteMatch();
  const [activePage, setActivePage] = React.useState(1);
  const [itemperpage, setitemperpage] = React.useState(10);
  const [modalOpen, setModalUpdateOpen] = React.useState(false);
  const { index } = useParams();

  const deleteApplicationList=(pk)=>{
    deleteApplication(pk).then(x=>{ 
  
      onDataChange({ad_fk_user_id:pk},"delete");
    }).catch(e=>console.log(e))
  }

  const RenderCompany = props => {
    const data = props.data;
  const tableItem =data.map((x, i) =>
    <>
    <Table.Row>
      <Table.Cell>{x.name}</Table.Cell>
      <Table.Cell>{x.cmpnyName}</Table.Cell>
      {x.ad_status == 0 ? <>
      <Table.Cell> <div class="ui yellow horizontal label circular">Pending</div> </Table.Cell> 
      </>
      : 
      x.ad_status == 1 ? <>
      <Table.Cell> <div class="ui green horizontal label circular">Approved</div> </Table.Cell>
      </> 
      :
      x.ad_status == 2 ? 
      <>
      <Table.Cell> <div class="ui red horizontal label circular">Rejected</div> : {x.ad_memo} </Table.Cell>
      </> 
      :
      <>
      <Table.Cell> <div class="ui teal horizontal label circular">Completed</div></Table.Cell>
      
      </>
      }
    <Table.Cell>{x.ad_status === 3 ? <Rating icon='star' defaultRating={x.ar_rating} maxRating={5} disabled/> : <em>Not completed yet</em>}</Table.Cell>
    <Table.Cell>{x.ad_status === 3 ? x.ar_comment : <em>Not completed yet</em>}</Table.Cell>
    </Table.Row>
    </>
      
    )
    return <Table>
    {/*///////////////////////////////////////////////// TABLE HEADER/////////////////////////////////////////////////////////////////// */}
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Nama Advisor</Table.HeaderCell>
      <Table.HeaderCell>Syarikat Seliaan</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell>Rating</Table.HeaderCell>
      <Table.HeaderCell>Comment</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  {/*///////////////////////////////////////////////// TABLE HEADER/////////////////////////////////////////////////////////////////// */}

  {/*///////////////////////////////////////////////// TABLE BODY/////////////////////////////////////////////////////////////////// */}
  <Table.Body>
    {tableItem}
  </Table.Body>
  {/*///////////////////////////////////////////////// TABLE BODY/////////////////////////////////////////////////////////////////// */}
</Table>
  }
  
  return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer">
        <Header as='h3'>Maklumat Advisor</Header>
        
        {carecord == 0 ? 
        <Message warning>    
          <Message.Header>Tiada Maklumat Adviosr</Message.Header>
          Tiada Maklumat
        </Message> :
      <RenderCompany data={carecord}/>}
      </div>



    </Transition>
  )
}

export default ClientAdvisorRecord