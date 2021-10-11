import React,{useContext } from 'react'
import {
  Input,
  Form,
  Header,
  Icon,
  Transition,
  Divider,
  Button,Modal,Dropdown,Table,Pagination,Message
} from 'semantic-ui-react';

import SweetAlert from 'sweetalert2-react';
import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import {deleteSupplier, HalalFileContext, getLabAnalysis, postLabAnalysis} from './HalalFile';

const TabLabAnalysis = () => {
  

  const {labAnalysis} = useContext(HalalFileContext);
  let { path, url } = useRouteMatch();
  const [open, setOpen] = React.useState(false)
  const [userlist, setuserlist] = React.useState(labAnalysis);
  const [userFilter, setuserFilter] = React.useState(labAnalysis);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = React.useState(false);
  const [cbid, setcbid] = React.useState(0);
  const [la_document_name, setdocumentname] = React.useState("");
  const [activePage, setActivePage] = React.useState(1);
  const [itemperpage, setitemperpage] = React.useState(10);


  React.useEffect(() => {

    const bootstrapAsync = async () => {
      setuserlist(labAnalysis);
      setuserFilter(labAnalysis)
    };

    bootstrapAsync();

  }, [labAnalysis]);

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
    <Dropdown.Item  onClick={()=>editForm(x)} color='blue' icon='edit outline' text='Edit details' />
    <Dropdown.Item  onClick={()=>deleteCB(x.id)} icon='trash' text='Remove user' />
  </Dropdown.Menu>
</Dropdown>
  </Table.Cell>
    <Table.Cell>{x.la_document_name}</Table.Cell>
    <Table.Cell>{x.la_document_name}</Table.Cell>   
  </Table.Row>
);

  return  <Table>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>No</Table.HeaderCell>
      <Table.HeaderCell></Table.HeaderCell>
      <Table.HeaderCell>Nama</Table.HeaderCell>
      <Table.HeaderCell>Fail</Table.HeaderCell>
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
    setdocumentname("");
    setcbstatus("");
    setcbmemo("");
    setcbdate("");
  }

  const editForm=({id, la_document_name})=>{
    setcbid(id);
    setdocumentname(la_document_name);
    setModalUpdateOpen(true);
  }

  const submitForm=()=>{
    
    const data={la_document_name};
    postLabAnalysis(data).then(x=>{
      setdocumentname([x]);
      }).catch(e=>console.log(e))
      resetForm();
  }

  const updateForm=()=>{
    
    const data={id:cbid,la_document_name};
    updateCB(data).then(x=>{
      setdocumentname([x]);
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
                  const filterData = userlist.filter(({ la_document_name }) =>
                  la_document_name.toLowerCase().indexOf(filter) > -1 || username.toLowerCase().indexOf(filter) > -1
                  || cmpnyName.toLowerCase().indexOf(filter) > -1|| rolename.toLowerCase().indexOf(filter) > -1);
                  setuserFilter(filterData)
                }}
                placeholder='Search users...'
              />
        </Header>

        <Header as='h3' floated='left'>Analisis Makmal</Header>   
          <Button onClick={()=>setModalOpen(true)} fluid color='teal' > <Icon name='plus' />Tambah</Button>
          <Divider/>
      
      <div style={{height:'70vh', overflowY:'auto'}}>
      {/* {(userFilter && userFilter.length)&&<RenderProfile data={userFilter}/>} */}
      {userFilter < 1 ? 
        <Message info>    
          <Message.Header>Tiada Maklumat</Message.Header>
          <p>Tiada Maklumat Dalam Pangkalan Data</p>
        </Message> :
        (userFilter && userFilter.length)&&<RenderProduct data={userFilter}/>}

      {/*///////////////////////////////////////////////// modal add/////////////////////////////////////////////////////////////////// */}
          <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpen(false),resetForm()}}
              open={modalOpen}>
          
            <Header icon='archive' content='Analisis Makmal' />
            <Modal.Content>
            <Form>
            
            <Form.Group widths='equal'>
            <Form.Input
              fluid
              label='Dokumen'
              onChange={e=>setdocumentname(e.target.value)}
              value={la_document_name}
              type='file'
            />
          </Form.Group>
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
          {/*///////////////////////////////////////////////// modal add/////////////////////////////////////////////////////////////////// */}

        </div>
      </div>
    </Transition>
  )
}

export default TabLabAnalysis