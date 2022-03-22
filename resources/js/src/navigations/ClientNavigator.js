import React from 'react'
import { Input, Menu, Segment ,Dropdown,
    Card,
    Grid,
    Header,
    Button,
    Icon,
    Sticky,
    Image,
    Sidebar, Divider, Loader,Table
} from 'semantic-ui-react';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

// import logo from '../assets/img/banner-client.png'; 
import logo from '../assets/img/gig-banner.png';

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

import { useState } from 'react';

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
    ,advisorclient}),
    [subcrData,users,premises,inhalalcom,training,schmlist,activeDraft,active_subcr,advisorclient]
);

const updateUser=(x,type)=>{
  if(users){
 
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
  setpremises(x);
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
}
  if(loading) return <FlashScreen msg="Loading..." config={cmpny.cmpnyConfig}/>
  else return (
      
    // <div style={{height:'100vh',display:'flex', flexDirection:'column' }}>
    // <Menu borderless attached='top' color={'violet'} inverted size='large' style={{backgroundColor:cmpny.cmpnyConfig && cmpny.cmpnyConfig.headerColor? cmpny.cmpnyConfig.headerColor:""}}>
    //     <Menu.Item>
    //       <Image src={logo} size='small' verticalAlign='middle' style={{ margin: '1em 1em 1em 1em' }}/>
    //     </Menu.Item>
    //     {!isMobile&&<Menu.Item header  as="h4" style={{color:cmpny.cmpnyConfig && cmpny.cmpnyConfig.headerTextColor? cmpny.cmpnyConfig.headerTextColor:""}}>{cmpny.cmpnyConfig && cmpny.cmpnyConfig.appName? cmpny.cmpnyConfig.appName: "Halal Management System"}</Menu.Item>}
      
    <div>
      <Sticky>
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}>

          </Grid.Column>
          <Grid.Column width={14}>
            <Menu size='large' borderless>
              <Image
              src={logo}
              size='small'
              as={Link}
              to="/"
              onClick={()=>setactiveItem('home')}
              actice={activeItem === 'home'}
              style={{margin:'1em 1em 1em 3em'}}
              />
        
        <Menu.Menu position='right'>
          {/* <Menu.Item>
           {!isMobile &&
             <Dropdown item text={profile.name}> */}
            <Dropdown className='link item' text='Maklumat'>
            <Dropdown.Menu>
              {/* {profile.accesslvl<2&&<Dropdown.Item onClick={()=>changeAccess(profile.accesslvl)}>Change Access</Dropdown.Item>}
              <Dropdown.Item onClick={signOut}>Log Keluar</Dropdown.Item> */}
            <Dropdown.Item> 
            <Menu.Item as={Link} onClick={()=>setactiveItem('company')}    
            name='Syarikat'
            to="/company"
            active={activeItem === 'company'}
            />
            </Dropdown.Item> 
            </Dropdown.Menu>

          {/* </Dropdown>}
          </Menu.Item>
          {isMobile && <Menu.Item
          name='sidebar'
          onClick={()=>openSidebar(!sideBarOpen)}
        >
          <Icon name='bars' />
        </Menu.Item>} */}

        {/* </Menu.Menu>
      </Menu> */}


    {/* <div style={{display:'flex', flexDirection:'row',flex:1, overflow:'auto' }}> */}
   
    {/* {isMobile?
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
          
        /> */}
        </Dropdown>

        <Menu.Item as={Link} onClick={()=>setactiveItem('supplier')}
          name='Pembekal'
          to="/supplier"
          active={activeItem === 'supplier'}
        />
        <Menu.Item as={Link} onClick={()=>setactiveItem('product')}
          name='Produk 𝘭 Menu'
          to="/product"
          active={activeItem === 'product'}
        />

        <Dropdown className='link item' text='Fail Halal'>
          <Dropdown.Menu>
            <Dropdown.Item> 
              <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem('HASFile'))}
                name='Templat'
                to="/HASFile"
                active={activeItem === 'HASFile'}
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item as={Link} onClick={()=>setactiveItem('UploadHalal')}
                name='Muatnaik'
                to="/UploadHalal"
                active={activeItem === 'UploadHalal'}
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className='link item' text='Fail HAS'>
          <Dropdown.Menu>
            <Dropdown.Item> 
              <Menu.Item as={Link} onClick={()=>setactiveItem('HalalFile')}
                name='Templat'
                to="/HalalFile"
                active={activeItem === 'HalalFile'}
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item as={Link} onClick={()=>setactiveItem('UploadHAS')}
                name='Muatnaik'
                to="/UploadHAS"
                active={activeItem === 'UploadHAS'}
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> 

          <Menu.Item>
                <Button primary onClick={signOut}>Log Keluar</Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
            </Grid.Column>
            <Grid.Column width={1}>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Sticky>

        
        {/* <Menu.Item as={Link} onClick={()=>sidebarClick(setactiveItem('company'))}
          icon= 'building'
          name='Syarikat'
          to="/company"
          active={activeItem === 'company'}
        />
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
        /> */}

        {/* <Menu.Item as={Link} onClick={()=>setactiveItem('supplier')}
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
    </Menu>
   } */}

        {/* <Dropdown className='link item' text='Fail HAS'>
          <Dropdown.Menu>
            <Dropdown.Item> 
              <Menu.Item as={Link} onClick={()=>setactiveItem('HalalFile')}
                name='Templat'
                to="/HalalFile"
                active={activeItem === 'HalalFile'}
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item as={Link} onClick={()=>setactiveItem('premises')}
                name='Premis 𝘭 Site 𝘭 Plan'
                to="/premises"
                active={activeItem === 'premises'}
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className='link item' text='Fail Halal'>
          <Dropdown.Menu>
            <Dropdown.Item> 
              <Menu.Item as={Link} onClick={()=>setactiveItem('company')}
                name='Syarikat'
                to="/company"
                active={activeItem === 'company'}
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item as={Link} onClick={()=>setactiveItem('premises')}
                name='Premis 𝘭 Site 𝘭 Plan'
                to="/premises"
                active={activeItem === 'premises'}
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> 

        <Dropdown item text='Maklumat'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Menu.Item as={Link} onClick={()=>setactiveItem('ClientAdvisor')}
                icon= 'file archive'
                name='Pilih Advisor'
                to="/ClientAdvisor"
                active={activeItem === 'ClientAdvisor'}
                />
              </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item as={Link} onClick={()=>setactiveItem('ClientAdvisorList')}
                icon= 'file archive'
                name='Advisor'
                to="/ClientAdvisorList"
                active={activeItem === 'ClientAdvisorList'}
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            <Button primary onClick={signOut}>Log Out</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
        </Grid.Column>
        <Grid.Column width={1}>

        </Grid.Column>
      </Grid.Row>
    </Grid> */}
      
      
   <div>
   <Grid>
      <Grid.Row>
        <Grid.Column width={1}/>
        <Grid.Column width={14}>    
          <Card fluid>
            <ClientContext.Provider value={clientContext}>
              <Segment className="innerContainer flexCol"  basic>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path={`/company`}>
                      <ClientCmpny />
                  </Route>
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
                </Switch>
              </Segment>
            </ClientContext.Provider>
          </Card>
        </Grid.Column>

        
      
        {/* <Grid.Column width={14}>
          <ClientCmpny />
        </Grid.Column>

        <Grid.Column width={10}>
        
   <Card fluid>

      <ClientContext.Provider value={clientContext}> */}
            {/* <Segment className="innerContainer flexCol" basic>
              <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path={`/company`}>
                    <ClientCmpny />
                </Route>
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
            </ClientContext.Provider> */}

{/* <Segment className="innerContainer flexCol"  basic>
            <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path={`/company`}>
                        <ClientCmpny />
                    </Route> */}
                    {/* <Route path="/premises">
                        <ClientPremises data={premises}  onDataChange={updatePremise}  id={cmpny.cmpnyPK} accesslvl={profile.accesslvl} />
                    </Route> */}
                    {/* <Route path="/supplier">
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
                    </Route> */}
                    {/* <Route path="/ClientAdvisor">
                        <ClientAdvisor />
                    </Route>
                    <Route path="/ClientAdvisorList">
                        <ClientSelectedNavigator />
                    </Route> */}
                {/* </Switch>
          </Segment>
        </ClientContext.Provider>
        </Card>
      </Grid.Column> */}

      <Grid.Column width={1}>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </div>
  </div>  
  )
}

export default ClientNavigator