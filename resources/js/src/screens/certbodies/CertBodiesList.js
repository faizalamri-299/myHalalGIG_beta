import React,{useContext } from 'react'
import {
  Input,
  Form,
  Header,
  Icon,
  Transition,
  Divider,
  Button,Modal,Dropdown,Table,Pagination
} from 'semantic-ui-react';

import SweetAlert from 'sweetalert2-react';
import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import { getCertBodies,CertBodiesContext, postCB, deleteCB, updateCB} from './CertBodies';

const CertBodiesList = () => {
  

  const certbodies = useContext(CertBodiesContext);
  let { path, url } = useRouteMatch();
  const [open, setOpen] = React.useState(false)
  const [userlist, setuserlist] = React.useState(certbodies);
  const [userFilter, setuserFilter] = React.useState(certbodies);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = React.useState(false);
  const [cbid, setcbid] = React.useState(0);
  const [cb_name, setcbname] = React.useState("");
  const [cb_status, setcbstatus] = React.useState("");
  const [cb_memo, setcbmemo] = React.useState("");
  const [cb_date_expired, setcbdate] = React.useState("");

  const [activePage, setActivePage] = React.useState(1);
  const [itemperpage, setitemperpage] = React.useState(10);

  const status = [
    {text: 'Aktif',  value: 0},
    {text: 'Tidak Aktif',  value: 1},
  ]
  React.useEffect(() => {

    const bootstrapAsync = async () => {
      setuserlist(certbodies);
      setuserFilter(certbodies)
    };

    bootstrapAsync();

  }, [certbodies]);

  const RenderProfile = props => {
    const data = props.data;
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
  <Dropdown icon="ellipsis vertical"  className='icon' 
  pointing='top left'>
  <Dropdown.Menu className='right'>
    <Dropdown.Item  onClick={()=>editForm(x)} color='blue' icon='edit outline' text='Kemaskini' />

    <Dropdown.Item  onClick={()=>deleteCB(x.id)} icon='trash' text='Padam' />
  </Dropdown.Menu>
</Dropdown>
  </Table.Cell>
    <Table.Cell>{x.cb_name}</Table.Cell>  
    <Table.Cell>{x.cb_status == 0 ? "Active" : "Not Active"}</Table.Cell>
    <Table.Cell>{x.cb_memo == null ? "Still Active": x.cb_memo}</Table.Cell>
    <Table.Cell>{x.cb_date_expired == null ? "Active": x.cb_date_expired}</Table.Cell>
  </Table.Row>
);

  return  <Table>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>No</Table.HeaderCell>
      <Table.HeaderCell></Table.HeaderCell>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell>Memo</Table.HeaderCell>
      <Table.HeaderCell>Date Expired</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  

  <Table.Body>
    {tableItem}
  </Table.Body>
  <Table.Footer>
      <Table.Row>
        <Table.HeaderCell textAlign="center" colSpan='7'>
          <Pagination siblingRange={2} activePage={activePage}   totalPages={pageItem.length} onPageChange={(e,d)=>setActivePage(d.activePage)}/>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
</Table>
  }

  
  const resetForm=()=>{
    setcbname("");
    setcbstatus("");
    setcbmemo("");
    setcbdate("");
  }

  const editForm=({id, cb_name,cb_status,cb_memo,cb_date_expired})=>{
    setcbid(id);
    setcbname(cb_name);
    setcbstatus(cb_status);
    setcbmemo(cb_memo);
    setcbdate(cb_date_expired);
    setModalUpdateOpen(true);
  }

  const submitForm=()=>{
    
    const data={cb_name};
    postCB(data).then(x=>{
      setcbname([x]);
      }).catch(e=>console.log(e))
      resetForm();
  }

  const updateForm=()=>{
    
    const data={id:cbid,cb_name,cb_status,cb_memo,cb_date_expired};
    updateCB(data).then(x=>{
      setcbname([x]);
      setcbstatus([x]);
      setcbmemo([x]);
      setcbdate([x]);
      }).catch(e=>console.log(e))
      resetForm();
  }

  return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer">
        <Header as='h6' fluid floated='right'>
           <Input
                icon={{ name: 'search', link: true }}
                onChange={e=>{
                  let filter=e.target.value.toLowerCase()
                  const filterData = userlist.filter(({ cb_name }) =>
                  cb_name.toLowerCase().indexOf(filter) > -1 || username.toLowerCase().indexOf(filter) > -1
                  || cmpnyName.toLowerCase().indexOf(filter) > -1|| rolename.toLowerCase().indexOf(filter) > -1);
                  setuserFilter(filterData)
                }}
                placeholder='Search users...'
              />
        </Header>

        <Header as='h3' floated='left'>Certification Bodies</Header>   
          <Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Tambah</Button>
          <Divider/>
      
      <div style={{height:'68vh', overflowY:'auto'}}>
      {(userFilter && userFilter.length)&&<RenderProfile data={userFilter}/>}

      {/*///////////////////////////////////////////////// modal add/////////////////////////////////////////////////////////////////// */}
          <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpen(false),resetForm()}}
              open={modalOpen}>
          
            <Header icon='archive' content='Certification Bodies' />
            <Modal.Content>
            <Form>
            
            <Form.Group widths='equal'>
            <Form.Input
              fluid
              label='Certification Bodies'
              onChange={e=>setcbname(e.target.value)}
              value={cb_name}
            />
          </Form.Group>
            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => {setModalOpen(false); resetForm();}}>
                <Icon name='remove' /> Batal
              </Button>
              <Button color='green' onClick={() => {setModalOpen(false); submitForm();}}>
                <Icon name='checkmark' /> Simpan
              </Button>
            </Modal.Actions>
          </Modal> 
          {/*///////////////////////////////////////////////// modal add/////////////////////////////////////////////////////////////////// */}

          {/*///////////////////////////////////////////////// modal update/////////////////////////////////////////////////////////////////// */}
          <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalUpdateOpen(false),resetForm()}} open={modalUpdateOpen}>
            <Header icon='archive' content='Certification Bodies' />
            <Modal.Content>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='Certification Bodies'
                  onChange={e=>setcbname(e.target.value)}
                  value={cb_name}
                />
                <Form.Dropdown
                  placeholder='Status'
                  label='Status'
                  fluid
                  search
                  selection
                  defaultValue={0}
                  onChange={(e,data)=>setcbstatus(data.value)}
                  value={cb_status}
                  options={status}
                />
              </Form.Group> 
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='Memo'
                  onChange={e=>setcbmemo(e.target.value)}
                  value={cb_memo}
                />
                <Form.Input
                  fluid
                  type="date"
                  label='Tarikh Tamat Sijil'
                  onChange={e=>setcbdate(e.target.value)}
                  value={cb_date_expired}
                />  
              </Form.Group> 
            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => {setModalUpdateOpen(false); resetForm();}}>
                <Icon name='remove' /> No
              </Button>
              <Button color='green' onClick={() => {setModalUpdateOpen(false); updateForm();}}>
                <Icon name='checkmark' /> Update
              </Button>
            </Modal.Actions>
          </Modal> 
          {/*///////////////////////////////////////////////// modal update/////////////////////////////////////////////////////////////////// */}
        </div>
      </div>
    </Transition>
  )
}

export default CertBodiesList