import React,{useContext } from 'react'
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
  Button
} from 'semantic-ui-react';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import { getCompany,CompanyContext } from './company';

const CompanyList = () => {

  const cmpny = useContext(CompanyContext);
  let { path, url } = useRouteMatch();


  const RenderCompany = props => {
    console.log(props)
    const data = props.data;
    const listItems = data.map((x,i) =>
      <List.Item key={i} as={Link} to={`${url}/details/${i}`}>
        <List.Content>
        <List.Header>{x.cmpnyName}</List.Header>
        <List.Content>{x.username}</List.Content>
        </List.Content>
      </List.Item>
    );
    return <List celled ordered divided selection>
      {listItems}
    </List>
  }
  return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer listScroll">
        <Header as='h3'>Senarai Syarikat</Header>
        {cmpny &&
          <RenderCompany data={cmpny}/>
        }   
      </div>
    </Transition>
  )
}

export default CompanyList