import React,{useContext } from 'react'
import {
  Input, Menu, Segment,
  Message,
  Button,
  Header,
  Icon,
  Image,
  Modal,
  Transition,
  List,
  Form,
  TextArea,
} from 'semantic-ui-react';

import {Switch,useParams,Link,useRouteMatch} from "react-router-dom";

import { CompanyAdvisorContext,updateCompanyAdvisorStatus } from './companyAdvisor';
import {AuthContext} from '../auth/auth';

const CompanyAdvisorRequest = () => {

  const clientrequested = useContext(CompanyAdvisorContext);
  const { profile,cmpny,signOut } = React.useContext(AuthContext);
  const [cmpnyPK, setcmpny] = React.useState(0);
  const [ad_status, setstatus] = React.useState(0);
  const [ad_memo, setmemo] = React.useState(0);
  const [id, setcaid] = React.useState(0);
  const [cmpnyName, setcmpnyname] = React.useState("");
  let { path, url } = useRouteMatch();
  const [modalAcceptOpen, setModalAcceptOpen] = React.useState(false);
  const [modalRejectOpen, setModalRejectOpen] = React.useState(false);
  const { index } = useParams();


  const updateForm=()=>{ 
    const data={id,cmpnyPK,ad_status,ad_memo};
    updateCompanyAdvisorStatus(data).then(x=>{
      setcmpny([x]);
      setstatus([x]);
      setmemo([x]);
      }).catch(e=>console.log(e))
  }

  const acceptForm=({id,cmpnyPK,cmpnyName})=>{
    setcaid(id);
    setcmpny(cmpnyPK);
    setstatus(1); //set status 1 = accept
    setcmpnyname(cmpnyName);
    setModalAcceptOpen(true);
  }

  
  const rejectForm=({id,cmpnyPK,cmpnyName,ad_memo})=>{
    setcaid(id);
    setcmpny(cmpnyPK);
    setstatus(2); //set status 2 = reject
    setmemo(ad_memo);
    setcmpnyname(cmpnyName);
    setModalRejectOpen(true);
  }

  const RenderCompany = props => {
    console.log(props)
    const data = props.data;
    const listItems = data.map((x,i) =>
      <List.Item key={i}>
        {/* {x.cmpnyConfig.headerLogo == null ? <Image size='small' src='/images/nophoto.png' /> :<Image size='small' src={x.cmpnyConfig.headerLogo} />} */}


        <List.Content>  
          <List.Header>{x.cmpnyName}</List.Header>

          <List.List>
            <List.Item>
              <List.Icon name='users' />
              <List.Content>No Pendaftaran : {x.cmpnyDetails.regNo}</List.Content>
            </List.Item>
              
            <List.Item>
              <List.Icon name='phone' />
              <List.Content>No Telefon : {x.cmpnyDetails.telno}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name='marker' />
              <List.Content>Alamat : {x.cmpnyDetails.address}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name='warehouse' />
              <List.Content>Saiz : {x.cmpnyDetails.saizindustri}</List.Content>
            </List.Item>
              
            <List.Item>
              <List.Icon name='globe' />
              <List.Content>Jenis Perniagaan : {x.cmpnyDetails.jenisperniagaan}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name='money bill alternate outline' />
              <List.Content>Hasil Jualan : MYR{x.cmpnyDetails.hasiljualan}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name='mail' />
              <List.Content>Email : {x.cmpnyDetails.email}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name='calculator' />
              <List.Content>Status Syarikat : {x.cmpnyDetails.statussyarikat}</List.Content>
            </List.Item>
          </List.List>

        </List.Content>

        {x.ad_status ==0 ? 
        <List.Content floated='right'>
          {/* <Button onClick={()=>editForm(x)} circular icon='checkmark'></Button>
          <Button onClick={()=>editForm(x)} circular icon='close'></Button> */}

          <Button animated circular onClick={()=>acceptForm(x)}>
            <Button.Content visible>
              <Icon name='checkmark' />
            </Button.Content>
            <Button.Content hidden>Accept</Button.Content>
          </Button>

          
          <Button animated circular onClick={()=>rejectForm(x)}>
            <Button.Content visible>
              <Icon name='close' />
            </Button.Content>
            <Button.Content hidden>Reject</Button.Content>
          </Button>

        </List.Content> : ""
        }
      </List.Item>
      
    );
    return <List className="listScroll" celled verticalAlign='middle' selection animated>
      {listItems}
 
    </List>
  }
  return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer">
        <Header as='h3'>Senarai Permohonan</Header>
        {clientrequested < 1 ? 
        <Message info>    
          <Message.Header>Tiada Permohonan</Message.Header>
          <p>Anda tidak mempunyai sebarang permohonan sekarang</p>
        </Message> :
      <RenderCompany data={clientrequested}/>}

{/* //////////////////////////////////////////////////////////////////////modal accept ////////////////////////////////////////////////////////////////////////////////////////*/}
          <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalAcceptOpen(false)}} open={modalAcceptOpen} centered={false}>
            <Header icon='bullhorn' content='Confirmation !' />
            <Modal.Content image>
            <Image size='small' src='/images/qm.png' wrapped centered/>
            <div hidden={true}>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  onChange={e=>setstatus(e.target.value)}
                  value={cmpnyPK}
                />
                <Form.Input
                  onChange={e=>setstatus(e.target.value)}
                  value={ad_status}
                />
              </Form.Group> 
            </Form> 
          </div>
          <Modal.Description>
          <Header><span>&emsp;&ensp;</span>Pilih Syarikat</Header>
          <p><span>&emsp;&ensp;&ensp;</span>
            Adakah Anda Pasti Untuk Memilih <strong>{cmpnyName}</strong> Sebagai Syarikat Seliaan Anda?
          </p>
        </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              
              <Button color='red' onClick={() => {setModalAcceptOpen(false);}}>
                <Icon name='remove' /> Tidak
              </Button>
              <Button color='green' onClick={() => {setModalAcceptOpen(false); updateForm();}}>
                <Icon name='checkmark' /> Ya
              </Button>
            </Modal.Actions>
          </Modal> 
{/* //////////////////////////////////////////////////////////////////////modal accept ////////////////////////////////////////////////////////////////////////////////////////*/}

{/* //////////////////////////////////////////////////////////////////////modal reject ////////////////////////////////////////////////////////////////////////////////////////*/}
<Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalRejectOpen(false)}} open={modalRejectOpen} centered={false}>
            <Header icon='bullhorn' content='Confirmation !' />
            <Modal.Content>
            {/* <Image size='small' src='/images/logo.png' wrapped centered/> */}
            <div hidden={true}>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  onChange={e=>setstatus(e.target.value)}
                  value={1}
                />
              </Form.Group> 
            </Form> 
          </div>
          <Modal.Description>
          <Header>Tolak Syarikat</Header>
          <p>
            Adakah Anda Pasti Untuk Menolak <strong>{cmpnyName}</strong> Sebagai Syarikat Seliaan Anda?
          </p>
          <Form>
              <Form.Field inline>
                <Form.Input
                  label = 'Sebab Tolak'
                  onChange={e=>setmemo(e.target.value)}
                  value={ad_memo}
                  id='form-textarea-control-opinion'
                  control={TextArea}
                />
              </Form.Field> 
            </Form>
        </Modal.Description>
          </Modal.Content>
            <Modal.Actions>
              
              <Button color='red' onClick={() => {setModalRejectOpen(false);}}>
                <Icon name='remove' /> Tidak
              </Button>
              <Button color='green' onClick={() => {setModalRejectOpen(false); updateForm();}}>
                <Icon name='checkmark' /> Ya
              </Button>
            </Modal.Actions>
          </Modal> 
{/* //////////////////////////////////////////////////////////////////////modal reject ////////////////////////////////////////////////////////////////////////////////////////*/}
      </div>



    </Transition>
  )
}

export default CompanyAdvisorRequest