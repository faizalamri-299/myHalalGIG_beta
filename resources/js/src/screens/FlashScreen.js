import React from 'react'
import { Transition, Form, Label, Header, Image, Message, Progress,Loader } from 'semantic-ui-react'
import {
  Link
} from "react-router-dom";

import logo from '../assets/img/gig-banner.png';
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
 

const FlashScreen = ({msg,config}) => {

return <div className="flexcenter" style={{backgroundColor:config?config.headerColor:"white"}}>
    <Transition transitionOnMount={true} animation='pulse' duration={5000}>
    {config? config.fullLogo? <Image src={config.fullLogo} style={{height:'20vh',objectFit:'contain',margin: '1em 1em 1em 1em'}} />:<Image src={logo}  style={{height:'15vmin',objectFit:'contain',margin: '1em 1em 1em 1em'}} />:<Image src={logo}  style={{height:'15vmin',objectFit:'contain',margin: '1em 1em 1em 1em'}} />}
        </Transition>

        {!config && 
      <HashLoader color={"#008080"}/>

}
{config&& <Loader indeterminate />}
{msg &&<Header as='h2' textAlign='center' style={{color:config?config.headerTextColor:"black"}}>

      <Header.Content>{msg}</Header.Content>

      </Header>
}
  </div>
}

export default FlashScreen