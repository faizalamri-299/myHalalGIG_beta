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

import {deleteUser, postUser, ProductContext, getProductDetails } from './Product';
import TabMaterial from './TabMaterial';

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const ProductDetails = () => {

  const {product,supplier} = useContext(ProductContext);
  const [subdata, setData] = React.useState([]);

  const [rawmaterial, setrawmaterial] = React.useState([]);
  const [productdetail, setProductDetail] = React.useState([]);

  const [stocklist, setstockCklist] = React.useState([]);
  const [filteredCklist, setfilteredCklist] = React.useState([]);


  let { path, url } = useRouteMatch();

  const { index } = useParams();

  React.useEffect(() => {

    const bootstrapAsync = async () => {
      if (product)
   {
      getProductDetails(product[index].id).then(x=>{
        console.log(x);
        if(typeof x.data!=="undefined") setData(x.data);

        if(typeof x.productdetail!=="undefined") 
        {
          setProductDetail(x.productdetail);
          //setRawMaterial(x.rawmaterial);
        }
        
      }).catch(e=>{
          console.log(e)
        });
      }
  };
      bootstrapAsync();
    }, [product]);
  

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
      menuItem: { key: 'productdetail', icon: 'food', content: 'Bahan Mentah' },
      render: () => <Tab.Pane>
                      <TabMaterial data={productdetail} id={product[index].id}/>
                    </Tab.Pane>,
    },
  ]

  if (product)
  {
     const detail=product[index];
     return (

      <Transition transitionOnMount={true} animation="fade" duration={1000}>
        <div className="in innerContainer listScroll">
          <Header as='h3' dividing style={{ lineHeight: '2em' }}>
            <Button size='medium' circular icon='angle left' basic color='green' as={Link} to={`${url.split("/details").shift()}`} />
            {detail.prsp_name}</Header>
              <Segment color='green'>
              
              <Header as='h3' dividing>Maklumat Produk</Header>             
              <Grid textAlign='center' stackable columns={1} style={{ width: '100%' }}>
                <Grid.Column >
                  <Header sub>Nama Produk</Header>
                  <span><h3>{detail.prsp_name}</h3></span>
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