import React, { useEffect } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon,Progress } from 'semantic-ui-react'
import {AuthContext, onAuth, signUp} from './auth';

import {  Link,useHistory } from "react-router-dom";


import logo from '../../assets/img/gig-square.png'; 
import  {passwordStrength}  from 'check-password-strength';
import FlashScreen from '../FlashScreen';
// import { Captcha, captchaSettings } from 'reactjs-captcha';

const strengthLabel=[{color:'red',percent:25, label:'Berisiko Tinggi'},{color:'orange',percent:50,label:'Lemah'},{color:'yellow',percent:75,label:'Selamat'},{color:'green',percent:100,label:'Sempurna'}]
function onFormSubmit(e) {
  e.preventDefault();
  window.grecaptcha.ready(function() {
    window.grecaptcha.execute('[6LeEZqoaAAAAANJm77N1DjFcfrakrjayNzowRBY0]', {action: 'submit'}).then(function(token) {

    });
  });
}

const RegisterScreen = () => {                              
  const history = useHistory();

    const [name, setName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setpassword] = React.useState("");
    const [password2, setpassword2] = React.useState("");
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
      if(pwdLevel>1){
        
      showloader("Sila tunggu sebentar. Maklumat pendaftaran sedang disahkan dan dihantar ke pangkalan data.")
      const data={name,username,password,password2};
      signUp(data).then(({data,message})=>{
        setTimeout(()=>{
          hideloader();
          history.replace('/login', message);
        }, 1500);
        
      }).catch(e=>{
        setTimeout(()=> hideloader(), 1500);
        setErrorMsg(e.message)
      })
      ;}
      else{
        setErrorMsg("Kata Laluan mestilah terdiri daripada sekurang-kurangnya 6 aksara dan mengandungi 3 daripada berikut: huruf besar, huruf kecil, nombor bulat dan simbol")
      }
    }

    // const { signUp } = React.useContext(AuthContext);
    // const auth=(data)=> {
    //   localStorage.removeItem("regScreen");
    //   setprocess(true);
    //   setError("");
    //   onAuth(data).then(signUp).catch(e=>{
    //     setprocess(false);
    //     setError(e.message)
    //     console.log(e.message);
    //   })
    // }

    // function onFormSubmit(e) {
    //   e.preventDefault();
    //   window.grecaptcha.ready(function() {
    //     window.grecaptcha.execute('[6LdyI6YaAAAAAMxyi5dl_f7dHDJTGf12YAu1CZ0N]', {action: 'submit'}).then(function(token) {
    //       // Send form value as well as token to the server
    //     });
    //   });
    // }

    // const resetForm=()=>{
    //   setName("");
    //   setUsername("");
    //   setPassword("");
    // }
  
    // const submitForm=()=>{
    //   const data={name,username,password};
    //   signUp(data).then(x=>{
    //       setName(x);
    //       setUsername(x);
    //       setPassword(x);
    //   }).catch(e=>console.log(e))
    //   resetForm();
    //    }

    const checkPassword = (data)=>{
      let option=[
        {
          id: 0,
          value: "Too weak",
          minDiversity: 0,
          minLength: 0,
          percent:25
        },
        {
          id: 1,
          value: "Weak",
          minDiversity: 2,
          minLength: 6,
          percent:50
        },
        {
          id: 2,
          value: "Medium",
          minDiversity: 3,
          minLength: 6,
          percent:75
        },
        {
          id: 3,
          value: "Strong",
          minDiversity: 4,
          minLength: 8,
          percent:100
        }
      ]
      setPwdLevel(passwordStrength(data,option).id);
    }
    
return isLoading?<FlashScreen msg={loadingMsg}/>:
 <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Image src={logo} size="medium" centered  />
      
      <Form size='large'>
        <Segment stacked>
          <Form.Input 
          fluid 
          icon='user' 
          iconPosition='left' 
          placeholder='Nama' required 
          onChange={e=>setName(e.target.value)}
          value={name}
           />

          <Form.Input 
          fluid 
          icon='mail' 
          iconPosition='left' 
          placeholder='Emel' required
          type='email'
          onChange={e=>setUsername(e.target.value)}
          value={username}
           />

            <Form.Input
              required
              onFocus={event=> event.target.select()}
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Katalaluan'
              type='password'
              onChange={e=>{
                setErrorMsg("");
                setpassword(e.target.value)
                checkPassword(e.target.value)
                if(password2=="default"){
                  setpassword2("");
                }
              }}
              value={password}
            />

            <Form.Input
              error={password2=="default" || password2=="" ||password==password2?null:"Password not match"}
              required
              onFocus={event=> event.target.select()}
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Sahkan Katalaluan'
              type="password"
              onChange={e=>{
                setErrorMsg("");
                setpassword2(e.target.value)
              }}
              value={password2}
            />
          {pwdLevel!==null && 
            <Grid.Column>
              <Progress {...strengthLabel[pwdLevel]} />
            </Grid.Column>
          } 
          {errorMsg &&
            <Message negative>
            <p>{errorMsg}</p>
          </Message>
          }
            <Button color='teal' fluid size='large' type='submit' onClick={() => submitForm()}>
            Daftar
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
        Telah Mendaftar? <Link to="/">Kembali Ke Log Masuk</Link>
      </Message>
    </Grid.Column>
  </Grid>
  



}

export default RegisterScreen