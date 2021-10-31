import React ,{useContext, useState,useEffect} from 'react'
import {
  Input, Menu, Segment,
  Checkbox,
  Grid,
  Card,
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

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import 'react-step-progress/dist/index.css';
import TabRawMaterial from './TabRawMaterial';

import TabLabAnalysis from './TabLabAnalysis';
import TabTraceability from './TabTraceability';
import TabHASChecklist from './TabHASChecklist';
import TabSertu from './TabSertu';

import TabHAShalalpolicy from './TabHAShalalpolicy';
import TabHASorgchart from './TabHASorgchart';
import TabHAStor from './TabHAStor';
import TabHASempletter from './TabHASempletter';
import TabHASaudit from './TabHASaudit';
import TabHAShalalrisk from './TabHAShalalrisk';
import TabHAStraining from './TabHAStraining';

import {AuthContext} from '../auth/auth';
import ClientIHC from '../client/ClientIHC';
import ClientTraining from '../client/ClientTraining';
import {UploadHASContext,
  postHASAudit,
  deleteHASAudit} from './UploadHAS';
import {getData,ClientContext,getAdvisorClient,getAdSelected} from '../client/client';
import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import * as JSZip from 'jszip';
import {sessionRedirect} from '../../components/function';

const UploadHASList = () => {
  const [activeItem, setactiveItem] = React.useState(window.location.pathname.split("/")[1])

  const { profile,cmpny,signOut,changeAccess } = React.useContext(AuthContext);
  const {HASRawMat, HASSOPRawMat,HASTraceability,HASSOPTraceability,HASSOPProductRecall,HASChecklist,HASLabAnalysis,HASSertu, HASSOPSertu,HAShalalpolicy,HASorgchart,HAStor,HASempletter,HASaudit,HAShalalrisk,HAStraining} = useContext(UploadHASContext);
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

  let percentage = 0;
  let count = 0;



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

useEffect(() => {
  percentage
});

const panes = [
  {
    menuItem: { key: 'polisi', content: '1. Polisi Halal' },
    render: () => <Tab.Pane>
                    <TabHAShalalpolicy/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'jobDesc', content: '2. Jawatankuasa Halal Dalaman' },
    render: () => <Tab.Pane>
                  {/* <ClientContext.Provider value={clientContext}>
                  <ClientIHC data={inhalalcom}  onDataChange={updateIHC}  id={cmpny.cmpnyPK} accesslvl={profile.accesslvl}/>
                  </ClientContext.Provider>
                  <br></br> */}
                    <TabHASorgchart/>
                    <br></br>
                    <TabHAStor/>
                    <br></br>
                    <TabHASempletter/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'SOP', content: '3. Audit Halal Dalaman' },
    render: () => <Tab.Pane>
                    <TabHASaudit/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'HalalRiskControl', content: '4. Kawalan Risiko Halal' },
    render: () => <Tab.Pane>
                    <TabHAShalalrisk/>
                  </Tab.Pane>,
  },
  {
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
                    <TabHAStraining/>
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
                    <TabHASChecklist/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'LabAnalysis', content: '9. Analisis Makmal' },
    render: () => <Tab.Pane>
                    <TabLabAnalysis/>
                  </Tab.Pane>,
  },
  {
    menuItem: { key: 'Sertu', content: '10. Sertu' },
    render: () => <Tab.Pane>
                    <TabSertu/>
                  </Tab.Pane>,
  },

]
  return (
    <Transition transitionOnMount={true} animation="fade" duration={1000}>
    <div className="container-fluid">
      <>
      <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Tab panes={panes} onTabChange={(e,d)=>{console.log(d)}} menu={{ pointing: true, vertical: true, fluid: true }}/> <br></br>
          <Button floated='right'icon labelPosition='left' color='violet' href={'/zipHAS'}><Icon name='briefcase'/>Download All File</Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <Card style={{ marginTop: '0.1em',marginRight: '0.1em'}}>
            <div style={{ margin: '1em 1em 1em 1em'}}>
            {HAShalalpolicy && HAShalalpolicy.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HASorgchart && HASorgchart.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HAStor && HAStor.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HASempletter && HASempletter.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HASaudit && HASaudit.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ?  <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HAShalalrisk && HAShalalrisk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HASRawMat && HASRawMat.slice(0, 1).map(function(x){return x.hrm_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HASSOPRawMat && HASSOPRawMat.slice(0, 1).map(function(x){return x.hsrm_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HAStraining && HAStraining.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HASTraceability && HASTraceability.slice(0, 1).map(function(x){return x.ht_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HASSOPTraceability && HASSOPTraceability.slice(0, 1).map(function(x){return x.hst_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HASSOPProductRecall && HASSOPProductRecall.slice(0, 1).map(function(x){return x.hpr_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HASChecklist && HASChecklist.slice(0, 1).map(function(x){return x.hc_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HASLabAnalysis && HASLabAnalysis.slice(0, 1).map(function(x){return x.hla_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HASSertu && HASSertu.slice(0, 1).map(function(x){return x.hs_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            {HASSOPSertu && HASSOPSertu.slice(0, 1).map(function(x){return x.hss_fk_company_id }) == cmpny.cmpnyPK ? <div hidden = {true}>{percentage=percentage + 6.25}; {count = count +1}</div> : null}
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
               

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',

                // Text size
                textSize: '16px',

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: `rgba(51, 224, 71, ${percentage / 100})`,
                textColor: '#20373F',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
            />
            </div>
             
            <Card.Content>
              <Card.Header textAlign='center'>Progress of {cmpny.cmpnyName}</Card.Header>
              <Card.Meta textAlign='center'>{count} File From 16</Card.Meta>
            </Card.Content>
            <Card.Content extra>
            <a> 1. Polisi Halal {HAShalalpolicy && HAShalalpolicy.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' />: <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 2. Carta Organisasi {HASorgchart && HASorgchart.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 3. Jawatan Kuasa Halal Dalaman {HAStor && HAStor.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 4. Surat Pelantikan {HASempletter && HASempletter.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 5. Audit Halal Dalaman {HASaudit && HASaudit.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ?  <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 6. Kawalan Risiko Halal {HAShalalrisk && HAShalalrisk.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 7. Kawalan Bahan Mentah {HASRawMat && HASRawMat.slice(0, 1).map(function(x){return x.hrm_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 8. SOP Kawalan Bahan Mentah {HASSOPRawMat && HASSOPRawMat.slice(0, 1).map(function(x){return x.hsrm_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 9. Latihan Halal {HAStraining && HAStraining.slice(0, 1).map(function(x){return x.cmpnyFK }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 10. Kebolehkesanan {HASTraceability && HASTraceability.slice(0, 1).map(function(x){return x.ht_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 11. SOP Kebolehkesanan {HASSOPTraceability && HASSOPTraceability.slice(0, 1).map(function(x){return x.hst_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 12. SOP Panggil Semula Produk {HASSOPProductRecall && HASSOPProductRecall.slice(0, 1).map(function(x){return x.hpr_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 13. Semakan HAS {HASChecklist && HASChecklist.slice(0, 1).map(function(x){return x.hc_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 14. Analisis Makmal {HASLabAnalysis && HASLabAnalysis.slice(0, 1).map(function(x){return x.hla_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 15. Sertu {HASSertu && HASSertu.slice(0, 1).map(function(x){return x.hs_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            <a> 16. SOP Sertu {HASSOPSertu && HASSOPSertu.slice(0, 1).map(function(x){return x.hss_fk_company_id }) == cmpny.cmpnyPK ? <Icon style={{float:'right'}}color='green' name='checkmark' /> : <Icon style={{float:'right'}}color='red' name='close' />}</a><br></br>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      
    </Grid>
    </>
      
  </div>
  </Transition>
  )
}


export default UploadHASList