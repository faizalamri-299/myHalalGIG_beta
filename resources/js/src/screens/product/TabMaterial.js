import React, { useContext } from 'react'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {
  Input,
  Form,
  Header,
  Icon,
  Message,Divider,
  Button,Modal,Popup,Table,Pagination
} from 'semantic-ui-react';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import {deleteProductDetails, postProductDetails, ProductContext, updateProductDetails } from './Product';

const TabMaterial = ({data,id}) => {

  const {product,supplier,rawmatDB} = useContext(ProductContext);
  let { path, url } = useRouteMatch();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = React.useState(false);
  /////////////////////////////////////////////////////////variable declaration//////////////////////////////////////////////////////////////
  const [productdetailsid, setproductdetailsid] = React.useState(0);
  const [prsp_fk_supplier_id, setSupplierName] = React.useState("");
  const [supplierwithrawmat, setRawMaterial] = React.useState("");

 /////////////////////////////////////////////////////////variable declaration//////////////////////////////////////////////////////////////

  const resetForm=()=>{
    setSupplierName("");
    setRawMaterial("");
    setproductdetailsid(0);
  }

  const editForm=({id,prsp_fk_supplier_id,supplierwithrawmat})=>{
    setproductdetailsid(id);
    setSupplierName(prsp_fk_supplier_id);
    setRawMaterial(supplierwithrawmat);
    setModalUpdateOpen(true);
  }

  const deleteProductDetailsList=(pk)=>{
    swal({
      title: "Adakah Anda Pasti?",
      text: "Sekiranya telah dipadam, item ini tidak boleh dikembalikan semula!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Item telah dipadam!", {
          icon: "success",
        }).then((result) => {
          console.log(result);
          if(result) {
            deleteProductDetails(pk)
            location.reload(); //if click button ok, apa dia buat
          } else {
            location.reload();
          }
        })
      } else {
        swal("Item tidak dipadam :)");
      }
    })
    resetForm();
  }

  // const deleteProductDetailsList=(pk)=>{
  //   deleteProductDetails(pk)
  //   resetForm();
  // }

  const submitForm=()=>{
    
    const data={id:productdetailsid,prsp_fk_product_id:id,prsp_fk_supplier_id,supplierwithrawmat};
    postProductDetails(data).then(x=>{
        setSupplierName([x]);
        setRawMaterial([x]);
        location.reload()
      }).catch(e=>console.log(e))
      resetForm();
  }

  const updateForm=()=>{
    
    const data={id:productdetailsid,prsp_fk_product_id:id,prsp_fk_supplier_id,supplierwithrawmat};
    updateProductDetails(data).then(x=>{
        setSupplierName([x]);
        setRawMaterial([x]);
        location.reload()
      }).catch(e=>console.log(e))
      resetForm();
  }

       const tableItem = data.map((x, i) =>
       <Table.Row key={i}>
       <Table.Cell>{i+1}</Table.Cell>
        <Table.Cell>{x.sp_name}</Table.Cell>
        <Table.Cell>{x.sp_address}</Table.Cell>
        <Table.Cell>{x.sprm_name}</Table.Cell>
        <Table.Cell>{x.sprm_scientific_name}</Table.Cell>
        <Table.Cell>{x.sprm_material_source}</Table.Cell>
        <Table.Cell><Popup content='Padam item?' trigger={<Icon onClick={()=>deleteProductDetailsList(x.id)} link name='trash alternate outline' />} position='top center' /></Table.Cell>
      </Table.Row>
     );
           
       return <React.Fragment>
           <Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Tambah</Button>
           <Divider/>
           <div className="subcrTabPane">
           {tableItem == 0 ? 
        <Message info>    
          <Message.Header>Tiada Maklumat</Message.Header>
          <p>Anda tidak mempunyai sebarang maklumat bahan mentah</p>
        </Message> :
        <Table>
         <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Nama Pembekal</Table.HeaderCell>
            <Table.HeaderCell>Alamat Pembekal</Table.HeaderCell>
            <Table.HeaderCell>Nama Bahan Mentah</Table.HeaderCell>
            <Table.HeaderCell>Nama Saintifik</Table.HeaderCell>
            <Table.HeaderCell>Sumber Bahan</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
     
         <Table.Body>
           {tableItem}
         </Table.Body>
       </Table>}
     {/*///////////////////////////////////////////////////////////////////// Modal add ////////////////////////////////////////////////////////////////////////////////////// */}
       <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalOpen(false),resetModal()}} open={modalOpen}>
        <Header icon='archive' content='Tambah Maklumat' />
        <Modal.Content>
            <Form>
                <Form.Dropdown
                    placeholder='Bahan Mentah'
                    label='Bahan Mentah'
                    fluid
                    search
                    selection
                    value={supplierwithrawmat}
                    onChange={(e,data)=>setRawMaterial(data.value)}
                    options={rawmatDB}
                />                 
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
      {/*///////////////////////////////////////////////////////////////////// Modal add ////////////////////////////////////////////////////////////////////////////////////// */}
      
      {/*///////////////////////////////////////////////////////////////////// Modal update ////////////////////////////////////////////////////////////////////////////////////// */}
      <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalUpdateOpen(false),resetModal()}} open={modalUpdateOpen}>
        <Header icon='archive' content='Kemaskini Maklumat' />
        <Modal.Content>
            <Form>
                <Form.Dropdown
                    placeholder='Bahan Mentah'
                    label='Bahan Mentah'
                    fluid
                    search
                    selection
                    value={supplierwithrawmat}
                    onChange={(e,data)=>setRawMaterial(data.value)}
                    options={rawmatDB}
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

export default TabMaterial