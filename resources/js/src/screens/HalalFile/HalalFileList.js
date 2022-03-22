import React from 'react'
import {
  Input, Menu, Segment,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Sidebar,
  Transition,
  Label,
  Button,
  Table,
  Tab,
  Modal,
  Form,Dropdown
    
} from 'semantic-ui-react';
import StepProgressBar from 'react-step-progress';
//import 'react-step-progress/dist/index.css';
import TabRawMaterial from './TabRawMaterial';
import TabPolicy from './TabPolicy';
import TabOrgChart from './TabOrgChart';
import TabIHA from './TabIHA';
import TabHalalRiskControl from './TabHalalRiskControl';
import TabLabAnalysis from './TabLabAnalysis';

import TabTraceability from './TabTraceability';
import TabTOR from './TabTOR';
import TabHASReview from './TabHASReview';
import TabHalalTraining from './TabHalalTraining';
import TabSertu from './TabSertu';

import {AuthContext} from '../auth/auth';
import ClientIHC from '../client/ClientIHC';
import ClientTraining from '../client/ClientTraining';

import {getData,ClientContext,getAdvisorClient,getAdSelected} from '../client/client';
import {Switch,Route,Link,useRouteMatch} from "react-router-dom";


import {deleteSupplier, HalalFileContext, getSupplier, postMaterial} from './HalalFile';


const step1Content = <h1><br></br>Fail 1</h1>;
const step2Content = <h1><br></br>Fail 2</h1>;
const step3Content = <h1><br></br>Fail 3</h1>;
const step4Content = <h1><br></br>Fail 4</h1>;
const step5Content = <h1><br></br>Fail 5</h1>;
const step6Content = <h1><br></br>Fail 6</h1>;
const step7Content = <h1><br></br>Fail 7</h1>;
const step8Content = <h1><br></br>Fail 8</h1>;
const step9Content = <h1><br></br>Fail 9</h1>;

 
// setup step validators, will be called before proceeding to the next step
function step2Validator() {
  true
}
 
function step3Validator() {
  // return a boolean
}
 


const HalalFileList = () => {
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
  const [adselected, setadselected] = React.useState([]);

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

const updateIHC =(x)=>{
  setinhalalcom(x);
}
const updateTraining =(x)=>{
  settraining(x);
}

const panes = [
  {
    menuItem: { key: 'polisi', content: '1. Polisi Halal' },
    render: () => <Tab.Pane>
                    <TabPolicy/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'jobDesc', content: '2. Jawatankuasa Halal Dalaman' },
    render: () => <Tab.Pane>
                  <ClientContext.Provider value={clientContext}>
                  <ClientIHC data={inhalalcom}  onDataChange={updateIHC}  id={cmpny.cmpnyPK} accesslvl={profile.accesslvl}/>
                  </ClientContext.Provider>
                  <br></br>
                  {/* <Header as='h3'>Carta Organisasi</Header>
                  <br></br> 
                    <TabOrgChart/> <br></br><br></br><br></br> */}
                    <TabTOR/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'SOP', content: '3. Audit Halal Dalaman' },
    render: () => <Tab.Pane>
                    <TabIHA/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'HalalRiskControl', content: '4. Kawalan Risiko Halal' },
    render: () => <Tab.Pane>
                    <TabHalalRiskControl/>
                  </Tab.Pane>,
  },
  {
    //menuItem: { key: 'SOPRawMat', content: '5.Kawalan Bahan Mentah' },<Icon name='checkmark'/>
    menuItem: (
      <Menu.Item key='SOPRawMat'>
        5. Kawalan Bahan Mentah 
      </Menu.Item>
    ),
    render: () => <Tab.Pane>
                    <TabRawMaterial/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'Plan', content: '6. Latihan Halal' },
    render: () => <Tab.Pane>
                    <ClientContext.Provider value={clientContext}>
                    <ClientTraining data={training}  onDataChange={updateTraining}  id={cmpny.cmpnyPK} accesslvl={profile.accesslvl} />
                    </ClientContext.Provider>
                    <br></br>
                    <TabHalalTraining/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'Tracebility', content: '7. Kebolehkesanan' ,},
    render: () => <Tab.Pane>
                    <TabTraceability/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'HASCheck', content: '8. Semakan HAS' },
    render: () => <Tab.Pane>
                    <TabHASReview/>
                  </Tab.Pane>,
  },
  // {
  //   menuItem: { key: 'LabAnalysis', content: '9. Analisis Makmal' },
  //   render: () => <Tab.Pane>
  //                   <TabLabAnalysis/>
  //                 </Tab.Pane>,
  // },
  {
    menuItem: { key: 'Sertu', content: '9. Sertu' },
    render: () => <Tab.Pane>
                    <TabSertu/>
                  </Tab.Pane>,
  },

]

const panesmicro = [
  {
    menuItem: { key: 'polisi', content: '1. Polisi Halal' },
    render: () => <Tab.Pane>
                    <TabPolicy/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'HalalRiskControl', content: '2. Kawalan Risiko Halal' },
    render: () => <Tab.Pane>
                    <TabHalalRiskControl/>
                  </Tab.Pane>,
  },
  {
    //menuItem: { key: 'SOPRawMat', content: '5.Kawalan Bahan Mentah' },<Icon name='checkmark'/>
    menuItem: (
      <Menu.Item key='SOPRawMat'>
        3. Kawalan Bahan Mentah 
      </Menu.Item>
    ),
    render: () => <Tab.Pane>
                    <TabRawMaterial/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'Plan', content: '4. Latihan Halal' },
    render: () => <Tab.Pane>
                    <ClientContext.Provider value={clientContext}>
                    <ClientTraining data={training}  onDataChange={updateTraining}  id={cmpny.cmpnyPK} accesslvl={profile.accesslvl} />
                    </ClientContext.Provider>
                    <br></br>
                    <TabHalalTraining/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'Tracebility', content: '5. Kebolehkesanan' ,},
    render: () => <Tab.Pane>
                    <TabTraceability/>
                  </Tab.Pane>,
  },
]

  return (
    <Transition transitionOnMount={true} animation="fade" duration={1000}>
    {/* <div className="container-fluid"> */}
    <div>
      <>
      {/* <Header as='h3' dividing>{cmpny.cmpnyDetails.hasiljualan}</Header> */}
      {cmpny.cmpnyDetails.hasiljualan === 'Nilai jualan tahunan <RM300,000' || cmpny.cmpnyDetails.hasiljualan === 'Nilai jualan tahunan RM300,000 - RM15 Juta' ?  
      <Tab panes={panesmicro} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/> 
      :
      <Tab panes={panes} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/> 
      }
      </>
      
      
  </div>
  </Transition>
  )
}

export default HalalFileList