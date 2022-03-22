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
  Modal,
  Form,Popup, Dimmer, Loader,
} from 'semantic-ui-react';

import * as moment from 'moment';
import logo from '../../assets/img/gig-banner.png'; 
import { useParams, Link, useRouteMatch } from "react-router-dom";
import {ClientContext, updateCompany, getData,postFile, getCompany} from './client';
import {AuthContext} from '../auth/auth';
import {EditableLabel, HeaderAction, PromptModal} from '../../components/simplifyUi';

import dp from '../../assets/img/defaultphoto.png';
import { type } from 'jquery';


const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const ClientCmpny = () => {

 let { path, url } = useRouteMatch();
const { index } = useParams();

const {profile,cmpny,signOut} = React.useContext(AuthContext);
const [cmpnylistinfo, setcmpnylistinfo] = React.useState(cmpny);

const [users, setuser] = React.useState([]);
const [cmpnydata, setCmpny] = React.useState(null);
const [cmpnyPK, setcmpnyPK] = React.useState(0);
// const [newFile, SetNewFile] = React.useState(null); 

const [modalOpenCmpny, setmodalOpenCmpny] = React.useState(false);
const [cmpnyName, setcmpnyName] = React.useState("");
const [cmpnyConfig, setcmpnyConfig] = React.useState("");
const [regNo, setregNo] = React.useState("");
const [address, setaddress] = React.useState("");
const [telno, settelno] = React.useState("");
const [email, setemail] = React.useState("");
const [statussyarikat, setstatussyarikat] = React.useState("");
const [skimproduk, setskimproduk] = React.useState("");
const [saizindustri, setsaizindustri] = React.useState("");
const [jenisperniagaan, setjenisperniagaan] = React.useState("");
const [hasiljualan, sethasiljualan] = React.useState("");
const [pegawainama, setpegawainama] = React.useState("");
const [pegawainotel, setpegawainotel] = React.useState("");


const [cmpnyFile1, setcmpnyFile1] = React.useState("");


  React.useEffect(() => {

    const bootstrapAsync = async () => {
      setcmpnyPK(cmpny);
      setcmpnylistinfo(cmpny);
    };

    bootstrapAsync();
  }, [cmpny]);
  

  const editFormCmpny=()=>{
    setcmpnyName(cmpny.cmpnyName);
    // setcmpnyConfig(cmpny.cmpnyConfig && cmpny.cmpnyConfig.headerLogo? cmpny.cmpnyConfig.headerLogo:dp);
    setregNo(cmpny.cmpnyDetails && cmpny.cmpnyDetails.regNo? cmpny.cmpnyDetails.regNo:"");
    setaddress(cmpny.cmpnyDetails && cmpny.cmpnyDetails.address? cmpny.cmpnyDetails.address:"");
    settelno(cmpny.cmpnyDetails && cmpny.cmpnyDetails.telno? cmpny.cmpnyDetails.telno:"");
    setemail(cmpny.cmpnyDetails && cmpny.cmpnyDetails.email? cmpny.cmpnyDetails.email:"");
    setstatussyarikat(cmpny.cmpnyDetails && cmpny.cmpnyDetails.statussyarikat? cmpny.cmpnyDetails.statussyarikat:"");
    setskimproduk(cmpny.cmpnyDetails && cmpny.cmpnyDetails.skimproduk? cmpny.cmpnyDetails.skimproduk:"");
    setsaizindustri(cmpny.cmpnyDetails && cmpny.cmpnyDetails.saizindustri? cmpny.cmpnyDetails.saizindustri:"");
    setjenisperniagaan(cmpny.cmpnyDetails && cmpny.cmpnyDetails.jenisperniagaan? cmpny.cmpnyDetails.jenisperniagaan:"");
    sethasiljualan(cmpny.cmpnyDetails && cmpny.cmpnyDetails.hasiljualan? cmpny.cmpnyDetails.hasiljualan:"");
    setpegawainama(cmpny.cmpnyDetails && cmpny.cmpnyDetails.pegawainama? cmpny.cmpnyDetails.pegawainama:"");
    setpegawainotel(cmpny.cmpnyDetails && cmpny.cmpnyDetails.pegawainotel? cmpny.cmpnyDetails.pegawainotel:"");

    setmodalOpenCmpny(true);
  }
  const submitForm=()=>{
     updateCompany({...cmpny,id:cmpnyPK,cmpnyName,cmpnyDetails:{...cmpny.cmpnyDetails,regNo,address,telno,email,statussyarikat,skimproduk,saizindustri,jenisperniagaan,hasiljualan,pegawainama,pegawainotel}}).then(k=>{
      setstatussyarikat([k]);
      setskimproduk([k]);
      saizindustri([k]);
      jenisperniagaan([k]);
      hasiljualan([k]);
      pegawainama([k]);
      pegawainotel([k]);

 }).catch(e=>console.log(e))
//  location.reload()
 resetForm();
  }
  const resetForm=()=>{
    setstatussyarikat("");
    // setName("");
    // setAddress("");
    // setID(0);
  }
  const skimProduk = [
    { value: 'Produk Makanan / Minuman / Makanan Tambahan', text: 'Produk Makanan / Minuman / Makanan Tambahan' },
    { value: 'Premis Makanan', text: 'Premis Makanan' },
    { value: 'Rumah Sembelihan', text: 'Rumah Sembelihan' },
    { value: 'Barang Gunaan', text: 'Barang Gunaan' },
    { value: 'Farmaseutikal', text: 'Farmaseutikal' },
    { value: 'Logistik', text: 'Logistik' },
    { value: 'Kosmetik dan Dandanan Diri', text: 'Kosmetik dan Dandanan Diri' },
    { value: 'Pengilangan Kontrak / Original Equipment Manufacturing(OEM)', text: 'Pengilangan Kontrak / Original Equipment Manufacturing(OEM)' },
  ]
  const statusSyarikat = [
    { value: 'Bumiputra', text: 'Bumiputra' },
    { value: 'Bukan Bumiputra', text: 'Bukan Bumiputra' },
  ]
  const saizIndustri = [
    { value: 'Mikro', text: 'Mikro' },
    { value: 'Kecil', text: 'Kecil' },
    { value: 'Sederhana', text: 'Sederhana' },
    { value: 'Besar', text: 'Besar' },
  ]
  const jenisPerniagaan = [
    { value: 'Pengeluaran', text: 'Pengeluaran' },
    { value: 'Kontrak Pengeluaran', text: 'Kontrak Pengeluaran' },
    { value: 'Dagangan', text: 'Dagangan' },
  ]
  const hasilJualan = [
    { value: 'Nilai jualan tahunan <RM300,000', text: 'Nilai jualan tahunan <RM300,000' },
    { value: 'Nilai jualan tahunan RM300,000 - RM15 Juta', text: 'Nilai jualan tahunan RM300,000 - RM15 Juta' },
    { value: 'Nilai jualan tahunan RM15 Juta - RM50 Juta', text: 'Nilai jualan tahunan RM15 Juta - RM50 Juta' },
    { value: 'Nilai jualan tahunan >RM50 Juta', text: 'Nilai jualan tahunan >RM50 Juta' },
  ]
  // const hasilJualan = [
  //   { value: 'Nilai perolehan tahunan kurang daripada RM300,000.00', text: 'Nilai perolehan tahunan kurang daripada RM300,000.00' },
  //   { value: 'Nilai perolehan tahunan kurang daripada RM300,000.00 hingga RM14,999,999.99', text: 'Nilai perolehan tahunan kurang daripada RM300,000.00 hingga RM14,999,999.99' },
  //   { value: 'Nilai perolehan tahunan daripada RM15 Juta hingga RM50 Juta', text: 'Nilai perolehan tahunan daripada RM15 Juta hingga RM50 Juta' },
  //   { value: 'Nilai perolehan tahunan melebihi RM50 Juta', text: 'Nilai perolehan tahunan melebihi RM50 Juta' },
  // ]

  const updCmpnyName =x=>{
    setCmpny({...cmpny,id:cmpnyPK,cmpnyName:x})
    updateCompany({...cmpny,id:cmpnyPK,cmpnyName:x}).then(k=>{
       console.log(k);
  })
  location.reload()
  }
  
  const updConfig=x=>{
    setCmpny({...cmpny,id:cmpnyPK,cmpnyConfig:x})
    updateCompany({...cmpny,id:cmpnyPK,cmpnyConfig:x}).then(k=>{
       console.log(k);
  })
  }
  const updFile1=x=>{
    setCmpny({...cmpny,id:cmpnyPK,cmpnyFile1:x})
    updateCompany({...cmpny,id:cmpnyPK,cmpnyFile1:x}).then(k=>{
       console.log(k);
  })
  }

  const updRegNo =x=>{
    setCmpny({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,regNo:x}})
    updateCompany({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,regNo:x}}).then(k=>{
       console.log(k);
  })
  location.reload()
  }

  const updAddress =x=>{
    setCmpny({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,address:x}})
    updateCompany({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,address:x}}).then(k=>{
       console.log(k);
  })
  location.reload()
  }

  const updTelNo =x=>{
    setCmpny({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,telno:x}})
    updateCompany({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,telno:x}}).then(k=>{
       console.log(k);
  })
  location.reload()
  }

  const updEmail =x=>{
    setCmpny({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,email:x}})
    updateCompany({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,email:x}}).then(k=>{
       console.log(k);
  })
  location.reload()
  }

  const updStatusSyarikat =x=>{
    setCmpny({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,statussyarikat:x}})
    updateCompany({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,statussyarikat:x}}).then(k=>{
       console.log(k);
  })
  location.reload()
  }

  const updSaizIndustri =x=>{
    setCmpny({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,saizindustri:x}})
    updateCompany({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,saizindustri:x}}).then(k=>{
       console.log(k);
  })
  location.reload()
  }

  const updJenisPerniagaan =x=>{
    setCmpny({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,jenisperniagaan:x}})
    updateCompany({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,jenisperniagaan:x}}).then(k=>{
       console.log(k);
  })
  location.reload()
  }

  const updHasilJualan =x=>{
    setCmpny({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,hasiljualan:x}})
    updateCompany({...cmpny,id:cmpnyPK,cmpnyDetails:{...cmpny.cmpnyDetails,hasiljualan:x}}).then(k=>{
       console.log(k);
  })
  location.reload()
  }

  // const submitForm=file_path=>{
    
  //   const data={...cmpny,id:cmpnyPK,file_path};
  //   postFile(data)
  // }

  if (cmpny)
  {
    let typeindustry;
    if(cmpny.cmpnyDetails.hasiljualan==='Nilai jualan tahunan <RM300,000'){
      typeindustry='Mikro';
    }
    else if(cmpny.cmpnyDetails.hasiljualan==='Nilai jualan tahunan RM300,000 - RM15 Juta'){
      typeindustry='Kecil';
    }
    else if(cmpny.cmpnyDetails.hasiljualan==='Nilai jualan tahunan RM15 Juta - RM50 Juta'){
      typeindustry='Sederhana';
    }
    else if(cmpny.cmpnyDetails.hasiljualan==='Nilai jualan tahunan >RM50 Juta'){
      typeindustry='Besar';
    }
    else {
      typeindustry='Tiada Maklumat';
    }

     return (

      <Transition transitionOnMount={true} animation="fade" duration={1000}>
        {/* <div className="in innerContainer" style={{overflowY:'auto'}}> */}
        {/* <div style={{overflowY:'auto', height:'80vh'}}> */}
        <div>
        {/* <Header as='h3' dividing style={{ lineHeight: '2em' }}> */}
            {/* <Button size='medium' circular icon='angle left' basic color='green' as={Link} to={`${url.split("/details").shift()}`} /> */}
              {/* {cmpny.cmpnyName} </Header>


              <Segment.Group style={{ width: '70%', marginLeft:'15%'}}>
              <Segment color='green' > */}

              <Header as='h3' dividing style={{ lineHeight: '2em' }}>Syarikat {cmpny.cmpnyName} </Header>
              <Segment.Group>
                <Segment color='teal'>
              <Header as='h3' dividing>Maklumat Syarikat </Header>
 
              <HeaderAction as="h3"
              buttonRight={
              <PromptModal onSave={(x) => {
                updConfig(x);
              }}
                title="Edit Logo Syarikat"
                items={[
                  { value: cmpny.cmpnyConfig && cmpny.cmpnyConfig.headerLogo, label: "Logo Syarikat",type: "image", name: "headerLogo" },
                ]}
                buttonProps={{ size: "small", name: 'pencil', color: "green" }}
              />
            }>Logo Syarikat</HeaderAction>
           <React.Fragment>
             <br></br>
                <Image src={cmpny.cmpnyConfig && cmpny.cmpnyConfig.headerLogo? cmpny.cmpnyConfig.headerLogo:dp} size="small" centered />
            </React.Fragment>
            </Segment>

              {/* <Segment>
            <HeaderAction as="h3"
              buttonRight={
              <PromptModal onSave={(x) => {
                updFile1(x);
              }}
                title="Edit File 1"
                items={[
                  { value: cmpny.cmpnyFile1 && cmpny.cmpnyFile1.file1, label: "file1",type: "file", name: "file1" },
                ]}
                buttonProps={{ size: "small", name: 'pencil', color: "green" }}
              />
            }>File 1</HeaderAction>
            <React.Fragment>
                {cmpny.cmpnyFile1 && cmpny.cmpnyFile1.file1? cmpny.cmpnyFile1.file1:"takjadi"}
            </React.Fragment>
                </Segment> */}

              <Segment>
             
              <Grid textAlign='left' stackable columns={2} style={{ width: '100%',position:'center' }}>
                {/* <Grid.Column style={{ width: '50%', position:'center'}}> */}
                <Grid.Column><br></br>
                <Header sub>Nama Syarikat </Header> 
                  <span>{cmpny.cmpnyName && cmpny.cmpnyName? cmpny.cmpnyName:"Tiada Maklumat"}</span>
                  <Header sub>Alamat Syarikat</Header>
                  <span>{cmpny.cmpnyDetails && cmpny.cmpnyDetails.address? cmpny.cmpnyDetails.address:"Tiada Maklumat"}</span>
                  <Header sub>No Telefon Syarikat</Header>
                  <span>{cmpny.cmpnyDetails && cmpny.cmpnyDetails.telno? cmpny.cmpnyDetails.telno:"Tiada Maklumat"}</span>
                  <Header sub>Email Syarikat</Header>
                  <span>{cmpny.cmpnyDetails && cmpny.cmpnyDetails.email? cmpny.cmpnyDetails.email:"Tiada Maklumat"}</span>
                  <Header as="p" style={{ fontSize: '12px'}}>PEGAWAI YANG BOLEH DIHUBUNGI:</Header>
                  <Header sub>Nama Pegawai</Header>
                  <span>{cmpny.cmpnyDetails && cmpny.cmpnyDetails.pegawainama? cmpny.cmpnyDetails.pegawainama:"Tiada Maklumat"}</span>
                  <Header sub>No Telefon Pegawai</Header>
                  <span>{cmpny.cmpnyDetails && cmpny.cmpnyDetails.pegawainotel? cmpny.cmpnyDetails.pegawainotel:"Tiada Maklumat"}</span>
                  </Grid.Column>

                  {/* <Grid.Column style={{ width: '50%'}}>
                  <Header sub>No Pendaftaran Syarikat <Button onClick={()=>editFormCmpny()} style={{position: 'absolute',right: 5,top: 5,outline: 'none', background:'none'}} ><Icon size="large" name='pencil' color='green' /></Button></Header>  */}
                  <Grid.Column><br></br>
                  <Header sub>No Pendaftaran Syarikat </Header>        
                  <span>{cmpny.cmpnyDetails && cmpny.cmpnyDetails.regNo? cmpny.cmpnyDetails.regNo:"Tiada Maklumat"}</span>
                  <Header sub>Status Syarikat</Header>
                  <span>{cmpny.cmpnyDetails && cmpny.cmpnyDetails.statussyarikat? cmpny.cmpnyDetails.statussyarikat:"Tiada Maklumat"}</span>
                  <Header sub>Skim Produk</Header>
                  <span>{cmpny.cmpnyDetails && cmpny.cmpnyDetails.skimproduk? cmpny.cmpnyDetails.skimproduk:"Tiada Maklumat"}</span>
                  <Header sub>Jenis Perniagaan</Header>
                  <span>{cmpny.cmpnyDetails && cmpny.cmpnyDetails.jenisperniagaan? cmpny.cmpnyDetails.jenisperniagaan:"Tiada Maklumat"}</span>
                  <Header sub>Nilai Jualan Tahunan (RM)</Header>
                  <span>{cmpny.cmpnyDetails && cmpny.cmpnyDetails.hasiljualan? cmpny.cmpnyDetails.hasiljualan:"Tiada Maklumat"}</span>
                  <Header sub>Jenis Industri</Header>
                  <span>{typeindustry}</span>
                  {/* <span>{cmpny.cmpnyDetails && cmpny.cmpnyDetails.saizindustri? cmpny.cmpnyDetails.saizindustri:"Tiada Maklumat"}</span> */}
                  </Grid.Column>
                  <Popup position='right center' content='Kemaskini?' trigger={<Button onClick={()=>editFormCmpny()} style={{position: 'absolute',right: 5,top: 5,outline: 'none', background:'none'}} ><Icon size="large" name='pencil' color='green' /></Button>} />
                  </Grid>

              <div>
              {/* <Grid textAlign='left'  stackable columns={4} style={{ width: '100%' }}>

             <Grid.Column  width={14} >
                <EditableLabel
                        fluid
                        placeholder="Nama Syarikat"
                        label='Nama Syarikat'
                        value={cmpny.cmpnyName}
                        onSave={updCmpnyName}
                      />
             </Grid.Column>
             <Grid.Column  width={14} >
                <EditableLabel
                        fluid
                        placeholder="No Pendaftaran Syarikat"
                        label='No Pendaftaran Syarikat'
                        value={cmpny.cmpnyDetails && cmpny.cmpnyDetails.regNo? cmpny.cmpnyDetails.regNo:""}
                        onSave={updRegNo}
                        
                      />
             </Grid.Column>
             <Grid.Column  width={14} >
                <EditableLabel
                        fluid
                        placeholder="Farmaseutikal, Logistik, Komestik dan dandanan diri, ..."
                        label='Status Syarikat'
                        value={cmpny.cmpnyDetails && cmpny.cmpnyDetails.statussyarikat? cmpny.cmpnyDetails.statussyarikat:""}
                        onSave={updStatusSyarikat}

                      />
             </Grid.Column>
             <Grid.Column  width={14} >
                <EditableLabel
                        fluid
                        placeholder="Industri Micro, Kecil, Sederhana, Besar, .."
                        label='Saiz Industri'
                        value={cmpny.cmpnyDetails && cmpny.cmpnyDetails.saizindustri? cmpny.cmpnyDetails.saizindustri:""}
                        onSave={updSaizIndustri}

                      />
             </Grid.Column>
             <Grid.Column  width={14} >
                <EditableLabel
                        fluid
                        placeholder="Pengeluaran, Kontrak Pengeluaran, Dagangan, .."
                        label='Jenis Perniagaan'
                        value={cmpny.cmpnyDetails && cmpny.cmpnyDetails.jenisperniagaan? cmpny.cmpnyDetails.jenisperniagaan:""}
                        onSave={updJenisPerniagaan}

                      />
             </Grid.Column>
             <Grid.Column  width={14} >
                <EditableLabel
                        fluid
                        placeholder="Nilai Jualan Setahun (RM)"
                        label='Nilai Jualan Setahun (RM)'
                        value={cmpny.cmpnyDetails && cmpny.cmpnyDetails.hasiljualan? cmpny.cmpnyDetails.hasiljualan:""}
                        onSave={updHasilJualan}

                      />
             </Grid.Column>
             <Grid.Column  width={14} >
                <EditableLabel
                        fluid
                        placeholder="Alamat Syarikat"
                        label='Alamat Syarikat'
                        value={cmpny.cmpnyDetails && cmpny.cmpnyDetails.address? cmpny.cmpnyDetails.address:""}
                        onSave={updAddress}

                      />
             </Grid.Column>
             <Grid.Column  width={14} >
                <EditableLabel
                        fluid
                        placeholder="No Telefon Syarikat"
                        label='No Telefon Syarikat'
                        value={cmpny.cmpnyDetails && cmpny.cmpnyDetails.telno? cmpny.cmpnyDetails.telno:""}
                        onSave={updTelNo}

                      />
             </Grid.Column>
             <Grid.Column  width={14} >
                <EditableLabel
                        fluid
                        placeholder="Emel Syarikat"
                        label='Emel Syarikat'
                        value={cmpny.cmpnyDetails && cmpny.cmpnyDetails.email? cmpny.cmpnyDetails.email:""}
                        onSave={updEmail}
                      />
             </Grid.Column>                 
              </Grid> */}
              </div>
            </Segment>
          </Segment.Group>

          <Modal style={{position:'relative',height:'auto'}}
              onClose={() =>{ setmodalOpenCmpny(false),resetForm()}}
              open={modalOpenCmpny}
          >
            <Header icon='archive' content='Kemaskini Maklumat Syarikat' />
            <Modal.Content>
            <Form>
            <Grid textAlign='left' stackable columns={2} style={{ width: '100%' }}>
            <Grid.Column style={{ width: '50%'}}>
            <Form.Input
              fluid
              label='Nama Syarikat'
              onChange={e=>setcmpnyName(e.target.value)}
              value={cmpnyName}
            />
            <Form.TextArea
              fluid
              label='Alamat'
              onChange={e=>setaddress(e.target.value)}
              value={address}
            />
            <Form.Input
              fluid
              label='No Telefon Syarikat'
              onChange={e=>settelno(e.target.value)}
              value={telno}
            />
             <Form.Input
              fluid
              label='Email Syarikat'
              type='email'
              onChange={e=>setemail(e.target.value)}
              value={email}
            />
            <Header as="p" style={{ fontSize: '13px'}}>Pegawai Yang Boleh Dihubungi:</Header>
            <Form.Input
              fluid
              label='Nama Pegawai'
              onChange={e=>setpegawainama(e.target.value)}
              value={pegawainama}
            />
            <Form.Input
              fluid
              label='No Telefon Pegawai'
              onChange={e=>setpegawainotel(e.target.value)}
              value={pegawainotel}
            />
             </Grid.Column>

             <Grid.Column style={{ width: '50%'}}>
             <Form.Input
              fluid
              label='No Pendaftaran Syarikat'
              onChange={e=>setregNo(e.target.value)}
              value={regNo}
            />
           <Form.Dropdown
              placeholder={statussyarikat}
              label='Status Syarikat'
              fluid
              search
              selection
              options={statusSyarikat}
              onChange={(e,data)=>setstatussyarikat(data.value)}
              value={statussyarikat}
            />
            <Form.Dropdown
              placeholder={skimproduk}
              label='Skim Produk'
              fluid
              search
              selection
              options={skimProduk}
              onChange={(e,data)=>setskimproduk(data.value)}
              value={skimproduk}
            />
            <Form.Dropdown
              placeholder={jenisperniagaan}
              label='Jenis Perniagaan'
              fluid
              search
              selection
              options={jenisPerniagaan}
              onChange={(e,data)=>setjenisperniagaan(data.value)}
              value={jenisperniagaan}
            />
             <Form.Dropdown
              placeholder={hasiljualan}
              label='Nilai Jualan Setahun(RM)'
              fluid
              search
              selection
              options={hasilJualan}
              onChange={(e,data)=>sethasiljualan(data.value)}
              value={hasiljualan}
            />
            <Form.Input
              fluid
              label='Jenis Industri'
              onChange={e=>setsaizindustri(e.target.value)}
              value={typeindustry}
              disabled = {true}
            />
            </Grid.Column>
            </Grid>
            </Form>

            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => {setmodalOpenCmpny(false); resetForm();}}>
                <Icon name='remove' /> Batal
              </Button>
              <Button color='green' onClick={() => {setmodalOpenCmpny(false); submitForm();}}>
                <Icon name='checkmark' /> Simpan
              </Button>
            </Modal.Actions>
          </Modal>
          

        </div>
        
      </Transition>
    )}
    else
    return (<Header as='h3' >Loading....</Header>)
}


export default ClientCmpny