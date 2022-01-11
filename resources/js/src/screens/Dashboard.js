import React, { Component,useContext } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Table,
  Icon,
  Message,
  Image,
  Segment,
  Statistic,
  Visibility,
} from 'semantic-ui-react'

import {SupplierContext,getNewUser} from '../screens/DashboardAPI';
// import the stylesheet
import 'react-step-progress/dist/index.css';
import * as moment from 'moment';




const HomeScreen = () => {
  
  const [NewUser, setNewUser] = React.useState([]);
  const [advisor, setNewAdvisor] = React.useState([]);
  const [usr, setCountTotal] = React.useState([]);
  const [totalcompany, setTotalCompany] = React.useState([]);
  const [company, setCompany] = React.useState([]);
  const [supplier, setSupplier] = React.useState([]);

  React.useEffect(() => {

    const bootstrapAsync = async () => {
        try {
          getNewUser().then(x=>{
            console.log(x);
            setNewUser(x.usr);
            setNewAdvisor(x.advisor);
            setCompany(x.company);
            setSupplier(x.supplier);
            setTotalCompany(x.totalcompany);
            
          })
        }  catch (e) {
           console.log(e)
        }
    }

     

    bootstrapAsync();
  
  }, []);

  React.useEffect(() => {  
  }, [NewUser]);


  const RenderNewUser = props => {

  const listItems = NewUser.map((x) =>
    <Table.Row>
      <Table.Cell>{x.name}</Table.Cell>
      <Table.Cell>{x.username}</Table.Cell>
      <Table.Cell>{x.cmpnyName}</Table.Cell>
      <Table.Cell>{moment(x.created_at).format('DD/MM/YYYY')}</Table.Cell>
      <Table.Cell>{x.lastLogin == null ? 'tiada data': (moment(x.lastLogin).format('DD/MM/YYYY'))}</Table.Cell>
    </Table.Row>
  );
  return <>

  <Table id="pdfdiv">
  <Table.Header>
  <Table.Row>
    <Table.HeaderCell>Nama</Table.HeaderCell>
    <Table.HeaderCell>Email</Table.HeaderCell>
    <Table.HeaderCell>Nama Syarikat</Table.HeaderCell>
    <Table.HeaderCell>Tarikh Daftar</Table.HeaderCell>
    <Table.HeaderCell>Tarikh Akhir Log Masuk</Table.HeaderCell>
  </Table.Row>
  </Table.Header>

  <Table.Body>
    {listItems}
  </Table.Body>
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
          <Button
            floated='right'
            icon
            labelPosition='left'
            basic
            size='small'
            as='a' 
            href='company'
          >
            <Icon name='external' /> Senarai Penuh
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
</>
}

const RenderNewAdvisor = props => {

  const listItems = advisor.map((x) =>
    <Table.Row>
      <Table.Cell>{x.name}</Table.Cell>
      <Table.Cell>{x.username}</Table.Cell>
      <Table.Cell>{x.cmpnyName}</Table.Cell>
      <Table.Cell>{moment(x.created_at).format('DD/MM/YYYY')}</Table.Cell>
      <Table.Cell>{x.lastLogin == null ? 'Tiada Data': (moment(x.lastLogin).format('DD/MM/YYYY'))}</Table.Cell>
    </Table.Row>
  );
  return <>

  <Table id="pdfdiv">
  <Table.Header>
  <Table.Row>
    <Table.HeaderCell>Nama</Table.HeaderCell>
    <Table.HeaderCell>Email</Table.HeaderCell>
    <Table.HeaderCell>Nama Syarikat</Table.HeaderCell>
    <Table.HeaderCell>Tarikh Daftar</Table.HeaderCell>
    <Table.HeaderCell>Tarikh Akhir Log Masuk</Table.HeaderCell>
  </Table.Row>
  </Table.Header>

  <Table.Body>
    {listItems}
  </Table.Body>
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
          <Button
            floated='right'
            icon
            labelPosition='left'
            basic
            size='small'
            as='a' 
            href='advisor'
          >
            <Icon name='external' /> Senarai Penuh
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
</>
}

const RenderDashboard = () => {

  const total =  totalcompany.map((x) => <Statistic.Value><Icon name='users' />{x.totalUser}</Statistic.Value>);
  const totalCompany =  company.map((x) => <Statistic.Value><Icon name='building' />{x.totalCompany}</Statistic.Value>);
  const totalSupplier =  supplier.map((x) => <Statistic.Value><Icon name='truck' />{x.totalSupplier}</Statistic.Value>);
  const totalAdvisor =  totalcompany.map((x) => <Statistic.Value><Icon name='male' />{x.totalAdvisor}</Statistic.Value>);
  return <>
  <br></br>
    <Statistic.Group widths='four'>
      <Statistic color='blue'>
        {total}
        <Statistic.Label>Total User</Statistic.Label>
      </Statistic>

      <Statistic color='teal'>
          {totalCompany}
        <Statistic.Label>Total Company</Statistic.Label>
      </Statistic>

      <Statistic color='violet'>
          {totalAdvisor}
        <Statistic.Label>Total Advisor</Statistic.Label>
      </Statistic>

      <Statistic color='purple'>
        {totalSupplier}
        <Statistic.Label>Total Supplier</Statistic.Label>
      </Statistic>
    </Statistic.Group>
</>
}

  return (
<>

    <Segment style={{ padding: '0em 0em',overflow: 'auto'}} vertical>
      <Container text>
        <Grid>
          <Grid.Column textAlign="center">

            {NewUser < 1 ? 
              <Message info>    
                <Message.Header>Tiada Maklumat</Message.Header>
                <p>Tiada Maklumat Dalam Pangkalan Data</p>
              </Message> :
              <RenderDashboard data={NewUser}/>}
          </Grid.Column>
        </Grid>
          <br></br>
            <Divider></Divider>
          <br></br>
        <Grid>
          <Grid.Column textAlign="center">
            <Header as='h3' style={{ fontSize: '2em' }}>
              Senarai Pengguna Baru Mendaftar
            </Header>
            {NewUser < 1 ? 
              <Message info>    
                <Message.Header>Tiada Maklumat</Message.Header>
                <p>Tiada Maklumat Dalam Pangkalan Data</p>
              </Message> :
              <RenderNewUser data={NewUser}/>}
          </Grid.Column>
        </Grid>
          <br></br>
            <Divider></Divider>
          <br></br>
        <Grid>
          <Grid.Column textAlign="center">
            <Header as='h3' style={{ fontSize: '2em' }}>
              Senarai Advisor Baru Mendaftar
            </Header>
            {NewUser < 1 ? 
              <Message info>    
                <Message.Header>Tiada Maklumat</Message.Header>
                <p>Tiada Maklumat Dalam Pangkalan Data</p>
              </Message> :
              <RenderNewAdvisor/>}
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>    
</>
  )
}

export default HomeScreen