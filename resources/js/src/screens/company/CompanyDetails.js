import React, { useContext } from 'react'
import {
  Input, Menu, Segment,
  Checkbox,
  Grid,
  Header,
  Tab,
  Card,
  List,
  Transition,
  Label,
  Button,
  Divider
} from 'semantic-ui-react';

import * as moment from 'moment';

import { useParams, Link, useRouteMatch } from "react-router-dom";

import { getCompany, CompanyContext, updateCompany } from './company';

import logo from '../../assets/img/initialWhite.png'; 
import { EditableLabel, HeaderAction, PromptModal } from '../../components/simplifyUi';
import { now } from 'lodash';

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const CompanyDetails = () => {

  const cmpny = useContext(CompanyContext);
  let { path, url } = useRouteMatch();
  const [users, setuser] = React.useState([]);
  const [cmpnydata, setCmpny] = React.useState(null);
  const { index } = useParams();
  const dateformat = "DD/MM/YYYY hh:mm:ss A"


  React.useEffect(() => {
    const bootstrapAsync = async () => {
      if (cmpny)
      {
        const {cmpnyPK}=cmpny[index];
          getCompany(cmpnyPK).then(x => {
            setuser(x);
          })
          setCmpny(cmpny[index]);
    }
    };

    bootstrapAsync();

  }, [cmpny]);
  
  const updCmpnyName =x=>{
    setCmpny({...cmpnydata,cmpnyName:x})
    updateCompany({...cmpnydata,cmpnyName:x}).then(k=>{
       console.log(k);
  })
  }
  
  const updAddress =x=>{
    setCmpny({...cmpnydata,cmpnyDetails:{...cmpnydata.cmpnyDetails,address:x}})
    updateCompany({...cmpnydata,cmpnyDetails:{...cmpnydata.cmpnyDetails,address:x}}).then(k=>{
       console.log(k);
  })
  }

  const updConfig=cmpnyConfig=>{
    setCmpny({...cmpnydata,cmpnyConfig})
    updateCompany({...cmpnydata,cmpnyConfig}).then(k=>{
       console.log(k);
  })
  }

  const panes = [
    {
      menuItem: { key: 'HASFile', content: '1. HAS File' },
      render: () => <Tab.Pane>
                      <List divided relaxed>
                        <List.Item>
                          {cmpnydata.halalpolicy_filename == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Halal Polisi</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Halal Polisi</List.Header>
                              <List.Description>Uploaded On : {moment(cmpnydata.date_halal_policy).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.orgchart_filename == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Carta Organisasi</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Carta Organisasi</List.Header>
                              <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.tor_filename == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Jawatan Kuasa Halal Dalaman</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Jawatan Kuasa Halal Dalaman</List.Header>
                              <List.Description>Uploaded On : {moment(cmpnydata.date_tor).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.empletter_filename == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Surat Perlantikan</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Surat Perlantikan</List.Header>
                              <List.Description>Uploaded On : {moment(cmpnydata.date_empletter).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.audit_filename == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Audit Halal Dalaman</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Audit Halal Dalaman</List.Header>
                              <List.Description>Uploaded On : {moment(cmpnydata.date_audit).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.halalrisk_filename == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Kawalan Risiko Halal</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Kawalan Risiko Halal</List.Header>
                              <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.hrm_file_name == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Kawalan Bahan Mentah</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Kawalan Bahan Mentah</List.Header>
                              <List.Description>Uploaded On : {moment(cmpnydata.date_raw_mat).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.hsrm_file_name == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Prosedur Operasi Standard Kawalan Bahan Mentah</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Prosedur Operasi Standard Kawalan Bahan Mentah</List.Header>
                              <List.Description>Uploaded On : {moment(cmpnydata.date_sop_raw_mat).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.training_filename == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Latihan Halal</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Latihan Halal</List.Header>
                              <List.Description>Uploaded On : {moment(cmpnydata.date_training).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.ht_file_name == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Kebolehkesanan</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Kebolehkesanan</List.Header>
                              <List.Description>Uploaded On : {moment(cmpnydata.date_traceability).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.hst_file_name == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Prosedur Operasi Standard Kebolehkesanan</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Prosedur Operasi Standard Kebolehkesanan</List.Header>
                              <List.Description>Uploaded On : {moment(cmpnydata.date_sop_traceability).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.hspr_file_name == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Prosedur Operasi Standard Panggil Semula Produk</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Prosedur Operasi Standard Panggil Semula Produk</List.Header>
                              <List.Description>Uploaded On : {moment(cmpnydata.date_recall).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.hla_file_name == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Analisis Makmal</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Analisis Makmal</List.Header>
                              <List.Description>Uploaded On : {moment(cmpnydata.date_lab).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.hs_file_name == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Sertu</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Sertu</List.Header>
                              <List.Description>Uploaded On : {moment(cmpnydata.date_sertu).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                        <List.Item>
                          {cmpnydata.hss_file_name == null ?
                          <> 
                            <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                            <List.Content>
                              <List.Header>Prosedur Operasi Standard Sertu</List.Header>
                              <List.Description>No file uploaded</List.Description>
                            </List.Content>
                          </>
                          :
                          <>
                            <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                            <List.Content>
                              <List.Header>Prosedur Operasi Standard Sertu</List.Header>
                              <List.Description>Uploaded On : {moment(cmpnydata.date_sop_sertu).format(dateformat)}</List.Description>
                            </List.Content>
                          </>
                          }  
                        </List.Item>

                      </List>  
                    </Tab.Pane>,
    },
    {
      menuItem: { key: 'HalalFIle', content: '2. Halal File' },
      render: () => <Tab.Pane>
                      <List divided relaxed>               
                      {cmpnydata.cmpnyDetails.skimproduk==='Produk Makanan / Minuman / Makanan Tambahan' ? 
                      <>
                      <List.Item> {/* sijil Pendaftaran */}
                      {cmpnydata.hsp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* lesen peniagaan */}
                        {cmpnydata.hlp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* surat lantikan */}
                        {cmpnydata.hsl_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* peta lokasi */}
                        {cmpnydata.hplk_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pelan susun atur */}
                        {cmpnydata.hsa_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* carta alir */}
                        {cmpnydata.hca_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Carta Alir</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Carta Alir</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* invois */}
                        {cmpnydata.hi_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Rekod Invois</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Rekod Invois</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* jaminan halal */}
                        {cmpnydata.hjh_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Jaminan Halal</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Jaminan Halal</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* label pembungkusan */}
                        {cmpnydata.hp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Label Pembungkusan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Label Pembungkusan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* penyata kewangan */}
                        {cmpnydata.hpk_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Penyata Kewangan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Penyata Kewangan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* permit import */}
                        {cmpnydata.hpi_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Permit Import</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Permit Import</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>
                      
                      </> :
                      cmpnydata.cmpnyDetails.skimproduk==='Premis Makanan'? 
                      <>
                      <List.Item> {/* sijil Pendaftaran */}
                      {cmpnydata.hsp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* lesen peniagaan */}
                        {cmpnydata.hlp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* surat lantikan */}
                        {cmpnydata.hsl_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* peta lokasi */}
                        {cmpnydata.hplk_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pelan susun atur */}
                        {cmpnydata.hsa_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* invois */}
                        {cmpnydata.hi_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Rekod Invois</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Rekod Invois</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* jaminan halal */}
                        {cmpnydata.hjh_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Jaminan Halal</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Jaminan Halal</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* maklumat pekerja */}
                        {cmpnydata.hmp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Maklumat Pekerja</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Maklumat Pekerja</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* label pembungkusan */}
                        {cmpnydata.hp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Label Pembungkusan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Label Pembungkusan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* permit import */}
                        {cmpnydata.hpi_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Permit Import</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Permit Import</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* permohonan halal */}
                        {cmpnydata.hpl_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Fail Permohonan Halal Lengkap</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Fail Permohonan Halal Lengkap</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pest control */}
                        {cmpnydata.hpc_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Kawalan Makhluk Perosak</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Kawalan Makhluk Perosak</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>      

                      <List.Item> {/* anti thypoid */}
                        {cmpnydata.hst_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Suntikan Anti-Thypoid</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Suntikan Anti-Thypoid</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                    <List.Item> {/* kursus pengendalian makanan */}
                      {cmpnydata.foodhandler_filename == null ?
                      <> 
                        <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                        <List.Content>
                          <List.Header>Sijil Kursus Pengendalian Makanan</List.Header>
                          <List.Description>No file uploaded</List.Description>
                        </List.Content>
                      </>
                      :
                      <>
                        <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                        <List.Content>
                          <List.Header>Sijil Kursus Pengendalian Makanan</List.Header>
                          <List.Description>Uploaded On : {moment(cmpnydata.date_tor).format(dateformat)}</List.Description>
                        </List.Content>
                      </>
                      }  
                    </List.Item>
  
                      </>: 

                      cmpnydata.cmpnyDetails.skimproduk==='Rumah Sembelihan'? 
                      <>
                      <List.Item> {/* sijil Pendaftaran */}
                      {cmpnydata.hsp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* lesen peniagaan */}
                        {cmpnydata.hlp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* surat lantikan */}
                        {cmpnydata.hsl_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* peta lokasi */}
                        {cmpnydata.hplk_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pelan susun atur */}
                        {cmpnydata.hsa_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      

                      <List.Item> {/* invois */}
                        {cmpnydata.hi_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Rekod Invois</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Rekod Invois</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* jaminan halal */}
                        {cmpnydata.hjh_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Jaminan Halal</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Jaminan Halal</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      

                      <List.Item> {/* label pembungkusan */}
                        {cmpnydata.hp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Label Pembungkusan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Label Pembungkusan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      

                      <List.Item> {/* permohonan halal */}
                        {cmpnydata.hpl_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Fail Permohonan Halal Lengkap</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Fail Permohonan Halal Lengkap</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pest control */}
                        {cmpnydata.hpc_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Kawalan Makhluk Perosak</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Kawalan Makhluk Perosak</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      

                      

                      <List.Item> {/* anti thypoid */}
                        {cmpnydata.hst_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Suntikan Anti-Thypoid</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Suntikan Anti-Thypoid</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                    

                    <List.Item> {/* tauliah penyembelihan */}
                      {cmpnydata.slaughter_filename == null ?
                      <> 
                        <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                        <List.Content>
                          <List.Header>Surat Tauliah Penyembelihan</List.Header>
                          <List.Description>No file uploaded</List.Description>
                        </List.Content>
                      </>
                      :
                      <>
                        <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                        <List.Content>
                          <List.Header>Surat Tauliah Penyembelihan</List.Header>
                          <List.Description>Uploaded On : {moment(cmpnydata.date_audit).format(dateformat)}</List.Description>
                        </List.Content>
                      </>
                      }  
                    </List.Item>

                    <List.Item> {/* rekod penyembelihan */}
                      {cmpnydata.slaughterrec_filename == null ?
                      <> 
                        <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                        <List.Content>
                          <List.Header>Rekod Penyembelihan</List.Header>
                          <List.Description>No file uploaded</List.Description>
                        </List.Content>
                      </>
                      :
                      <>
                        <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                        <List.Content>
                          <List.Header>Rekod Penyembelihan</List.Header>
                          <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                        </List.Content>
                      </>
                      }  
                    </List.Item>
                      </>:

                      cmpnydata.cmpnyDetails.skimproduk==='Kosmetik dan Dandanan Diri'? 
                      <>
                      <List.Item> {/* sijil Pendaftaran */}
                      {cmpnydata.hsp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* lesen peniagaan */}
                        {cmpnydata.hlp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* surat lantikan */}
                        {cmpnydata.hsl_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* peta lokasi */}
                        {cmpnydata.hplk_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pelan susun atur */}
                        {cmpnydata.hsa_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* carta alir */}
                        {cmpnydata.hca_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Carta Alir</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Carta Alir</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* invois */}
                        {cmpnydata.hi_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Rekod Invois</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Rekod Invois</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* jaminan halal */}
                        {cmpnydata.hjh_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Jaminan Halal</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Jaminan Halal</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* maklumat pekerja */}
                        {cmpnydata.hmp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Maklumat Pekerja</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Maklumat Pekerja</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* label pembungkusan */}
                        {cmpnydata.hp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Label Pembungkusan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Label Pembungkusan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pengeluaran produk */}
                        {cmpnydata.hpp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Pengeluaran Produk</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Pengeluaran Produk</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* penyata kewangan */}
                        {cmpnydata.hpk_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Penyata Kewangan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Penyata Kewangan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>



                      <List.Item> {/* permohonan halal */}
                        {cmpnydata.hpl_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Fail Permohonan Halal Lengkap</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Fail Permohonan Halal Lengkap</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pest control */}
                        {cmpnydata.hpc_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Kawalan Makhluk Perosak</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Kawalan Makhluk Perosak</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* sijil halal */}
                        {cmpnydata.hsh_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Sijil Halal</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Sijil Halal</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                    <List.Item> {/* BPFK */}
                      {cmpnydata.bfk_filename == null ?
                      <> 
                        <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                        <List.Content>
                          <List.Header>Nota Notifikasi Dari BPFK</List.Header>
                          <List.Description>No file uploaded</List.Description>
                        </List.Content>
                      </>
                      :
                      <>
                        <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                        <List.Content>
                          <List.Header>Nota Notifikasi Dari BPFK</List.Header>
                          <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                        </List.Content>
                      </>
                      }  
                    </List.Item>
                      </>:

                      cmpnydata.cmpnyDetails.skimproduk==='Logistik'? 
                      <>
                      <List.Item> {/* sijil Pendaftaran */}
                      {cmpnydata.hsp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* lesen peniagaan */}
                        {cmpnydata.hlp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* surat lantikan */}
                        {cmpnydata.hsl_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* peta lokasi */}
                        {cmpnydata.hplk_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pelan susun atur */}
                        {cmpnydata.hsa_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      

                      <List.Item> {/* penyata kewangan */}
                        {cmpnydata.hpk_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Penyata Kewangan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Penyata Kewangan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      

                    <List.Item> {/* dokumen ms2400 */}
                      {cmpnydata.ms_filename == null ?
                      <> 
                        <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                        <List.Content>
                          <List.Header>Dokumen Berkaitan MS2400:2019</List.Header>
                          <List.Description>No file uploaded</List.Description>
                        </List.Content>
                      </>
                      :
                      <>
                        <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                        <List.Content>
                          <List.Header>Dokumen Berkaitan MS2400:2019</List.Header>
                          <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                        </List.Content>
                      </>
                      }  
                    </List.Item>

                    <List.Item> {/* rekod pengesanan halal */}
                      {cmpnydata.tracking_filename == null ?
                      <> 
                        <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                        <List.Content>
                          <List.Header>Rekod Pengesanan Halal</List.Header>
                          <List.Description>No file uploaded</List.Description>
                        </List.Content>
                      </>
                      :
                      <>
                        <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                        <List.Content>
                          <List.Header>Rekod Pengesanan Halal</List.Header>
                          <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                        </List.Content>
                      </>
                      }  
                    </List.Item>

                    <List.Item> {/* rekod sertu */}
                      {cmpnydata.sertu_filename == null ?
                      <> 
                        <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                        <List.Content>
                          <List.Header>Rekod Sertu</List.Header>
                          <List.Description>No file uploaded</List.Description>
                        </List.Content>
                      </>
                      :
                      <>
                        <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                        <List.Content>
                          <List.Header>Rekod Sertu</List.Header>
                          <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                        </List.Content>
                      </>
                      }  
                    </List.Item>

                    <List.Item> {/* aliran pergerakan operasi */}
                      {cmpnydata.flow_filename == null ?
                      <> 
                        <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                        <List.Content>
                          <List.Header>Aliran Pergerakan Operasi</List.Header>
                          <List.Description>No file uploaded</List.Description>
                        </List.Content>
                      </>
                      :
                      <>
                        <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                        <List.Content>
                          <List.Header>Aliran Pergerakan Operasi</List.Header>
                          <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                        </List.Content>
                      </>
                      }  
                    </List.Item>

                    <List.Item> {/* lesen pengilangan */}
                      {cmpnydata.manu_filename == null ?
                      <> 
                        <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                        <List.Content>
                          <List.Header>Lesen Pengilangan</List.Header>
                          <List.Description>No file uploaded</List.Description>
                        </List.Content>
                      </>
                      :
                      <>
                        <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                        <List.Content>
                          <List.Header>Lesen Pengilangan</List.Header>
                          <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                        </List.Content>
                      </>
                      }  
                    </List.Item>
                      </>:

                      cmpnydata.cmpnyDetails.skimproduk==='Farmaseutikal'? 
                      <>
                      <List.Item> {/* sijil Pendaftaran */}
                      {cmpnydata.hsp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* lesen peniagaan */}
                        {cmpnydata.hlp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* surat lantikan */}
                        {cmpnydata.hsl_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* peta lokasi */}
                        {cmpnydata.hplk_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pelan susun atur */}
                        {cmpnydata.hsa_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* carta alir */}
                        {cmpnydata.hca_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Carta Alir</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Carta Alir</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* invois */}
                        {cmpnydata.hi_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Rekod Invois</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Rekod Invois</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* jaminan halal */}
                        {cmpnydata.hjh_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Jaminan Halal</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Jaminan Halal</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* maklumat pekerja */}
                        {cmpnydata.hmp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Maklumat Pekerja</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Maklumat Pekerja</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* label pembungkusan */}
                        {cmpnydata.hp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Label Pembungkusan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Label Pembungkusan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pengeluaran produk */}
                        {cmpnydata.hpp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Pengeluaran Produk</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Pengeluaran Produk</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* penyata kewangan */}
                        {cmpnydata.hpk_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Penyata Kewangan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Penyata Kewangan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>



                      <List.Item> {/* permohonan halal */}
                        {cmpnydata.hpl_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Fail Permohonan Halal Lengkap</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Fail Permohonan Halal Lengkap</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pest control */}
                        {cmpnydata.hpc_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Kawalan Makhluk Perosak</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Kawalan Makhluk Perosak</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      

                      <List.Item> {/* surat KKM */}
                        {cmpnydata.hsk_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Surat Kebenaran KKM</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Surat Kebenaran KKM</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      

                    <List.Item> {/* BPFK */}
                      {cmpnydata.bfk_filename == null ?
                      <> 
                        <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                        <List.Content>
                          <List.Header>Nota Notifikasi Dari BPFK</List.Header>
                          <List.Description>No file uploaded</List.Description>
                        </List.Content>
                      </>
                      :
                      <>
                        <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                        <List.Content>
                          <List.Header>Nota Notifikasi Dari BPFK</List.Header>
                          <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                        </List.Content>
                      </>
                      }  
                    </List.Item>

                    

                    <List.Item> {/* rekod maklumat kesihatan */}
                      {cmpnydata.emphealth_filename == null ?
                      <> 
                        <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                        <List.Content>
                          <List.Header>Rekod Maklumat Kesihatan Pekerja</List.Header>
                          <List.Description>No file uploaded</List.Description>
                        </List.Content>
                      </>
                      :
                      <>
                        <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                        <List.Content>
                          <List.Header>Rekod Maklumat Kesihatan Pekerja</List.Header>
                          <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                        </List.Content>
                      </>
                      }  
                    </List.Item>

                    <List.Item> {/* manufacturing batch */}
                      {cmpnydata.batch_filename == null ?
                      <> 
                        <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                        <List.Content>
                          <List.Header>Manufacturing Batch</List.Header>
                          <List.Description>No file uploaded</List.Description>
                        </List.Content>
                      </>
                      :
                      <>
                        <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                        <List.Content>
                          <List.Header>Manufacturing Batch</List.Header>
                          <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                        </List.Content>
                      </>
                      }  
                    </List.Item>
                    </>: 
                    cmpnydata.cmpnyDetails.skimproduk==='Barang Gunaan'? 
                      <>
                      <List.Item> {/* sijil Pendaftaran */}
                      {cmpnydata.hsp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Sijil Pendaftaran</List.Header>
                            <List.Description>Uploaded On : {moment(now).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* lesen peniagaan */}
                        {cmpnydata.hlp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Lesen Perniagaan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* surat lantikan */}
                        {cmpnydata.hsl_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Surat Lantikan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* peta lokasi */}
                        {cmpnydata.hplk_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Peta Lokasi</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pelan susun atur */}
                        {cmpnydata.hsa_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Pelan Susun Atur</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* carta alir */}
                        {cmpnydata.hca_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Carta Alir</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Carta Alir</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* invois */}
                        {cmpnydata.hi_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Rekod Invois</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Rekod Invois</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* jaminan halal */}
                        {cmpnydata.hjh_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Jaminan Halal</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Jaminan Halal</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* maklumat pekerja */}
                        {cmpnydata.hmp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Maklumat Pekerja</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Maklumat Pekerja</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* label pembungkusan */}
                        {cmpnydata.hp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Label Pembungkusan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Label Pembungkusan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pengeluaran produk */}
                        {cmpnydata.hpp_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Pengeluaran Produk</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Pengeluaran Produk</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* penyata kewangan */}
                        {cmpnydata.hpk_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Penyata Kewangan</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Penyata Kewangan</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* permohonan halal */}
                        {cmpnydata.hpl_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Fail Permohonan Halal Lengkap</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Fail Permohonan Halal Lengkap</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* pest control */}
                        {cmpnydata.hpc_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Kawalan Makhluk Perosak</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Kawalan Makhluk Perosak</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>

                      <List.Item> {/* sijil halal */}
                        {cmpnydata.hsh_filename == null ?
                        <> 
                          <List.Icon name='times circle outline' size='large' verticalAlign='middle' color='red'/>
                          <List.Content>
                            <List.Header>Sijil Halal</List.Header>
                            <List.Description>No file uploaded</List.Description>
                          </List.Content>
                        </>
                        :
                        <>
                          <List.Icon name='check circle outline' size='large' verticalAlign='middle' color='green'/>
                          <List.Content>
                            <List.Header>Sijil Halal</List.Header>
                            <List.Description>Uploaded On : {moment(now()).format(dateformat)}</List.Description>
                          </List.Content>
                        </>
                        }  
                      </List.Item>
                      
                      </>
                      : 'Tiada Skim Dipilih'}
                      </List>  
                    </Tab.Pane>,
    },
  ]

  if (cmpnydata)
   {  
     return (
      <Transition transitionOnMount={true} animation="fade" duration={1000}>
        <div className="in innerContainer listScroll">
          <Grid style={{padding:'1em 1em 1em 1em'}}>
            <Grid.Row>
              <Grid.Column width={12}>
              <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
              </Grid.Column>

              <Grid.Column width={4}>
                <Card color='teal'>  
                  <Card.Content>
                    <Card.Header>{cmpnydata.cmpnyName}</Card.Header><br></br>
                      <Card.Meta style={{paddingTop:'0.5em'}}>
                        <div className="flexAlign">
                          <div style={{paddingTop:'0.5em'}}>Registration Number</div>
                          <div>
                            <Label color='teal' >
                              {cmpnydata.cmpnyDetails.regNo == null ? 'Tiada Data': cmpnydata.cmpnyDetails.regNo}
                            </Label>
                          </div>
                        </div>
                      </Card.Meta>
                      <Card.Meta style={{paddingTop:'0.5em'}}>
                        <div className="flexAlign">
                          <div style={{paddingTop:'0.5em'}}>Telephone Number</div>
                          <div>
                            <Label color='teal' >
                              {cmpnydata.cmpnyDetails.telno == null ? 'Tiada Data': cmpnydata.cmpnyDetails.telno}
                            </Label>
                          </div>
                        </div>
                      </Card.Meta>
                      <Card.Meta style={{paddingTop:'0.5em'}}>
                        <div className="flexAlign">
                          <div style={{paddingTop:'0.5em'}}>Email</div>
                          <div>
                            <Label color='teal' >
                              {cmpnydata.cmpnyDetails.email == null ? 'Tiada Data': cmpnydata.cmpnyDetails.email}
                            </Label>
                          </div>
                        </div>
                      </Card.Meta>
                      <Divider horizontal>
                        <Header as='h4'>
                          Address
                        </Header>
                      </Divider>
                    <Card.Description>
                      <div className="center-justified">
                          {cmpnydata.cmpnyDetails.address == null ? '': cmpnydata.cmpnyDetails.address}
                      </div>
                    </Card.Description>
                  </Card.Content>
                </Card>

                <Card color='blue'>  
                  <Card.Content>
                    <Card.Meta style={{paddingTop:'0.5em'}}>
                        <div className="flexAlign">
                          <div style={{paddingTop:'0.5em'}}>PIC</div>
                          <div>
                            <Label color='teal' >
                              {cmpnydata.cmpnyDetails.pegawainama == null ? 'Tiada Data': cmpnydata.cmpnyDetails.pegawainama}
                            </Label>
                          </div>
                        </div>
                      </Card.Meta>

                      <Card.Meta style={{paddingTop:'0.5em'}}>
                        <div className="flexAlign">
                          <div style={{paddingTop:'0.5em'}}>PIC Telephone Number</div>
                          <div>
                            <Label color='teal' >
                              {cmpnydata.cmpnyDetails.pegawainotel == null ? 'Tiada Data': cmpnydata.cmpnyDetails.pegawainotel}
                            </Label>
                          </div>
                        </div>
                      </Card.Meta>

                      <Card.Meta style={{paddingTop:'0.5em'}}>
                        <div className="flexAlign">
                          <div style={{paddingTop:'0.5em'}}>Company Status</div>
                          <div>
                            <Label color='teal' >
                              {cmpnydata.cmpnyDetails.statussyarikat == null ? 'Tiada Data': cmpnydata.cmpnyDetails.statussyarikat}
                            </Label>
                          </div>
                        </div>
                      </Card.Meta>

                      <Card.Meta style={{paddingTop:'0.5em'}}>
                        <div className="flexAlign">
                          <div style={{paddingTop:'0.5em'}}>Scheme</div>
                          <div>
                            <Label color='teal' >
                              {cmpnydata.cmpnyDetails.skimproduk == null ? 'Tiada Data': cmpnydata.cmpnyDetails.skimproduk}
                            </Label>
                          </div>
                        </div>
                      </Card.Meta>

                      <Card.Meta style={{paddingTop:'0.5em'}}>
                        <div className="flexAlign">
                          <div style={{paddingTop:'0.5em'}}>Industry Type</div>
                          <div>
                            <Label color='teal' >
                              {cmpnydata.cmpnyDetails.hasiljualan == 'Nilai jualan tahunan <RM300,000' ? 'Mikro' 
                              : cmpnydata.cmpnyDetails.hasiljualan == 'Nilai jualan tahunan RM300,000 - RM15 Juta' ? 'Kecil'
                              : cmpnydata.cmpnyDetails.hasiljualan == 'Nilai jualan tahunan RM15 Juta - RM50 Juta' ? "Sederhana"
                              : cmpnydata.cmpnyDetails.hasiljualan == 'Nilai jualan tahunan >RM50 Juta' ? 'Besar' : 'Tiada Data'}
                            </Label>
                          </div>
                        </div>
                      </Card.Meta>
                  </Card.Content>
                </Card>                 
              {(cmpnydata.halalpolicy_filename == null  && cmpnydata.hrm_file_name == null && cmpnydata.halalrisk_filename == null && cmpnydata.ht_file_name == null ) ? null : <Button basic color='teal' content='black' href={'/zipHAScmpny'+cmpnydata.cmpnyPK}>Download HAS File</Button>}
              <div><br/></div>
              {(cmpnydata.hsp_filename == null  && cmpnydata.hlp_filename == null && cmpnydata.hsl_filename == null && cmpnydata.hsa_filename == null ) ? null : <Button basic color='teal' content='black' href={'/zipHalalcmpny'+cmpnydata.cmpnyPK}>Download Halal File</Button>}
              </Grid.Column>
            </Grid.Row>
          </Grid>     
        </div>
      </Transition>
    )
  }
  else
    return (<Header as='h3' >Loading....</Header>)
}

export default CompanyDetails