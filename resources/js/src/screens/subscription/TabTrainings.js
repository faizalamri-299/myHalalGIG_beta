import React, { useContext } from 'react'
import {
  Input, Menu, Segment,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Sidebar,
  Transition,
  List,
  Button,
  Table,
  Tab,
  Modal,Divider,
  Form,Dropdown
} from 'semantic-ui-react';

import * as moment from 'moment';

import { useParams, Link, useRouteMatch } from "react-router-dom";

import {deleteUser, postTraining, SubscriptionContext,getSubcrData } from './subscription';
import { setRef } from '@material-ui/core';

import { EditableLabel, HeaderAction, PromptModal } from '../../components/simplifyUi';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { post } from 'jquery';
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const TabTrainings = ({data,onDataChange,onDelete,id}) => {
//   const {subcr,cmpny} = useContext(SubscriptionContext);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [objid, setID] = React.useState(0);

  const [trainingname, setTrainingname] = React.useState("");
  const [sila, setSila] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [suggdate, setSuggdate] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [trainer, setTrainer] = React.useState("");
  const [attch, setAttch] = React.useState("");
  // const [emel, setEmel] = React.useState("");
  // const [telefon, setTelefon] = React.useState("");

  // const [status, setStatus] = React.useState(0) // 0 no show, 1 show yes, 2 show no
  // const radioHandler = (status) => {
  //   setStatus (status);
  // };

  // let { path, url } = useRouteMatch();
  // const { index } = useParams();
  
  const resetForm=()=>{
    setID(0);0
    setTrainingname("");
    setSila("");
    setDepartment("");
    setSuggdate("");
    setNotes("");
    setTrainer("");
    setAttch("");
    // setEmel("");
    // setTelefon("");
  }

  const editForm=(id)=>{
    setID(id);
    setTrainingname(data[id].trainingname);
    setSila(data[id].sila);
    setDepartment(data[id].department);
    setSuggdate(data[id].suggdate);
    setNotes(data[id].notes);
    setTrainer(data[id].trainer);
    setAttch(data[id].attch);
    // setEmel(data[id].emel);
    // setTelefon(data[id].telefon);
    setModalOpen(true);
  }
  
  const submitForm=()=>{
    const postdata={id:objid,data:{trainingname,sila,department,suggdate,notes,trainer,attch},cmpnyid:id,action:"modify"};
    postTraining(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
  }

  const deleteForm=(pk)=>{
    const postdata={id:pk,cmpnyid:id,action:"delete"};
    postTraining(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
  }

  const printCklist=()=>{
    let dd = {
    
      content: [
    //     'First paragraph',
		// 'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
    {text: 'HALAL TRAINING RECORD', style: 'header', bold: true, alignment:'center'},
		' ',
		// {text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader'},
		// 'The following table has nothing more than a body array',
		{
			style: 'tableExample',
			color: '#444',
			table: {
				// widths: [200, 'auto', 'auto'],
				headerRows: 2,
				// keepWithHeaderRows: 1,
				body: [
					[{text: 'SCHEDULE OF TRAINING', style: 'tableHeader', colSpan: 7, alignment: 'center'},{},{},{},{},{},{}],
					[{text: 'No', style: 'tableHeader', alignment: 'center'}, {text: 'Type of Training', style: 'tableHeader', alignment: 'center'}, {text: 'Participants', style: 'tableHeader', alignment: 'center'}, {text: 'Frequency', style: 'tableHeader', alignment: 'center'}, {text: 'Suggested Date', style: 'tableHeader', alignment: 'center'}, {text: 'Trainer', style: 'tableHeader', alignment: 'center'}, {text: 'Record', style: 'tableHeader', alignment: 'center'}],
					
				]
			}
		},

    
      ]
 

  }


  try
 { 
  pdfMake.createPdf(dd).open();
}
  catch(e){
    console.log(e)
    alert(e);
  }
}


console.log(Object.keys(data));

 
//   const listItems =  Object.keys(data).map((pg) => 
//   <List.Item  key={pg}>
//   <List.Content className="avatar image">
//     <Dropdown  icon="ellipsis vertical"  className='icon' 
//     pointing='top left'>
//     <Dropdown.Menu className='right'>
//       <Dropdown.Item  onClick={()=>editForm(pg)} color='blue' icon='edit outline' text='Edit' />
//       <Dropdown.Item  onClick={()=>deleteForm(pg)} icon='trash' text='Remove' />
//     </Dropdown.Menu>
//   </Dropdown>
//   </List.Content>
//   <List.Content>
//     <List.Header> {data[pg].trainingname} {data[pg].sila} {moment(data[pg].suggdate).format('DD/MM/YYYY')}</List.Header>
//     {data[pg].department} <br/> {data[pg].trainer} <br/> {data[pg].notes} <br/> {data[pg].attch}
//   </List.Content>
// </List.Item>)

const tableItem = Object.keys(data).map((pg,i) =>
  <Table.Row key={pg}>
  <Table.Cell>{i+1}</Table.Cell>
  <Table.Cell>
  <Dropdown icon="ellipsis vertical"  className='avatar image' 
  pointing='top left'>
  <Dropdown.Menu className='right'>
    <Dropdown.Item  onClick={()=>editForm(pg)} color='blue' icon='edit outline' text='Kemaskini' />
    <Dropdown.Item  onClick={()=>deleteForm(pg)} icon='trash' text='Padam' />
  </Dropdown.Menu>
</Dropdown>
  </Table.Cell>
  <Table.Cell>{data[pg].trainingname}</Table.Cell>
  <Table.Cell>{data[pg].sila}</Table.Cell>
  <Table.Cell>{data[pg].department}</Table.Cell>
  <Table.Cell>{moment(data[pg].suggdate).format('DD/MM/YYYY')}</Table.Cell>
  <Table.Cell>{data[pg].notes}</Table.Cell>
  <Table.Cell>{data[pg].trainer}</Table.Cell>
  <Table.Cell>{data[pg].attch}</Table.Cell>

  <Table.Cell>
    </Table.Cell>
  </Table.Row>
);
      
  return <React.Fragment>
      <Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Tambah Baru</Button>
      <Divider/>
      <div className="subcrTabPane">
      {/* <Button color="teal" fluid onClick={()=>printCklist()}>Print</Button> */}

      <Table>
      <Table.Header>
      <Table.Row>
        <Table.HeaderCell>No</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>Jenis Latihan Halal</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>Jabatan</Table.HeaderCell>
        <Table.HeaderCell>Tarikh Latihan</Table.HeaderCell>
        <Table.HeaderCell>Catatan</Table.HeaderCell>
        <Table.HeaderCell>Pelatih</Table.HeaderCell>
        <Table.HeaderCell>Lampiran</Table.HeaderCell>
      </Table.Row>
      </Table.Header>
      <Table.Body>
      {tableItem}
      </Table.Body>
      </Table>

  {/* <List  ordered divided>{listItems}</List> */}
  <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpen(false),resetForm()}}
              // onOpen={() => setOpen(true)}
              open={modalOpen}>
            <Header icon='archive' content='Latihan Halal' />
            <Modal.Content>
            <Form>
            {/* <Form.Group widths='equal'> */}
            Jenis Latihan Halal 
            <select defaultValue={trainingname} 
            onChange={e=>setTrainingname(e.target.value)}>
                <option value="Sila Pilih">Sila Pilih</option>
                <option value="Halal Awareness">Halal Awareness</option>
                <option value="Halal Competency">Halal Competency</option>
                <option value="Halal Executive">Halal Executive</option>
                <option value="Internal Halal Audit">Internal Halal Audit</option>
                <option value="">Lain-lain</option>
              </select>
              {/* <input label="Halal Awareness" type="radio" name="release" checked={status===1} onClick={(e) => radioHandler(1)} /> Halal Awareness
              <input label="Halal Competency" type="radio" name="release" checked={status===2} onClick={(e) => radioHandler(2)} /> Halal Competency
              {status===1 && drawYesContent()}
              {status===2 && drawYesContent()}
              <div style={{display: this.state.clickedYes ? 'block':'none'}}>This shows when the radioYes input is clicked.</div> */}
              <Form.Input
              fluid
              label='Sila Nyatakan'
              onChange={e=>setSila(e.target.value)}
              value={sila}
            />
            <Form.Input
              fluid
              label='Jabatan'
              onChange={e=>setDepartment(e.target.value)}
              value={department}
            />
            <Form.Input
              fluid
              label='Tarikh Latihan'
              onChange={e=>setSuggdate(e.target.value)}
              type="date"
              value={suggdate}
            />
            <Form.Input
              fluid
              label='Pelatih'
              onChange={e=>setTrainer(e.target.value)}
              value={trainer}
            />
            <Form.TextArea
              fluid
              label='Catatan'
              onChange={e=>setNotes(e.target.value)}
              value={notes}
            />
            <Form.Input
              fluid
              label='Lampiran'
              type="file"
              onChange={e=>setAttch(e.target.value)}
              value={attch}
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
  </div>
  </React.Fragment>
}

export default TabTrainings