import React, { useContext } from 'react'
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
  Button,
  Table,
  Tab,
  Modal,Divider,
  Form,Dropdown
} from 'semantic-ui-react';

import * as moment from 'moment';

import { useParams, Link, useRouteMatch } from "react-router-dom";

import {deleteUser, postIHC, SubscriptionContext,getSubcrData } from './subscription';

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const TabSubUser = ({data,onDataChange,onDelete,id}) => {
//   const {subcr,cmpny} = useContext(SubscriptionContext);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [objid, setID] = React.useState(0);
  const [name, setName] = React.useState("");
  const [jawatan, setJawatan] = React.useState("");
  const [jawatan2, setJawatan2] = React.useState("");
  const [jabatan, setJabatan] = React.useState("");
  const [tarikh, setTarikh] = React.useState("");
  const [tempoh, setTempoh] = React.useState("");
  const [tempoh2, setTempoh2] = React.useState("");
  const [emel, setEmel] = React.useState("");
  const [telefon, setTelefon] = React.useState("");

  let { path, url } = useRouteMatch();
  
  const resetForm=()=>{
    setName("");
    setJawatan("");
    setJawatan2("");
    setJabatan("");
    setTarikh("");
    setTempoh("");
    setTempoh2("");
    setEmel("");
    setTelefon("");
    setID(0);0
  }

  const editForm=(id)=>{
    setName(data[id].name);
    setID(id);
    setJawatan(data[id].jawatan);
    setJawatan2(data[id].jawatan);
    setJabatan(data[id].jabatan);
    setTarikh(data[id].tarikh);
    setTempoh(data[id].tempoh);
    setTempoh2(data[id].tempoh2);
    setEmel(data[id].emel);
    setTelefon(data[id].telefon);
    setModalOpen(true);
  }
  
  const submitForm=()=>{
    
    const postdata={id:objid,data:{name,jawatan,jawatan2,jabatan,tarikh,tempoh,tempoh2,emel,telefon},cmpnyid:id,action:"modify"};    
    postIHC(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
  }

  const deleteForm=(pk)=>{
    const postdata={id:pk,cmpnyid:id,action:"delete"};
    postIHC(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
  }

  const tableItem = Object.keys(data).map((pg,i) =>
  <Table.Row key={pg}>
  <Table.Cell>{i+1}</Table.Cell>
  <Table.Cell>
  <Dropdown icon="ellipsis vertical"  className='avatar image' 
  pointing='top left'>
  <Dropdown.Menu className='right'>
    <Dropdown.Item  onClick={()=>editForm(pg)} color='blue' icon='edit outline' text='Edit user' />
    <Dropdown.Item  onClick={()=>deleteForm(pg)} icon='trash' text='Remove user' />
  </Dropdown.Menu>
</Dropdown>
  </Table.Cell>
  <Table.Cell>{data[pg].name}</Table.Cell>
  <Table.Cell>{data[pg].jawatan}</Table.Cell>
  <Table.Cell>{data[pg].jawatan2}</Table.Cell>
  <Table.Cell>{data[pg].jabatan}</Table.Cell>
  <Table.Cell>{moment(data[pg].tarikh).format('DD/MM/YYYY')}</Table.Cell>
  <Table.Cell>{moment(data[pg].tempoh).format('DD/MM/YYYY')}</Table.Cell>
  <Table.Cell>{moment(data[pg].tempoh).diff(moment(data[pg].tarikh), 'months')} Bulan</Table.Cell>
  <Table.Cell>{data[pg].emel}</Table.Cell>
  <Table.Cell>{data[pg].telefon}</Table.Cell>
  <Table.Cell>
    </Table.Cell>
  </Table.Row>
);

return <React.Fragment>
<Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Add</Button>
<Divider/>
<div className="subcrTabPane">
  

<Table>
<Table.Header>
<Table.Row>
  <Table.HeaderCell>No</Table.HeaderCell>
  <Table.HeaderCell></Table.HeaderCell>
  <Table.HeaderCell>Nama</Table.HeaderCell>
  <Table.HeaderCell>Jawatan Organisasi</Table.HeaderCell>
  <Table.HeaderCell>Jawatan Halal Komuniti</Table.HeaderCell>
  <Table.HeaderCell>Jabatan</Table.HeaderCell>
  <Table.HeaderCell>Tarikh Lantikan</Table.HeaderCell>
  <Table.HeaderCell>Tarikh Tamat Lantikan</Table.HeaderCell>
  <Table.HeaderCell>Tempoh</Table.HeaderCell>
  <Table.HeaderCell>Emel</Table.HeaderCell>
  <Table.HeaderCell>No Telefon</Table.HeaderCell>
</Table.Row>
</Table.Header>
<Table.Body>
{tableItem}
</Table.Body>
</Table>
 













  {/* const listItems =  Object.keys(data).map((pg) => 

  


  <List.Item  key={pg}>
    
  <List.Content className="avatar image">
    <Dropdown  icon="ellipsis vertical"  className='icon' 
    pointing='top left'>
    <Dropdown.Menu className='right'>
      <Dropdown.Item  onClick={()=>editForm(pg)} color='blue' icon='edit outline' text='Edit' />
      <Dropdown.Item  onClick={()=>deleteForm(pg)} icon='trash' text='Remove' />
    </Dropdown.Menu>
  </Dropdown>
  </List.Content>
  <List.Content>
    <List.Header> {data[pg].name}</List.Header>
    {data[pg].jawatan} <br/> {data[pg].jawatan2} <br/> {data[pg].jabatan} <br/> {moment(data[pg].tarikh).format('DD/MM/YYYY')} - {moment(data[pg].tempoh).format('DD/MM/YYYY')} ({moment(data[pg].tempoh).diff(moment(data[pg].tarikh), 'months')} Bulan) &nbsp; {data[pg].tempoh2}<br/> {data[pg].emel} <br/> {data[pg].telefon}
  </List.Content>
</List.Item>)
      
  return <React.Fragment>
      <Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Tambah Baru</Button>
      <Divider/>
      <div className="subcrTabPane">
        
  <List  ordered divided>{listItems}</List> */}
  <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpen(false),resetForm()}}
              // onOpen={() => setOpen(true)}
              open={modalOpen}
          >
            <Header icon='archive' content='Internal Halal Committee' />
            <Modal.Content>
            <Form>
            {/* <Form.Group widths='equal'> */}
            <Form.Input
              fluid
              label='Nama'
              onChange={e=>setName(e.target.value)}
              value={name}
            />
            {/* <Form.TextArea
              fluid
              label='Address'
              onChange={e=>setAddress(e.target.value)}
              value={address}
            /> */}
            <Form.Input
              fluid
              label='Jawatan Organisasi'
              onChange={e=>setJawatan(e.target.value)}
              value={jawatan}
            />
            <Form.Input
              fluid
              label='Jawatan Halal Komuniti'
              onChange={e=>setJawatan2(e.target.value)}
              value={jawatan2}
            />
            <Form.Input
              fluid
              label='Jabatan'
              onChange={e=>setJabatan(e.target.value)}
              value={jabatan}
            />
            <Form.Input
              fluid
              label='Tarikh Lantikan'
              onChange={e=>setTarikh(e.target.value)}
              type="date"
              value={tarikh}
            />
            <Form.Input
              fluid
              label='Tarikh Tamat Lantikan'
              onChange={e=>setTempoh(e.target.value)}
              type="date"
              value={tempoh}
            />
            {/* <Form.Input
              fluid
              label='Check hari'
              onChange={e=>setTempoh2(e.target.value)}
              value={tempoh2}
            /> */}
            {/* <select defaultValue={tempoh2} 
            onChange={e=>setTempoh2(e.target.value)}>
                <option value="Bulan">Bulan</option>
                <option value="Tahun">Tahun</option>
              </select> */}
            <Form.Input
              fluid
              label='Emel'
              onChange={e=>setEmel(e.target.value)}
              value={emel}
            />
            <Form.Input
              fluid
              label='No Telefon'
              onChange={e=>setTelefon(e.target.value)}
              value={telefon}
            />
            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => {setModalOpen(false); resetForm();}}>
                <Icon name='remove' /> No
              </Button>
              <Button color='green' onClick={() => {setModalOpen(false); submitForm();}}>
                <Icon name='checkmark' /> Submit
              </Button>
            </Modal.Actions>
          </Modal>
  </div>
  </React.Fragment>
}

export default TabSubUser