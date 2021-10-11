import React from 'react'
import { Input, Menu, Segment ,Dropdown,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Sidebar,
    Divider,
    
} from 'semantic-ui-react';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import logo from '../assets/img/banner-client.png'; 

import {AuthContext} from '../screens/auth/auth';
import HomeScreen from '../screens/HomeScreen';
import CompanyAdvisorNavigator from './CompanyAdvisorNavigator';
import ProfileNavigator from './ProfileNavigator';
import SupplierNavigator from './SupplierNavigator';
import ProductNavigator from './ProductNavigator';
import HASNavigator from './HASNavigator';
import HalalFileNavigator from './HalalNavigator';
import CertBodiesNavigator from './CertBodiesNavigator';
import Dashboard from '../screens/Dashboard';
import SubscriptionNavigator from './SubscriptionNavigator';
import AdvisorNavigator from './AdvisorNavigator';
import AdvisorProfile from '../screens/advisor/AdvisorProfile';
import AdvisorProfileNavigator from './AdvisorProfileNavigator';
import CompanyAdvisorRequest from './CompanyAdvisorSelectNavigator';

import {getData, AdvisorContext} from '../screens/advisor/advisor';

const HomeNavigator = () => {
    const [activeItem, setactiveItem] = React.useState(window.location.pathname.split("/")[1])
    const { profile,cmpny,signOut,changeAccess } = React.useContext(AuthContext);
    let { path, url } = useRouteMatch();

    const [advisorprofile, setadvisorprofile] = React.useState([]);
    const [subcrData, setsubcrData] = React.useState([]);
    const [users, setusers] = React.useState([]);
    const [schmlist, setschmlist] = React.useState([]);
    const [premises, setpremises] = React.useState([]);
    const [inhalalcom, setinhalalcom] = React.useState([]);
    const [training, settraining] = React.useState([]);
    const [advisorclient, setadvisorclient] = React.useState([]);
    const [activeDraft, setDraft] = React.useState(null);
    const [active_subcr, setactive_subcr] = React.useState(null);

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
      }).catch(e=>{
        console.log(e)
      })


    };

    React.useEffect(() => {
      bootstrapAsync();
  
    }, []);

    const advisorContext = React.useMemo(
      () => ({subcrData,users,premises,inhalalcom,training,schmlist,activeDraft,active_subcr,
        reloadData:setschmlist,
        reloadSubcr:setsubcrData,
  
        reloadPremise:setpremises,
        reloadInhalalcom:setinhalalcom,
        reloadTraining:settraining,
  
        reloadUser:setusers,
      clearDraft:()=>{localStorage.removeItem(cmpny.cmpnyPK + "_cklistDraft"); setDraft(null);}
      },advisorclient),
      [subcrData,users,premises,inhalalcom,training,schmlist,activeDraft,active_subcr,advisorclient]
  );
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
  const updateAdvisorProfile =(x)=>{

    setadvisorprofile(x);
  }
    
  return (
////////////////////////////////////////////////////TOP VERTICAL NAV//////////////////////////////////////////////////////////////////
    <div style={{height:'100vh',display:'flex', flexDirection:'column' }}>
      
    <Menu borderless stackable attached='top' color={'blue'} inverted size='large'>
      <Menu.Item>
        <Image
          src={logo}
          size='small'
          href='/'
          spaced
        />
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Dropdown item text={profile.name}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={signOut}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
   <div style={{display:'flex', flexDirection:'row',flex:1, overflow:'hidden' }}>
{/* ////////////////////////////////////////////////////TOP VERTICAL NAV////////////////////////////////////////////////////////////////// */}

{/* ////////////////////////////////////////////////////SIDEBAR MENU////////////////////////////////////////////////////////////////// */}
    <Menu pointing secondary vertical>
      <div className="ui divider"></div>
        <Menu.Item as={Link} onClick={()=>setactiveItem('home')}
          icon= 'home'
          name='Halaman Utama'
          to="/"
          active={activeItem === 'home'}
        />
      <div className="ui divider"></div>
        <Menu.Item header>Maklumat</Menu.Item>
        <Menu.Item as={Link} onClick={()=>setactiveItem('profile')}
          icon= 'user'
          name='Profil'
          to="/profile"
          active={activeItem === 'profile'}
        />

        <Menu.Item as={Link} onClick={()=>setactiveItem('CompanyAdvisorRequest')}
          icon= 'building outline'
          name='Senarai Permohonan'
          to="/CompanyAdvisorRequest"
          active={activeItem === 'CompanyAdvisorRequest'}
        />

        <Menu.Item as={Link} onClick={()=>setactiveItem('companyAdvisor')}
          icon= 'building outline'
          name='Syarikat'
          to="/companyAdvisor"
          active={activeItem === 'companyAdvisor'}
        />
    </Menu>
{/* ////////////////////////////////////////////////////SIDEBAR MENU////////////////////////////////////////////////////////////////// */}

{/* ////////////////////////////////////////////////////SIDEBAR ROUTE////////////////////////////////////////////////////////////////// */}
      <Segment className="innerContainer" basic>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/advisorprofile">
              <AdvisorProfile data={premises}  onDataChange={updatePremise}  id={cmpny.cmpnyPK}/>
          </Route>
          <Route path="/companyAdvisor">
              <CompanyAdvisorNavigator />
          </Route>
          <Route path="/profile">
              <AdvisorProfileNavigator />
          </Route>
          <Route path="/supplier">
              <SupplierNavigator />
          </Route>
          <Route path="/product">
              <ProductNavigator />
          </Route>
          {/* <Route path="/HASFile">
              <HASNavigator />
          </Route> */}
          <Route path="/HalalFile">
              <HalalFileNavigator />
          </Route>
          <Route path="/certbodies">
              <CertBodiesNavigator />
          </Route>
          <Route path="/advisorall">
              <AdvisorNavigator />
          </Route>
          <Route path="/subcr">
            <SubscriptionNavigator />
          </Route>
          <Route path="/advisor">
            <AdvisorNavigator />
          </Route>
          <Route path="/CompanyAdvisorRequest">
            <CompanyAdvisorRequest />
          </Route>
          {/* <Route path="/profile">
            <ProfileNavigator />
          </Route> */}
        </Switch>
    </Segment>
{/* ////////////////////////////////////////////////////SIDEBAR ROUTE////////////////////////////////////////////////////////////////// */}
  </div>
</div>
  )
}

export default HomeNavigator