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

import {deleteUser, postUser, SupplierContext, getSupplierData } from './Supplier';
import TabDetails from './TabDetails';
import TabMaterial from './TabMaterial';


const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const SupplierDetails = () => {

  const {supplier} = useContext(SupplierContext);
  const [supplierdata, setsupplier] = React.useState(null);

  const [rawmaterial, setRawMaterial] = React.useState([]);
  const [suppliercert, setSupplierCert] = React.useState([]);

  const [rawmaterialddl, setRawMaterialddl] = React.useState([]);
  const [suppliercertddl, setSupplierCertddl] = React.useState([]);
  
  const [premisesddl, setpremisesddl] = React.useState([]);
  const [stockCklist, setstockCklist] = React.useState([]);
  
  const [cklist, setcklist] = React.useState([]);
  const [cklistddl, setcklistddl] = React.useState([]);

  
  let { path, url } = useRouteMatch();

  const { index } = useParams();


  React.useEffect(() => {

    const bootstrapAsync = async () => {
    if (supplier)
    {
      getSupplierData(supplier[index].id).then(x=>{
        console.log(x);
        if(typeof x.data!=="undefined") setData(x.data);

        if(typeof x.rawmaterial!=="undefined") {
        setRawMaterial(x.rawmaterial);
        setSupplierCert(x.suppliercert);
      }

        
      else{
        const ddl3 =  x.stockCkList.flatMap((x,i) =>{
          return({
            key: x.id,
            text: x.cklistName,
            value: x.id,
          })
        })
          setfilteredCklist(ddl3)
      }
        
        setstockCklist(x.stockCkList);
      

      }).catch(e=>{
          console.log(e)
        });
      }
    };

    bootstrapAsync();

  }, [supplier]);
  

  const updateDetails=(x,type)=>{
       if(rawmaterial){
       // ]
      
      delete x.sprm_name;
      let currentrawmaterial = JSON.parse(JSON.stringify(rawmaterial));

        let index=currentrawmaterial.findIndex(obj => {return obj.id === x.id});
        if(index<0){
          currentrawmaterial.push(x);
        }
        else{
          if(type==="delete")currentrawmaterial.splice(index, 1)
          else currentrawmaterial[index]=x;
        }
        setRawMaterial(currentrawmaterial);

        let ddl = JSON.parse(JSON.stringify(suppdetail));
        let index2=ddl.findIndex(obj => {return obj.key === x.id});
        if(index2<0){

        ddl.push({
            key: x.id,
            text: x.sprm_name,
            value: x.id,
          });
        }
        else{
          if(type==="delete") ddl.splice(index2, 1)
          else ddl[index2]={
                  key: x.id,
                  text: x.sprm_name,
                  value: x.id,
                };
        }
        setRawMaterialddl(ddl);
      }      
  }



 const updateSupplierCert=(x)=>{
    setSupplierCert(x);
  }

const updateRawMaterial=(x)=>{
    setRawMaterial(x);
  }
  
  const panes = [
    {
      menuItem: { key: 'suppliercert', icon: 'file alternate outline', content: 'Sijil Halal' },
      render: () => <Tab.Pane>
                      <TabDetails data={suppliercert} id={supplier[index].id} onDataChange={updateSupplierCert} />
                    </Tab.Pane>,
    },
    {
      menuItem: { key: 'rawmaterial', icon: 'list alternate outline', content: 'Bahan Mentah' },
      render: () => <Tab.Pane>
                      <TabMaterial data={rawmaterial} id={supplier[index].id} onDataChange={updateRawMaterial} datadd={suppliercert}/>
                    </Tab.Pane>,
    }
  ]
  if (supplier)
   {
     const halaldetail=supplier[index];
     return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer listScroll">
        <Header as='h3' dividing style={{ lineHeight: '2em' }}>
          <Button size='medium' circular icon='angle left' basic color='green' as={Link} to={`${url.split("/detail").shift()}`} />
          {halaldetail.sp_name} </Header>

            <Segment color='green'>
            <Header as='h3' dividing>Maklumat Pembekal</Header>
            <Grid textAlign='center'  stackable columns={3} style={{ width: '100%' }}>
              <Grid.Column >
              <Header sub>Nama Pembekal</Header>
              <span>{halaldetail.sp_name}</span>
              </Grid.Column>
              <Grid.Column >
                
            <Header sub>Alamat Pembekal</Header>
              <span>{halaldetail.sp_address}</span>
              </Grid.Column>
              <Grid.Column >
            <Header sub>Negara Pembekal</Header>
              <span>{halaldetail.sp_origin_country}</span>
              </Grid.Column>
            </Grid>
            
          </Segment>
          <Tab panes={panes} onTabChange={(e,d)=>{console.log(d)}} menu={{ secondary: true, pointing: true }}/>

      </div>
      
    </Transition>
    )}
  else
    return (<Header as='h3' >Loading....</Header>)
}

export default SupplierDetails