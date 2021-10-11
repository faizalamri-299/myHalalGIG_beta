import React,{ useContext } from 'react'
import {
  Input,
  Form,
  Header,
  Icon,
  Select,
  Transition,Divider,
  Button,Modal,Dropdown,Table,Pagination,Message
} from 'semantic-ui-react';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";

import { deleteProduct,ProductContext, getProduct, postProduct, updateProduct} from './Product';

const ProductList = () => {

  const {product,supplier} = useContext(ProductContext);  
  let { path, url } = useRouteMatch();
  const [open, setOpen] = React.useState(false)
  const [productlist, setproductlist] = React.useState(product);
  const [userFilter, setuserFilter] = React.useState(product);
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
      if(productlist){

       let currentproduct = JSON.parse(JSON.stringify(productlist));
         let index=currentproduct.findIndex(obj => {return obj.id === x.id});
         if(index<0){
          currentproduct.push(x);
         }
         else{currentproduct[index]=x;
         }
         setproductlist(currentproduct);
         setuserFilter(currentproduct);
       }
       else{
        setproductlist([x]);
        setuserFilter([x]);
       } 
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
            deleteProduct(pk)
            location.reload(); //if click button ok, apa dia buat
          } else {
            location.reload();
          }
        })
      } else {
        swal("Item tidak dipadam :)");
      }
    })
    resetForm();
  }
  
  React.useEffect(() => {

    const bootstrapAsync = async () => {
      setproductlist(product);
      setuserFilter(product)
    };

    bootstrapAsync();

  }, [product]);

  const RenderProduct = props => {
    const data = props.data;
    // let pageItem=[];
    // let i,j,temparray;
    // for (i=0,j=data.length; i<j; i+=itemperpage) {
    //   temparray = data.slice(i,i+itemperpage);
    //   pageItem.push(temparray);
    // }
const tableItem = data.map((x, i) =>
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
    <Table.Cell><Link to={`${url}/details/${i}`}>{x.prsp_name}</Link></Table.Cell>
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
</Table>
  }

  return (
////////////////////////////////////////////////////////////////modal form///////////////////////////////////////////////////////////////////
<Transition transitionOnMount={true} animation="fade" duration={1000}>
  <div className="in innerContainer">
    <Header as='h6' fluid floated='right'>
        <Input icon={{ name: 'search', link: true }} onChange={e=>{
          let filter=e.target.value.toLowerCase()
          const filterData = productlist.filter(({ name, username,cmpnyName,rolename }) =>
          name.toLowerCase().indexOf(filter) > -1 || username.toLowerCase().indexOf(filter) > -1
          || cmpnyName.toLowerCase().indexOf(filter) > -1|| rolename.toLowerCase().indexOf(filter) > -1);
          setuserFilter(filterData)
        }}
        placeholder='Cari Produk...'
      />
    </Header>

    <Header as='h3' floated='left'>Senarai Produk</Header>
    
    <Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Add</Button>
    <Divider/>
      <div style={{height:'70vh', overflowY:'auto'}}>
        {/* {(userFilter && userFilter.length)&&<RenderProduct data={userFilter}/>} */}
        {userFilter < 1 ? 
        <Message info>    
          <Message.Header>Tiada Maklumat</Message.Header>
          <p>Tiada Maklumat Dalam Pangkalan Data</p>
        </Message> :
        (userFilter && userFilter.length)&&<RenderProduct data={userFilter}/>}
        
{/*///////////////////////////////////////////////////////////////////// Modal Add ////////////////////////////////////////////////////////////////////////////////////// */}
      <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalOpen(false),resetForm()}} open={modalOpen}>
        <Header icon='archive' content='Tambah Produk' />
          <Modal.Content>
          <Form>
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              label='Nama'
              onChange={e=>setname(e.target.value)}
              value={prsp_name}
            />         
          </Form.Group>
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
{/*///////////////////////////////////////////////////////////////////// Modal Add ////////////////////////////////////////////////////////////////////////////////////// */}

{/*///////////////////////////////////////////////////////////////////// Modal update ////////////////////////////////////////////////////////////////////////////////////// */}
<Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalUpdateOpen(false),resetForm()}} open={modalUpdateOpen}>
        <Header icon='archive' content='Kemaskini Produk' />
          <Modal.Content>
          <Form>
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              label='Nama'
              onChange={e=>setname(e.target.value)}
              value={prsp_name}
            />         
          </Form.Group>
          </Form>
          </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => {setModalUpdateOpen(false); resetForm();}}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' onClick={() => {setModalUpdateOpen(false); updateForm();}}>
            <Icon name='checkmark' /> Update
          </Button>
        </Modal.Actions>
      </Modal>
{/*///////////////////////////////////////////////////////////////////// Modal update ////////////////////////////////////////////////////////////////////////////////////// */}
    </div>
  </div>
</Transition>
//////////////////////////////////////////////////////////////end modal form///////////////////////////////////////////////////////////////////
  )
}

export default ProductList