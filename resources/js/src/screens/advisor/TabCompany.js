import React, { useContext } from 'react'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {
  Input,
  Form,
  Header,
  Icon,
  Transition,Divider,
  Button,Modal,Dropdown,Table,Pagination
} from 'semantic-ui-react';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import {deleteAdvisorDetails, postAdvisorDetails, AdvisorContext, updateAdvisorDetails } from './advisor';

const TabCompany = ({data,id}) => {

  const {cmpny} = useContext(AdvisorContext);
  let { path, url } = useRouteMatch();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = React.useState(false);
  /////////////////////////////////////////////////////////variable declaration//////////////////////////////////////////////////////////////
  const [productdetailsid, setproductdetailsid] = React.useState(0);
  const [prsp_fk_supplier_id, setSupplierName] = React.useState("");
  const [ad_fk_company_id, setCompany] = React.useState("");

 /////////////////////////////////////////////////////////variable declaration//////////////////////////////////////////////////////////////

  const resetForm=()=>{
    setSupplierName("");
    setCompany("");
    setproductdetailsid(0);
  }

  const editForm=({id,prsp_fk_supplier_id,ad_fk_company_id})=>{
    setproductdetailsid(id);
    setSupplierName(prsp_fk_supplier_id);
    setCompany(ad_fk_company_id);
    setModalUpdateOpen(true);
  }

  const deleteAdvisorDetailsList=(pk)=>{
    deleteAdvisorDetails(pk).then(x=>{ 
      onDataChange({id:pk},"delete");
    }).catch(e=>console.log(e))
    resetForm();
  }

  const submitForm=()=>{
    
    const data={id:productdetailsid,ad_fk_user_id:id,ad_fk_company_id};
    postAdvisorDetails(data).then(x=>{
        setSupplierName([x]);
        setCompany([x]);
      }).catch(e=>console.log(e))
      resetForm();
  }

  const updateForm=()=>{
    
    const data={id:productdetailsid,ad_fk_user_id:id,ad_fk_company_id};
    updateAdvisorDetails(data).then(x=>{
        setSupplierName([x]);
        setCompany([x]);
      }).catch(e=>console.log(e))
      resetForm();
  }

       const tableItem = data.map((x, i) =>
       <Table.Row key={i}>
       <Table.Cell>{i+1}</Table.Cell>
       <Table.Cell>
       <Dropdown icon="ellipsis vertical"  className='icon' 
       pointing='top left'>
       <Dropdown.Menu className='right'>
         <Dropdown.Item  onClick={()=>editForm(x)} color='blue' icon='edit outline' text='Kemaskini' />
         <Dropdown.Item  onClick={()=>deleteAdvisorDetailsList(x.id)} icon='trash' text='Padam' />
       </Dropdown.Menu>
     </Dropdown>
      </Table.Cell>
        <Table.Cell>{x.cmpnyName}</Table.Cell>
      </Table.Row>
     );
           
       return <React.Fragment>
           <Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Tambah</Button>
           <Divider/>
           <div className="subcrTabPane">

        <Table>
         <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Nama Syarikat</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
     
         <Table.Body>
           {tableItem}
         </Table.Body>
       </Table>
     {/*///////////////////////////////////////////////////////////////////// Modal add ////////////////////////////////////////////////////////////////////////////////////// */}
       <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalOpen(false),resetModal()}} open={modalOpen}>
        <Header icon='archive' content='Tambah Maklumat' />
        <Modal.Content>
            <Form>
                <Form.Dropdown
                    placeholder='Senarai Syarikat'
                    label='Senarai Syarikat'
                    fluid
                    search
                    selection
                    value={ad_fk_company_id}
                    onChange={(e,data)=>setCompany(data.value)}
                    options={cmpny}
                /> 
            </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => {setModalOpen(false); resetForm();}}>
            <Icon name='remove' /> Batal
          </Button>
          <Button color='green' onClick={() => {setModalOpen(false); submitForm(),location.reload();}}>
            <Icon name='checkmark' /> Simpan
          </Button>
        </Modal.Actions>
      </Modal>  
      {/*///////////////////////////////////////////////////////////////////// Modal add ////////////////////////////////////////////////////////////////////////////////////// */}
      
      {/*///////////////////////////////////////////////////////////////////// Modal update ////////////////////////////////////////////////////////////////////////////////////// */}
      <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalUpdateOpen(false),resetModal()}} open={modalUpdateOpen}>
        <Header icon='archive' content='Kemaskini Maklumat' />
        <Modal.Content>
            <Form>
                <Form.Dropdown
                    placeholder='Senarai Syarikat'
                    label='Senarai Syarikat'
                    fluid
                    search
                    selection
                    value={ad_fk_company_id}
                    onChange={(e,data)=>setCompany(data.value)}
                    options={cmpny}
                />    
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
      {/*///////////////////////////////////////////////////////////////////// Modal update ////////////////////////////////////////////////////////////////////////////////////// */}     
       </div>
       </React.Fragment>
       
//////////////////////////////////////////////////////////////end modal form///////////////////////////////////////////////////////////////////
  
}

export default TabCompany