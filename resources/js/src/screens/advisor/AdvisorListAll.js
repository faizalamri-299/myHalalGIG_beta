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

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import { deleteAdvisor,deleteUser,AdvisorContext,createAdvisor ,postAdvisor} from './advisor';

const AdvisorList = () => {

  const advisorall = useContext(AdvisorContext);
  let { path, url } = useRouteMatch();
  const [open, setOpen] = React.useState(false)
  const [userlist, setuserlist] = React.useState(advisorall);
  const [userFilter, setuserFilter] = React.useState(advisorall);
  
  
  
  const [modalOpen, setModalOpen] = React.useState(false);
  const [userid, setuserid] = React.useState(0);
  const [name, setname] = React.useState("");
  const [username, setusername] = React.useState("");
  const [role, setrole] = React.useState(3);
  const [password, setpassword] = React.useState("");
  const [password2, setpassword2] = React.useState("");
  const [company, setcompany] = React.useState(null);

  const [activePage, setActivePage] = React.useState(1);
  const [itemperpage, setitemperpage] = React.useState(10);


  
  React.useEffect(() => {

    const bootstrapAsync = async () => {
      setuserlist(advisorall);
      setuserFilter(advisorall)
    };

    bootstrapAsync();

  }, [advisorall]);

  const RenderAdvisor = props => {
    const data = props.data;
    const tableItem = data.map((x, i) =>
    <Table.Row key={i}>
    <Table.Cell>{i+1}</Table.Cell>
    <Table.Cell>
    <Dropdown icon="ellipsis vertical"  className='icon' 
    pointing='top left'>
    <Dropdown.Menu className='right'>
      <Dropdown.Item  onClick={()=>editForm(x)} color='blue' icon='edit outline' text='Edit user' />
      <Dropdown.Item  onClick={()=>deleteUserForm(x.id)} icon='trash' text='Remove user' />
    </Dropdown.Menu>
  </Dropdown>
    </Table.Cell>
    <Table.Cell>{x.cmpnyName}</Table.Cell>

    
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
        <Table.HeaderCell>Nama</Table.HeaderCell>
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

  const deleteUserForm=(pk)=>{
    deleteUser(pk).then(x=>{        
        onDataChange({id:pk},"delete");
        
        setuserlist(advisorall);
        setuserFilter(advisorall);    
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

  return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer">

    <Header as='h3' floated='left'>Senarai Advisor</Header>
       
        <Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Add</Button>
      <Divider/>
      <div style={{height:'70vh', overflowY:'auto'}}>
      {(userFilter && userFilter.length)&&<RenderAdvisor data={userFilter}/>}
     
  </div>
        </div>
    </Transition>
  )
}

export default AdvisorList