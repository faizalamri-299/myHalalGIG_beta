import React from 'react'
import { Input, Menu, Segment ,Dropdown,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Sidebar, Divider, Loader,Table
    
} from 'semantic-ui-react';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import logo from '../assets/img/banner-client.png'; 

import {AuthContext} from '../screens/auth/auth';
import HomeScreen from '../screens/HomeScreen';
import ClientUser from '../screens/client/ClientUser';
import ClientChecklists from '../screens/client/ClientChecklists';
import ClientCreateChecklist from '../screens/client/ClientCreateChecklist';

import ClientAdvisor from '../screens/client/ClientAdvisor';
import ClientAdvisorList from '../screens/client/ClientAdvisorList';
import ClientPremises from '../screens/client/ClientPremises';
import ClientIHC from '../screens/client/ClientIHC';
import ClientTraining from '../screens/client/ClientTraining';

import ClientSubcription from '../screens/client/ClientSubcription';
import Home from './HomePageNavigator';
import ClientCmpny from '../screens/client/ClientCmpny';



import {getData,ClientContext,getAdvisorClient,getAdSelected} from '../screens/client/client';
import {getExp} from '../screens/supplier/Supplier';
import {isMobile} from 'react-device-detect';
import FlashScreen from '../screens/FlashScreen';

import SupplierNavigator from './SupplierNavigator';
import ProductNavigator from './ProductNavigator';
import HalalFileNavigator from './HalalNavigator';
import HASFileNavigator from './HASNavigator';
import UploadHalalNavigator from './UploadHalalNavigator';
import UploadHASNavigator from './UploadHASNavigator';
import ClientSelectedNavigator from './ClientSelectedNavigator';
import swal from '@sweetalert/with-react'
import * as moment from 'moment';

const ClientNavigator = () => {
    const [activeItem, setactiveItem] = React.useState(window.location.pathname.split("/")[1])
    const { profile,cmpny,signOut,changeAccess } = React.useContext(AuthContext);
    const [subcrData, setsubcrData] = React.useState([]);
    const [users, setusers] = React.useState([]);
    const [schmlist, setschmlist] = React.useState([]);
    const [activeDraft, setDraft] = React.useState(null);
    const [active_subcr, setactive_subcr] = React.useState(null);
    const [sideBarOpen, openSidebar] = React.useState(false);
    const [loading,setloading] = React.useState(true);

    const [premises, setpremises] = React.useState([]);
    const [inhalalcom, setinhalalcom] = React.useState([]);
    const [training, settraining] = React.useState([]);
    const [advisorclient, setadvisorclient] = React.useState([]);
    const [expDate, setExpDate] = React.useState(null);
    const [adselected, setadselected] = React.useState([]);
    const [process, setprocess] = React.useState(false);
    const [error, setError] = React.useState('');

    
    
    let { path, url } = useRouteMatch();
    const sidebarClick=fn=>{
      openSidebar(false);
    }
    const bootstrapAsync = async () => {
      let cklistDraft = localStorage.getItem(cmpny.cmpnyPK + "_cklistDraft");
      if (cklistDraft) {
        cklistDraft = JSON.parse(cklistDraft);
        setDraft(cklistDraft);
      }
      getData().then(x=>{
        setsubcrData(x.data);
        setusers(x.users);

        setpremises(x.premises);
        setinhalalcom(x.inhalalcom);
        settraining(x.training);

        setschmlist(x.schmlist);
        setactive_subcr(x.active_subcr);
        setloading(false);
      }).catch(e=>{
        console.log(e)
        setloading(false);
      })

      getAdvisorClient().then(x => {
        setadvisorclient(x);
      });

      getAdSelected().then(x => {
        setadselected(x);
      });
    };

    React.useEffect(() => {
      // const bootstrapAsync = async () => {
      //   getExp().then(x => {
      //     setExpDate(x);
      //   })
      // };

      bootstrapAsync();
  
    }, []);

  const clientContext = React.useMemo(
    () => ({subcrData,users,premises,inhalalcom,training,schmlist,activeDraft,active_subcr,
      reloadData:setschmlist,
      reloadSubcr:setsubcrData,

      reloadPremise:setpremises,
      reloadInhalalcom:setinhalalcom,
      reloadTraining:settraining,

      reloadUser:setusers,
    clearDraft:()=>{localStorage.removeItem(cmpny.cmpnyPK + "_cklistDraft"); setDraft(null);}
    ,advisorclient,expDate}),
    [subcrData,users,premises,inhalalcom,training,schmlist,activeDraft,active_subcr,advisorclient,expDate]
);


const updateUser=(x,type)=>{
  if(users){
  // 
 
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

const updatePremise =(x)=>{
  // const ddl2 =  Object.keys(x).map((id) =>
  // ({
  //   key: id,
  //   text: x[id].name,
  //   value: id,
  // }))
  setpremises(x);
  // setpremisesddl(ddl2);
}

const updateIHC =(x)=>{
  setinhalalcom(x);
}
const updateTraining =(x)=>{
  settraining(x);
}

const updateSubscription=(x)=>{
  setsubcrData(x);
}

const updateCklist =(x)=>{
  const ddl2 =  Object.keys(x).map((id) =>
  ({
    key: id,
    text: x[id].name,
    value: id,
  }))
  
  setschmlist(x);
  // setcklistddl(ddl2);

  const ddl3 =  stockCklist.flatMap((x,i) =>{
    const found = ddl2.some(el => el.text === x.cklistName);
    if(!found)
    return({
      key: x.id,
      text: x.cklistName,
      value: x.id,
    })
    else return [];
  })
    // setfilteredCklist(ddl3)
}
  if(loading) return <FlashScreen msg="Loading..." config={cmpny.cmpnyConfig}/>
  else return (
      
    <div style={{height:'100vh',display:'flex', flexDirection:'column' }}>
    <Menu borderless attached='top' color={'violet'} inverted size='large' style={{backgroundColor:cmpny.cmpnyConfig && cmpny.cmpnyConfig.headerColor? cmpny.cmpnyConfig.headerColor:""}}>
        <Menu.Item>
          <Image src={logo} size='small' verticalAlign='middle' style={{ margin: '1em 1em 1em 1em' }}/>
        </Menu.Item>
        {!isMobile&&<Menu.Item header  as="h4" style={{color:cmpny.cmpnyConfig && cmpny.cmpnyConfig.headerTextColor? cmpny.cmpnyConfig.headerTextColor:""}}>{cmpny.cmpnyConfig && cmpny.cmpnyConfig.appName? cmpny.cmpnyConfig.appName: "Halal Management System"}</Menu.Item>}
        <Menu.Menu position='right'>
          <Menu.Item>
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


    <div style={{display:'flex', flexDirection:'row',flex:1, overflow:'auto' }}>
   
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
       <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem('home'))}
          icon= 'home'
          name='Halaman Utama'
          to="/"
          active={activeItem === 'home'}
          
        />
        <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem('company'))}
          icon= 'building'
          name='Syarikat'
          to="/company"
          active={activeItem === 'company'}
        />
       {/* <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem('premises'))}
         name='Premises'
         icon= 'warehouse'
         to="/premises"
         active={activeItem === 'premises'}
       /> */}

       <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem('supplier'))}
          icon= 'truck'
          name='Pembekal'
          to="/supplier"
          active={activeItem === 'supplier'}
        />
        <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem('product'))}
          icon= 'food'
          name='Produk 𝘭 Menu'
          to="/product"
          active={activeItem === 'product'}
        />
        <Divider horizontal><Header as='h6' color='violet'>TEMPLAT</Header></Divider>
        <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem('HASFile'))}
          icon= 'file alternate'
          name='Fail HALAL'
          to="/HASFile"
          active={activeItem === 'HASFile'}
        />
        <Menu.Item as={Link} onClick={()=>setactiveItem('HalalFile')}
          icon= 'file archive'
          name='Fail HAS'
          to="/HalalFile"
          active={activeItem === 'HalalFile'}
        />
        <Divider horizontal><Header as='h6' color='violet'>MUAT NAIK</Header></Divider>
        <Menu.Item as={Link} onClick={()=>setactiveItem('UploadHalal')}
          icon= 'file alternate outline'
          name='Fail HALAL'
          to="/UploadHalal"
          active={activeItem === 'UploadHalal'}
        />
        <Menu.Item as={Link} onClick={()=>setactiveItem('UploadHAS')}
          icon= 'file archive outline'
          name='Fail HAS'
          to="/UploadHAS"
          active={activeItem === 'UploadHAS'}
        />
      {/* <Menu.Item as={Link} onClick={()=>setactiveItem('ClientAdvisor')}
        icon= 'file archive'
        name='Pilih Advisor'
        to="/ClientAdvisor"
        active={activeItem === 'ClientAdvisor'}
      />
      <Menu.Item as={Link} onClick={()=>setactiveItem('ClientAdvisorList')}
        icon= 'file archive'
        name='Advisor'
        to="/ClientAdvisorList"
        active={activeItem === 'ClientAdvisorList'}
      /> */}
      
       <Menu.Item onClick={()=>sidebarClick(signOut())} attached="bottom"
         name='Log Keluar'
       />
       </Sidebar>
   :
   <Menu pointing secondary vertical>
     <Menu.Item>
          <Header as='h3'>
          {cmpny.cmpnyName}
          <Header.Subheader>
      {cmpny.cmpnyDetails.address}
    </Header.Subheader>
  </Header>
        </Menu.Item>
      <div className="ui divider"></div>
      <Menu.Item as={Link} onClick={()=>setactiveItem('home')}
          icon= 'home'
          name='Halaman Utama'
          to="/"
          active={activeItem === 'home'}
        />
        <Menu.Item header>Maklumat</Menu.Item>
        <Menu.Item as={Link} onClick={()=>setactiveItem('company')}
          icon= 'building'
          name='Syarikat'
          to="/company"
          active={activeItem === 'company'}
        />
        {/* <Menu.Item as={Link} onClick={()=>setactiveItem('premises')}
          icon= 'industry'
          name='Premis 𝘭 Site 𝘭 Plan'
          to="/premises"
          active={activeItem === 'premises'}
        /> */}
        <Menu.Item as={Link} onClick={()=>setactiveItem('supplier')}
          icon= 'truck'
          name='Pembekal'
          to="/supplier"
          active={activeItem === 'supplier'}
        />
        <Menu.Item as={Link} onClick={()=>setactiveItem('product')}
          icon= 'food'
          name='Produk 𝘭 Menu'
          to="/product"
          active={activeItem === 'product'}
        />
      <div className="ui divider"></div>
        <Menu.Item header>Dokumen</Menu.Item>
        <Divider horizontal><Header as='h6'>TEMPLAT</Header></Divider>
        <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem('HASFile'))}
          icon= 'file alternate'
          name='Fail HALAL'
          to="/HASFile"
          active={activeItem === 'HASFile'}
        />
        <Menu.Item as={Link} onClick={()=>setactiveItem('HalalFile')}
          icon= 'file archive'
          name='Fail HAS'
          to="/HalalFile"
          active={activeItem === 'HalalFile'}
        />
        <Divider horizontal><Header as='h6'>MUAT NAIK</Header></Divider>
        <Menu.Item as={Link} onClick={()=>setactiveItem('UploadHalal')}
          icon= 'file alternate outline'
          name='Fail HALAL'
          to="/UploadHalal"
          active={activeItem === 'UploadHalal'}
        />
        <Menu.Item as={Link} onClick={()=>setactiveItem('UploadHAS')}
          icon= 'file archive outline'
          name='Fail HAS'
          to="/UploadHAS"
          active={activeItem === 'UploadHAS'}
        />

    {/* <div className="ui divider"></div>
      <Menu.Item header>Lain-lain</Menu.Item>
      <Menu.Item as={Link} onClick={()=>setactiveItem('ClientAdvisor')}
        icon= 'file archive'
        name='Pilih Advisor'
        to="/ClientAdvisor"
        active={activeItem === 'ClientAdvisor'}
      />
      <Menu.Item as={Link} onClick={()=>setactiveItem('ClientAdvisorList')}
        icon= 'file archive'
        name='Advisor'
        to="/ClientAdvisorList"
        active={activeItem === 'ClientAdvisorList'}
      /> */}
    </Menu>
   }
      <ClientContext.Provider value={clientContext}>
            <Segment className="innerContainer flexCol" basic>
              <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path={`/company`}>
                    <ClientCmpny />
                </Route>
                {/* <Route path="/premises">
                    <ClientPremises data={premises}  onDataChange={updatePremise}  id={cmpny.cmpnyPK} accesslvl={profile.accesslvl} />
                </Route> */}
                <Route path="/supplier">
                    <SupplierNavigator />
                </Route>
                <Route path="/product">
                    <ProductNavigator />
                </Route>
                <Route path="/HASFile">
                    <HASFileNavigator />
                </Route>
                <Route path="/HalalFile">
                    <HalalFileNavigator />
                </Route>
                <Route path="/UploadHalal">
                    <UploadHalalNavigator />
                </Route>
                <Route path="/UploadHAS">
                    <UploadHASNavigator />
                </Route>
                <Route path="/ClientAdvisor">
                    <ClientAdvisor />
                </Route>
                <Route path="/ClientAdvisorList">
                    <ClientSelectedNavigator />
                </Route>
              </Switch>
            </Segment>
            </ClientContext.Provider>
    </div>
  </div>  
  )
}

export default ClientNavigator