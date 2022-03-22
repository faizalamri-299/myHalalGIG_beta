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
  Modal,Divider,Message,
  Form,Dropdown, Dimmer, Loader,Pagination,Label
} from 'semantic-ui-react';

import * as moment from 'moment';

import { useParams, Link, useRouteMatch } from "react-router-dom";

import {deleteUser, postTraining, SubscriptionContext,getSubcrData } from '../subscription/subscription';

import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';



const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const ClientTraining = ({data,onDataChange,id,accesslvl}) => {
//   const {subcr,cmpny} = useContext(SubscriptionContext);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [objid, setID] = React.useState(0);
  
  const [trainingname, setTrainingname] = React.useState("");
  // const [others, setOthers] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [sdate, setSdate] = React.useState("");
  const [edate, setEdate] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [trainer, setTrainer] = React.useState("");
  const [attch, setAttch] = React.useState("");
  
  const [activePage, setActivePage] = React.useState(1);
  const [itemperpage, setitemperpage] = React.useState(50);
  const [premiseFilter, setPremiseFilter] = React.useState([]);
  const [basedata, setbasedata] = React.useState([]);

  React.useEffect(() => {

    const bootstrapAsync = async () => {

      let d=Object.keys(data).map((pg) =>{ data[pg].id=pg; return data[pg]});
      setbasedata(d);
      setPremiseFilter(d);
    };

    bootstrapAsync();

  }, [data]);
  const resetForm=()=>{
    setID(0);0
    setTrainingname("");
    // setOthers("");
    setDepartment("");
    setSdate("");
    setEdate("");
    setNotes("");
    setTrainer("");
    setAttch("");

  }

  const editForm=(id)=>{
    setID(id);
    setTrainingname(data[id].trainingname);
    // setOthers(data[id].others);
    setDepartment(data[id].department);
    setSdate(data[id].sdate);
    setEdate(data[id].edate);
    setNotes(data[id].notes);
    setTrainer(data[id].trainer);
    // setAttch(data[id].attch);
    setModalOpen(true);
  }

  
  const submitForm=()=>{
    
    const postdata={id:objid,data:{trainingname,department,sdate,edate,notes,trainer,attch},cmpnyid:id,action:"modify"};
    
    postTraining(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
  }

  const uploadFile=()=>{
    const formData = new FormData(); 
 
    // Update the formData object 
    formData.append("id",id);
    formData.append("trainingname",trainingname);
    formData.append("department",department);
    formData.append("sdate",sdate);
    formData.append("edate",edate);
    formData.append("notes",notes);
    formData.append("trainer",trainer);
    // formData.append("attch",attch);

    formData.append(
      "myfile",attch, 
      attch.attch
    ); 
    // Details of the uploaded file 
    
    postTraining(formData).then(x=>{
      console.log(x)
  }).catch(e=>console.log(e))
  }



  const deleteForm=(pk)=>{
    const postdata={id:pk,cmpnyid:id,action:"delete"};
    postTraining(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
  }

  let printDocument=()=>{  
    const input = document.getElementById('pdfdiv');  
    html2canvas(input)  
      .then((canvas) => {  
        var imgWidth = 200;  
        var pageHeight = 290;  
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF('p', 'mm', 'a4')  
        var position = 10;  
        pdf.addImage(imgData, 'JPEG', 5, position, imgWidth, imgHeight);
        pdf.setFont("times");
        pdf.text(75, 6, "Senarai Latihan Halal");  
        pdf.save("Latihan Halal.pdf");  
      });  
  } 
  
  const RenderProfile = ({data}) => {

    let pageItem=[];
    let i,j,temparray;
    for (i=0,j=data.length; i<j; i+=itemperpage) {
      temparray = data.slice(i,i+itemperpage);
      pageItem.push(temparray);
        // do whatever
    }
    const tableItem = pageItem[activePage-1].map((x, i) =>
    <Table.Row key={i}>
    <Table.Cell>{i+1}</Table.Cell>
    <Table.Cell>
      <Dropdown  icon="ellipsis vertical"  className='icon' 
      pointing='top left'>
      <Dropdown.Menu className='right'>
        <Dropdown.Item  onClick={()=>editForm(x.id)} color='blue' icon='edit outline' text='Kemaskini' />
        <Dropdown.Item  onClick={()=>deleteForm(x.id)} icon='trash' text='Padam' />
      </Dropdown.Menu>
    </Dropdown>
    </Table.Cell>
  <Table.Cell>{x.trainingname}</Table.Cell>
  {/* <Table.Cell>{x.others}</Table.Cell> */}
  <Table.Cell>{x.department}</Table.Cell>
  <Table.Cell>{moment(x.sdate).format('DD/MM/YYYY')}</Table.Cell>
  <Table.Cell>{moment(x.edate).format('DD/MM/YYYY')}</Table.Cell>
  <Table.Cell>{x.notes}</Table.Cell>
  <Table.Cell>{x.trainer}</Table.Cell>
  <Table.Cell>{x.attch}</Table.Cell>

  <Table.Cell>
    </Table.Cell>
  </Table.Row>
);

return <Table id="pdfdiv">
<Table.Header>
  <Table.Row>
    <Table.HeaderCell>No</Table.HeaderCell>
    <Table.HeaderCell></Table.HeaderCell>
    <Table.HeaderCell>Jenis Latihan Halal</Table.HeaderCell>
        <Table.HeaderCell>Jabatan</Table.HeaderCell>
        <Table.HeaderCell>Tarikh Mula Latihan</Table.HeaderCell>
        <Table.HeaderCell>Tarikh Tamat Latihan</Table.HeaderCell>
        <Table.HeaderCell>Catatan</Table.HeaderCell>
        <Table.HeaderCell>Pelatih</Table.HeaderCell>
        <Table.HeaderCell>Lampiran</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>

  </Table.Row>
</Table.Header>

<Table.Body>
  {tableItem}
</Table.Body>
{/* <Table.Footer>
  <Table.Row>
    <Table.HeaderCell textAlign="center" colSpan='10'>
      <Pagination siblingRange={2} activePage={activePage} totalPages={pageItem.length} onPageChange={(e,d)=>setActivePage(d.activePage)}/>
    </Table.HeaderCell>
  </Table.Row>
</Table.Footer> */}
</Table>
}
  
      
  return <React.Fragment>
    <Header as='h3'>Senarai Latihan Halal</Header>
    <Button fluid as='div' labelPosition='right'>
    <Button fluid onClick={()=>setModalOpen(true)} basic color='green' > <Icon name='plus' />Tambah Latihan Halal</Button>
      {/* <Label basic > */}
      {/* <Input 
                icon={{ name: 'search', link: true }}
                onChange={e=>{
                  let filter=e.target.value.toLowerCase()
                  const filterData = basedata.filter(({ name, address }) =>
                  name.toLowerCase().indexOf(filter) > -1 || address.toLowerCase().indexOf(filter) > -1);
                  setActivePage(1);
                  setPremiseFilter(filterData)
                }}
                placeholder='Cari...'
              /> */}
      {/* </Label> */}
    </Button>
      {/* <Divider/> */}

      {/* <Button color="teal" fluid onClick={()=>printDocument()}>Muat Turun</Button> */}

  {premiseFilter.length>0 ? <RenderProfile data={premiseFilter} />:
      <Message warning content='Tiada rekod dijumpai'/>
  }
  <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpen(false),resetForm()}}
              // onOpen={() => setOpen(true)}
              open={modalOpen}
          >
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
              </select>
             
              {/* <Form.Input
              fluid
              label='Sila Nyatakan'
              onChange={e=>setOthers(e.target.value)}
              value={others}
            /> */}
            <Form.Input
              fluid
              label='Jabatan'
              onChange={e=>setDepartment(e.target.value)}
              value={department}
            />
            <Form.Input
              fluid
              label='Tarikh Mula Latihan'
              onChange={e=>setSdate(e.target.value)}
              type="date"
              value={sdate}
            />
            <Form.Input
              fluid
              label='Tarikh Tamat Latihan'
              onChange={e=>setEdate(e.target.value)}
              type="date"
              value={edate}
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
  </React.Fragment>
}

export default ClientTraining