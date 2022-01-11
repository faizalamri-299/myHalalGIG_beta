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
        postHASTraceability,
        postHASSOPTraceability,
        postHASSOPProductRecall,
        deleteHASTraceability,
        deleteHASSOPTraceability,
        deleteHASSOPProductRecall,
        downloadHASTraceability,
        downloadHASSOPTraceability,
        downloadHASSOPProductRecall} from './UploadHAS';

import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

const TabTraceability = () => {

  const {HASTraceability,HASSOPTraceability,HASSOPProductRecall} = useContext(UploadHASContext);
  let { path, url } = useRouteMatch();
  const [ht_file_name, setTraceability] = React.useState(null);
  const [hst_file_name, setSOPTraceability] = React.useState(null);
  const [hpr_file_name, setSOPProductRecall] = React.useState(null);
  const [date1, setdate1] = React.useState(null);
  const [refno1, setrefno1] = React.useState(null);
  const [date2, setdate2] = React.useState(null);
  const [refno2, setrefno2] = React.useState(null);
  const [date3, setdate3] = React.useState(null);
  const [refno3, setrefno3] = React.useState(null);

  const uploadFileTraceability=()=>{
    const formData = new FormData(); 
    formData.append("HASTraceability",ht_file_name); 
    formData.append("date",date1); 
    formData.append("refno",refno1);
    // Details of the uploaded file   
    postHASTraceability(formData).then(x=>{
      console.log(x)
    }).catch(e=>console.log(e))
  }

  const uploadSOPTraceability=()=>{
    const formData = new FormData(); 
    formData.append("HASSOPTraceability",hst_file_name);  
    formData.append("date",date2); 
    formData.append("refno",refno2); 
    postHASSOPTraceability(formData).then(x=>{
      console.log(x)
    }).catch(e=>console.log(e))
  }

  const uploadSOPProductRecall=()=>{
    const formData = new FormData(); 
    formData.append("HASSOPProductRecall",hpr_file_name);  
    formData.append("date",date3); 
    formData.append("refno",refno3); 
    postHASSOPProductRecall(formData).then(x=>{
      console.log(x)
    }).catch(e=>console.log(e))
  }

  const downloadfile=(pk)=>{
    downloadHASTraceability(pk).then(console.log(pk));
  }

  const downloadfileSOP=(pk)=>{
    downloadHASSOPTraceability(pk).then(console.log(pk));
  }

  const downloadfileSOPPR=(pk)=>{
    downloadHASSOPProductRecall(pk).then(console.log(pk));
  }

  const deleteTraceability=(pk)=>{
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
            deleteHASTraceability(pk)
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

  const deleteSOPTraceability=(pk)=>{
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
            deleteHASSOPTraceability(pk)
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

  const deleteSOPProductRecall=(pk)=>{
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
            deleteHASSOPProductRecall(pk)
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

  const RenderHASTraceability = props => {
    console.log(props)
    //console.log('hassiop',HASSOPRawMat)
    const data = props.data;

    const listItems = data.map((x) =>
    <Table.Row >
     <Table.Cell>{x.ht_file_name}</Table.Cell>
     <Table.Cell>{x.refno}</Table.Cell>
     <Table.Cell>{moment(x.date).format('DD/MM/YYYY hh:mm:ss')}</Table.Cell>
     <Table.Cell>
     <Button.Group basic floated='right' size='small'>
      <Popup content='Muat Turun Fail'position='top center' trigger={<Button onClick={()=>downloadfile(x.id)} target="_blank"  icon='download' />} />
      <Popup content='Padam Fail' position='top center'  trigger={<Button onClick={()=>deleteTraceability(x.id)} icon='trash alternate' />} />
        
      </Button.Group>
       {/* <Button size='mini' compact basic float='right'color="teal" href={"/files/HASFILE/"+x.hrm_fk_company_id+"/RawMaterial/"+x.ht_file_name} target="_blank">Muat Turun</Button>
     <Button size='mini' compact basic color="red" href={"/files/HASFILE/"+x.hrm_fk_company_id+"/RawMaterial/"+x.ht_file_name} target="_blank">Padam</Button> */}
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

  const RenderHASSOPTraceability = props => {
    console.log(props)
    //console.log(HASSOPRawMat)
    const data = props.data;

    const listItems = data.map((x) =>
    <Table.Row >
     <Table.Cell>{x.hst_file_name}</Table.Cell>
     <Table.Cell>{x.refno}</Table.Cell>
     <Table.Cell>{moment(x.date).format('DD/MM/YYYY hh:mm:ss')}</Table.Cell>
     <Table.Cell>
     <Button.Group basic floated='right' size='small'>
      <Popup content='Muat Turun Fail'position='top center' trigger={<Button onClick={()=>downloadfileSOP(x.id)} target="_blank"  icon='download' />} />
      <Popup content='Padam Fail' position='top center'  trigger={<Button onClick={()=>deleteSOPTraceability(x.id)} icon='trash alternate' />} />
        
      </Button.Group>
       {/* <Button size='mini' compact basic float='right'color="teal" href={"/files/HASFILE/"+x.hrm_fk_company_id+"/RawMaterial/"+x.ht_file_name} target="_blank">Muat Turun</Button>
     <Button size='mini' compact basic color="red" href={"/files/HASFILE/"+x.hrm_fk_company_id+"/RawMaterial/"+x.ht_file_name} target="_blank">Padam</Button> */}
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

  const RenderHASSOPProductRecall = props => {
    console.log(props)
    //console.log(HASSOPRawMat)
    const data = props.data;

    const listItems = data.map((x) =>
    <Table.Row >
     <Table.Cell>{x.hpr_file_name}</Table.Cell>
     <Table.Cell>{x.refno}</Table.Cell>
     <Table.Cell>{moment(x.date).format('DD/MM/YYYY hh:mm:ss')}</Table.Cell>
     <Table.Cell>
     <Button.Group basic floated='right' size='small'>
      <Popup content='Muat Turun Fail'position='top center' trigger={<Button onClick={()=>downloadfileSOPPR(x.id)} target="_blank"  icon='download' />} />
      <Popup content='Padam Fail' position='top center'  trigger={<Button onClick={()=>deleteSOPProductRecall(x.id)} icon='trash alternate' />} />
        
      </Button.Group>
       {/* <Button size='mini' compact basic float='right'color="teal" href={"/files/HASFILE/"+x.hrm_fk_company_id+"/RawMaterial/"+x.ht_file_name} target="_blank">Muat Turun</Button>
     <Button size='mini' compact basic color="red" href={"/files/HASFILE/"+x.hrm_fk_company_id+"/RawMaterial/"+x.ht_file_name} target="_blank">Padam</Button> */}
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
        <Header as='h3'>Kebolehkesanan</Header> 
        <Form.Group style={{display:'flex'}}>
        <Form.Input
            label='Fail'
            type="file"
            onChange={e=>setTraceability(e.target.files[0])}
          /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <Form.Input
              label='No Rujukan'
              onChange={e=>setrefno1(e.target.value)}
              value={refno1}
            />
          <Button icon labelPosition='right' floated='right' onClick={() => {uploadFileTraceability();}}>
          Muat Naik
            <Icon name='right arrow' />
          </Button>
        </Form.Group>
          {HASTraceability &&
            <RenderHASTraceability data={HASTraceability}/>
          }
        <Divider>
      {/* <Header as='h4'>
        Prosedur Operasi Standard
      </Header> */}
    </Divider>
        
      <Header as='h3'>Prosedur Operasi Standard Kebolehkesanan</Header>
      <Form.Group style={{display:'flex'}}>
      <Form.Input
            label='Fail'
            type="file"
            onChange={e=>setSOPTraceability(e.target.files[0])}
          /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <Form.Input
              label='No Rujukan'
              onChange={e=>setrefno2(e.target.value)}
              value={refno2}
            />
          <Button icon labelPosition='right' floated='right' onClick={() => {uploadSOPTraceability();}}>
          Muat Naik
            <Icon name='right arrow' />
          </Button>
        </Form.Group>
          {HASSOPTraceability &&
            <RenderHASSOPTraceability data={HASSOPTraceability}/>
          }

        <Divider>
        {/* <Header as='h4'>
            Prosedur Operasi Standard
        </Header> */}
        </Divider>
            
        <Header as='h3'>Prosedur Operasi Standard Panggil Semula Produk</Header>
        <Form.Group style={{display:'flex'}}>
        <Form.Input
            label='Fail'
            type="file"
            onChange={e=>setSOPProductRecall(e.target.files[0])}
          /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <Form.Input
              label='No Rujukan'
              onChange={e=>setrefno3(e.target.value)}
              value={refno3}
            />
            <Button icon labelPosition='right' floated='right' onClick={() => {uploadSOPProductRecall();}}>
            Muat Naik
                <Icon name='right arrow' />
            </Button>
            </Form.Group>
            {HASSOPProductRecall &&
                <RenderHASSOPProductRecall data={HASSOPProductRecall}/>
            }
      </div>
    </Transition>
  )
}

export default TabTraceability