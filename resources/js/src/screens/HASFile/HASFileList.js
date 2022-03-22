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
// import the progress bar
import StepProgressBar from 'react-step-progress';

//import tab untuk download tu 
import TabSuratLantikan from './TabSuratLantikan';
import TabStaffInfo from './TabStaffInfo';
import TabKawalanMakhlukPerosak from './TabKawalanMakhlukPerosak';
import TabSuntikanATyphoid from './TabSuntikanATyphoid';
import TabRekodSembelihan from './TabRekodSembelihan';
import TabSertuRekod from './TabSertuRekod';
import TabStaffHealth from './TabStaffHealth';
import TabOrgIHC from './TabOrgIHC';
import TabRekodKesanHalal from './TabRekodKesanHalal';
import TabAkuJanji from './TabAkuJanji';

//import authentication client (user) tu
import {AuthContext} from '../auth/auth';
import ClientIHC from '../client/ClientIHC';
import ClientTraining from '../client/ClientTraining';

import {getData,ClientContext,getAdvisorClient,getAdSelected} from '../client/client';
import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

//import function@variable dalam HASFile.js tu 
import {HASFileContext, getHASFile, deleteHASFile,postHASFile,createHASFile } from './HASFile';


const step1Content = <h1><br></br>Fail 1</h1>;
const step2Content = <h1><br></br>Fail 2</h1>;
const step3Content = <h1><br></br>Fail 3</h1>;
const step4Content = <h1><br></br>Fail 4</h1>;
const step5Content = <h1><br></br>Fail 5</h1>;
const step6Content = <h1><br></br>Fail 6</h1>;
const step7Content = <h1><br></br>Fail 7</h1>;
const step8Content = <h1><br></br>Fail 8</h1>;
const step9Content = <h1><br></br>Fail 9</h1>;
const step10Content = <h1><br></br>Fail 10</h1>;
 
// setup step validators, will be called before proceeding to the next step
function step2Validator() {
 true
}
 
function step3Validator() {
  // return a boolean
}
 

const HASFileList = () => {
  const [activeItem, setactiveItem] = React.useState(window.location.pathname.split("/")[1])

  //ni saya duplicate je ikut halalfile, saya kenalpasti ada yang saya tak gune. betulkan jika salah. 
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
    menuItem: { key: 'suratlantik', content: '1. Surat Lantikan Pekerja' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodkerja', content: '2. Rekod Maklumat Pekerja' },
    render: () => <Tab.Pane>
                    <TabStaffInfo/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '3. Rekod Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabKawalanMakhlukPerosak/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'antityphoid', content: '4. Rekod Suntikan Anti Typhoid' },
    render: () => <Tab.Pane>
                    <TabSuntikanATyphoid/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'slaughtering', content: '5. Rekod Sembelihan' },
    render: () => <Tab.Pane>
                    <TabRekodSembelihan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'Sertu', content: '6. Rekod Sertu' },
    render: () => <Tab.Pane>
                    <TabSertuRekod/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'staffsihat', content: '7. Rekod Kesihatan Pekerja' },
    render: () => <Tab.Pane>
                    <TabStaffHealth/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'kesanhalal', content: '8. Rekod Pengesanan Halal' },
    render: () => <Tab.Pane>
                    <TabRekodKesanHalal/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'akujanji', content: '9. Surat Aku Janji' },
    render: () => <Tab.Pane>
                    <TabAkuJanji/>
                  </Tab.Pane>,
  },
]

const panesfoodbev = [
  {
    menuItem: { key: 'suratlantik', content: '1. Surat Lantikan Pekerja' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },         
  {
    menuItem: { key: 'rekodMperosak', content: '2. Rekod Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabKawalanMakhlukPerosak/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'antityphoid', content: '3. Rekod Suntikan Anti Typhoid' },
    render: () => <Tab.Pane>
                    <TabSuntikanATyphoid/>
                  </Tab.Pane>,
  },
]

const panesfoodpremise = [
  {
    menuItem: { key: 'suratlantik', content: '1. Surat Lantikan Pekerja' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodkerja', content: '2. Rekod Maklumat Pekerja' },
    render: () => <Tab.Pane>
                    <TabStaffInfo/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '3. Rekod Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabKawalanMakhlukPerosak/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'antityphoid', content: '4. Rekod Suntikan Anti Typhoid' },
    render: () => <Tab.Pane>
                    <TabSuntikanATyphoid/>
                  </Tab.Pane>,
  },
]

const panesslaughtering = [
  {
    menuItem: { key: 'suratlantik', content: '1. Surat Lantikan Pekerja' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '2. Rekod Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabKawalanMakhlukPerosak/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'antityphoid', content: '3. Rekod Suntikan Anti Typhoid' },
    render: () => <Tab.Pane>
                    <TabSuntikanATyphoid/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'slaughtering', content: '4. Rekod Sembelihan' },
    render: () => <Tab.Pane>
                    <TabRekodSembelihan/>
                  </Tab.Pane>,
  },
]

const panesconsumergood = [
  {
    menuItem: { key: 'suratlantik', content: '1. Surat Lantikan Pekerja' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodkerja', content: '2. Rekod Maklumat Pekerja' },
    render: () => <Tab.Pane>
                    <TabStaffInfo/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '3. Rekod Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabKawalanMakhlukPerosak/>
                  </Tab.Pane>,
  },
]

const panespharma = [
  {
    menuItem: { key: 'suratlantik', content: '1. Surat Lantikan Pekerja' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodkerja', content: '2. Rekod Maklumat Pekerja' },
    render: () => <Tab.Pane>
                    <TabStaffInfo/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '3. Rekod Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabKawalanMakhlukPerosak/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'staffsihat', content: '4. Rekod Kesihatan Pekerja' },
    render: () => <Tab.Pane>
                    <TabStaffHealth/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'akujanji', content: '5. Surat Aku Janji' },
    render: () => <Tab.Pane>
                    <TabAkuJanji/>
                  </Tab.Pane>,
  },
]

const paneslogistic = [
  {
    menuItem: { key: 'suratlantik', content: '1. Surat Lantikan Pekerja' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'Sertu', content: '2. Rekod Sertu' },
    render: () => <Tab.Pane>
                    <TabSertuRekod/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'kesanhalal', content: '3.Rekod Pengesanan Halal' },
    render: () => <Tab.Pane>
                    <TabRekodKesanHalal/>
                  </Tab.Pane>,
  },
]

const panescosmetic = [
  {
    menuItem: { key: 'suratlantik', content: '1. Surat Lantikan Pekerja' },
    render: () => <Tab.Pane>
                    <TabSuratLantikan/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodkerja', content: '2. Rekod Maklumat Pekerja' },
    render: () => <Tab.Pane>
                    <TabStaffInfo/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'rekodMperosak', content: '3. Rekod Kawalan Makhluk Perosak' },
    render: () => <Tab.Pane>
                    <TabKawalanMakhlukPerosak/>
                  </Tab.Pane>,
  },
]


  return (
    <Transition transitionOnMount={true} animation="fade" duration={1000}>
    {/* <div className="container-fluid"> */}
    <div>
      <>   
      {cmpny.cmpnyDetails.skimproduk==='Barang Gunaan'?      
      (
        <Grid>
          <Grid.Row>
            <Grid.Column>
            <Header as='h3' dividing>Skim Produk: Barang Gunaan</Header>
            <Tab panes={panesconsumergood} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ):
      cmpny.cmpnyDetails.skimproduk==='Produk Makanan / Minuman / Makanan Tambahan'?
      (
        <Grid>
          <Grid.Row>
            <Grid.Column>
            <Header as='h3' dividing>Skim Produk: Produk Makanan / Minuman / Makanan Tambahan</Header>
            <Tab panes={panesfoodbev} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>            
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ):
      cmpny.cmpnyDetails.skimproduk==='Premis Makanan'?
      (
        <Grid>
          <Grid.Row>
            <Grid.Column>
            <Header as='h3' dividing>Skim Produk: Premis Makanan</Header>
            <Tab panes={panesfoodpremise} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>            
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ):
      cmpny.cmpnyDetails.skimproduk==='Rumah Sembelihan'?
      (
      <Grid>
          <Grid.Row>
            <Grid.Column>
            <Header as='h3' dividing>Skim Produk: Rumah Sembelihan</Header>
            <Tab panes={panesslaughtering} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>            
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ):
      cmpny.cmpnyDetails.skimproduk==='Kosmetik dan Dandanan Diri'?
      (
      <Grid>
      <Grid.Row>
        <Grid.Column>
        <Header as='h3' dividing>Skim Produk: Kosmetik dan Dandanan Diri</Header>
        <Tab panes={panescosmetic} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>            
        </Grid.Column>
        </Grid.Row>
      </Grid>
      ):
      cmpny.cmpnyDetails.skimproduk==='Logistik'?
      (
        <Grid>
        <Grid.Row>
          <Grid.Column>
          <Header as='h3' dividing>Skim Produk: Logistik</Header>
          <Tab panes={paneslogistic} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>            
          </Grid.Column>
          </Grid.Row>
        </Grid>
        ):
      cmpny.cmpnyDetails.skimproduk==='Farmaseutikal'?
      (
        <Grid>
        <Grid.Row>
          <Grid.Column>
          <Header as='h3' dividing>Skim Produk: Farmaseutikal</Header>
          <Tab panes={panespharma} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>            
          </Grid.Column>
          </Grid.Row>
        </Grid>
        ):
          <Grid>
          <Grid.Row>
            <Grid.Column>
            <Tab panes={panes} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/>
            </Grid.Column>
            </Grid.Row>
          </Grid>
      }
      </>
      
      
  </div>
  </Transition>
  )
}

export default HASFileList