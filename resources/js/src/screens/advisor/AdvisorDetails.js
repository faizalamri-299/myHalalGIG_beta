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

import {AdvisorContext, getAdvisorDetails} from './advisor';
import TabCompany from './TabCompany';

import dp from '../../assets/img/defaultphoto.png';


import { AuthContext } from '../auth/auth';

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const ProductDetails = () => {

  const {usr} = useContext(AdvisorContext);
  const [subdata, setData] = React.useState([]);

  const [rawmaterial, setrawmaterial] = React.useState([]);
  const [advisordetail, setAdvisorDetail] = React.useState([]);

  const [stocklist, setstockCklist] = React.useState([]);
  const [filteredCklist, setfilteredCklist] = React.useState([]);


  let { path, url } = useRouteMatch();

  const { index } = useParams();

  React.useEffect(() => {

    const bootstrapAsync = async () => {
      if (usr)
   {
    getAdvisorDetails(usr[index].id).then(x=>{
        console.log(x);
        if(typeof x.data!=="undefined") setData(x.data);

        if(typeof x.advisordetail!=="undefined") 
        {
          setAdvisorDetail(x.advisordetail);
          //setRawMaterial(x.rawmaterial);
        }
        
      }).catch(e=>{
          console.log(e)
        });
      }
  };
      bootstrapAsync();
    }, [usr]);
  

  const updaterawmaterial =(x)=>{
    const ddl2 =  Object.keys(x).map((id) =>
    ({
      key: id,
      text: x[id].name,
      value: id,
    }))
    setrawmaterial(x);
    setpremisesddl(ddl2);
  }

  
  const panes = [
    {
      menuItem: { key: 'advisordetail', icon: 'building', content: 'Senarai Syarikat Seliaan' },
      render: () => <Tab.Pane>
                      <TabCompany data={advisordetail} id={usr[index].id}/>
                    </Tab.Pane>,
    },
  ]

  if (usr)
  {
     const detail=usr[index];
     return (

      <Transition transitionOnMount={true} animation="fade" duration={1000}>
        <div className="in innerContainer listScroll">
          <Header as='h3' dividing style={{ lineHeight: '2em' }}>
            <Button size='medium' circular icon='angle left' basic color='green' as={Link} to={`${url.split("/details").shift()}`} />
            {detail.name}</Header>

              <Segment color='green' style={{ width: '70%', marginLeft:'15%'}}>
              <Header as='h3' dividing>Maklumat Advisor</Header>  
           
              <Grid textAlign='left' stackable columns={2} style={{ width: '100%' }}>
                <Grid.Column style={{ width: '50%'}} >
                <Image src={detail.advImg && detail.advImg.profilePicture? detail.advImg.profilePicture:dp} size="small" centered style={{borderRadius: 400/ 2}}/>
                  <Header sub>Perihal</Header>
                  <span>{detail.advDescription && detail.advDescription? detail.advDescription:"Tiada maklumat"}</span>
                  <Header sub>No Telefon</Header>
                  <span>{detail.advTelno && detail.advTelno? detail.advTelno:"Tiada maklumat"}</span>
                  <Header sub>Emel</Header>
                  <span>{detail.username && detail.username? detail.username:"Tiada maklumat"}</span>
                  <Header sub>Lokasi Seliaan</Header>
                  <span>{detail.advPreflocation && detail.advPreflocation? detail.advPreflocation:"Tiada maklumat"}</span>
                </Grid.Column>  

                 <Grid.Column style={{ width: '50%'}} >
                  <Header sub>Nama</Header>
                  <span>{detail.name && detail.name? detail.name:"Tiada maklumat"}</span>
                  <Header sub>No Kad Pengenalan</Header>
                  <span>{detail.advIcno && detail.Icno? detail.Icno:"Tiada maklumat"}</span>
                  <Header sub>Jantina</Header>
                  <span>{detail.advGender && detail.advGender? detail.advGender:"Tiada maklumat"}</span>
                  <Header sub>Umur</Header>
                  <span>{moment(new Date()).diff(moment(detail.advBirthdate),'years') && moment(new Date()).diff(moment(detail.advBirthdate),'years')? moment(new Date()).diff(moment(detail.advBirthdate),'years'):"Tiada maklumat" }</span>
                  <Header sub>Tarikh Lahir</Header>
                  <span>{moment(detail.advBirthdate).format('DD/MM/YYYY') && moment(detail.advBirthdate).format('DD/MM/YYYY')? moment(detail.advBirthdate).format('DD/MM/YYYY'):"Tiada maklumat"}</span>
                  <Header sub>Lokasi Semasa</Header>
                  <span>{detail.advAddress && detail.advAddress? detail.advAddress: "Tiada maklumat"}</span>
                  
                </Grid.Column>
              </Grid>
            </Segment>
            <Tab panes={panes} onTabChange={(e,d)=>{console.log(d)}}/> 
        </div>
      </Transition>
    )
  }
  else
    return (<Header as='h3' >Loading....</Header>)
}

export default ProductDetails