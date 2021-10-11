import React,{useContext } from 'react'
import {
  Input, Menu, Segment,
  Modal,
  Button,
  Header,
  Icon,
  Image,
  Popup,
  Transition,
  List,
  Message,
  Label,
  Form,
  Rating,
  TextArea,
  Grid
} from 'semantic-ui-react';

import {Switch,useParams,Link,useRouteMatch} from "react-router-dom";

import { getClientAdvisor,ClientContext,postRating,deleteApplication } from './client';

const ClientAdvisorList = () => { //client punya advisor yang dah lulus

  const {adselected} = useContext(ClientContext);
  const [id, setadvisor] = React.useState("");
  const [value, setValue] = React.useState(null);
  const [ar_rating, setrating] = React.useState("");
  const [ar_comment, setcomment] = React.useState("");
  let { path, url } = useRouteMatch();
  const [modalOpen, setModalOpen] = React.useState(false);
  const { index } = useParams();

  const handleChangeOnRate= (e, { rating }) => {
    e.preventDefault();
    setrating(rating)
}
  const deleteApplicationList=(pk)=>{
    deleteApplication(pk).then(x=>{ 
  
      onDataChange({id:pk},"delete");
    }).catch(e=>console.log(e))
  }

  
  const editForm=({id,ar_rating,ar_comment})=>{
    setadvisor(id);
    setrating(ar_rating);
    setcomment(ar_comment);
    setModalOpen(true);
  }

  const submitForm=()=>{
    
    const data={id,ar_rating,ar_comment};
    postRating(data).then(x=>{
      setadvisor([x]);
      setrating([x]);
      setcomment([x]);
      }).catch(e=>console.log(e));
  }

  const RenderCompany = props => {
    console.log('props',props)
    const data = props.data;
    const listItems = data.map((x,i) =>
      <List.Item className="listsuccess" key={i}>
      <Image size='small' circular src={x.advImg}/>
        <List.Content className="listsuccess">
          <List.Header>{x.name}
        </List.Header>
          <List.List>

            <List.Item>
              <List.Icon name='users' />
              <List.Content>{x.username}</List.Content>
            </List.Item>
              
            <List.Item>
              <List.Icon name='users' />
              <List.Content>
              
              </List.Content>
            </List.Item>
            
            </List.List>
        </List.Content>
        
        {x.ad_status == 0 ? 
          <List.Content floated='right'>
            <Label color='yellow' horizontal>Pending
            </Label>
          </List.Content> : 
          x.ad_status == 1 ?
          <List floated='right'>
            <List.Item>
              <List.Content floated='right'>
                <Label color='green' horizontal>Approved
                </Label>
              </List.Content>
            </List.Item>
          </List> :
          x.ad_status == 2 ?
          <Popup
          trigger={
          <List.Content floated='right'>
            <Label color='red' horizontal fluid>Rejected
            </Label>
        </List.Content>
         }
         >
        <Popup.Header>Sebab Tolak</Popup.Header>
          <Popup.Content>
          {x.ad_memo}
          </Popup.Content>
        </Popup> :     
        //ad_status == 3

        <List floated='right'>
        <List.Item>
          <List.Content floated='right'>
            <Label color='teal' horizontal>Completed
            </Label>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content floated='right'>
            <Button compact onClick={()=>editForm(x)}>Rate</Button>
          </List.Content>
        </List.Item>
      </List>
        }

      </List.Item>
      
    )
    console.log('sss',adselected);
    return <List className="listScroll" celled verticalAlign='middle' selection animated>
      {listItems}
    </List>
  }
  
  return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer">
        <Header as='h3'>Maklumat Advisor</Header>
        
        {adselected == 0 ? 
        <Message warning>    
          <Message.Header>Sila Pilih Advisor Terdahulu</Message.Header>
          <p>Sila Pilih Advisor Atau Klik <Link to="/ClientAdvisor"><em>Di Sini</em></Link> Untuk Membuat Permohonan Advisor</p>
        </Message> :
      <RenderCompany data={adselected}/>}
      <Modal size='tiny' style={{position:'relative',height:'auto'}} onClose={() =>{ setModalOpen(false),resetForm(),location.reload()}} open={modalOpen}>
        <Header icon='archive' content='Tambah Pembekal' />
          <Modal.Content >
            <Form >
            <div hidden="true">
              <Form.Input
                fluid
                onChange={e=>setadvisor(e.target.value)}
                value={id}
              />
            </div>
           
              <Form.Field>
                <strong>Adakah Advisor Ini Sangat Membantu Anda?</strong>
              </Form.Field><br></br>

              <Grid centered>
                <Rating
                  rating={ar_rating}
                  onRate={handleChangeOnRate}
                  maxRating={5}
                  icon='star'
                  size='massive'
                />
              </Grid>
              <br></br>
              <Form.Field
                control={TextArea}
                label='Feedback'
                placeholder='Tell us more about this advisor...'
                onChange={e=>setcomment(e.target.value)}
                value={ar_comment}
              />   
              
              
            </Form>   
          </Modal.Content>

          <Modal.Actions>
            <Button color='red' onClick={() => {setModalOpen(false); resetForm();}}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' onClick={() => {setModalOpen(false); submitForm()}}>
              <Icon name='checkmark' /> Submit
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    </Transition>
  )
}

export default ClientAdvisorList