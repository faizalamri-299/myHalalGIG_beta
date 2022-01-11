import React,{useContext } from 'react'
import {
  Input, Menu, Segment,
  Checkbox,
  Popup,
  Header,
  Form,
  Table,
  Transition,
  Icon,
  Button,
  Divider
} from 'semantic-ui-react';

import * as moment from 'moment';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import {UploadHalalContext,
        postHALALPengeluaranProduk,
        deleteHALALPengeluaranProduk,
        downloadHALALPengeluaranProduk} from './UploadHalal'; //tukar ni


import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;



const TabPengeluaranProduk = () => { //tukar ni

  
  const {HALALPengeluaranProduk} = useContext(UploadHalalContext); //tukar ni
  let { path, url } = useRouteMatch();
  const [hpp_filename, setFilename] = React.useState(null);
  const [hpp_date, setdate] = React.useState(null);
  const [hpp_refno, setrefno] = React.useState(null);

  const uploadFileChecklist=()=>{
    const formData = new FormData(); 
    formData.append("HALALPengeluaranProduk",hpp_filename); //tukar ni
    formData.append("hpp_date",hpp_date);                  //tukar ni
    formData.append("hpp_refno",hpp_refno);                //tukar ni
    // Details of the uploaded file   
    postHALALPengeluaranProduk(formData).then(x=>{
      console.log(x)
    }).catch(e=>console.log(e))
  }

  const downloadfile=(pk)=>{
    downloadHALALPengeluaranProduk(pk).then(console.log(pk));
  }

  const deleteChecklist=(pk)=>{
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
            deleteHALALPengeluaranProduk(pk)
            location.reload(); //if click button ok, apa dia buat
          } else {
            location.reload();
          }
        })
      } else {
        swal("Item tidak dipadam :)");
      }
    })
  }

  

  const RenderHASRawMat = props => {
    console.log(props)
    const data = props.data;

    const listItems = data.map((x) =>
    <Table.Row >
    <Table.Cell>{x.hpp_filename}</Table.Cell>
    <Table.Cell>{x.hpp_refno}</Table.Cell>
    <Table.Cell>{moment(x.hpp_date).format('DD/MM/YYYY hh:mm:ss')}</Table.Cell>
    <Table.Cell>
    <Button.Group basic floated='right' size='small'>
    <Popup content='Muat Turun Fail'position='top center' trigger={<Button onClick={()=>downloadfile(x.id)} target="_blank"  icon='download' />} />
    <Popup content='Padam Fail' position='top center'  trigger={<Button onClick={()=>deleteChecklist(x.id)} icon='trash alternate' />} />
    </Button.Group>
    </Table.Cell>
   </Table.Row>
    );
    return <Table>
      <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Nama Fail</Table.HeaderCell>
        <Table.HeaderCell>No Rujukan</Table.HeaderCell>
        <Table.HeaderCell>Tarikh</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>

      <Table.Body>
        {listItems}
      </Table.Body>
    </Table>
  }

  return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer">
        <Header as='h3'>Rekod Pengeluaran Produk</Header> 
        <Form.Group style={{display:'flex'}}>
            <Form.Input
                label='Fail'
                type="file"
                onChange={e=>setFilename(e.target.files[0])}
            /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Form.Input
                label='No Rujukan'
                onChange={e=>setrefno(e.target.value)}
                value={hpp_refno}  //tukar ni
            />
            <Form.Input style={{paddingTop:'1em'}}>
                <Button icon labelPosition='right' floated='right' onClick={()=>{uploadFileChecklist();}}>Muat Naik<Icon name='right arrow' />
                </Button>
            </Form.Input>
        </Form.Group>
          {HALALPengeluaranProduk &&
            <RenderHASRawMat data={HALALPengeluaranProduk}/> //tukar ni
          }
        <Divider>
    </Divider>
      </div>
    </Transition>
  )
}

export default TabPengeluaranProduk