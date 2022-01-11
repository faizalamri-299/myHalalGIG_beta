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
  Button,Modal,Divider,Form
} from 'semantic-ui-react';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import { getCompany,CompanyContext } from './company';

import { regCmpnySU } from '../auth/auth';


const CompanyList = () => {

  const cmpny = useContext(CompanyContext);
  let { path, url } = useRouteMatch();

  const [modalOpen, setModalOpen] = React.useState(false);

  const [name, setName] = React.useState("");
  const [regNo, setRegNo] = React.useState("");
  const [telno, setTelNo] = React.useState("");
  const [address, setAddress] = React.useState("");

  const submitForm=()=>{
    const data={cmpnyName:name,cmpnyDetails:{regNo,telno,address}};
    regCmpnySU(data).then(x=>{
      console.log(x)
    }).catch(e=>console.log(e))
  }

  const resetForm=()=>{
    setname("");
    setusername("");
    setpassword("");
    setpassword2("");
    setuserid(0);

  }

  const RenderCompany = props => {
    console.log(props)
    const data = props.data;
    const listItems = data.map((x,i) =>
      <List.Item key={i} as={Link} to={`${url}/details/${i}`}>
        <List.Content>
        <List.Header>{x.cmpnyName}</List.Header>
        <List.Content>{x.username}</List.Content>
        </List.Content>
      </List.Item>
    );
    return <List celled ordered divided selection>
      {listItems}
    </List>
  }
  return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer listScroll">
        <Header as='h3'>Senarai Premis</Header>
        <Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Tambah Premis</Button>
      <Divider/>
        {cmpny &&
          <RenderCompany data={cmpny}/>
        }

        <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpen(false),resetForm()}}
              open={modalOpen}>
            <Header icon='archive' content='Tambah Syarikat' />
            <Modal.Content>
            <Form>
            <Form.Group widths='equal'>
            <Form.Input
              fluid
              label='Nama Premis'
              onChange={e=>setName(e.target.value)}
          value={name}
            />
            <Form.Input
              fluid
              label='Alamat Premis'
              onChange={e=>setAddress(e.target.value)}
            value={address}
            />
          </Form.Group>
            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => {setModalOpen(false); resetForm();}}>
                <Icon name='remove' /> Batal
              </Button>
              <Button color='green' onClick={() => {setModalOpen(false); submitForm();}}>
                <Icon name='checkmark' /> Hantar
              </Button>
            </Modal.Actions>
          </Modal>   
      </div>
    </Transition>
  )
}

export default CompanyList