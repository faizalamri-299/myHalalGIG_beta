import React, { useContext } from 'react'
import {
  Input, Menu, Segment,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Sidebar,
  Transition,
  List,
  Button,
  Table,
  Tab,
  Modal,
  Form,Dropdown
} from 'semantic-ui-react';

import * as moment from 'moment';

import { useParams, Link, useRouteMatch } from "react-router-dom";

import {deleteUser, postUser, SubscriptionContext,getSubcrData } from './subscription';
import TabPremises from './TabPremises';
import TabTrainings from './TabTrainings';
import TabSubUser from './TabSubUsers';
import TabGenPDF from './TabGenPDF'
import TabSubcription from './TabSubcription';
import { set } from 'lodash';

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const SubscriptionDetails = () => {

  const {subcr,cmpny} = useContext(SubscriptionContext);
  const [subdata, setData] = React.useState([]);

  const [users, setUsers] = React.useState([]);
  const [userddl, setUserddl] = React.useState([]);
  
  const [premises, setpremises] = React.useState([]);
  const [premisesddl, setpremisesddl] = React.useState([]);
  const [stockCklist, setstockCklist] = React.useState([]);
  const [filteredCklist, setfilteredCklist] = React.useState([]);
  
  const [training, settraining] = React.useState([]);
  const [trainingddl, settrainingddl] = React.useState([]);

  const [genpdf, setgenpdf] = React.useState([]);
  const [genpdfddl, setgenpdfddl] = React.useState([]);

  let { path, url } = useRouteMatch();

  const { index } = useParams();

  React.useEffect(() => {

    const bootstrapAsync = async () => {
      if (subcr)
   {
      getSubcrData(subcr[index].id).then(x=>{
        console.log(x);
        if(typeof x.data!=="undefined") setData(x.data);
        
      //   if(typeof x.users!=="unsdefined") {
      //   const ddl =  x.users.map((x,i) =>
      //   ({
      //     key: x.id,
      //     text: x.name,
      //     value: x.id,
      //   }))
      //   setUserddl(ddl);
      //   setUsers(x.users);
      // }

        if(typeof x.users !== "undefined"){
          const ddl = Object.keys(x.users).map((id) =>
          ({
            key: id,
            text: x.users[id].name,
            value: id,
          }))
          setUsers(x.users);
          setUserddl([
            {
              key: '*',
              text: "All",
              value: "*",
            },...ddl]);
        }

        if(typeof x.premises!=="undefined"){
        const ddl2 = Object.keys(x.premises).map((id) =>
        ({
          key: id,
          text: x.premises[id].name,
          value: id,
        }))

        setpremises(x.premises);
        setpremisesddl([
          {
          key: '*',
          text: "All",
          value: "*",
        },...ddl2]);
        }

        if(typeof x.training!=="undefined"){
        const ddl3 =  Object.keys(x.training).map((id) =>
        ({
          key: id,
          text: x.training[id].name,
          value: id,
        }))
        
        settraining(x.training);
        settrainingddl([
          {
          key: '*',
          text: "All",
          value: "*",
        },...ddl3]);
        }

        if(typeof x.genpdf!=="undefined"){
          const ddl5 =  Object.keys(x.genpdf).map((id) =>
          ({
            key: id,
            text: x.genpdf[id].name,
            value: id,
          }))
          
          setgenpdf(x.genpdf);
          setgenpdfddl([
            {
            key: '*',
            text: "All",
            value: "*",
          },...ddl5]);
          }

      else{
        const ddl4 =  x.stockCkList.flatMap((x,i) =>{
          return({
            key: x.id,
            text: x.cklistName,
            value: x.id,
          })
        })
          setfilteredCklist(ddl4)
      }
        setstockCklist(x.stockCkList);
      }).catch(e=>{
          console.log(e)
        });
      }
    };
    bootstrapAsync();
  }, [subcr]);
  

  

  const updateUser = (x) => {
    const ddl = Object.keys(x).map((id) =>
    ({
      key: id,
      text: x[id].name,
      value: id,
    }))
    setUsers(x);
    setUserddl(ddl);
  }

  const updatePremise =(x)=>{
    const ddl2 =  Object.keys(x).map((id) =>
    ({
      key: id,
      text: x[id].name,
      value: id,
    }))
    setpremises(x);
    setpremisesddl(ddl2);
  }

  const updateTraining = (x) => {
    const ddl3 = Object.keys(x).map((id) =>
    ({
      key: id,
      text: x[id].name,
      value: id,
    }))
    settraining(x);
    settrainingddl(ddl3);
  }

  const updateGenPDF = (x) => {
    const ddl5 = Object.keys(x).map((id) =>
    ({
      key: id,
      text: x[id].name,
      value: id,
    }))
    setgenpdf(x);
    setgenpdfddl(ddl5);
  }

  const printCklist=()=>{
    let dd = {
    
      content: [
        'First paragraph',
		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    //     {
    //       image: 'logo.png',
    //       width: 200,
    //       alignment: 'center',
    //       margin: [0, 150, 0, 30]
    //   }
    //   , {
    //       text: name,
    //       fontSize: 28,
    //       bold: true,
    //       alignment: 'center',
    //       margin: [0, 30]
    //   },{
    //     text: "Version "+version,
    //     fontSize: 14,
    //     alignment: 'center',
    //     margin: [0, 0, 0, 30]
    // }
      ]
    // ],
  //   images: {
  //     logo:cmpny.cmpnyConfig.headerLogo
  // }



  }

  // let tempcklist=JSON.parse(JSON.stringify(cklistData));
  // for (const [i,{section,items}] of tempcklist.entries()) {

  //   let sectionHeader = {
  //     pageBreak: 'before',
  //     margin: [0, 0, 0, 20],
  //     table: {
  //         widths: ['*'],
  //         body: [
  //             [{
  //                 alignment: 'center',
  //                 text: String.fromCharCode(65 + i) + '. ' + section,
  //                 fillColor: '#000000',
  //                 color: '#ffffff',
  //                 bold: true,
  //                 fontSize: 18
  //             }],

  //         ]
  //     }
  // }

  // let reportitem = {
  //     table: {
  //         widths: ['auto', '*', 'auto', 'auto', 'auto'],
  //         body: [
  //             [{
  //                 text: 'No.',
  //                 bold: true
  //             }, {
  //                 text: "Item",
  //                 bold: true
  //             }, {
  //                 text: "Auto Failed?",
  //                 bold: true
  //             }, {
  //                 text: 'NC',
  //                 bold: true
  //             }, {
  //                 text: "Reference",
  //                 bold: true
  //             }]
  //         ]
  //     }
  // }
//   let deduct=-1;
//   for (const [i,{id,severity,type,text_ms,info,autofailed}] of items.entries()) {
    
//     let resultcol;

   
//     if(type ==="CHECKLIST"){
      
//       // let idx=severities.findIndex(({id})=>id==severity);
      
//       resultcol=severities.find(z => z.id == severity).name;

//     }
//     else{
//       resultcol="";
//     }
   
//     let text = text_ms;
    

//     let infolist = {ul: info};
//     if(type ==="LABEL" || type ==="TITLE"){ 
//       reportitem.table.body.push(
//         [{ text, colSpan: 5,bold:type ==="TITLE"}]);
//     deduct=i;
// }else{
//   reportitem.table.body.push([
//     (i-deduct) + '',
//     text,
//     { text:autofailed?"true":"false"},
//     resultcol,
//     infolist
// ]);
// }
//   }
    // dd.content.push(sectionHeader);
    // dd.content.push(reportitem);  
// }

  try
 { 
  pdfMake.createPdf(dd).open();
}
  catch(e){
    console.log(e)
    alert(e);
  }
}

  const panes = [
    {
      menuItem: { key: 'prms', icon: 'building', content: 'Premis / Site / Plan' },
      render: () => <Tab.Pane>
                      <TabPremises data={premises} id={subcr[index].cmpnyFK} onDataChange={updatePremise}/>
                    </Tab.Pane>,
    },
    {
      menuItem: { key: 'users', icon: 'users', content: 'Internal Halal Committee' },
      render: () => <Tab.Pane>
                      {/* <TabSubUser data={users} id={subcr[index].cmpnyFK} onDataChange={updateUser}  id={subcr[index].cmpnyFK} /> */}
                      <TabSubUser data={users} id={subcr[index].cmpnyFK} onDataChange={updateUser}/>
                    </Tab.Pane>,
    },
    {
      menuItem: { key: 'training', icon: 'clipboard list', content: 'Training' },
      render: () => <Tab.Pane>
                     <TabTrainings data={training} id={subcr[index].cmpnyFK} onDataChange={updateTraining}/>
                    </Tab.Pane>,
    },
    // {
    //   menuItem: { key: 'genpdf', icon: 'file', content: 'Generate PDF' },
    //   render: () => <Tab.Pane>
    //                  <TabGenPDF data={genpdf} id={subcr[index].cmpnyFK} onDataChange={updateGenPDF}/>
    //                 </Tab.Pane>,
    // },
    
    // {
    //   menuItem: { key: 'subcr', icon: 'briefcase', content: 'Internal Halal Committee' },
    //   render: () => <Tab.Pane>
    //                   <TabSubcription data={subdata} ddl={{premisesddl,cklistddl,userddl}} id={subcr[index].cmpnyFK} onDataChange={updateSubscription}/>
    //                 </Tab.Pane>,
    // },
  ]

  if (subcr)
   {
     const detail=subcr[index];
     return (

      <Transition transitionOnMount={true} animation="fade" duration={1000}>
        <div className="in innerContainer listScroll">


          <Header as='h3' dividing style={{ lineHeight: '2em' }}>
            <Button size='medium' circular icon='angle left' basic color='green' as={Link} to={`${url.split("/details").shift()}`} />
              {cmpny.find(obj => {return obj.value === detail.cmpnyFK}).text} </Header>
              <Segment color='green'>
              
              <Header as='h3' dividing>Maklumat Syarikat </Header> 
              
              <Button onClick={()=>editForm(x)} circular color='blue' icon='edit outline' margin='900px'/>
             
              <Grid textAlign='center'  stackable columns={4} style={{ width: '100%' }}>
                <Grid.Column >
                  <Header sub>Logo syarikat</Header><img src={require('./logo.png')} style={{height:'50px'}}/>
                  {/* <span>{detail.subcrDetails.email}</span> */}
                </Grid.Column>
                <br/>
                <Grid.Column >
                <Header sub>Nama Syarikat</Header>
                <span>{cmpny.find(obj => {return obj.value === detail.cmpnyFK}).text}</span>
                </Grid.Column>

                <Grid.Column >
                <Header sub>No Pendaftaran Syarikat</Header>
                <span>{detail.dateStart}</span>
                </Grid.Column>

                <Grid.Column >
                <Header sub>Jenis Pendaftaran</Header>
                <span>{detail.dateEnd}</span>
                </Grid.Column>

                <Grid.Column >
                <Header sub>Status Syarikat</Header>
                <span>{detail.subcrDetails.statussyarikat}</span>
                </Grid.Column>

                <Grid.Column >
                <Header sub>Jenis Perniagaan</Header>
                <span>{detail.subcrDetails.jenisperniagaan}</span>
                </Grid.Column>

                <Grid.Column >
                <Header sub>Saiz Industri</Header>
                <span>{detail.subcrDetails.jenisindustri}</span>
                </Grid.Column>

                <Grid.Column >
                <Header sub>Nilai Jualan Setahun (RM)</Header>
                <span>{detail.subcrDetails.hasiljualan}</span>
                </Grid.Column>

                <Grid.Column >
              <Header sub>Alamat syarikat</Header>
                <span>{detail.subcrDetails.address}</span>
                </Grid.Column>

                <Grid.Column >
              <Header sub>No Telefon</Header>
                <span>{detail.subcrDetails.phone}</span>
                </Grid.Column>
                
                <Grid.Column >
                  <Header sub>Emel syarikat</Header>
                  <span>{detail.subcrDetails.email}</span>
                </Grid.Column>

                
              </Grid>
            </Segment>
            
            <Tab panes={panes} onTabChange={(e,d)=>{console.log(d)}}/>
        
        </div>
        
      </Transition>
    )}
  else
    return (<Header as='h3' >Loading....</Header>)
}

export default SubscriptionDetails