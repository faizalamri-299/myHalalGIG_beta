import React,{ useContext, useState, Component } from 'react'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {
  Input,
  Form,
  Header,
  Icon,
  Checkbox,Divider,
  Button,Modal,Dropdown,Table,Message,Popup
} from 'semantic-ui-react';

import * as moment from 'moment';
import {Switch,Route,Link,useRouteMatch,useParams} from "react-router-dom";
import swal from 'sweetalert';
import {postMaterial,deleteRawMaterial, updateRawMaterial,getHalalCertDD, getExp, SupplierContext,postSupportDoc,deleteSupportDoc, downloadSuppDoc} from './Supplier';


const TabMaterial = ({data,id,datadd}) => {

  const {supportdoc} = useContext(SupplierContext);
  let { path, url } = useRouteMatch();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [showForm, setFormOpen] = React.useState(true);
  const [showForm1, setForm1Open] = React.useState(true);
  const [modalUpdateOpen, setModalUpdateOpen] = React.useState(false);
  const [modaldocOpen, setModaldocOpen] = React.useState(false);
  /////////////////////////////////////////////////////////variable declaration//////////////////////////////////////////////////////////////
  const [rawmaterialid, setrawmaterialid] = React.useState(0);
  const [sprm_name, setName] = React.useState("");
  const [sprm_scientific_name, setScientificName] = React.useState("");
  const [sprm_material_source, setSource] = React.useState("");
  const [rmsd_name, setDoc] = React.useState(null);
  const [rawmaterial, setRawMaterial] = React.useState([]);
  const [sprm_fk_id_halal_cert, setHalalCert] = React.useState("");
  const [sprm_fk_id_halal_cert_2, setHalalCert2] = React.useState("");
  const { index } = useParams();


 /////////////////////////////////////////////////////////variable declaration//////////////////////////////////////////////////////////////


  const materialsource = [
    { text: 'Tumbuhan (Plant)', value: 'Tumbuhan' },
    { text: 'Haiwan (Animal)', value: 'Haiwan' },
    { text: 'Kimia (Chemical)', value: 'Kimia' },
    { text: 'Semulajadi (Natural)', value: 'Semulajadi' },
    { text: 'Lain-Lain (Others)', value: 'Lain-Lain' },
  ]

  const ddcert = datadd.map((x, i) =>
    ({
      key: x.id, 
      text: x.spcb_cert_bodies +" - ("+moment(x.spcb_date_cert).format('DD/MM/YYYY')+")",
      value: x.id,
    })
  );

  const resetForm=()=>{
    setName("");
    setScientificName("");
    setSource("");
    setrawmaterialid(0);
  }

  const editForm=({id,sprm_name,sprm_scientific_name,sprm_material_source,sprm_fk_id_halal_cert,sprm_fk_id_halal_cert_2})=>{
    setrawmaterialid(id);
    setName(sprm_name);
    setScientificName(sprm_scientific_name);
    setSource(sprm_material_source);
    setHalalCert(sprm_fk_id_halal_cert);
    setHalalCert2(sprm_fk_id_halal_cert_2);
    setModalUpdateOpen(true);
  }

  const submitForm=()=>{
    
    const data={id:rawmaterialid,sprm_fk_supplier_id:id,sprm_name,sprm_scientific_name,sprm_material_source,sprm_fk_id_halal_cert,sprm_fk_id_halal_cert_2};
    postMaterial(data).then(x=>{
        setName([x]);
        setScientificName([x]);
        setSource([x]);
        setHalalCert([x]);
        setHalalCert2([x]);
      }).catch(e=>console.log(e))
      resetForm();
  }

  const updateForm=()=>{ 
    const data={id:rawmaterialid,sprm_fk_supplier_id:id,sprm_name,sprm_scientific_name,sprm_material_source,sprm_fk_id_halal_cert,sprm_fk_id_halal_cert_2};
    updateRawMaterial(data).then(x=>{
        setName([x]);
        setScientificName([x]);
        setSource([x]);
        setHalalCert([x]);
        setHalalCert2([x]);
      }).catch(e=>console.log(e))
      resetForm();
  }

  const deleteRawMaterialList=(pk)=>{
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
            deleteRawMaterial(pk)
            //location.reload(); //if click button ok, apa dia buat
          } else {
            //location.reload();
          }
        })
      } else {
        swal("Item tidak dipadam :)");
      }
    })
    resetForm();
  }

  const deleteSupportDocument=(pk,id)=>{
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
            deleteSupportDoc(pk,id)
            //location.reload(); //if click button ok, apa dia buat
          } else {
            //location.reload();
          }
        })
      } else {
        swal("Item tidak dipadam :)");
      }
    })
    resetForm();
  }

  const downloadfile=(pk,id)=>{
    downloadSuppDoc(pk,id).then(console.log(pk,id));
  }

  const addSupportDocForm=({id,rmsd_name})=>{
    setrawmaterialid(id);
    setName(rmsd_name);
    setModaldocOpen(true);
  }

  const uploadFile=()=>{
    const formData = new FormData(); 
 
    // Update the formData object 
    formData.append("sprm_fk_supplier_id",rawmaterialid);
    formData.append("rmsd_name",rmsd_name);
    // Details of the uploaded file 
    
    postSupportDoc(formData).then(x=>{
      console.log(x)
    }).catch(e=>console.log(e))
  }

  const RenderSupportDoc = props => {
    console.log(props)

    const data = props.data;

    const listItems = data.map((x,i) =>
    <>
      {rawmaterialid == x.fk_rmsd_raw_mat_id ? 
      <>
        <Table.Row key={i}>
          <Table.Cell>{x.rmsd_name}</Table.Cell>
          <Table.Cell>
          <Button.Group basic floated='right' size='small'>
            <Popup content='Muat Turun Fail'position='top center' trigger={<Button onClick={()=>downloadfile(x.rmsd_name,x.fk_rmsd_raw_mat_id)} target="_blank"  icon='download' />} />
            <Popup content='Padam Fail' position='top center'  trigger={<Button onClick={()=>deleteSupportDocument(x.rmsd_name,x.fk_rmsd_raw_mat_id)} icon='trash alternate' />} /> 
          </Button.Group>
          </Table.Cell>
        </Table.Row>
      </> : null}
      
    </>
    );
    return <Table basic='very'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {listItems}
              </Table.Body>
            </Table>
  }


  const tableItem = data.map((x, i) =>
    <Table.Row key={i}>
      <Table.Cell>{i+1}</Table.Cell>
      <Table.Cell>
      <Dropdown icon="ellipsis vertical"  className='icon'pointing='top left'>
        <Dropdown.Menu className='right'>
          <Dropdown.Item  onClick={()=>editForm(x)} color='blue' icon='edit outline' text='Kemaskini Bahan Mentah' />
          <Dropdown.Item  onClick={()=>deleteRawMaterialList(x.id)} icon='trash' text='Padam' />
        </Dropdown.Menu>
      </Dropdown>
      </Table.Cell>
      <Table.Cell>{x.sprm_name}</Table.Cell>
      <Table.Cell>{x.sprm_scientific_name}</Table.Cell>
      <Table.Cell>{x.sprm_material_source}</Table.Cell>
      <Table.Cell>{x.spcb_cert_bodies == null ? "Tiada" : x.spcb_cert_bodies}</Table.Cell>
      <Table.Cell><Button onClick={()=>addSupportDocForm(x)} size='mini' compact basic color="teal">Tambah</Button></Table.Cell>
    </Table.Row>
     );   
    return <React.Fragment>
      <Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Add</Button>
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
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>Nama</Table.HeaderCell>
                <Table.HeaderCell>Nama Saintifik</Table.HeaderCell>
                <Table.HeaderCell>Sumber Bahan</Table.HeaderCell>
                <Table.HeaderCell>Sijil Halal</Table.HeaderCell>
                <Table.HeaderCell>Dokumen Sokongan</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
              {tableItem}
            </Table.Body>
          </Table>
          }
{/*///////////////////////////////////////////////////////////////////// Modal Add ////////////////////////////////////////////////////////////////////////////////////// */}
  <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalOpen(false),resetModal()}} open={modalOpen}>
    <Header icon='archive' content='Bahan Mentah' />
      <Modal.Content>
        <Form>
          <Form.Input
            label='Nama'
            required
            fluid
            value={sprm_name}
            onChange={(e,data)=>setName(data.value)}
          />
          <Form.Input
            fluid
            label='Nama Saintifik'
            onChange={e=>setScientificName(e.target.value)}
            value={sprm_scientific_name}
          />     
          <Form.Dropdown
            placeholder='Sumber Bahan'
            label='Sumber Bahan'
            fluid
            search
            selection
            onChange={(e,data)=>setSource(data.value)}
            value={sprm_material_source}
            options={materialsource}
          />  
          <Form.Dropdown
            placeholder='Sijil Halal'
            label='Sijil Halal'
            fluid
            search
            selection
            onChange={(e,data)=>setHalalCert(data.value)}
            defaultValue={85}
            value={sprm_fk_id_halal_cert}
            options={ddcert}
          />            
          <Checkbox 
            slider 
            label='Mempunyai dua sijil halal?' 
            onChange={() => {setForm1Open(false);}} 
          />

          <Form.Group widths='equal'></Form.Group>

        <div hidden={showForm ? true : false}>
          <Form.Group id='formgroup1'widths='equal'>
            <Form.Input
              label='file'
              type="file"
              onChange={e=>setDoc(e.target.files[0])}
              // value={file}
            />
          </Form.Group>  
        </div>

        <div hidden={showForm1 ? true : false}>
          <Form.Group id='formgroup1'widths='equal'>
            <Form.Dropdown
              placeholder='Sijil Halal'
              label='Sijil Halal'
              fluid
              search
              selection
              onChange={(e,data)=>setHalalCert2(data.value)}
              value={sprm_fk_id_halal_cert_2}
              options={ddcert}
            />
          </Form.Group> 
        </div>
                       
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
{/*///////////////////////////////////////////////////////////////////// Modal Add ////////////////////////////////////////////////////////////////////////////////////// */}

{/*///////////////////////////////////////////////////////////////////// Modal update ////////////////////////////////////////////////////////////////////////////////////// */}
      <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalUpdateOpen(false),resetModal()}} open={modalUpdateOpen}>
        <Header icon='archive' content='Kemaskini Bahan Mentah' />
        <Modal.Content>
        <Form>
            <Form.Input
              label='Nama'
              required
              fluid
              value={sprm_name}
              onChange={(e,data)=>setName(data.value)}
            />
            <Form.Input
              fluid
              label='Nama Saintifik'
              onChange={e=>setScientificName(e.target.value)}
              value={sprm_scientific_name}
            />     
            <Form.Dropdown
              placeholder='Sumber Bahan'
              label='Sumber Bahan'
              fluid
              search
              selection
              onChange={(e,data)=>setSource(data.value)}
              value={sprm_material_source}
              options={materialsource}
            />  
            <Form.Dropdown
              placeholder='Sijil Halal'
              label='Sijil Halal'
              fluid
              search
              selection
              onChange={(e,data)=>setHalalCert(data.value)}
              defaultValue={85}
              value={sprm_fk_id_halal_cert}
              options={ddcert}
            />
            
            <Checkbox 
              slider 
              label='Mempunyai dua sijil halal?' 
              onChange={() => {setForm1Open(false);}} 
            />
            <Form.Group widths='equal'>
            </Form.Group>

          <div hidden={showForm1 ? true : false}>
          <Form.Group id='formgroup1'widths='equal'>
              <Form.Dropdown
                placeholder='Sijil Halal'
                label='Sijil Halal'
                fluid
                search
                selection
                onChange={(e,data)=>setHalalCert2(data.value)}
                value={sprm_fk_id_halal_cert_2}
                options={ddcert}
              />
            </Form.Group> 
          </div>
                       
        </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => {setModalOpen(false); resetForm();}}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' onClick={() => {setModalOpen(false); updateForm();}}>
            <Icon name='checkmark' /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
{/*///////////////////////////////////////////////////////////////////// Modal update ////////////////////////////////////////////////////////////////////////////////////// */}  

{/*///////////////////////////////////////////////////////////////////// Modal Add Supp Doc ////////////////////////////////////////////////////////////////////////////////////// */}
<Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModaldocOpen(false),resetModal()}} open={modaldocOpen}>
    <Header icon='archive' content='Dokumen Sokongan' />
      <Modal.Content>
        <h5>Sila Muatnaik Dokumen Sokongan</h5>
        <Form>
          <Form.Group id='formgroup1'widths='equal'>
          <div hidden>
          <Form.Input
              label='Nama'
              required
              fluid
              value={rawmaterialid}
              onChange={(e,data)=>setrawmaterialid(data.value)}
            />
            </div>
            <Form.Input
              type="file"
              onChange={e=>setDoc(e.target.files[0])}
              // value={file}
            />
            <Button compact basic color='teal' onClick={() => {uploadFile();}}>Upload</Button>   
          </Form.Group>         
        </Form>
    <Divider/>
      {supportdoc== 0 ? 
        <Message info>    
          <Message.Header>Tiada Maklumat</Message.Header>
          <p>Tiada Maklumat Dalam Pangkalan Data</p>
        </Message> :
         <RenderSupportDoc data={supportdoc}/>}
    </Modal.Content>

    <Modal.Actions>
      <Button color='red' onClick={() => {setModaldocOpen(false); resetForm();}}>
        <Icon name='remove' /> Close
      </Button>
    </Modal.Actions>
  </Modal>   
{/*///////////////////////////////////////////////////////////////////// Modal Add Supp Doc ////////////////////////////////////////////////////////////////////////////////////// */}
       </div>
</React.Fragment>
       
//////////////////////////////////////////////////////////////end modal form///////////////////////////////////////////////////////////////////
  
}

export default TabMaterial