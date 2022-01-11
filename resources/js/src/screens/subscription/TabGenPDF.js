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

import {deleteUser, postPremise, SubscriptionContext,getSubcrData } from './subscription';

import { EditableLabel, HeaderAction, PromptModal } from '../../components/simplifyUi';
import DraggableTableRow from '../../components/DraggableTableRow';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;


const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const TabGenPDF = ({data,onDataChange,onDelete,id}) => {
//   const {subcr,cmpny} = useContext(SubscriptionContext);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [objid, setID] = React.useState(0);
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  
  let { path, url } = useRouteMatch();

  const resetForm=()=>{
    setName("");
    setAddress("");
    setID(0);0
  }

  const editForm=(id)=>{
    setName(data[id].name);
    setID(id);
    setAddress(data[id].address);
    setModalOpen(true);
  }

  const submitForm=()=>{
    const postdata={id:objid,data:{name,address},cmpnyid:id,action:"modify"};
    postPremise(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
  }

  const deleteForm=(pk)=>{
    const postdata={id:pk,cmpnyid:id,action:"delete"};
    postPremise(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
  }

  const printCklist=()=>{
    let dd = {
    
      content: [
        'First paragraph',
		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
      //   {
      //     image: './logo.png',
      //     width: 200,
      //     alignment: 'center',
      //     margin: [0, 150, 0, 30]
      // },
    //   , {
    //       text: name,
    //       fontSize: 28,
    //       bold: true,
    //       alignment: 'center',
    //       margin: [0, 30]
    //   },{
    //     text: "Version "+version,
    //     fontSize: 14,
    //     alignment: 'center',
    //     margin: [0, 0, 0, 30]
    // }
      ]
    // ],
    // images: {
    //   logo:cmpny.cmpnyConfig.headerLogo
  // }
  }

  // let tempcklist=JSON.parse(JSON.stringify(cklistData));
  // for (const [i,{section,items}] of tempcklist.entries()) {

  //   let sectionHeader = {
  //     pageBreak: 'before',
  //     margin: [0, 0, 0, 20],
  //     table: {
  //         widths: ['*'],
  //         body: [
  //             [{
  //                 alignment: 'center',
  //                 text: String.fromCharCode(65 + i) + '. ' + section,
  //                 fillColor: '#000000',
  //                 color: '#ffffff',
  //                 bold: true,
  //                 fontSize: 18
  //             }],

  //         ]
  //     }
  // }

  // let reportitem = {
  //     table: {
  //         widths: ['auto', '*', 'auto', 'auto', 'auto'],
  //         body: [
  //             [{
  //                 text: 'No.',
  //                 bold: true
  //             }, {
  //                 text: "Item",
  //                 bold: true
  //             }, {
  //                 text: "Auto Failed?",
  //                 bold: true
  //             }, {
  //                 text: 'NC',
  //                 bold: true
  //             }, {
  //                 text: "Reference",
  //                 bold: true
  //             }]
  //         ]
  //     }
  // }
//   let deduct=-1;
//   for (const [i,{id,severity,type,text_ms,info,autofailed}] of items.entries()) {
    
//     let resultcol;

   
//     if(type ==="CHECKLIST"){
      
//       // let idx=severities.findIndex(({id})=>id==severity);
      
//       resultcol=severities.find(z => z.id == severity).name;

//     }
//     else{
//       resultcol="";
//     }
   
//     let text = text_ms;
    

//     let infolist = {ul: info};
//     if(type ==="LABEL" || type ==="TITLE"){ 
//       reportitem.table.body.push(
//         [{ text, colSpan: 5,bold:type ==="TITLE"}]);
//     deduct=i;
// }else{
//   reportitem.table.body.push([
//     (i-deduct) + '',
//     text,
//     { text:autofailed?"true":"false"},
//     resultcol,
//     infolist
// ]);
// }
//   }
    // dd.content.push(sectionHeader);
    // dd.content.push(reportitem);  
// }

  try
 { 
  pdfMake.createPdf(dd).open();
}
  catch(e){
    console.log(e)
    alert(e);
  }
}










 
  const listItems =  Object.keys(data).map((pg) => 
  <List.Item  key={pg}>
  <List.Content className="avatar image">
    <Dropdown  icon="ellipsis vertical"  className='icon' 
    pointing='top left'>
    <Dropdown.Menu className='right'>
      <Dropdown.Item  onClick={()=>editForm(pg)} color='blue' icon='edit outline' text='Edit' />
      <Dropdown.Item  onClick={()=>deleteForm(pg)} icon='trash' text='Remove' />
    </Dropdown.Menu>
  </Dropdown>
  </List.Content>
  <List.Content>
    <List.Header> {data[pg].name}</List.Header>
    {data[pg].address}
  </List.Content>
</List.Item>)
      
  return <React.Fragment>
      {/* <Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Tambah Baru</Button> */}
      <Button color="teal" fluid onClick={()=>printCklist()}>Print</Button>

      <Divider/>
      
      <div className="subcrTabPane">  
      <List  ordered divided>{listItems}</List>
      <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpen(false),resetForm()}}
              // onOpen={() => setOpen(true)}
              open={modalOpen}
          >
            <Header icon='archive' content='Premise Management' />
            <Modal.Content>
            <Form>
            {/* <Form.Group widths='equal'> */}
            <Form.Input
              fluid
              label='Name'
              onChange={e=>setName(e.target.value)}
              value={name}
            />
            <Form.TextArea
              fluid
              label='Address'
              onChange={e=>setAddress(e.target.value)}
              value={address}
            />
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
        </div>
  </React.Fragment>
}

export default TabGenPDF