import React,{useContext } from 'react'
import {
  Input, Menu, Segment,Form,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Sidebar,
  Transition,Divider,
  List,
  Button,Modal,Dropdown,Table,Pagination

} from 'semantic-ui-react';

import * as moment from 'moment';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import { deleteAdvisor,deleteUser,AdvisorContext,createAdvisor ,postAdvisor,postAdvisorLevel,updateADLevel} from './advisor';

const AdvisorList = () => {

  const {usr,cmpny,roles,level} = useContext(AdvisorContext);
  let { path, url } = useRouteMatch();
  const [open, setOpen] = React.useState(false)
  const [userlist, setuserlist] = React.useState(usr);
  const [userFilter, setuserFilter] = React.useState(usr);
  
  
  
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalLevelOpen, setModalLevelOpen] = React.useState(false);
  const [modalupdateLevelOpen, setModalupdateLevelOpen] = React.useState(false);
  const [userid, setuserid] = React.useState(0);
  const [name, setname] = React.useState("");
  const [username, setusername] = React.useState("");
  const [role, setrole] = React.useState(3);
  const [adl_fk_user_id, setiduser] = React.useState("");
  const [adl_fk_level, setlevel] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [password2, setpassword2] = React.useState("");
  const [company, setcompany] = React.useState(2);

  const [activePage, setActivePage] = React.useState(1);
  const [itemperpage, setitemperpage] = React.useState(10);


  
  React.useEffect(() => {

    const bootstrapAsync = async () => {
      setuserlist(usr);
      setuserFilter(usr)
    };

    bootstrapAsync();

  }, [usr]);

  const RenderAdvisor = props => {
    const data = props.data;
    const tableItem = data.map((x, i) =>
    <Table.Row key={i}>
    <Table.Cell>{i+1}</Table.Cell>
    <Table.Cell>
    <Dropdown icon="ellipsis vertical"  className='icon' 
    pointing='top left'>
    <Dropdown.Menu className='right'>
      {x.level_name == null ? <Dropdown.Item  onClick={()=>editLevelForm(x)} color='blue' icon='pencil' text='Add User Level' /> 
      : <Dropdown.Item  onClick={()=>updateLevelForm(x)} color='blue' icon='pencil' text='Update User Level' />}
      <Dropdown.Item  onClick={()=>editForm(x)} color='blue' icon='edit outline' text='Kemaskini' />
      <Dropdown.Item  onClick={()=>deleteUserForm(x.id)} icon='trash' text='Padam' />
    </Dropdown.Menu>
  </Dropdown>
    </Table.Cell>
    <Table.Cell><Link to={`${url}/details/${i}`}>{x.name}</Link></Table.Cell>
    <Table.Cell>{x.username}</Table.Cell>
    <Table.Cell>{x.level_name == null ? <em>tidak diset</em> : x.level_name}</Table.Cell>
    <Table.Cell>{x.level_max_user == null ? "" : x.total +'/'+ x.level_max_user}</Table.Cell>
    <Table.Cell>{x.lastLogin}</Table.Cell>

    
    <Table.Cell>
      </Table.Cell>
    </Table.Row>
);

  return  <Table>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>No</Table.HeaderCell>
      <Table.HeaderCell></Table.HeaderCell>
      <Table.HeaderCell>Nama</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
      <Table.HeaderCell>Tahap</Table.HeaderCell>
      <Table.HeaderCell>Jumlah Syarikat</Table.HeaderCell>
      <Table.HeaderCell>Log Masuk Terakhir</Table.HeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {tableItem}
  </Table.Body>
</Table>
  }

  
  const resetForm=()=>{
    setname("");
    setusername("");
    setpassword("");
    setpassword2("");
    setuserid(0);

  }

  const editForm=({name,username,id,cmpnyID,roleFK})=>{
    setname(name);
    setuserid(id);
    setrole(roleFK);
    setusername(username);
    setpassword("default");
    setpassword2("default");
    setcompany(cmpnyID)
    setModalOpen(true);
  }

  const editLevelForm=({id,adl_fk_user_id,adl_fk_level})=>{
    setuserid(id);
    setiduser(adl_fk_user_id);
    setlevel(adl_fk_level);
    setModalLevelOpen(true);
  }

  const updateLevelForm=({id,adl_fk_user_id,adl_fk_level})=>{
    setuserid(id);
    setiduser(adl_fk_user_id);
    setlevel(adl_fk_level);
    setModalupdateLevelOpen(true);
  }
  const deleteUserForm=(pk)=>{
    deleteUser(pk).then(x=>{        
        onDataChange({id:pk},"delete");
        
        setuserlist(usr);
        setuserFilter(usr);    
    }).catch(e=>console.log(e))
    resetForm();
  }

  const submitForm=()=>{
    const data={id:userid,name,username,cmpnyid:company,password,role};
    postAdvisor(data).then(x=>{
      if(userlist){       
       delete x.password;
       let currentuser = JSON.parse(JSON.stringify(userlist));

       let cmpnyindex=cmpny.findIndex(obj => {return obj.key === x.cmpnyFK});
       let roleindex=roles.findIndex(obj => {return obj.key === x.roleFK});
      //  x.cmpnyName=cmpny[cmpnyindex].text;
       x.rolename=roles[roleindex].text;

         let index=currentuser.findIndex(obj => {return obj.id === x.id});
         if(index<0){
           currentuser.push(x);
         }
         else{currentuser[index]=x;
         }
         setuserlist(currentuser);
         setuserFilter(currentuser);
 
       }
       else{
        setuserlist([x]);
        setuserFilter([x]);
       }
    }).catch(e=>console.log(e))
    resetForm();
  }

  const submitLevelForm=()=>{
    const data={id:userid,adl_fk_user_id,adl_fk_level};
    postAdvisorLevel(data).then(x=>{
      setiduser([x]);
      setlevel([x]);
    }).catch(e=>console.log(e))
    resetForm();
  }

  const submitUpdateLevelForm=()=>{
    const data={id:userid,adl_fk_user_id,adl_fk_level};
    updateADLevel(data).then(x=>{
      setiduser([x]);
      setlevel([x]);
    }).catch(e=>console.log(e))
    resetForm();
  }

  return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer">

    <Header as='h3' floated='left'>Senarai Advisor</Header>
       
        <Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Tambah</Button>
      <Divider/>
      <div style={{height:'68vh', overflowY:'auto'}}>
      {(userFilter && userFilter.length)&&<RenderAdvisor data={userFilter}/>}
  <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpen(false),resetForm()}}
              // onOpen={() => setOpen(true)}
              open={modalOpen}
          >
            <Header icon='archive' content='Maklumat Advisor' />
            <Modal.Content>
            <Form>
            <Form.Group widths='equal'>
            <Form.Input
              fluid
              label='Nama'
              onChange={e=>setname(e.target.value)}
              value={name}
            />
            <Form.Input
              fluid
              label='Emel'
              onChange={e=>setusername(e.target.value)}
              value={username}
            />
          </Form.Group>
              <Form.Group widths='equal'>
            <Form.Input
              fluid
              label='Katalaluan'
              type="password"
              onChange={e=>setpassword(e.target.value)}
              value={password}
            />
            <Form.Input
              fluid
              label='Sahkan Katalaluan'
              type="password"
              onChange={e=>setpassword2(e.target.value)}
              value={password2}
            />
          </Form.Group>
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


  {/* =-=====================-================================================modal add level =-==========================================================*/}

    <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalLevelOpen(false),resetForm()}} open={modalLevelOpen}>
            <Header icon='archive' content='Maklumat Advisor' />
            <Modal.Content>
            <Form>
            <Form.Group widths='equal'>
              <div hidden = {true}>
              <Form.Input
              fluid
              label='Nama'
              onChange={e=>setiduser(e.target.value)}
              value={adl_fk_user_id}
            />
              </div>
          <Form.Dropdown
              placeholder='Tahap'
              label='Tahap'
              fluid
              search
              selection
              value={adl_fk_level}
              onChange={(e,data)=>setlevel(data.value)}
              options={level}
          />  
          </Form.Group>
            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => {setModalLevelOpen(false); resetForm();}}>
                <Icon name='remove' /> Batal
              </Button>
              <Button color='green' onClick={() => {setModalLevelOpen(false); submitLevelForm();}}>
                <Icon name='checkmark' /> Simpan
              </Button>
            </Modal.Actions>
          </Modal>  


{/* =-=====================-================================================modal update level =-==========================================================*/}

  <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalupdateLevelOpen(false),resetForm()}} open={modalupdateLevelOpen}>
          <Header icon='archive' content='Maklumat Advisor Update' />
          <Modal.Content>
          <Form>
          <Form.Group widths='equal'>
            <div hidden = {true}>
            <Form.Input
            fluid
            label='Nama'
            onChange={e=>setiduser(e.target.value)}
            value={adl_fk_user_id}
          />
            </div>
        <Form.Dropdown
            placeholder='Tahap'
            label='Tahap'
            fluid
            search
            selection
            value={adl_fk_level}
            onChange={(e,data)=>setlevel(data.value)}
            options={level}
        />  
        </Form.Group>
          </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={() => {setModalupdateLevelOpen(false); resetForm();}}>
              <Icon name='remove' /> Batal
            </Button>
            <Button color='green' onClick={() => {setModalupdateLevelOpen(false); submitUpdateLevelForm();location.reload()}}>
              <Icon name='checkmark' /> Simpan
            </Button>
          </Modal.Actions>
        </Modal>    
  </div>
        </div>
    </Transition>
  )
}

export default AdvisorList