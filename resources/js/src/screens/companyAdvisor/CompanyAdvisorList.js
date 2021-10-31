import React,{ useContext } from 'react'
import {
  Input,
  Form,
  Header,
  Icon,
  Select,
  Transition,Divider,
  Message,Modal,Dropdown,Table,Pagination
} from 'semantic-ui-react';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import { CompanyAdvisorContext} from './companyAdvisor';

const CompanyAdvisorList = () => {

  const companyadvisor = useContext(CompanyAdvisorContext);  
  let { path, url } = useRouteMatch();
  const [open, setOpen] = React.useState(false)
  const [productlist, setproductlist] = React.useState(companyadvisor);
  const [userFilter, setuserFilter] = React.useState(companyadvisor);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = React.useState(false);
  const [productid, setproductid] = React.useState(0);
  const [prsp_name, setname] = React.useState("");
 

  const [activePage, setActivePage] = React.useState(1);
  const [itemperpage, setitemperpage] = React.useState(10);

  


  const resetForm=()=>{
    setname("");
  }

  const editForm=({id, prsp_name})=>{
    setproductid(id);
    setname(prsp_name);
    setModalUpdateOpen(true);
  }

  const submitForm=()=>{
    
    const data={prsp_name};
    postProduct(data).then(x=>{
        setname([x]);

      }).catch(e=>console.log(e))
      resetForm();
  }

  const updateForm=()=>{

    const data={id:productid,prsp_name};
    updateProduct(data).then(x=>{
      setname([x]);
  
      }).catch(e=>console.log(e))
      resetForm();
  }

  const deleteProductList=(pk)=>{
    deleteProduct(pk).then(x=>{ 
  
      onDataChange({id:pk},"delete");
    }).catch(e=>console.log(e))
    resetForm();
  }
  
  React.useEffect(() => {

    const bootstrapAsync = async () => {
      setproductlist(companyadvisor);
      setuserFilter(companyadvisor)
    };

    bootstrapAsync();

  }, [companyadvisor]);

  const RenderProduct = props => {
    const data = props.data;
    console.log(data);
    let pageItem=[];
    let i,j,temparray;
    for (i=0,j=data.length; i<j; i+=itemperpage) {
      temparray = data.slice(i,i+itemperpage);
      pageItem.push(temparray);
    }
const tableItem = pageItem[activePage-1].map((x, i) =>
  <Table.Row key={i}>
    <Table.Cell>{i+1}</Table.Cell>
    <Table.Cell>
      <Dropdown icon="ellipsis vertical"  className='icon'pointing='top left'>
        <Dropdown.Menu className='right'>
          <Dropdown.Item  onClick={()=>editForm(x)} color='blue' icon='edit outline' text='Kemaskini Produk' />
          <Dropdown.Item  onClick={()=>deleteProductList(x.id)} icon='trash' text='Padam' />
        </Dropdown.Menu>
      </Dropdown>
    </Table.Cell>
    <Table.Cell><Link to={`${url}/details/${i}`}>{x.cmpnyName}</Link></Table.Cell>
  </Table.Row>
);

  return <Table >
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell width={1}>No</Table.HeaderCell>
      <Table.HeaderCell width={1}></Table.HeaderCell>
      <Table.HeaderCell>Nama</Table.HeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {tableItem}
  </Table.Body>
  <Table.Footer>
    <Table.Row>
      <Table.HeaderCell textAlign="center" colSpan='7'>
        <Pagination siblingRange={2} activePage={activePage} totalPages={pageItem.length} onPageChange={(e,d)=>setActivePage(d.activePage)}/>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Footer>
</Table>
  }

  return (
////////////////////////////////////////////////////////////////modal form///////////////////////////////////////////////////////////////////

<Transition transitionOnMount={true} animation="fade" duration={1000}>
<div className="in innerContainer">
  <Header as='h3'>Maklumat Syarikat</Header>
  
      {companyadvisor < 1 ? 
        <Message info>    
          <Message.Header>Tiada Syarikat</Message.Header>
          <p>Anda tidak mempunyai sebarang syarikat seliaan sekarang</p>
        </Message> :
        <RenderProduct data={companyadvisor}/>}
</div>



</Transition>
//////////////////////////////////////////////////////////////end modal form///////////////////////////////////////////////////////////////////
  )
}

export default CompanyAdvisorList