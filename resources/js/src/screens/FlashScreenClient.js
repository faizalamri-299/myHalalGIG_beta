import React from 'react'
import { Transition, Menu, Segment, Header, Image, Message, Progress,Loader } from 'semantic-ui-react'
import {
  Link
} from "react-router-dom";

import logo from '../assets/img/gig-banner.png';
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
 

const FlashScreenClient = ({msg,config}) => {
  
return(
////////////////////////////////////////////////////TOP VERTICAL NAV//////////////////////////////////////////////////////////////////
<div style={{height:'100vh',display:'flex', flexDirection:'column' }}>
      
<Menu borderless stackable attached='top' inverted color={'teal'}size='large'>
  <Menu.Item>
  </Menu.Item>
  <Menu.Menu position='right'>
  </Menu.Menu>
</Menu>
<div style={{display:'flex', flexDirection:'row',flex:1, overflow:'hidden' }}>
{/* ////////////////////////////////////////////////////TOP VERTICAL NAV////////////////////////////////////////////////////////////////// */}

{/* ////////////////////////////////////////////////////SIDEBAR MENU////////////////////////////////////////////////////////////////// */}
<Menu pointing secondary vertical>
  <div className="ui divider"></div>
    <Menu.Item as={Link} onClick={()=>setactiveItem('home')}
      icon= 'home'

    />
  <div className="ui divider"></div>
    <Menu.Item header>Maklumat</Menu.Item>
    <Menu.Item as={Link} onClick={()=>setactiveItem('company')}
      icon= 'building outline'

    />
    {/* <Menu.Item as={Link} onClick={()=>setactiveItem('subcr')}
      icon= 'building outline'
      name='Syarikat'
      to="/subcr"
      active={activeItem === 'subcr'}
    /> */}
    {/* <Menu.Item as={Link} onClick={()=>setactiveItem('premises')}
      icon= 'building outline'
      name='Premis'
      to="/premises"
      active={activeItem === 'premises'}
    />
    <Menu.Item as={Link} onClick={()=>setactiveItem('iha')}
      icon= 'building outline'
      name='IHA'
      to="/iha"
      active={activeItem === 'iha'}
    />
    <Menu.Item as={Link} onClick={()=>setactiveItem('training')}
      icon= 'building outline'
      name='Latihan Halal'
      to="/training"
      active={activeItem === 'training'}
    /> */}
    <Menu.Item as={Link} onClick={()=>setactiveItem('supplier')}
      icon= 'truck'
      name='Pembekal'
    />
    <Menu.Item as={Link} onClick={()=>setactiveItem('advisor')}
      icon= 'address card outline'
      name='Advisors'

    />
    {/* <Menu.Item as={Link} onClick={()=>setactiveItem('user')}
      name='Users'
      to="/profile"
      active={activeItem === 'user'}
    /> */}
    {/* <Menu.Item as={Link} onClick={()=>setactiveItem('product')}
      icon= 'food'
      name='Produk 𝘭 Menu'
      to="/product"
      active={activeItem === 'product'}
    /> */}
  {/* <div class="ui divider"></div>
    <Menu.Item header>Dokumen</Menu.Item>
    <Menu.Item as={Link} onClick={()=>setactiveItem('HASFile')}
      icon= 'file alternate outline'
      name='Fail HAS'
      to="/HASFile"
      active={activeItem === 'HASFile'}
    />
    <Menu.Item as={Link} onClick={()=>setactiveItem('HalalFile')}
      icon= 'file archive outline'
      name='HAS File'
      to="/HalalFile"
      active={activeItem === 'HalalFile'}
    /> */}
  <div className="ui divider"></div>
    <Menu.Item header>Tetapan</Menu.Item>   
      <Menu.Item as={Link} onClick={()=>setactiveItem('certbodies')}
        icon= 'tasks'
        name='Certification Bodies'

      />
    {/* <Menu.Item as={Link} onClick={()=>setactiveItem('advisorall')}
        icon= 'address card outline'
        name='Advisors'
        to="/advisorall"
        active={activeItem === 'advisorall'}
      /> */}
    <Menu.Item as={Link} onClick={()=>setactiveItem('CArecord')}
        icon= 'address card outline'
        name='Rekod Advisor Client'

      />
</Menu>
{/* ////////////////////////////////////////////////////SIDEBAR MENU////////////////////////////////////////////////////////////////// */}

{/* ////////////////////////////////////////////////////SIDEBAR ROUTE////////////////////////////////////////////////////////////////// */}
  <Segment className="innerContainer" basic>
  <div style={{backgroundColor:config?config.headerColor:"white"}}>
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
</Segment>
{/* ////////////////////////////////////////////////////SIDEBAR ROUTE////////////////////////////////////////////////////////////////// */}
</div>
</div>
)
}

export default FlashScreenClient