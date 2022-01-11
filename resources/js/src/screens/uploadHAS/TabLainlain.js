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

import {UploadHASContext,
        postHASOthers,
        deleteHASOthers,
        downloadHASOthers} from './UploadHAS';

import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

const TabHASOthers = () => {
  
  const {HASOthers} = useContext(UploadHASContext);
  let { path, url } = useRouteMatch();
  const [filename, setfilename] = React.useState(null);
  const [date, setdate] = React.useState(null);
  const [refno, setrefno] = React.useState(null);

  const uploadFile=()=>{
    const formData = new FormData(); 
    formData.append("HASOthers",filename); 
    formData.append("date",date); 
    formData.append("refno",refno); 
    // Details of the uploaded file   
    postHASOthers(formData).then(x=>{
      console.log(x)
    }).catch(e=>console.log(e))
  }

  const downloadfile=(pk)=>{
    downloadHASOthers(pk).then(console.log(pk));
  }

  const deleteFile=(pk)=>{
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
            deleteHASOthers(pk)
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

  const RenderHAS = props => {
    console.log(props)
    const data = props.data;

    const listItems = data.map((x) =>
    <Table.Row >
     <Table.Cell>{x.filename}</Table.Cell>
     <Table.Cell>{x.refno}</Table.Cell>
     <Table.Cell>{moment(x.date).format('DD/MM/YYYY hh:mm:ss')}</Table.Cell>
     <Table.Cell>
     <Button.Group basic floated='right' size='small'>
      <Popup content='Muat Turun Fail'position='top center' trigger={<Button onClick={()=>downloadfile(x.id)} target="_blank"  icon='download' />} />
      <Popup content='Padam Fail' position='top center'  trigger={<Button onClick={()=>deleteFile(x.id)} icon='trash alternate' />} />
        
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
        <Header as='h3'>Senarai Latihan Halal</Header> 
        <Form.Group style={{display:'flex'}}>
        <Form.Input
            label='Fail'
            type="file"
            onChange={e=>setfilename(e.target.files[0])}
          /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <Form.Input
              label='No Rujukan'
              onChange={e=>setrefno(e.target.value)}
              value={refno}
            />
          <Button icon labelPosition='right' floated='right' onClick={() => {uploadFile();}}>
            Muat Naik
            <Icon name='right arrow' />
          </Button>
        </Form.Group>
          {HASOthers &&
            <RenderHAS data={HASOthers}/>
          }
        <Divider>
    </Divider>
      </div>
    </Transition>
  )
}

export default TabHASOthers