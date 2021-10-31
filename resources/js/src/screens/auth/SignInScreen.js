import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Icon } from 'semantic-ui-react'
import {
  Link,useLocation
} from "react-router-dom";
import {AuthContext,onAuth, signUp} from './auth';

import logo from '../../assets/img/gig-square.png'; 

const SignInScreen = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [process, setprocess] = React.useState(false);
    const [error, setError] = React.useState('');
    
  const {state} = useLocation();
  console.log(location);
  
    const { signIn } = React.useContext(AuthContext);
    const auth=(data)=>{
      localStorage.removeItem("logScreen");
      setprocess(true);
      setError("");
      onAuth(data).then(signIn).catch(e=>{
        setprocess(false);  
        setError(e.message)})
    }

    const [modalOpen, setModalOpen] = React.useState(false);
    const [nama, setNama] = React.useState("");
    const [uname, setUname] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const resetForm=()=> {
      setNama("");
      setUname("");
      setPwd("");
    }

    const submitForm=()=> {
      signUp(data).then(x=>{
        setNama(x);
        setUname(x);
        setPwd(x);
      }).catch(e=>console.log(e))
      resetForm();
    }
    
return <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Image src={logo} size="medium" centered/>
      <Header as='h2' color='teal' textAlign='center'>
      </Header>
      {state &&<Message positive>
       <p>{state}</p>
     </Message>
      }
      <Form size='large' onSubmit={(e) =>{ auth({ username, password });e.preventDefault();}}>
        <Segment stacked>
          <Form.Input fluid icon='mail' 
          value={username}
          onChange={e=>setUsername(e.target.value)}
          iconPosition='left' placeholder='Emel' required 
          disabled={process} />
          <Form.Input
            fluid
            icon='lock'
            value={password}
            onChange={e=>setPassword(e.target.value)}
            iconPosition='left'
            placeholder='Katalaluan'
            type='password'
            required
            disabled={process}
          />
 {error &&
       <Message negative>
       <p>{error}</p>
     </Message>
      }
          <Button color='teal' fluid size='large' type="submit" 
            disabled={process} >
            Log Masuk
          </Button>
        </Segment>
      </Form>
     
      <Message>
        Belum Mendaftar? <Link to="/register">Daftar Baru</Link>
      </Message>

      <Message>
        ATAU <Link to="/registeradvisor">Daftar Sebagai Advisor</Link>
      </Message>

{/* <Button onClick={()=>setModalOpen(true)} fluid basic color='blue' style={{marginTop:'15px'}} > <Icon name='user' />Register</Button> */}

{/* <Modal style={{position:'relative',height:'auto',marginTop:'15px'}}
        onClose={() =>{ setModalOpen(false),resetForm()}}
        open={modalOpen}
    >
      <Header icon='user' content='Registration' />
      <Modal.Content>
      <Form>
      <Form.Group widths='equal'>
      <Form.Input
        fluid
        label='Name'
        onChange={e=>setNama(e.target.value)}
        value={nama}
      />
        <Form.Input
        fluid
        label='Email'
        onChange={e=>setUname(e.target.value)}
        value={uname}
      />
      <Form.Input
        fluid
        label='Password'
        onChange={e=>setPwd(e.target.value)}
        value={pwd}
      />
    
    </Form.Group>
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
    </Modal> */}

    </Grid.Column>
  </Grid>
}

export default SignInScreen