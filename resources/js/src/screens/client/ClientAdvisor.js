import React,{useContext } from 'react'
import {
  Input, Pagination, Segment,
  Card,
  Button,
  Header,
  Icon,
  Image,
  Modal,
  Transition,
  List,
  Form,
  Popup,
  Rating
} from 'semantic-ui-react';

import {Switch,useParams,Link,useRouteMatch} from "react-router-dom";
import * as moment from 'moment';
import {AuthContext} from '../../screens/auth/auth';


import { getClientAdvisor,ClientContext,postAdvisorDetails,deleteApplication } from './client';


const ClientAdvisor = () => {

  const { profile,cmpny,signOut,changeAccess } = React.useContext(AuthContext);
  const {advisorclient} = useContext(ClientContext);
  const [id, setadvisor] = React.useState("");
  const [name, setname] = React.useState("");
  let { path, url } = useRouteMatch();
  const [color, setcolor] = React.useState("");
  const [modalOpen, setModalUpdateOpen] = React.useState(false);
  const [Open, setopen] = React.useState(false);
  const { index } = useParams();
  const [activePage, setActivePage] = React.useState(1);
  const [itemperpage, setitemperpage] = React.useState(10);

  const updateForm=(id)=>{
    
    const data={id};
    postAdvisorDetails(data).then(x=>{
      setadvisor([x]);
      }).catch(e=>console.log(e));
      window.setInterval(location.reload, 5000);
  }

  const deleteApplicationList=(pk)=>{
    deleteApplication(pk).then(x=>{ 
  
      onDataChange({ad_fk_user_id:pk},"delete");
    }).catch(e=>console.log(e))
  }

  const editForm=({id,name})=>{
    setadvisor(id);
    setname(name);
    setModalUpdateOpen(true);
  }

  const RenderCompany = props => {
    console.log(props)
    const data = props.data;
    console.log('client advisor',advisorclient)
    const listItems = data.map((x,i) =>
    <Popup
      trigger={
    <Card >
    <Image src={x.advImg == null ?x.advImg : '/images/advisorNoPhoto.png'} wrapped ui={false}/>
    <Card.Content  className="padding" color='grey'>
      <Card.Header >{x.name}&nbsp;&nbsp;{x.level_max_user == 1 ?'🔶' : 
                                  x.level_max_user == 3 ? '🔷' :
                                  x.level_max_user == 5 ? '💠'  : '💎'
                                }</Card.Header>
      <Card.Meta>
        <span className='date'>Joined At {moment(new Date(x.created_at)).format('DD MMMM YYYY')}</span>
      </Card.Meta>
      <Card.Description>
      Jumlah Syarikat Seliaan ({x.level_max_user == null ? <em>not specified</em> : x.total+'/'+x.level_max_user})<br></br>
      Lokasi Diutamakan : Johor<br></br>
      {x.username} 
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    {x.ad_status == 0 && profile.cmpnyFK==x.ad_fk_company_id ? 
            <Button onClick={()=>deleteApplicationList(x.ad_fk_user_id)} fluid animated='fade' inverted color='red'>
                <Button.Content hidden>Batal Permohonan?</Button.Content>
                <Button.Content visible>Pending </Button.Content>
              </Button> :
    x.ad_status == 1 && profile.cmpnyFK==x.ad_fk_company_id ?
            <Button hidden href='/ClientAdvisorList' fluid animated='fade' inverted color='green'>
                <Button.Content hidden href='/ClientAdvisorList'>Lihat Profil</Button.Content>
                <Button.Content visible>Approved </Button.Content>
              </Button> :
    x.ad_status == 3 && profile.cmpnyFK==x.ad_fk_company_id ? 
              <Button disabled fluid color="teal">Completed</Button> :
                x.total <x.level_max_user ? 
                <Button onClick={()=>updateForm(x.id)} fluid animated='fade'>
                <Button.Content hidden>Pilih {x.name}?</Button.Content>
                <Button.Content visible>Pilih </Button.Content>
              </Button> : null
    }
    </Card.Content>
  </Card>
  
      }
>
    <Popup.Header>Advisor Rating</Popup.Header>
    <Popup.Content>
    {x.rating == null ? <em>No rating yet</em> : <Rating icon='star' defaultRating={x.rating} maxRating={5} /> }
    </Popup.Content>
  </Popup>
  
    );
    
    return <List style={{ overflow: 'auto' , maxHeight: '80vh'}}>
    <Card.Group itemsPerRow={6}>
    {listItems}
    </Card.Group>
    <br></br><br></br>

<br></br>
    </List>
    
  }
  return (
    

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div>
      <Header as='h3' floated='left'>Senarai Advisor</Header>
        <Header as='h6' fluid floated='right'>         
        <Input
          icon={{ name: 'search', link: true }}
          placeholder='Search users...'
        /></Header> <br></br><br></br><br></br><br></br>

        {
          advisorclient &&
            <RenderCompany data={advisorclient}/>
        }
          {/* <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalUpdateOpen(false),resetForm()}} open={modalOpen} centered={true}>
            <Modal.Content image>
            <Image size='small' src='/images/qm.png' wrapped centered/>
            <div hidden="true">
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  onChange={e=>setadvisor(e.target.value)}
                  value={id}
                />
              </Form.Group> 
            </Form> 
          </div>
          <Modal.Description>
          <Header><span>&emsp;&ensp;</span>Pilih Advisor</Header>
          <p><span>&emsp;&ensp;&ensp;</span>
            Adakah Anda Pasti Untuk Memilih <strong>{name}</strong> Sebagai Advisor Anda?
          </p>
        </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              
              <Button color='red' onClick={() => {setModalUpdateOpen(false); resetForm();}}>
                <Icon name='remove' /> Tidak
              </Button>
              <Button color='green' onClick={() => {setModalUpdateOpen(false); updateForm();}}>
                <Icon name='checkmark' /> Ya
              </Button>
            </Modal.Actions>
          </Modal>  */}
      </div>


    </Transition>
  )
}

export default ClientAdvisor