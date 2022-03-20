
import React, { Component,useContext } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Table,
  Image,
  Message,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import axios from 'axios';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import {SupplierContext} from '../supplier/Supplier';
import 'react-toastify/dist/ReactToastify.css';
import * as moment from 'moment';
import { LinkPreview } from '@dhaiwat10/react-link-preview';

export const getExp = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getexp').then((response) => {
      const test = response.data;
      console.log(test)
    })
    
  });
}

const Home = () => {
  
  const {expired_date} = useContext(SupplierContext);

  const RenderSupplier = props => {
  console.log(props)
  const data = props.data;
  const listItems = data.map((x) =>
  <>
  {x.days_left < 120 ? 
    <Table.Row className="row-error">
      <Table.Cell>{x.sp_name}</Table.Cell>
      <Table.Cell>{x.spcb_cert_bodies == null ? "Tiada": x.spcb_cert_bodies}</Table.Cell>
      <Table.Cell>{x.spcb_date_cert == null ? "Tiada": moment(x.spcb_date_cert).format('DD/MM/YYYY')}</Table.Cell>
      <Table.Cell>{x.days_left} hari lagi</Table.Cell>
    </Table.Row>
    :
    <Table.Row className="row-warning">
      <Table.Cell >{x.sp_name}</Table.Cell>
      <Table.Cell>{x.spcb_cert_bodies == null ? "Tiada": x.spcb_cert_bodies}</Table.Cell>
      <Table.Cell>{x.spcb_date_cert == null ? "Tiada": moment(x.spcb_date_cert).format('DD/MM/YYYY')}</Table.Cell>
      <Table.Cell>{x.days_left} hari lagi</Table.Cell>
    </Table.Row> 
  } 
    
  </>
  );
  return <Table id="pdfdiv">
<Table.Header>
 <Table.Row>
 <Table.HeaderCell>Nama Pembekal</Table.HeaderCell>
   <Table.HeaderCell>Nama Sijil Pembekal</Table.HeaderCell>
   <Table.HeaderCell>Tarikh Tamat</Table.HeaderCell>
   <Table.HeaderCell>Tempoh</Table.HeaderCell>
 </Table.Row>
</Table.Header>

<Table.Body>
  {listItems}
</Table.Body>
</Table>
}
return (
<>
    <Segment style={{ padding: '0em 0em' }} vertical>
      <Container text>
        <Grid>
          <Grid.Column textAlign="center">
            <Header as='h3' style={{ fontSize: '2em' }}>
              Senarai Sijil Halal Pembekal Yang Hampir Tamat Tempoh
            </Header>
            {expired_date < 1 ? 
              <Message info>    
                <Message.Header>Tiada Maklumat</Message.Header>
                <p>Tiada Maklumat Dalam Pangkalan Data</p>
              </Message> :
              <RenderSupplier data={expired_date}/>}
          </Grid.Column>
        </Grid>
      <br></br>
        <Divider></Divider>
      <br></br>
        <Grid>
          <Grid.Column textAlign="center">
            <Header as='h3' style={{ fontSize: '2em' }}>
              Senarai Bahan Mentah Terlalu banyak?
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Dengan sistem ini, proses untuk menambah bahan mentah yang digunakan oleh produk anda dengan memilih pembekal yang telah didaftar. Sekiranya pembekal belum didaftarkan, anda boleh daftarkannya sendiri!
            </p>
            <Button as='a' size='large' href='supplier'>
              Daftar Pembekal
            </Button>
            <Button as='a' size='large' href='product'>
              Tambah Produk
            </Button>
          </Grid.Column>
        </Grid>
        <br></br>
        <Divider></Divider>
        <br></br>
        <Grid>
          <Grid.Column textAlign="center">
            <Header as='h3' style={{ fontSize: '2em' }}>
              Baca Berita Terkini JAKIM
            </Header>

            <LinkPreview url='https://www.halal.gov.my/v4/index.php?data=bW9kdWxlcy9uZXdzOzs7Ow==&utama=ann&ids=20170104586c72bbd2a49' descriptionLength='Berita terkini dari JAKIM' fallbackImageSrc='/images/banner-berita.png'  margin="30px auto" width='700px' />
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>    
</>
  )
  
}

export default Home