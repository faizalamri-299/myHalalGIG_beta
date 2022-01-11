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
        postHASSertu,
        postHASSOPSertu,
        deleteHASSertu,
        deleteHASSOPSertu,
        downloadHASSertu,
        downloadHASSOPSertu} from './UploadHAS';

import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

const TabSertu = () => {
  
  const {HASSertu,HASSOPSertu} = useContext(UploadHASContext);
  let { path, url } = useRouteMatch();
  const [hrm_file_name, setSertu] = React.useState(null);
  const [shrm_file_name, setSOPSertu] = React.useState(null);
  const [date1, setdate1] = React.useState(null);
  const [refno1, setrefno1] = React.useState(null);
  const [date2, setdate2] = React.useState(null);
  const [refno2, setrefno2] = React.useState(null);

  const uploadFileSertu=()=>{
    const formData = new FormData(); 
    formData.append("HASSertu",hrm_file_name); 
    formData.append("date",date1); 
    formData.append("refno",refno1);  
    // Details of the uploaded file   
    postHASSertu(formData).then(x=>{
      console.log(x)
    }).catch(e=>console.log(e))
  }

  const uploadSOPFileSertu=()=>{
    const formData = new FormData(); 
    formData.append("HASSOPSertu",shrm_file_name);   
    formData.append("date",date2); 
    formData.append("refno",refno2);
    postHASSOPSertu(formData).then(x=>{
      console.log(x)
    }).catch(e=>console.log(e))
  }

  const downloadfile=(pk)=>{
    downloadHASSertu(pk).then(console.log(pk));
  }

  const downloadfileSOP=(pk)=>{
    downloadHASSOPSertu(pk).then(console.log(pk));
  }

  const deleteSertu=(pk)=>{
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
            deleteHASSertu(pk)
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

  const deleteSOPSertu=(pk)=>{
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
            deleteHASSOPSertu(pk)
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

  const RenderHASSertu = props => {
    console.log(props)

    const data = props.data;

    const listItems = data.map((x) =>
    <Table.Row >
     <Table.Cell>{x.hs_file_name}</Table.Cell>
     <Table.Cell>{x.refno}</Table.Cell>
     <Table.Cell>{moment(x.date).format('DD/MM/YYYY hh:mm:ss')}</Table.Cell>
     <Table.Cell>
     <Button.Group basic floated='right' size='small'>
      <Popup content='Muat Turun Fail'position='top center' trigger={<Button onClick={()=>downloadfile(x.id)} target="_blank"  icon='download' />} />
      <Popup content='Padam Fail' position='top center'  trigger={<Button onClick={()=>deleteSertu(x.id)} icon='trash alternate' />} />
        
      </Button.Group>
       {/* <Button size='mini' compact basic float='right'color="teal" href={"/files/HASFILE/"+x.hrm_fk_company_id+"/Sertuerial/"+x.hrm_file_name} target="_blank">Muat Turun</Button>
     <Button size='mini' compact basic color="red" href={"/files/HASFILE/"+x.hrm_fk_company_id+"/Sertuerial/"+x.hrm_file_name} target="_blank">Padam</Button> */}
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

  const RenderHASSOPSertu = props => {
    console.log(props)
    const data = props.data;

    const listItems = data.map((x) =>
    <Table.Row >
     <Table.Cell>{x.hss_file_name}</Table.Cell>
     <Table.Cell>{x.refno}</Table.Cell>
     <Table.Cell>{moment(x.date).format('DD/MM/YYYY hh:mm:ss')}</Table.Cell>
     <Table.Cell>
     <Button.Group basic floated='right' size='small'>
      <Popup content='Muat Turun Fail'position='top center' trigger={<Button onClick={()=>downloadfileSOP(x.id)} target="_blank"  icon='download' />} />
      <Popup content='Padam Fail' position='top center'  trigger={<Button onClick={()=>deleteSOPSertu(x.id)} icon='trash alternate' />} />
        
      </Button.Group>
       {/* <Button size='mini' compact basic float='right'color="teal" href={"/files/HASFILE/"+x.hrm_fk_company_id+"/Sertuerial/"+x.hrm_file_name} target="_blank">Muat Turun</Button>
     <Button size='mini' compact basic color="red" href={"/files/HASFILE/"+x.hrm_fk_company_id+"/Sertuerial/"+x.hrm_file_name} target="_blank">Padam</Button> */}
     </Table.Cell>
   </Table.Row>
    );
    return <Table id="pdfdiv">
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
        <Header as='h3'>Senarai Sertu</Header> 
        <Form.Group style={{display:'flex'}}>
        <Form.Input
            label='Fail'
            type="file"
            onChange={e=>setSertu(e.target.files[0])}
          /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <Form.Input
              label='No Rujukan'
              onChange={e=>setrefno1(e.target.value)}
              value={refno1}
            />
          <Button icon labelPosition='right' floated='right' onClick={() => {uploadFileSertu();}}>
          Muat Naik
            <Icon name='right arrow' />
          </Button>
        </Form.Group>
          {HASSertu &&
            <RenderHASSertu data={HASSertu}/>
          }
        <Divider>
      {/* <Header as='h4'>
        Prosedur Operasi Standard
      </Header> */}
    </Divider>
        
      <Header as='h3'>Prosedur Operasi Standard Sertu</Header>
      <Form.Group style={{display:'flex'}}>
      <Form.Input
            label='Fail'
            type="file"
            onChange={e=>setSOPSertu(e.target.files[0])}
          /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <Form.Input
              label='No Rujukan'
              onChange={e=>setrefno2(e.target.value)}
              value={refno2}
            />
          <Button icon labelPosition='right' floated='right' onClick={() => {uploadSOPFileSertu();}}>
          Muat Naik
            <Icon name='right arrow' />
          </Button>
        </Form.Group>
          {HASSOPSertu &&
            <RenderHASSOPSertu data={HASSOPSertu}/>
          }
      </div>
    </Transition>
  )
}

export default TabSertu