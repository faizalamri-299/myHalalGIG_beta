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
  Button,Modal,Dropdown,Table,Pagination,Label

} from 'semantic-ui-react';

import * as moment from 'moment';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

// import { deleteAdvisor,deleteUser,AdvisorContext,createAdvisor ,postAdvisor,postAdvisorLevel,updateADLevel} from './advisor';

import { AuditorContext} from './auditor';
import {getRoles } from '../../components/function';

import {deleteUser, postUser} from '../subscription/subscription';


const UserList = ({onDataChange,id}) => {

  const {users,cmpny,level} = useContext(AuditorContext);
  let { path, url } = useRouteMatch();
  const [open, setOpen] = React.useState(false)
  const [userlist, setuserlist] = React.useState(users);
  const [userFilter, setuserFilter] = React.useState(users);

  const [userrole, setuserrole] = React.useState("");
  const [roles, setRoles] = React.useState([]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalLevelOpen, setModalLevelOpen] = React.useState(false);
  const [modalupdateLevelOpen, setModalupdateLevelOpen] = React.useState(false);
  const [userid, setuserid] = React.useState(0);
  const [name, setname] = React.useState("");
  const [username, setusername] = React.useState("");

  const [password, setpassword] = React.useState("");
  const [password2, setpassword2] = React.useState("");
  const [company, setcompany] = React.useState("");

  const [activePage, setActivePage] = React.useState(1);
  const [itemperpage, setitemperpage] = React.useState(10);


  
  React.useEffect(() => {

    const bootstrapAsync = async () => {
      setuserlist(users);
      setuserFilter(users);

      getRoles().then(x => {
        const ddl =  x.map((x,i) =>
        ({
          key: x.rolePK,
          text: x.rolename,
          value: x.rolePK,
        }))
        setRoles(ddl);
      });

    };

    bootstrapAsync();

  }, [users]);


  const resetForm=()=>{
    setname("");
    setusername("");
    setpassword("");
    setpassword2("");
    setuserid(0);

  }

  const editForm=({name,username,id,roleFK})=>{
    console.log(roleFK)
    setname(name);
    setuserid(id);
    setuserrole(roleFK);
    setusername(username);
    setpassword("default");
    setpassword2("default");
    setModalOpen(true);
  }

  const submitForm=()=>{
    const data={id:userid,name,username,cmpnyid:id,password,role:userrole};
    postUser(data).then(x=>{
      onDataChange(x,"edit");
    }).catch(e=>console.log(e))
    resetForm();
    setModalOpen(false);
  }

  const deleteUserForm=(pk)=>{
    deleteUser(pk).then(x=>{ 

      onDataChange({id:pk},"delete");
    }).catch(e=>console.log(e))
    resetForm();
  }

  const tableItem = userFilter.map((x, i) =>
  <Table.Row key={i}>
  <Table.Cell>{i+1}</Table.Cell>
  <Table.Cell>
  <Dropdown icon="ellipsis vertical"  className='icon' 
  pointing='top left'>
  <Dropdown.Menu className='right'>
    <Dropdown.Item  onClick={()=>editForm(x)} color='blue' icon='edit outline' text='Kemaskini' />
    <Dropdown.Item  onClick={()=>deleteUserForm(x.id)} icon='trash' text='Padam' />
  </Dropdown.Menu>
</Dropdown>
  </Table.Cell>
  <Table.Cell>
    {/* <Link to={`${url}/details/${i}`}> */}
    {x.name}
    {/* </Link> */}
    </Table.Cell>
  <Table.Cell>{x.username}</Table.Cell>
  <Table.Cell>{x.rolename}</Table.Cell>
  <Table.Cell>{x.lastLogin}</Table.Cell>
  
  <Table.Cell>
    </Table.Cell>
  </Table.Row>
);

return <React.Fragment>
    <Button fluid as='div' labelPosition='right'>
    <Button fluid onClick={()=>setModalOpen(true)} basic color='green' > <Icon name='plus' />Tambah</Button>
    </Button>
      
      <Divider/>
      <div className="clientUserTable">
     {userFilter?
  
      <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>No</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Login ID</Table.HeaderCell>
        <Table.HeaderCell>Roles</Table.HeaderCell>
        <Table.HeaderCell>Last Login</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {tableItem}
    </Table.Body>
  </Table>
  :
  <Dimmer active>
    <Loader>Loading</Loader>
  </Dimmer>}

  <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setModalOpen(false),resetForm()}}
              // onOpen={() => setOpen(true)}
              open={modalOpen}
          >
            <Header icon='archive' content='User Management' />
            <Modal.Content>
            <Form id="userEdit" onSubmit={()=>submitForm()}>
            <Form.Group widths='equal'>
            <Form.Input
              required
              fluid
              label='Nama'
              onChange={e=>setname(e.target.value)}
              value={name}
            />
            <Form.Input
              required
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
              required
              fluid
              label='Sahkan Katalaluan'
              type="password"
              onChange={e=>setpassword2(e.target.value)}
              value={password2}
            />
          </Form.Group>
          <Form.Dropdown
                    placeholder='Role'
                    fluid
                    search
                    selection
                    value={userrole}
                    onChange={(e,data)=>setuserrole(data.value)}
                    options={roles}
                  />
            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => {setModalOpen(false); resetForm();}}>
                <Icon name='remove' /> Batal
              </Button>
              <Button color='green' type="submit" form="userEdit" >
                <Icon name='checkmark' /> Simpan
              </Button>
            </Modal.Actions>
          </Modal>

         
  </div>
  </React.Fragment>
}

export default UserList