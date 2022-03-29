import React from 'react'
import { Input, Menu, Segment ,Dropdown,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Sidebar,
    
} from 'semantic-ui-react';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import logo from '../assets/img/initialWhite.png'; 

import {AuthContext} from '../screens/auth/auth';
import Home from '../screens/auditor/Home';
import AuditorPremises from '../screens/auditor/AuditorPremises';

import UserList from '../screens/auditor/userList';

import ClientUser from '../screens/auditor/ClientUser';
import {getData,ClientContext} from '../screens/client/client';

import {getalluser,AuditorContext} from '../screens/auditor/auditor';
import {isMobile} from 'react-device-detect';


const AuditorNavigator = () => {
    const [activeItem, setactiveItem] = React.useState(window.location.pathname.split("/")[1])
    const { profile,cmpny,signOut,changeAccess } = React.useContext(AuthContext);
    const [subcrData, setsubcrData] = React.useState([]);
    const [premises, setpremises] = React.useState([]);
    const [schmlist, setschmlist] = React.useState([]);
    const [sideBarOpen, openSidebar] = React.useState(false);
    const [users, setusers] = React.useState([]);

    
    
    let { path, url } = useRouteMatch();
    const sidebarClick=fn=>{
      openSidebar(false);
    }
    const bootstrapAsync = async () => {
      getalluser().then(x => {
        setusers(x);
      })
      // getsubuserdata().then(x=>{
      //   setsubcrData(x.subscription);
      //   setpremises(x.premises);
      //   setschmlist(x.cklists);
      //   setusers(x.users);
      // getData().then(x=>{
      //   setsubcrData(x.data);
      //   // setusers(x.users);
      //   setpremises(x.premises);
      //   setschmlist(x.schmlist);
      //   setactive_subcr(x.active_subcr);
      //   setloading(false);
      // }).catch(e=>console.log(e));
    };

  React.useEffect(() => {
    bootstrapAsync();
    console.log(profile);

  }, []);

  const auditorContext = React.useMemo(
    () => ({subcrData,premises,schmlist,users,
      reloadUser:setusers,
    reloadData:bootstrapAsync,
    clearDraft:()=>{localStorage.removeItem(cmpny.cmpnyPK + "_cklistDraft"); setDraft(null);}
    }),
    [subcrData,premises,schmlist,users]
);

const updateUser=(x,type)=>{
  if(users){
  // ]
 
 delete x.password;
 let currentuser = JSON.parse(JSON.stringify(users));

   let index=currentuser.findIndex(obj => {return obj.id === x.id});
   if(index<0){
     currentuser.push(x);
   }
   else{
     if(type==="delete")currentuser.splice(index, 1)
     else currentuser[index]=x;
   }
   setusers(currentuser);

 }
 else{
   setusers([x]);
  
 }
 
}


  return (
      
    <div style={{height:'100vh',display:'flex', flexDirection:'column' }}>
    <Menu borderless attached='top' inverted size='large' style={{backgroundColor:cmpny.cmpnyConfig && cmpny.cmpnyConfig.headerColor? cmpny.cmpnyConfig.headerColor:""}}>
        <Menu.Item>
          <Image src={cmpny.cmpnyConfig && cmpny.cmpnyConfig.headerLogo? cmpny.cmpnyConfig.headerLogo:logo} size='mini' verticalAlign='middle'/>
        </Menu.Item>

  {!isMobile&&<Menu.Item header  as="h3" style={{color:cmpny.cmpnyConfig && cmpny.cmpnyConfig.headerTextColor? cmpny.cmpnyConfig.headerTextColor:""}}>{cmpny.cmpnyConfig && cmpny.cmpnyConfig.appName? cmpny.cmpnyConfig.appName: cmpny.cmpnyName+" My Halal Gig"}</Menu.Item>}
        <Menu.Menu position='right'>
          <Menu.Item
          >
           
           {!isMobile &&
             <Dropdown item text={profile.name}>
            <Dropdown.Menu>
              {profile.accesslvl<2&&<Dropdown.Item onClick={()=>changeAccess(profile.accesslvl)}>Change Access</Dropdown.Item>}
              <Dropdown.Item onClick={signOut}>Log Keluar</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>}
          </Menu.Item>
          {isMobile && <Menu.Item
          name='sidebar'
          onClick={()=>openSidebar(!sideBarOpen)}
        >
          <Icon name='bars' />
        </Menu.Item>}
{/* 
          <Menu.Item
            name='help'
            active={activeItem === 'help'}
          >
            Help
          </Menu.Item> */}
        </Menu.Menu>
      </Menu>
      
   <div  style={{display:'flex', flexDirection:'row',flex:1, overflow:'hidden' }}>
   
   {isMobile?
   <Sidebar
   as={Menu}
   animation="push"
   icon='labeled'
   inverted
   vertical
   direction="left"
   visible={sideBarOpen}
   width='thin'
 >
  <Menu.Item>
         <Header inverted as='h2'>
         {cmpny.cmpnyName}
         <Header.Subheader>
     {cmpny.cmpnyDetails.address}
   </Header.Subheader>
 </Header>
       </Menu.Item>

       <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem(''))}
        icon= 'building'
         name='Profil Syarikat'
         to="/"
         active={activeItem === ''}
       />
        <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem('premises'))}
        icon= 'industry'
         name='Premis 𝘭 Site 𝘭 Plan'
         to="/premises"
         active={activeItem === 'premises'}
       />
       
       {/* <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem('cklist'))}
         name='Checklists'
         to="/checklist"
         active={activeItem === 'cklist'}
       /> */}
       
       {/* <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem('subcr'))}
         name='Subscription Group'
         to="/subscription"
         active={activeItem === 'subcr'}
       /> */}
       <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem('user'))}
         icon= 'users'
         name='Senarai Pengguna'
         to="/users"
         active={activeItem === 'user'}
       />
       <Menu.Item onClick={()=>sidebarClick(signOut())} attached="bottom"
         name='Logout'
       />

       
       </Sidebar>
   :
   <Menu  vertical attached="top">
   <Menu.Item>
          <Header as='h2'>
          {cmpny.cmpnyName}
          <Header.Subheader>
      {cmpny.cmpnyDetails.address}
    </Header.Subheader>
  </Header>
        </Menu.Item>

        <Menu.Item as={Link} onClick={()=>setactiveItem('')}
         icon= 'building'
          name='Profil Syarikat'
          to="/"
          active={activeItem === ''}
        />

         <Menu.Item as={Link} onClick={()=>setactiveItem('premises')}
         icon= 'industry'
          name='Premis 𝘭 Site 𝘭 Plan'
          to="/premises"
          active={activeItem === 'premises'}
        />
        
        {/* <Menu.Item as={Link} onClick={()=>setactiveItem('cklist')}
          name='Checklists'
          to="/checklist"
          active={activeItem === 'cklist'}
        /> */}
        
        
        {/* <Menu.Item as={Link} onClick={()=>setactiveItem('subcr')}
          name='Subscription Group'
          to="/subscription"
          active={activeItem === 'subcr'}
        /> */}
        <Menu.Item as={Link} onClick={()=>setactiveItem('user')}
          icon= 'users'
          name='Senarai Pengguna'
          to="/users"
          active={activeItem === 'user'}
        />
      </Menu>
      }
      <AuditorContext.Provider value={auditorContext}>
            <Segment className="innerContainer flexCol"  basic>
            <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/premises">
                        <AuditorPremises data={premises}  />
                    </Route>
                    <Route path="/users" onDataChange={updateUser} data={users} id={cmpny.cmpnyPK}>
                    <UserList/>
                    </Route>
                </Switch>
            </Segment>
            </AuditorContext.Provider>
            </div>
        
  </div>
  )
}

export default AuditorNavigator