import React, { useContext } from 'react'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {
  Input,
  Form,
  Header,
  Icon,
  Message,Divider,
  Button,Modal,Dropdown,Table,Pagination
} from 'semantic-ui-react';
import * as moment from 'moment';
import {Switch,Route,Link,useRouteMatch} from "react-router-dom";
import swal from 'sweetalert';

import {postSupplierCert, SupplierContext, deleteSupplierCert, updateSupplierCert} from './Supplier';
import { isWindows } from 'react-device-detect';

const TabMaterial = ({data,id}) => {
  const {certbodies} = useContext(SupplierContext);
  let { path, url } = useRouteMatch();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = React.useState(false);
  const [CBList, setListCB] = React.useState(data);
  const [CBData, setCurrentCB] = React.useState(data);
  /////////////////////////////////////////////////////////variable declaration//////////////////////////////////////////////////////////////
  const [suppliercertid, setsuppliercertid] = React.useState(0);
  const [spcb_cert_bodies, setCertBodies] = React.useState("");
  const [spcb_date_cert, setCertDate] = React.useState("");
 /////////////////////////////////////////////////////////variable declaration//////////////////////////////////////////////////////////////

  const resetForm=()=>{
    setCertBodies("");
    setCertDate("");
    setSource("");
    setsuppliercertid(0);
  }

  const editCertBodies=({id,spcb_cert_bodies,spcb_date_cert})=>{
    setsuppliercertid(id);
    setCertBodies(spcb_cert_bodies);
    setCertDate(spcb_date_cert);
    setModalUpdateOpen(true);
  }

  const deleteCertBodies=(pk)=>{    
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
            deleteSupplierCert(pk)
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



  const submitForm=()=>{
    
    const data={id:suppliercertid,spcb_fk_supplier_id:id,spcb_cert_bodies,spcb_date_cert};
    postSupplierCert(data).then(x=>{
      if(CBList){

       let currentCB = JSON.parse(JSON.stringify(CBList));
         let index=currentCB.findIndex(obj => {return obj.id === x.id});
         if(index<0){
          currentCB.push(x);
         }
         else{currentCB[index]=x;
         }
         setListCB(currentCB);
         setCurrentCB(currentCB);
       }
       else{
        setListCB([x]);
        setCurrentCB([x]);
       } 
    }).catch(e=>console.log(e))
    resetForm();

    // (data).then(x=>{
    //     setCertBodies([x]);
    //     setCertDate([x]);
    //   }).catch(e=>console.log(e))
    //   resetForm();
  }



  const UpdateForm=()=>{
    
    const data={id:suppliercertid,spcb_fk_supplier_id:id,spcb_cert_bodies,spcb_date_cert};
    updateSupplierCert(data).then(x=>{
        setCertBodies([x]);
        setCertDate([x]);
      }).catch(e=>console.log(e))
      resetForm();
  }

  React.useEffect(() => {

    const bootstrapAsync = async () => {
      setListCB(data);
      setCurrentCB(data)
    };

    bootstrapAsync();

  }, [data]);

  const tableItem = CBData.map((x, i) =>
    <Table.Row key={i}>
      <Table.Cell>{i+1}</Table.Cell>
      <Table.Cell>
        <Dropdown icon="ellipsis vertical"  className='icon' pointing='top left'>
          <Dropdown.Menu className='right'>
            <Dropdown.Item  onClick={()=>editCertBodies(x)} color='blue' icon='edit outline' text='Kemaskini Sijil' />
            <Dropdown.Item  onClick={()=>deleteCertBodies(x.id)} icon='trash' text='Padam Sijil' />
          </Dropdown.Menu>
        </Dropdown>
      </Table.Cell>
      <Table.Cell>{x.spcb_cert_bodies}</Table.Cell>
      <Table.Cell>{moment(x.spcb_date_cert).format('DD/MM/YYYY')}</Table.Cell>
    </Table.Row>
     );
           
       return <React.Fragment>
           <Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Tambah</Button>
           <Divider/>
           <div className="subcrTabPane">
           {tableItem == 0 ? 
            <Message info>    
              <Message.Header>Tiada Maklumat</Message.Header>
              <p>Anda tidak mempunyai sebarang maklumat Sijil Halal</p>
            </Message> :
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>No</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Badan Pensijilan</Table.HeaderCell>
                  <Table.HeaderCell>Tarikh Tamat Sijil</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {tableItem}
              </Table.Body>
            </Table>
          }
     {/*///////////////////////////////////////////////////////////////////// Modal Add ////////////////////////////////////////////////////////////////////////////////////// */}
       <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalOpen(false),resetModal()}} open={modalOpen}>
        <Header icon='archive' content='Tambah Sijil Halal' />
        <Modal.Content>
        <Form>
          <Form.Dropdown
            placeholder='Badan Pensijilan'
            label='Badan Pensijilan'
            fluid
            search
            selection  
            onChange={(e,data)=>setCertBodies(data.value)}
            value={spcb_cert_bodies}
            options={certbodies}
          /> 
          <Form.Input
            fluid
            type="date"
            label='Tarikh Tamat Sijil'
            onChange={e=>setCertDate(e.target.value)}
            value={spcb_date_cert}
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
       {/*///////////////////////////////////////////////////////////////////// Modal Add ////////////////////////////////////////////////////////////////////////////////////// */}

       {/*///////////////////////////////////////////////////////////////////// Modal update ////////////////////////////////////////////////////////////////////////////////////// */}
       <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalUpdateOpen(false),resetModal()}} open={modalUpdateOpen}>
        <Header icon='archive' content='Kemaskini Sijil Halal' />
        <Modal.Content>
        <Form>
          <Form.Dropdown
            placeholder='Badan Pensijilan'
            label='Badan Pensijilan'
            fluid
            search
            selection
            onChange={(e,data)=>setCertBodies(data.value)}
            value={spcb_cert_bodies}
            options={certbodies}
          /> 
          <Form.Input
            fluid
            type="date"
            label='Tarikh Tamat Sijil'
            onChange={e=>setCertDate(e.target.value)}
            value={spcb_date_cert}
          />
            </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => {setModalUpdateOpen(false); resetForm();}}>
            <Icon name='remove' /> Batal
          </Button>
          <Button color='green' onClick={() => {setModalUpdateOpen(false); UpdateForm();location.reload();}}>
            <Icon name='checkmark' /> Simpan
          </Button>
        </Modal.Actions>
      </Modal> 
       {/*///////////////////////////////////////////////////////////////////// Modal update ////////////////////////////////////////////////////////////////////////////////////// */}      
       </div>
       </React.Fragment>
       
//////////////////////////////////////////////////////////////end modal form///////////////////////////////////////////////////////////////////
  
}

export default TabMaterial