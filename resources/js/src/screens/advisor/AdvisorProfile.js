import React,{useContext } from 'react'
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
import { AuthContext } from '../auth/auth';
import dp from '../../assets/img/defaultphoto.png';
import {EditableLabel, HeaderAction, PromptModal} from '../../components/simplifyUi';

import { deleteAdvisor,deleteUser,AdvisorContext,createAdvisor ,postAdvisor, postAdvsrExp, postAdvsrAca, postAdvsrAch, postAdvsrAct, updateAdvisorProfile} from './advisor';


const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const AdvisorProfile = ({data,onDataChange,id,accesslvl}) => {
  const { profile,cmpny,signOut,changeAccess,advsr } = React.useContext(AuthContext);

  const [activePage, setActivePage] = React.useState(1);
  const [itemperpage, setitemperpage] = React.useState(50);
  const [basedata, setbasedata] = React.useState([]);
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [role, setID] = React.useState(3);
  const [password, setpassword] = React.useState("");
  const [password2, setpassword2] = React.useState("");
  const [company, setcompany] = React.useState(null);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [userid, setuserid] = React.useState(0);
  const [advExperience, setadvExperience] = React.useState("");
  const [advExpDesc, setadvExpDesc] = React.useState("");
  const [advExpSdate, setadvExpSdate] = React.useState("");
  const [advExpEdate, setadvExpEdate] = React.useState("");

  const {advisorExp,advisorAca,advisorAch,advisorAct} = useContext(AdvisorContext);
  const [userlist, setuserlist] = React.useState(advisorExp);
  const [userFilter, setuserFilter] = React.useState(advisorExp);

  const [modalOpenAca, setModalOpenAca] = React.useState(false);
  const [acaLevel, setacaLevel] = React.useState("");
  const [acaPlace, setacaPlace] = React.useState("");
  const [acaSdate, setacaSdate] = React.useState("");
  const [acaEdate, setacaEdate] = React.useState("");
  const [userlistaca, setuserlistaca] = React.useState(advisorAca);
  const [userFilteraca, setuserFilteraca] = React.useState(advisorAca);

  const [modalOpenAch, setModalOpenAch] = React.useState(false);
  const [achTitle, setachTitle] = React.useState("");
  const [achDesc, setachDesc] = React.useState("");
  const [achYear, setachYear] = React.useState("");
  const [userlistach, setuserlistach] = React.useState(advisorAch);
  const [userFilterach, setuserFilterach] = React.useState(advisorAch);

  const [modalOpenAct, setModalOpenAct] = React.useState(false);
  const [actTitle, setactTitle] = React.useState("");
  const [actDesc, setactDesc] = React.useState("");
  const [actYear, setactYear] = React.useState("");
  const [userlistact, setuserlistact] = React.useState(advisorAct);
  const [userFilteract, setuserFilteract] = React.useState(advisorAct);

  const [modalOpenProfil, setModalOpenProfil] = React.useState(false);
  const [advsrName, setadvsrName] = React.useState("");
  const [advsrDesc, setadvsrDesc] = React.useState("");
  const [advsrAddress, setadvsrAddress] = React.useState("");
  const [advsrIcno, setadvsrIcno] = React.useState("");

  const [imgprofile, setprofile] = React.useState(null);
  const [userFK, setuserFK] = React.useState(0);



  const advisorData = useContext(AdvisorContext);

  const options = [
    { key: 'pahang', text: 'Pahang', value: 'pahang' },
    { key: 'perak', text: 'Perak', value: 'perak' },
    { key: 'terengganu', text: 'Terengganu', value: 'terengganu' },
    { key: 'perlis', text: 'Perlis', value: 'perlis' },
    { key: 'selangor', text: 'Selangor', value: 'selangor' },
    { key: 'negerisembilan', text: 'Negeri Sembilan', value: 'negerisembilan' },
    { key: 'johor', text: 'Johor', value: 'johor' },
    { key: 'kelantan', text: 'Kelantan', value: 'kelantan' },
    { key: 'kedah', text: 'Kedah', value: 'kedah' },
    { key: 'pulaupinang', text: 'Pulau Pinang', value: 'pulaupinang' },
    { key: 'melaka', text: 'Melaka', value: 'melaka' },
    { key: 'sabah', text: 'Sabah', value: 'sabah' },
    { key: 'sarawak', text: 'Sarawak', value: 'sarawak' },
  ]

  React.useEffect(() => {

    const bootstrapAsync = async () => {

      setuserlist(advisorExp);
      setuserFilter(advisorExp);

      setuserlistaca(advisorAca);
      setuserFilteraca(advisorAca);

      setuserlistach(advisorAch);
      setuserFilterach(advisorAch);

      setuserlistact(advisorAct);
      setuserFilteract(advisorAct);
    };

    bootstrapAsync();
  }, [advisorExp,advisorAca,advisorAch,advisorAct]);

  const updImg=x=>{
    setprofile({...advsr,id:userFK,advImg:x})
    updateAdvisorProfile({...advsr,id:userFK,advImg:x}).then(k=>{
       console.log(k);
  })
  location.reload()
  }
  const updAddress=x=>{
    setprofile({...advsr,id:userFK,advAddress:x})
    updateAdvisorProfile({...advsr,id:userFK,advAddress:x}).then(k=>{
       console.log(k);
  })
  location.reload()
  }
  const updPreflocation=advPreflocation=>{
    setprofile({...advsr,id:userFK,advPreflocation})
    updateAdvisorProfile({...advsr,id:userFK,advPreflocation}).then(k=>{
       console.log(k);
  })
  location.reload()
  }
  const updIcno=advIcno=>{
    setprofile({...advsr,id:userFK,advIcno})
    updateAdvisorProfile({...advsr,id:userFK,advIcno}).then(k=>{
       console.log(k);
  })
  location.reload()
  }
  const updTelno=advTelno=>{
    setprofile({...advsr,id:userFK,advTelno})
    updateAdvisorProfile({...advsr,id:userFK,advTelno}).then(k=>{
       console.log(k);
  })
  location.reload()
  }
  const updGender=advGender=>{
    setprofile({...advsr,id:userFK,advGender})
    updateAdvisorProfile({...advsr,id:userFK,advGender}).then(k=>{
       console.log(k);
  })
  location.reload()
  }
  const updBirthdate=advBirthdate=>{
    setprofile({...advsr,id:userFK,advBirthdate})
    updateAdvisorProfile({...advsr,id:userFK,advBirthdate}).then(k=>{
       console.log(k);
  })
  location.reload()
  }
  const updDescription=advDescription=>{
    setprofile({...advsr,id:userFK,advDescription})
    updateAdvisorProfile({...advsr,id:userFK,advDescription}).then(k=>{
       console.log(k);
  })
  location.reload()
  }

  const resetForm=()=>{
    setName("");
    setAddress("");
    setID(0);
  }

  const editForm=(id)=>{
    setName(data[id].name);
    setID(id);
    setAddress(data[id].address);
    setModalOpen(true);
  }
  const editFormProfil=({name,advDescription,advAddress,advIcno})=>{
    setadvsrName(name);
    setadvsrDesc(advDescription);
    setadvsrAddress(advAddress);
    setadvsrIcno(advIcno);
    setModalOpen(true);
  }

  const deleteForm=(pk)=>{
    const postdata={id:pk,cmpnyid:id,action:"delete"};
    postPremise(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
  }

  const submitForm=()=>{
    const postdata={advExperience,advExpDesc,advExpSdate,advExpEdate,action:"modify"};
    postAdvsrExp(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
    location.reload()
  }
  const submitFormAca=()=>{
    const postdata={acaLevel,acaPlace,acaSdate,acaEdate,action:"modify"};
    postAdvsrAca(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
    location.reload()
  }
  const submitFormAch=()=>{
    const postdata={achTitle,achDesc,achYear,action:"modify"};
    postAdvsrAch(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
    location.reload()
  }
  const submitFormAct=()=>{
    const postdata={actTitle,actDesc,actYear,action:"modify"};
    postAdvsrAct(postdata).then(onDataChange).catch(e=>console.log(e))
    resetForm();
    location.reload()
  }

  const RenderAdvisorExp = props => {
    console.log(props);
    const data = props.data;
    let pageItem=[];
    let i,j,temparray;
    for (i=0,j=data.length; i<j; i+=itemperpage) {
      temparray = data.slice(i,i+itemperpage);
      pageItem.push(temparray);
        // do whatever
    }
    const tableItem = pageItem[activePage-1].map((x, i) =>
  <Table.Row key={i}>
  {/* <Table.Cell>{i+1}</Table.Cell> */}
  <Table.Cell>{x.advExperience}<br/>{x.advExpDesc}<br/>{moment(x.advExpSdate).format('MM/YYYY')} - {moment(x.advExpEdate).format('MM/YYYY')}</Table.Cell>
  <Table.Cell textAlign='right'>
  <Dropdown icon="ellipsis vertical"  className='icon' 
  pointing='top left'>
  <Dropdown.Menu className='right'>
    <Dropdown.Item  onClick={()=>editForm(x)} color='blue' icon='edit outline' text='Kemaskini' />
    <Dropdown.Item  onClick={()=>deleteUserForm(x.id)} icon='trash' text='Padam' />
  </Dropdown.Menu>
</Dropdown>
  </Table.Cell>
  </Table.Row>
);
  return  <Table style={{ border:'none'}}>
  <Table.Body>
    {tableItem}
  </Table.Body>
</Table>
  }

  const RenderAdvisorAca = props => {
    console.log(props);
    const data = props.data;
    let pageItem=[];
    let i,j,temparray;
    for (i=0,j=data.length; i<j; i+=itemperpage) {
      temparray = data.slice(i,i+itemperpage);
      pageItem.push(temparray);
        // do whatever
    }
    const tableItemAca = pageItem[activePage-1].map((x, i) =>
  <Table.Row key={i}>
  {/* <Table.Cell>{i+1}</Table.Cell> */}
  <Table.Cell>{x.acaLevel}<br/>{x.acaPlace}<br/>{moment(x.acaSdate).format('MM/YYYY')} - {moment(x.acaEdate).format('MM/YYYY')}</Table.Cell>
  <Table.Cell textAlign='right'>
  <Dropdown icon="ellipsis vertical"  className='icon' 
  pointing='top left'>
  <Dropdown.Menu className='right'>
    <Dropdown.Item  onClick={()=>editForm(x)} color='blue' icon='edit outline' text='Kemaskini' />
    <Dropdown.Item  onClick={()=>deleteUserForm(x.id)} icon='trash' text='Padam' />
  </Dropdown.Menu>
</Dropdown>
  </Table.Cell>
  </Table.Row>
);
  return  <Table style={{ border:'none'}}>
  <Table.Body>
    {tableItemAca}
  </Table.Body>
</Table>
  }

  const RenderAdvisorAch = props => {
    console.log(props);
    const data = props.data;
    let pageItem=[];
    let i,j,temparray;
    for (i=0,j=data.length; i<j; i+=itemperpage) {
      temparray = data.slice(i,i+itemperpage);
      pageItem.push(temparray);
        // do whatever
    }
    const tableItemAch = pageItem[activePage-1].map((x, i) =>
  <Table.Row key={i}>
  {/* <Table.Cell>{i+1}</Table.Cell> */}
  <Table.Cell>{x.achTitle}<br/>{x.achDesc}<br/>{moment(x.achYear).format('MM/YYYY')}</Table.Cell>
  <Table.Cell textAlign='right'>
  <Dropdown icon="ellipsis vertical"  className='icon' 
  pointing='top left'>
  <Dropdown.Menu className='right'>
    <Dropdown.Item  onClick={()=>editForm(x)} color='blue' icon='edit outline' text='Kemaskini' />
    <Dropdown.Item  onClick={()=>deleteUserForm(x.id)} icon='trash' text='Padam' />
  </Dropdown.Menu>
</Dropdown>
  </Table.Cell>
  </Table.Row>
);
  return  <Table style={{ border:'none'}}>
  <Table.Body>
    {tableItemAch}
  </Table.Body>
</Table>
  }

  const RenderAdvisorAct = props => {
    console.log(props);
    const data = props.data;
    let pageItem=[];
    let i,j,temparray;
    for (i=0,j=data.length; i<j; i+=itemperpage) {
      temparray = data.slice(i,i+itemperpage);
      pageItem.push(temparray);
        // do whatever
    }
    const tableItemAct = pageItem[activePage-1].map((x, i) =>
  <Table.Row key={i}>
  {/* <Table.Cell>{i+1}</Table.Cell> */}
  <Table.Cell>{x.actTitle}<br/>{x.actDesc}<br/>{moment(x.actYear).format('MM/YYYY')}</Table.Cell>
  <Table.Cell textAlign='right'>
  <Dropdown icon="ellipsis vertical"  className='icon' 
  pointing='top left'>
  <Dropdown.Menu className='right'>
    <Dropdown.Item  onClick={()=>editForm(x)} color='blue' icon='edit outline' text='Kemaskini' />
    <Dropdown.Item  onClick={()=>deleteUserForm(x.id)} icon='trash' text='Padam' />
  </Dropdown.Menu>
</Dropdown>
  </Table.Cell>
  </Table.Row>
);
  return  <Table style={{ border:'none'}}>
  <Table.Body>
    {tableItemAct}
  </Table.Body>
</Table>
  }

  return (
    <Transition transitionOnMount={true} animation="fade" duration={1000}>
    <div className="in innerContainer" style={{overflowY:'auto'}}>

<Segment color='green' style={{ width: '70%', marginLeft:'15%'}}>
              
              {/* <Header as='h3' dividing>Profil <Button onClick={()=>editFormProfil()} style={{position: 'absolute',right: 5,top: 5,outline: 'none', background:'none'}} ><Icon name='pencil' color='green' /></Button> </Header>  */}
              <Header as='h3' dividing>Profil</Header>           
              <Grid textAlign='left' stackable columns={2} style={{ width: '100%' }}>

                <Grid.Column style={{ width: '50%'}} >
                  <Image src={advsr.advImg ? advsr.advImg.profilePicture:dp} size="small" centered style={{borderRadius: 400/ 2}}/>

                  <HeaderAction as="h6"
              buttonRight={
              <PromptModal onSave={(x) => {
                updImg(x);
              }}
                title="Edit Gambar Profil"
                items={[
                  { value: advsr.advImg && advsr.advImg.profilePicture, label: "Gambar Profil",type: "image", name: "profilePicture" },
                ]}
                buttonProps={{ size: "small", name: 'pencil', color: "green" }}
              />
            }> </HeaderAction>
                </Grid.Column>

                <Grid.Column style={{ width: '50%'}}>
                  <Header as='h2'><span>{profile.name}</span></Header>
                  {/* <Header as='h4'><span>{advsr.advDescription}</span></Header>
                  <Header sub>Lokasi Semasa</Header> 
                  <span>{advsr.advAddress}</span>
                  <Header sub>Lokasi Seliaan</Header>
                  <span>{advsr.advPreflocation}</span>
                  <Header sub>No Kad Pengenalan</Header>
                  <span>{advsr.advIcno}</span>
                  <Header sub>No Telefon</Header>
                  <span>{advsr.advTelno}</span>
                  <Header sub>Emel</Header>
                  <span>{profile.username}</span> */}
                  <EditableLabel
                        fluid
                        placeholder="Perihal"
                        label='Perihal'
                        value={advsr.advDescription && advsr.advDescription? advsr.advDescription:""}
                        onSave={updDescription}
                      /> <br/>
                  <EditableLabel
                        fluid
                        placeholder="Lokasi Semasa"
                        label='Lokasi Semasa'
                        value={advsr.advAddress && advsr.advAddress? advsr.advAddress:""}
                        onSave={updAddress}
                      /> <br/>
                  <EditableLabel
                        fluid
                        placeholder="Lokasi Seliaan"
                        label='Lokasi Seliaan'
                        value={advsr.advPreflocation && advsr.advPreflocation? advsr.advPreflocation:""}
                        onSave={updPreflocation}
                      /> <br/>
                  <EditableLabel
                        fluid
                        placeholder="No Kad Pengenalan"
                        label='No Kad Pengenalan'
                        value={advsr.advIcno && advsr.advIcno? advsr.advIcno:""}
                        onSave={updIcno}
                      /><br/>
                      <EditableLabel
                        fluid
                        placeholder="Jantina"
                        label='Jantina'
                        value={advsr.advGender && advsr.advGender? advsr.advGender:""}
                        onSave={updGender}
                      /><br/>
                      <EditableLabel
                        fluid
                        placeholder="Tarikh Lahir"
                        label='Tarikh Lahir'
                        type='date'
                        value={advsr.advBirthdate && advsr.advBirthdate? advsr.advBirthdate:""}
                        onSave={updBirthdate}
                      /><br/>
                      <EditableLabel
                        fluid
                        placeholder="No Telefon"
                        label='No Telefon'
                        value={advsr.advTelno && advsr.advTelno? advsr.advTelno:""}
                        onSave={updTelno}
                      /> <br/>
                      <EditableLabel
                        fluid
                        placeholder="Email"
                        label='Email'
                        value={profile.username}
                        // onSave={updEmail}
                      />
                </Grid.Column>

                {/* <Grid.Column >
                  <Header sub>Lokasi Seliaan</Header>
                  <span>{advsr.advPreflocation}</span>
                  <Header sub>No Kad Pengenalan</Header>
                  <span>{advsr.advIcno}</span>
                </Grid.Column>    */}
                
              </Grid>
            </Segment>

            <Segment color='green' style={{ width: '70%', marginLeft:'15%'}}>
               <Header as='h3' dividing>Pengalaman<Button onClick={()=>setModalOpen(true)} style={{position: 'absolute',right: 5,top: 5,outline: 'none', background:'none'}} ><Icon name='plus' color='green' /></Button> </Header>

               {(userFilter && userFilter.length)&&<RenderAdvisorExp data={userFilter}/>}

            </Segment>

            <Segment color='green' style={{ width: '70%', marginLeft:'15%'}}>
              <Header as='h3' dividing>Tahap Pendidikan<Button onClick={()=>setModalOpenAca(true)} style={{position: 'absolute',right: 5,top: 5,outline: 'none', background:'none'}} ><Icon name='plus' color='green' /></Button> </Header>

              {(userFilteraca && userFilteraca.length)&&<RenderAdvisorAca data={userFilteraca}/>}
                           
            </Segment>

            <Segment color='green' style={{ width: '70%', marginLeft:'15%'}}>
              <Header as='h3' dividing>Pencapaian<Button onClick={()=>setModalOpenAch(true)} style={{position: 'absolute',right: 5,top: 5,outline: 'none', background:'none'}} ><Icon name='plus' color='green' /></Button> </Header>

              {(userFilterach && userFilterach.length)&&<RenderAdvisorAch data={userFilterach}/>}
                           
              {/* <Grid textAlign='center' stackable columns={1} style={{ width: '100%' }}>
                <Grid.Column >
                  <Header sub>Nama</Header>
                  <span>{profile.name}</span>
                </Grid.Column>
                <Grid.Column >
                  <Header sub>Emel</Header>
                  <span>{profile.username}</span>
                  <span>{cmpny.cmpnyName}</span>
                  <span>{advsr.advIcno}</span>
                </Grid.Column>   
              </Grid> */}
            </Segment>

            <Segment color='green' style={{ width: '70%', marginLeft:'15%'}}>
              <Header as='h3' dividing>Aktiviti Lain-lain<Button onClick={()=>setModalOpenAct(true)} style={{position: 'absolute',right: 5,top: 5,outline: 'none', background:'none'}} ><Icon name='plus' color='green' /></Button> </Header>

              {(userFilteract && userFilteract.length)&&<RenderAdvisorAct data={userFilteract}/>}
                           
            </Segment>
            
          <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpen(false),resetForm()}}
              // onOpen={() => setOpen(true)}
              open={modalOpen}
          >
            <Header icon='archive' content='Tambah Pengalaman' />
            <Modal.Content>
            <Form>
            <Form.Input
              fluid
              label='Tajuk'
              onChange={e=>setadvExperience(e.target.value)}
              value={advExperience}
            />
            <Form.TextArea
              fluid
              label='Penerangan'
              onChange={e=>setadvExpDesc(e.target.value)}
              value={advExpDesc}
            />
            <Form.Input
              fluid
              label='Tarikh Mula'
              onChange={e=>setadvExpSdate(e.target.value)}
              type='month'
              value={advExpSdate}
            />
            <Form.Input
              fluid
              label='Tarikh Akhir'
              onChange={e=>setadvExpEdate(e.target.value)}
              type='month'
              value={advExpEdate}
            />
            {/* <Form.TextArea
              fluid
              label='Alamat'
              onChange={e=>setAddress(e.target.value)}
              value={address}
            /> */}
         
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

          <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpenAca(false),resetForm()}}
              open={modalOpenAca}
          >
            <Header icon='archive' content='Tambah Pendidikan' />
            <Modal.Content>
            <Form>
            <Form.Input
              fluid
              label='Pendidikan'
              onChange={e=>setacaLevel(e.target.value)}
              value={acaLevel}
            />
            <Form.TextArea
              fluid
              label='Pusat Pengajian'
              onChange={e=>setacaPlace(e.target.value)}
              value={acaPlace}
            />
            <Form.Input
              fluid
              label='Tarikh Mula'
              onChange={e=>setacaSdate(e.target.value)}
              type='month'
              value={acaSdate}
            />
            <Form.Input
              fluid
              label='Tarikh Tamat'
              onChange={e=>setacaEdate(e.target.value)}
              type='month'
              value={acaEdate}
            />
            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => {setModalOpenAca(false); resetForm();}}>
                <Icon name='remove' /> Batal
              </Button>
              <Button color='green' onClick={() => {setModalOpenAca(false); submitFormAca();}}>
                <Icon name='checkmark' /> Simpan
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpenAch(false),resetForm()}}
              open={modalOpenAch}
          >
            <Header icon='archive' content='Tambah Pencapaian' />
            <Modal.Content>
            <Form>
            <Form.Input
              fluid
              label='Tajuk'
              onChange={e=>setachTitle(e.target.value)}
              value={achTitle}
            />
            <Form.TextArea
              fluid
              label='Penerangan'
              onChange={e=>setachDesc(e.target.value)}
              value={achDesc}
            />
            <Form.Input
              fluid
              label='Tarikh'
              onChange={e=>setachYear(e.target.value)}
              type='month'
              value={achYear}
            />
            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => {setModalOpenAch(false); resetForm();}}>
                <Icon name='remove' /> Batal
              </Button>
              <Button color='green' onClick={() => {setModalOpenAch(false); submitFormAch();}}>
                <Icon name='checkmark' /> Simpan
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpenAct(false),resetForm()}}
              open={modalOpenAct}
          >
            <Header icon='archive' content='Tambah Aktiviti' />
            <Modal.Content>
            <Form>
            <Form.Input
              fluid
              label='Tajuk'
              onChange={e=>setactTitle(e.target.value)}
              value={actTitle}
            />
            <Form.TextArea
              fluid
              label='Penerangan'
              onChange={e=>setactDesc(e.target.value)}
              value={actDesc}
            />
            <Form.Input
              fluid
              label='Tarikh'
              onChange={e=>setactYear(e.target.value)}
              type='month'
              value={actYear}
            />
            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => {setModalOpenAct(false); resetForm();}}>
                <Icon name='remove' /> Batal
              </Button>
              <Button color='green' onClick={() => {setModalOpenAct(false); submitFormAct();}}>
                <Icon name='checkmark' /> Simpan
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpenProfil(false),resetForm()}}
              open={modalOpenProfil}
          >
            <Header icon='archive' content='Kemaskini Profil' />
            <Modal.Content>
            <Form>
            <Form.Input
              fluid
              label='Nama'
              onChange={e=>setName(e.target.value)}
              placeholder='sssss'
              value={name}
            />
            <Form.Input
              fluid
              label='Perihal'
              onChange={e=>setadvDesc(e.target.value)}
              value={advsr.advDescription}
            />
            <Form.Input
              fluid
              label='Lokasi Semasa'
              onChange={e=>setadvsrAddress(e.target.value)}
              value={advsr.advAddress}
            />
            <Form.Input
              fluid
              label='No kad Pengenalan'
              onChange={e=>setadvsrIcno(e.target.value)}
              value={advsr.advIcno}
            />
            Lokasi Seliaan
              <Dropdown placeholder={advsr.advPreflocation} fluid multiple selection options={options} />

            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => {setModalOpenProfil(false); resetForm();}}>
                <Icon name='remove' /> Batal
              </Button>
              <Button color='green' onClick={() => {setModalOpenProfil(false); submitFormProfil();}}>
                <Icon name='checkmark' /> Simpan
              </Button>
            </Modal.Actions>
          </Modal>

          </div>
</Transition>
  )
}
export default AdvisorProfile