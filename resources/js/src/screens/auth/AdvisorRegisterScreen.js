import React, { useEffect } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon,Progress,Input,Step,Menu,Dropdown } from 'semantic-ui-react'
import {AuthContext, onAuth, regCmpny} from './auth';

import {  Link,useHistory } from "react-router-dom";


import logo from '../../assets/img/gig-banner.png'; 

import  {passwordStrength}  from 'check-password-strength';
import FlashScreen from '../FlashScreen';

import StepProgressBar from 'react-step-progress';
// import { Captcha, captchaSettings } from 'reactjs-captcha';

const strengthLabel=[{color:'red',percent:25, label:'Berisiko Tinggi'},{color:'orange',percent:50,label:'Lemah'},{color:'yellow',percent:75,label:'Selamat'},{color:'green',percent:100,label:'Sempurna'}]
// setup the step content


const CompanyRegisterScreen = () => {                              
  const history = useHistory();
  
  const { profile,signOut,signIn } = React.useContext(AuthContext);

  const [activeStep, setStep] = React.useState(0);

  const [name, setName] = React.useState("");
    const [regNo, setRegNo] = React.useState("");
    const [telno, setTelNo] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [pwdLevel, setPwdLevel] = React.useState(null);
    const [isLoading, setLoading] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [process, setprocess] = React.useState(false);
    const [loadingMsg, setLoadingMsg] = React.useState('');

    const showloader=(msg)=>{
      setLoadingMsg(msg);
      setLoading(true);
    }
    const hideloader=()=>{
      setLoadingMsg("");
      setLoading(false);
    }
    const submitForm=()=>{
      setErrorMsg("");
      // if(pwdLevel>1){
        
      showloader("Sila tunggu sebentar. Maklumat syarikat sedang disahkan dan dihantar ke pangkalan data.")
      const data={cmpnyName:name,cmpnyDetails:{regNo,telno,address}};
      regCmpny(data).then((data)=>{
        setTimeout(()=>{
          hideloader();
          signIn(data);
        }, 1500);
        
      }).catch(e=>{
        setTimeout(()=> hideloader(), 1500);
        setErrorMsg(e.message)
      })
      // }
      // else{
      //   setErrorMsg("Kata Laluan mestilah terdiri daripada sekurang-kurangnya 6 aksara dan mengandungi 3 daripada berikut: huruf besar, huruf kecil, nombor bulat dan simbol")
      // }
    }

     
return isLoading?<FlashScreen msg={loadingMsg}/>:
<div style={{height:'100vh',display:'flex', flexDirection:'column' }}>
<Menu borderless stackable attached='top' inverted size='large'>
      <Menu.Item>
        <Image
          src={logo}
          size='small'
          href='/'
          spaced
        />
      </Menu.Item>
      
      <Menu.Menu position='right'>
      <Menu.Item name={profile.name} />
            <Menu.Item
              name='logout'
              onClick={signOut}
            />
          </Menu.Menu>
     
    </Menu>
 <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
  
    <Grid.Column style={{ maxWidth: '60vmax' }}>
    <Step.Group ordered fluid>
    <Step link  active={activeStep===0}>
      <Step.Content>
        <Step.Title>Maklumat Asas</Step.Title>
        <Step.Description>Pendaftaran Advisor</Step.Description>
      </Step.Content>
    </Step>

  </Step.Group>
      <Form size='large'>
        <Segment stacked>
          <Form.Input 
          fluid 
          icon='building' 
          iconPosition='left' 
          placeholder='Nama Syarikat' required 
          onChange={e=>setName(e.target.value)}
          value={name}
           />

          <Form.Input 
          fluid 
          icon='building outline' 
          iconPosition='left' 
          placeholder='No Pendaftaran' required
          onChange={e=>setRegNo(e.target.value)}
          value={regNo}
           />

          <Form.Input 
            fluid 
            icon='phone' 
            iconPosition='left' 
            placeholder='No Telefon' required
            onChange={e=>setTelNo(e.target.value)}
            value={telno}
           />
          <Form.TextArea 
            fluid 
            icon='map marker alternate' 
            iconPosition='left' 
            placeholder='Alamat' required
            onChange={e=>setAddress(e.target.value)}
            value={address}
           />
          {errorMsg &&
            <Message negative>
            <p>{errorMsg}</p>
          </Message>
          }
            <Button color='teal' fluid size='large' type='submit' onClick={() => submitForm()}>
            Daftar Syarikat
          </Button>


          {/* <button data-action='submit'onClick={e => onFormSubmit(e)}>Submit</button> */}
          
          {/*          <Button color='red' onClick={() => {resetForm();}}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' onClick={() => {submitForm();}}>
          <Icon name='checkmark' /> Submit
        </Button> */}
        </Segment>
      </Form>

      <Message>
      Telah Mendaftar? <Link to="/">Kembali ke Log Masuk</Link>
      </Message>
    </Grid.Column>
  </Grid>
  </div>



}

export default CompanyRegisterScreen