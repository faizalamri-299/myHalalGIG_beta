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
  Modal,Divider,Message,
  Form,Dropdown, Dimmer, Loader,Pagination,Label
} from 'semantic-ui-react';

import * as moment from 'moment';

import { useParams, Link, useRouteMatch } from "react-router-dom";

import {deleteUser, postIHC, SubscriptionContext,getSubcrData } from '../subscription/subscription';

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const ClientIHC = ({data,onDataChange,id,accesslvl}) => {
//   const {subcr,cmpny} = useContext(SubscriptionContext);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [objid, setID] = React.useState(0);

  const [name, setName] = React.useState("");
  const [position1, setPosition1] = React.useState("");
  const [position2, setPosition2] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [sdate, setSdate] = React.useState("");
  const [edate, setEdate] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telno, setTelno] = React.useState("");
  
  const [activePage, setActivePage] = React.useState(1);
  const [itemperpage, setitemperpage] = React.useState(50);
  const [ihcFilter, setIHCFilter] = React.useState([]);
  const [basedata, setbasedata] = React.useState([]);

  React.useEffect(() => {

    const bootstrapAsync = async () => {

      let d=Object.keys(data).map((pg) =>{ data[pg].id=pg; return data[pg]});
      setbasedata(d);
      // setPremiseFilter(d);
      setIHCFilter(d);
    };

    bootstrapAsync();

  }, [data]);

  const resetForm=()=>{
    setName("");
    setPosition1("");
    setPosition2("");
    setDepartment("");
    setSdate("");
    setEdate("");
    setEmail("");
    setTelno("");
    setID(0);0
  }

  const editForm=(id)=>{
    setID(id);
    setName(data[id].name);
    setPosition1(data[id].position1);
    setPosition2(data[id].position2);
    setDepartment(data[id].setDepartment);
    setSdate(data[id].sdate);
    setEdate(data[id].edate);
    setEmail(data[id].email);
    setTelno(data[id].telno);
    setModalOpen(true);
  }

  
  const submitForm=()=>{
    
    const postdata={id:objid,data:{name,position1,position2,department,sdate,edate,email,telno},cmpnyid:id,action:"modify"};    
    
    postIHC(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
  }

  const deleteForm=(pk)=>{
    const postdata={id:pk,cmpnyid:id,action:"delete"};
    postIHC(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
  }


  const RenderProfile = ({data}) => {
    let pageItem=[];
    let i,j,temparray;
    for (i=0,j=data.length; i<j; i+=itemperpage) {
      temparray = data.slice(i,i+itemperpage);
      pageItem.push(temparray);
        // do whatever
    }

    const tableItem = pageItem[activePage-1].map((x, i) =>
<Table.Row key={i}>
    <Table.Cell>{i+1}</Table.Cell>
    <Table.Cell>
      <Dropdown  icon="ellipsis vertical"  className='icon' 
      pointing='top left'>
      <Dropdown.Menu className='right'>
        <Dropdown.Item  onClick={()=>editForm(x.id)} color='blue' icon='edit outline' text='Edit' />
        <Dropdown.Item  onClick={()=>deleteForm(x.id)} icon='trash' text='Remove' />
      </Dropdown.Menu>
    </Dropdown>
    </Table.Cell>
    <Table.Cell>{x.name}</Table.Cell>
  <Table.Cell>{x.position1}</Table.Cell>
  <Table.Cell>{x.position2}</Table.Cell>
  <Table.Cell>{x.department}</Table.Cell>
  <Table.Cell>{moment(x.sdate).format('DD/MM/YYYY')}</Table.Cell>
  <Table.Cell>{moment(x.edate).format('DD/MM/YYYY')}</Table.Cell>
  <Table.Cell>{moment(x.edate).diff(moment(x.sdate), 'months')} Bulan</Table.Cell>
  <Table.Cell>{x.email}</Table.Cell>
  <Table.Cell>{x.telno}</Table.Cell>
  </Table.Row>
);

return <Table >
<Table.Header>
  <Table.Row>
    <Table.HeaderCell width={1}>No</Table.HeaderCell>
    <Table.HeaderCell width={1}></Table.HeaderCell>
    <Table.HeaderCell>Nama</Table.HeaderCell>
    <Table.HeaderCell>Jawatan Organisasi</Table.HeaderCell>
    <Table.HeaderCell>Jawatan Halal Dalaman</Table.HeaderCell>
    <Table.HeaderCell>Jabatan</Table.HeaderCell>
    <Table.HeaderCell>Tarikh Lantikan</Table.HeaderCell>
    <Table.HeaderCell>Tarikh Tamat Lantikan</Table.HeaderCell>
    <Table.HeaderCell>Tempoh</Table.HeaderCell>
    <Table.HeaderCell>Emel</Table.HeaderCell>
    <Table.HeaderCell>No Telefon</Table.HeaderCell>
  </Table.Row>
</Table.Header>

<Table.Body>
  {tableItem}
</Table.Body>
{/* <Table.Footer>
  <Table.Row>
    <Table.HeaderCell textAlign="center" colSpan='11'>
      <Pagination siblingRange={2} activePage={activePage} totalPages={pageItem.length} onPageChange={(e,d)=>setActivePage(d.activePage)}/>
    </Table.HeaderCell>
  </Table.Row>
</Table.Footer> */}
</Table>
}
      
  return <React.Fragment>
    <Button fluid as='div' labelPosition='right'>
    <Button fluid onClick={()=>setModalOpen(true)} basic color='green' > <Icon name='plus' />Tambah Jawatankuasa Halal Dalaman</Button>
      {/* <Label basic > */}
      {/* <Input 
                icon={{ name: 'search', link: true }}
                onChange={e=>{
                  let filter=e.target.value.toLowerCase()
                  const filterData = basedata.filter(({ name}) =>
                  name.toLowerCase().indexOf(filter) > -1);
                  setActivePage(1);
                  // setPremiseFilter(filterData)
                  setIHCFilter(filterData)
                }}
                placeholder='Cari...'
              /> */}
      {/* </Label> */}
    </Button>
      <Divider/>
     
  {ihcFilter.length>0 ? <RenderProfile data={ihcFilter} />:
      <Message warning content='Tiada rekod dijumpai'/>
  }
  <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpen(false),resetForm()}}
              // onOpen={() => setOpen(true)}
              open={modalOpen}
          >
            <Header icon='archive' content='Jawatankuasa Halal Dalaman' />
            <Modal.Content>
            <Form>
            {/* <Form.Group widths='equal'> */}
            <Form.Input
              fluid
              label='Nama'
              onChange={e=>setName(e.target.value)}
              value={name}
            />
            <Form.Input
              fluid
              label='Jawatan Organisasi'
              onChange={e=>setPosition1(e.target.value)}
              value={position1}
            />
            <Form.Input
              fluid
              label='Jawatan Halal Dalaman'
              onChange={e=>setPosition2(e.target.value)}
              value={position2}
            />
            <Form.Input
              fluid
              label='Jabatan'
              onChange={e=>setDepartment(e.target.value)}
              value={department}
            />
            <Form.Input
              fluid
              label='Tarikh Lantikan'
              onChange={e=>setSdate(e.target.value)}
              type="date"
              value={sdate}
            />
            <Form.Input
              fluid
              label='Tarikh Tamat Lantikan'
              onChange={e=>setEdate(e.target.value)}
              type="date"
              value={edate}
            />
            <Form.Input
              fluid
              label='Emel'
              onChange={e=>setEmail(e.target.value)}
              value={email}
            />
            <Form.Input
              fluid
              label='No Telefon'
              onChange={e=>setTelno(e.target.value)}
              value={telno}
            />
         
            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => {setModalOpen(false); resetForm();}}>
                <Icon name='remove' /> No
              </Button>
              <Button color='green' onClick={() => {setModalOpen(false); submitForm();}}>
                <Icon name='checkmark' /> Submit
              </Button>
            </Modal.Actions>
          </Modal>
  </React.Fragment>
}

export default ClientIHC