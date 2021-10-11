import React,{ useContext, useState,useEffect} from 'react'

import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {
  Input,
  Form,
  Header,
  Icon,
  Transition,Divider,
  Button,Modal,Dropdown,Table,Pagination,Message
} from 'semantic-ui-react';

import {AuthContext} from '../../screens/auth/auth';
import {Switch,Route,Link,useRouteMatch} from "react-router-dom";
import swal from 'sweetalert';
import { deleteSupplier,SupplierContext, getSupplier, postSupplier, updateSupplier} from './Supplier';

const SupplierList = () => {

  const {supplier,User}  = useContext(SupplierContext);  
  const { profile,cmpny,signOut,changeAccess } = React.useContext(AuthContext);
  let { path, url } = useRouteMatch();
  const [open, setOpen] = React.useState(false)
  const [supplierlist, setsuppliernamelist] = React.useState(supplier);
  const [SupplierFilter, setuserFilter] = React.useState(supplier);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = React.useState(false);
  const [supplierid, setsupplierid] = React.useState(0);
  const [sp_name, setsuppliername] = React.useState("");
  const [sp_address, setaddress] = React.useState("");
  const [sp_origin_country, setorigincountry] = React.useState("");
  const [sp_status, setsupplierstatus] = React.useState("");
  const [activePage, setActivePage] = React.useState(1);
  const [itemperpage, setitemperpage] = React.useState(10);
  const [currentDate, setNewDate] = useState(null);

  const countries = [
    {text: 'Afghanistan',  value: 'Afghanistan'},
    {text: 'Aland Islands',  value: 'Aland Islands'},
    {text: 'Albania',  value: 'Albania'},
    {text: 'Algeria',  value: 'Algeria'},
    {text: 'American Samoa',  value: 'American Samoa'},
    {text: 'Andorra',  value: 'Andorra'},
    {text: 'Angola',  value: 'Angola'},
    {text: 'Anguilla',  value: 'Anguilla'},
    {text: 'Antigua',  value: 'Antigua'},
    {text: 'Argentina',  value: 'Argentina'},
    {text: 'Armenia',  value: 'Armenia'},
    {text: 'Aruba',  value: 'Aruba'},
    {text: 'Australia',  value: 'Australia'},
    {text: 'Austria',  value: 'Austria'},
    {text: 'Azerbaijan',  value: 'Azerbaijan'},
    {text: 'Bahamas',  value: 'Bahamas'},
    {text: 'Bahrain',  value: 'Bahrain'},
    {text: 'Bangladesh',  value: 'Bangladesh'},
    {text: 'Barbados',  value: 'Barbados'},
    {text: 'Belarus',  value: 'Belarus'},
    {text: 'Belgium',  value: 'Belgium'},
    {text: 'Belize',  value: 'Belize'},
    {text: 'Benin',  value: 'Benin'},
    {text: 'Bermuda',  value: 'Bermuda'},
    {text: 'Bhutan',  value: 'Bhutan'},
    {text: 'Bolivia',  value: 'Bolivia'},
    {text: 'Bosnia',  value: 'Bosnia'},
    {text: 'Botswana',  value: 'Botswana'},
    {text: 'Bouvet Island',  value: 'Bouvet Island'},
    {text: 'Brazil',  value: 'Brazil'},
    {text: 'British Virgin Islands',  value: 'British Virgin Islands'},
    {text: 'Brunei',  value: 'Brunei'},
    {text: 'Bulgaria',  value: 'Bulgaria'},
    {text: 'Burkina Faso',  value: 'Burkina Faso'},
    {text: 'Burma',  value: 'Burma'},
    {text: 'Burundi',  value: 'Burundi'},
    {text: 'Caicos Islands',  value: 'Caicos Islands'},
    {text: 'Cambodia',  value: 'Cambodia'},
    {text: 'Cameroon',  value: 'Cameroon'},
    {text: 'Canada',  value: 'Canada'},
    {text: 'Cape Verde',  value: 'Cape Verde'},
    {text: 'Cayman Islands',  value: 'Cayman Islands'},
    {text: 'Central African Republic',  value: 'Central African Republic'},
    {text: 'Chad',  value: 'Chad'},
    {text: 'Chile',  value: 'Chile'},
    {text: 'China',  value: 'China'},
    {text: 'Christmas Island',  value: 'Christmas Island'},
    {text: 'Cocos Islands',  value: 'Cocos Islands'},
    {text: 'Colombia',  value: 'Colombia'},
    {text: 'Comoros',  value: 'Comoros'},
    {text: 'Congo',  value: 'Congo'},
    {text: 'Congo Brazzaville',  value: 'Congo Brazzaville'},
    {text: 'Cook Islands',  value: 'Cook Islands'},
    {text: 'Costa Rica',  value: 'Costa Rica'},
    {text: 'Cote Divoire',  value: 'Cote Divoire'},
    {text: 'Croatia',  value: 'Croatia'},
    {text: 'Cuba',  value: 'Cuba'},
    {text: 'Cyprus',  value: 'Cyprus'},
    {text: 'Czech Republic',  value: 'Czech Republic'},
    {text: 'Denmark',  value: 'Denmark'},
    {text: 'Djibouti',  value: 'Djibouti'},
    {text: 'Dominica',  value: 'Dominica'},
    {text: 'Dominican Republic',  value: 'Dominican Republic'},
    {text: 'Ecuador',  value: 'Ecuador'},
    {text: 'Egypt',  value: 'Egypt'},
    {text: 'El Salvador',  value: 'El Salvador'},
    {text: 'England',  value: 'England'},
    {text: 'Equatorial Guinea',  value: 'Equatorial Guinea'},
    {text: 'Eritrea',  value: 'Eritrea'},
    {text: 'Estonia',  value: 'Estonia'},
    {text: 'Ethiopia',  value: 'Ethiopia'},
    {text: 'Europeanunion',  value: 'Europeanunion'},
    {text: 'Falkland Islands',  value: 'Falkland Islands'},
    {text: 'Faroe Islands',  value: 'Faroe Islands'},
    {text: 'Fiji',  value: 'Fiji'},
    {text: 'Finland',  value: 'Finland'},
    {text: 'France',  value: 'France'},
    {text: 'French Guiana',  value: 'French Guiana'},
    {text: 'French Polynesia',  value: 'French Polynesia'},
    {text: 'French Territories',  value: 'French Territories'},
    {text: 'Gabon',  value: 'Gabon'},
    {text: 'Gambia',  value: 'Gambia'},
    {text: 'Georgia',  value: 'Georgia'},
    {text: 'Germany',  value: 'Germany'},
    {text: 'Ghana',  value: 'Ghana'},
    {text: 'Gibraltar',  value: 'Gibraltar'},
    {text: 'Greece',  value: 'Greece'},
    {text: 'Greenland',  value: 'Greenland'},
    {text: 'Grenada',  value: 'Grenada'},
    {text: 'Guadeloupe',  value: 'Guadeloupe'},
    {text: 'Guam',  value: 'Guam'},
    {text: 'Guatemala',  value: 'Guatemala'},
    {text: 'Guinea',  value: 'Guinea'},
    {text: 'Guinea-Bissau',  value: 'Guinea-Bissau'},
    {text: 'Guyana',  value: 'Guyana'},
    {text: 'Haiti',  value: 'Haiti'},
    {text: 'Heard Island',  value: 'Heard Island'},
    {text: 'Honduras',  value: 'Honduras'},
    {text: 'Hong Kong',  value: 'Hong Kong'},
    {text: 'Hungary',  value: 'Hungary'},
    {text: 'Iceland',  value: 'Iceland'},
    {text: 'India',  value: 'India'},
    {text: 'Indian Ocean Territory',  value: 'Indian Ocean Territory'},
    {text: 'Indonesia',  value: 'Indonesia'},
    {text: 'Iran',  value: 'Iran'},
    {text: 'Iraq',  value: 'Iraq'},
    {text: 'Ireland',  value: 'Ireland'},
    {text: 'Israel',  value: 'Israel'},
    {text: 'Italy',  value: 'Italy'},
    {text: 'Jamaica',  value: 'Jamaica'},
    {text: 'Jan Mayen',  value: 'Jan Mayen'},
    {text: 'Japan',  value: 'Japan'},
    {text: 'Jordan',  value: 'Jordan'},
    {text: 'Kazakhstan',  value: 'Kazakhstan'},
    {text: 'Kenya',  value: 'Kenya'},
    {text: 'Kiribati',  value: 'Kiribati'},
    {text: 'Kuwait',  value: 'Kuwait'},
    {text: 'Kyrgyzstan',  value: 'Kyrgyzstan'},
    {text: 'Laos',  value: 'Laos'},
    {text: 'Latvia',  value: 'Latvia'},
    {text: 'Lebanon',  value: 'Lebanon'},
    {text: 'Lesotho',  value: 'Lesotho'},
    {text: 'Liberia',  value: 'Liberia'},
    {text: 'Libya',  value: 'Libya'},
    {text: 'Liechtenstein',  value: 'Liechtenstein'},
    {text: 'Lithuania',  value: 'Lithuania'},
    {text: 'Luxembourg',  value: 'Luxembourg'},
    {text: 'Macau',  value: 'Macau'},
    {text: 'Macedonia',  value: 'Macedonia'},
    {text: 'Madagascar',  value: 'Madagascar'},
    {text: 'Malawi',  value: 'Malawi'},
    {text: 'Malaysia',  value: 'Malaysia'},
    {text: 'Maldives',  value: 'Maldives'},
    {text: 'Mali',  value: 'Mali'},
    {text: 'Malta',  value: 'Malta'},
    {text: 'Marshall Islands',  value: 'Marshall Islands'},
    {text: 'Martinique',  value: 'Martinique'},
    {text: 'Mauritania',  value: 'Mauritania'},
    {text: 'Mauritius',  value: 'Mauritius'},
    {text: 'Mayotte',  value: 'Mayotte'},
    {text: 'Mexico',  value: 'Mexico'},
    {text: 'Micronesia',  value: 'Micronesia'},
    {text: 'Moldova',  value: 'Moldova'},
    {text: 'Monaco',  value: 'Monaco'},
    {text: 'Mongolia',  value: 'Mongolia'},
    {text: 'Montenegro',  value: 'Montenegro'},
    {text: 'Montserrat',  value: 'Montserrat'},
    {text: 'Morocco',  value: 'Morocco'},
    {text: 'Mozambique',  value: 'Mozambique'},
    {text: 'Namibia',  value: 'Namibia'},
    {text: 'Nauru',  value: 'Nauru'},
    {text: 'Nepal',  value: 'Nepal'},
    {text: 'Netherlands',  value: 'Netherlands'},
    {text: 'Netherlandsantilles',  value: 'Netherlandsantilles'},
    {text: 'New Caledonia',  value: 'New Caledonia'},
    {text: 'New Guinea',  value: 'New Guinea'},
    {text: 'New Zealand',  value: 'New Zealand'},
    {text: 'Nicaragua',  value: 'Nicaragua'},
    {text: 'Niger',  value: 'Niger'},
    {text: 'Nigeria',  value: 'Nigeria'},
    {text: 'Niue',  value: 'Niue'},
    {text: 'Norfolk Island',  value: 'Norfolk Island'},
    {text: 'North Korea',  value: 'North Korea'},
    {text: 'Northern Mariana Islands',  value: 'Northern Mariana Islands'},
    {text: 'Norway',  value: 'Norway'},
    {text: 'Oman',  value: 'Oman'},
    {text: 'Pakistan',  value: 'Pakistan'},
    {text: 'Palau',  value: 'Palau'},
    {text: 'Palestine',  value: 'Palestine'},
    {text: 'Panama',  value: 'Panama'},
    {text: 'Paraguay',  value: 'Paraguay'},
    {text: 'Peru',  value: 'Peru'},
    {text: 'Philippines',  value: 'Philippines'},
    {text: 'Pitcairn Islands',  value: 'Pitcairn Islands'},
    {text: 'Poland',  value: 'Poland'},
    {text: 'Portugal',  value: 'Portugal'},
    {text: 'Puerto Rico',  value: 'Puerto Rico'},
    {text: 'Qatar',  value: 'Qatar'},
    {text: 'Reunion',  value: 'Reunion'},
    {text: 'Romania',  value: 'Romania'},
    {text: 'Russia',  value: 'Russia'},
    {text: 'Rwanda',  value: 'Rwanda'},
    {text: 'Saint Helena',  value: 'Saint Helena'},
    {text: 'Saint Kitts and Nevis',  value: 'Saint Kitts and Nevis'},
    {text: 'Saint Lucia',  value: 'Saint Lucia'},
    {text: 'Saint Pierre',  value: 'Saint Pierre'},
    {text: 'Saint Vincent',  value: 'Saint Vincent'},
    {text: 'Samoa',  value: 'Samoa'},
    {text: 'San Marino',  value: 'San Marino'},
    {text: 'Sandwich Islands',  value: 'Sandwich Islands'},
    {text: 'Sao Tome',  value: 'Sao Tome'},
    {text: 'Saudi Arabia',  value: 'Saudi Arabia'},
    {text: 'Scotland',  value: 'Scotland'},
    {text: 'Senegal',  value: 'Senegal'},
    {text: 'Serbia',  value: 'Serbia'},
    {text: 'Seychelles',  value: 'Seychelles'},
    {text: 'Sierra Leone',  value: 'Sierra Leone'},
    {text: 'Singapore',  value: 'Singapore'},
    {text: 'Slovakia',  value: 'Slovakia'},
    {text: 'Slovenia',  value: 'Slovenia'},
    {text: 'Solomon Islands',  value: 'Solomon Islands'},
    {text: 'Somalia',  value: 'Somalia'},
    {text: 'South Africa',  value: 'South Africa'},
    {text: 'South Korea',  value: 'South Korea'},
    {text: 'Spain',  value: 'Spain'},
    {text: 'Sri Lanka',  value: 'Sri Lanka'},
    {text: 'Sudan',  value: 'Sudan'},
    {text: 'Suritext',  value: 'Suritext'},
    {text: 'Swaziland',  value: 'Swaziland'},
    {text: 'Sweden',  value: 'Sweden'},
    {text: 'Switzerland',  value: 'Switzerland'},
    {text: 'Syria',  value: 'Syria'},
    {text: 'Taiwan',  value: 'Taiwan'},
    {text: 'Tajikistan',  value: 'Tajikistan'},
    {text: 'Tanzania',  value: 'Tanzania'},
    {text: 'Thailand',  value: 'Thailand'},
    {text: 'Timorleste',  value: 'Timorleste'},
    {text: 'Togo',  value: 'Togo'},
    {text: 'Tokelau',  value: 'Tokelau'},
    {text: 'Tonga',  value: 'Tonga'},
    {text: 'Trinidad',  value: 'Trinidad'},
    {text: 'Tunisia',  value: 'Tunisia'},
    {text: 'Turkey',  value: 'Turkey'},
    {text: 'Turkmenistan',  value: 'Turkmenistan'},
    {text: 'Tuvalu',  value: 'Tuvalu'},
    {text: 'United Arab Emirates',  value:'United Arab Emirates'},
    {text: 'Uganda',  value: 'Uganda'},
    {text: 'Ukraine',  value: 'Ukraine'},
    {text: 'United Kingdom',  value: 'United Kingdom'},
    {text: 'United States',  value: 'United States'},
    {text: 'Uruguay',  value: 'Uruguay'},
    {text: 'US Minor Islands',  value: 'US Minor Islands'},
    {text: 'US Virgin Islands',  value: 'US Virgin Islands'},
    {text: 'Uzbekistan',  value: 'Uzbekistan'},
    {text: 'Vanuatu',  value: 'Vanuatu'},
    {text: 'Vatican City',  value: 'Vatican City'},
    {text: 'Venezuela',  value: 'Venezuela'},
    {text: 'Vietnam',  value: 'Vietnam'},
    {text: 'Wales',  value: 'Wales'},
    {text: 'Wallis and Futuna',  value: 'Wallis and Futuna'},
    {text: 'Western Sahara',  value: 'Western Sahara'},
    {text: 'Yemen',  value: 'Yemen'},
    {text: 'Zambia',  value: 'Zambia'},
    {text: 'Zimbabwe',  value: 'Zimbabwe'},
  ]

  const defaultcountries = ['Malaysia']

  const status = [
    {text: 'Aktif',  value: 0},
    {text: 'Tidak Aktif',  value: 1},
  ]

  const resetForm=()=>{
    setsuppliername("");
    setaddress("");
    setorigincountry("");
  }

  const editForm=({id, sp_name,sp_address,sp_origin_country,sp_status})=>{
    setsupplierid(id);
    setsuppliername(sp_name);
    setaddress(sp_address);
    setorigincountry(sp_origin_country);
    setsupplierstatus(sp_status);
    setModalUpdateOpen(true);
  }


  const submitForm=()=>{  
    const data={sp_name,sp_address,sp_origin_country};
    postSupplier(data).then(x=>{
      if(supplierlist){

       let currentsupplier = JSON.parse(JSON.stringify(supplierlist));
         let index=currentsupplier.findIndex(obj => {return obj.id === x.id});
         if(index<0){
          currentsupplier.push(x);
         }
         else{currentsupplier[index]=x;
         }
         setsuppliernamelist(currentsupplier);
         setuserFilter(currentsupplier);
       }
       else{
        setsuppliernamelist([x]);
        setuserFilter([x]);
       } 
    }).catch(e=>console.log(e))
    resetForm();
    
  }


const updateForm=()=>{
  const data={id:supplierid,sp_name,sp_address,sp_origin_country,sp_status};
  
  updateSupplier(data).then(x=>{
      setsuppliername([x]);
      setaddress([x]);
      setorigincountry([x]);
      setsupplierstatus([x]);
    }).catch(e=>console.log(e))
    resetForm();
}

const deleteSupplierList=(pk)=>{
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
          deleteSupplier(pk)
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
      setsuppliernamelist(supplier);
      setuserFilter(supplier)
    };

    bootstrapAsync();

  }, [supplier]);

  //useEffect(() => { console.log('as',supplier) }, [supplier])

  const RenderSupplier = props => {
    const data = props.data;
    const tableItem = data.map((x, i) =>
      <Table.Row key={i}>
        <Table.Cell>{i+1}</Table.Cell>
        <Table.Cell>
          <Dropdown icon="ellipsis vertical"  className='icon'pointing='top left'>
            <Dropdown.Menu className='right'>
              <Dropdown.Item  onClick={()=>editForm(x)} color='blue' icon='edit outline' text='Kemaskini Pembekal' />
              <Dropdown.Item  onClick={()=>deleteSupplierList(x.id)} icon='trash' text='Padam Pembekal' />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell><Link to={`${url}/detail/${i}`}>{x.sp_name}</Link></Table.Cell>
        <Table.Cell>{x.sp_address}</Table.Cell>
        <Table.Cell>{x.sp_origin_country}</Table.Cell>
        <Table.Cell>{x.sp_status == 0 ? <div class="ui green horizontal label circular">Aktif</div>:<div class="ui red horizontal label circular">Tidak Aktif</div>}</Table.Cell>
      </Table.Row>
    );

      return <Table>
        {/*///////////////////////////////////////////////// TABLE HEADER/////////////////////////////////////////////////////////////////// */}
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>No</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Nama</Table.HeaderCell>
          <Table.HeaderCell>Alamat</Table.HeaderCell>
          <Table.HeaderCell>Negara</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {/*///////////////////////////////////////////////// TABLE HEADER/////////////////////////////////////////////////////////////////// */}

      {/*///////////////////////////////////////////////// TABLE BODY/////////////////////////////////////////////////////////////////// */}
      <Table.Body>
        {tableItem}
      </Table.Body>
      {/*///////////////////////////////////////////////// TABLE BODY/////////////////////////////////////////////////////////////////// */}
    </Table>
  }

  return (
    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer">
        <Header as='h6' floated='right'>
           <Input icon={{ name: 'search', link: true }} onChange={e=>{
              let filter=e.target.value.toLowerCase()
              const filterData = supplierlist.filter(({ sp_name,sp_address,sp_origin_country }) =>
              sp_name.toLowerCase().indexOf(filter) > -1 || sp_address.toLowerCase().indexOf(filter) > -1
              || sp_origin_country.toLowerCase().indexOf(filter) > -1);
              setuserFilter(filterData)}}
              placeholder='Cari Pembekal...'/>
        </Header>

        <Header as='h3' floated='left'>Senarai Pembekal</Header>
       
        <Button onClick={()=>setModalOpen(true)} fluid  basic color='green' > <Icon name='plus' />Add</Button>
        <Divider/>
          <div style={{height:'70vh', overflowY:'auto'}}>
            {SupplierFilter < 1 ? 
        <Message info>    
          <Message.Header>Tiada Maklumat</Message.Header>
          <p>Tiada Maklumat Dalam Pangkalan Data</p>
        </Message> :
        <RenderSupplier data={SupplierFilter}/>}
{/*///////////////////////////////////////////////////////////add modal//////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalOpen(false),resetForm(),location.reload()}} open={modalOpen}>
            <Header icon='archive' content='Tambah Pembekal' />
            <Modal.Content>
              <Form>
                <Form.Input
                  label='Nama Pembekal'
                  required
                  fluid
                  value={sp_name}
                  onChange={(e,data)=>setsuppliername(data.value)}
                />
                <Form.TextArea
                  fluid
                  label='Alamat'
                  onChange={e=>setaddress(e.target.value)}
                  value={sp_address}
                />
                <Form.Dropdown
                  placeholder='Negara Pembekal'
                  label='Negara Pembekal'
                  fluid
                  search
                  selection
                  defaultValue={'Malaysia'}
                  onChange={(e,data)=>setorigincountry(data.value)}
                  value={sp_origin_country}
                  options={countries}
                />         
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color='red' onClick={() => {setModalOpen(false); resetForm();}}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' onClick={() => {setModalOpen(false); submitForm()}}>
              <Icon name='checkmark' /> Submit
            </Button>
          </Modal.Actions>
        </Modal>
{/*///////////////////////////////////////////////////////////end add modal//////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

{/*///////////////////////////////////////////////////////////update modal//////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

<Modal style={{position:'relative',height:'auto'}} onClose={() =>{ setModalUpdateOpen(false),resetForm()}} open={modalUpdateOpen}>
            <Header icon='archive' content='Kemaskini Pembekal' />
            <Modal.Content>
              <Form>
                  <Form.Input
                    label='Nama Pembekal'
                    required
                    fluid
                    value={sp_name}
                    onChange={(e,data)=>setsuppliername(data.value)}
                  />
                  <Form.TextArea
                    fluid
                    label='Alamat'
                    onChange={e=>setaddress(e.target.value)}
                    value={sp_address}
                  />
                  <Form.Dropdown
                    placeholder='Negara Pembekal'
                    label='Pembekal'
                    fluid
                    search
                    selection
                    defaultValue={defaultcountries}
                    onChange={(e,data)=>setorigincountry(data.value)}
                    value={sp_origin_country}
                    options={countries}
                  />
                  {profile.id == 1 ? 
                  <Form.Dropdown
                    placeholder='Status'
                    label='Status'
                    fluid
                    search
                    selection
                    defaultValue={0}
                    onChange={(e,data)=>setsupplierstatus(data.value)}
                    value={sp_status}
                    options={status}
                  /> : null}
                      
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
        {/*///////////////////////////////////////////////////end update modal//////////////////////////////////////////////////////////////////////////////////////////*/}
        </div>
      </div>
    </Transition>

  )
}

export default SupplierList