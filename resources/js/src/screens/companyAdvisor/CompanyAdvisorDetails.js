import React, { useContext } from 'react'
import {
  Input, Menu, Segment,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Sidebar,
  Transition,
  Button,
  Table,
  Popup,
  Modal,
  Form,Dropdown
    
} from 'semantic-ui-react';
import { useParams, Link, useRouteMatch } from "react-router-dom";
import 'react-step-progress/dist/index.css';
import TabRawMaterial from './TabRawMaterial';
import TabSertu from './TabSertu';
import { CompanyAdvisorContext,getCompanyAdvisorRM} from './companyAdvisor';

const CompanyAdvisorDetails = () => {

  const companyadvisor = useContext(CompanyAdvisorContext);
  const [companyadvisordetail, setcompanyadvisordetail] = React.useState([]);
  let { path, url } = useRouteMatch();
  console.log('asdas',companyadvisor)
  const { index } = useParams();

  // React.useEffect(() => {

  //   const bootstrapAsync = async () => {
  //     if (companyadvisor)
  // {
  //   getCompanyAdvisorRM(companyadvisor[index].ad_fk_company_id).then(x=>{
  //       console.log(x);
  //       if(typeof x.data!=="undefined") setData(x.data);

  //       if(typeof x.companyadvisordetail!=="undefined") 
  //       {
  //         setcompanyadvisordetail(x.companyadvisordetail);
  //         //setRawMaterial(x.rawmaterial);
  //       }
        
  //     }).catch(e=>{
  //         console.log(e)
  //       });
  //     }
  // };
  //     bootstrapAsync();
  //   }, [companyadvisor]);

    const RenderCompany = props => {
      const data = props.data;
      const tableItem = data.map((x, i) =>
      <>
        <Table.Row>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>Halal Polisi</Table.Cell>
          <Table.Cell>{x.halalpolicy_filename == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/Halal_Policy/"+x.halalpolicy_filename} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>2</Table.Cell>
          <Table.Cell>Carta Organisasi</Table.Cell>
          {/* <Table.Cell>{x.orgchart_filename}</Table.Cell> */}
          <Table.Cell>{x.orgchart_filename == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/Org_chart/"+x.orgchart_filename} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>3</Table.Cell>
          <Table.Cell>Jawatan Kuasa Halal Dalaman</Table.Cell>
          <Table.Cell>{x.tor_filename == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/TOR/"+x.tor_filename} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>4</Table.Cell>
          <Table.Cell>Surat Pelantikan</Table.Cell>
          {/* <Table.Cell>{x.empletter_filename}</Table.Cell> */}
          <Table.Cell>{x.empletter_filename == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/Emp_letter/"+x.empletter_filename} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>5</Table.Cell>
          <Table.Cell>Audit Halal Dalaman</Table.Cell>
          {/* <Table.Cell>{x.audit_filename}</Table.Cell> */}
          <Table.Cell>{x.audit_filename == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/Halal_audit/"+x.audit_filename} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>6</Table.Cell>
          <Table.Cell>Kawalan Risiko Halal</Table.Cell>
          {/* <Table.Cell>{x.halalrisk_filename}</Table.Cell> */}
          <Table.Cell>{x.halalrisk_filename == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/Halal_risk/"+x.halalrisk_filename} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>7</Table.Cell>
          <Table.Cell>Kawalan Bahan Mentah</Table.Cell>
          <Table.Cell>{x.hrm_file_name == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/RawMaterial/"+x.hrm_file_name} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>8</Table.Cell>
          <Table.Cell>Prosedur Operasi Standard Kawalan Bahan Mentah</Table.Cell>
          <Table.Cell>{x.hsrm_file_name == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/SOPRawMaterial/"+x.hsrm_file_name} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>9</Table.Cell>
          <Table.Cell>Latihan Halal</Table.Cell>
          {/* <Table.Cell>{x.training_filename}</Table.Cell> */}
          <Table.Cell>{x.training_filename == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/Halal_training/"+x.training_filename} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>10</Table.Cell>
          <Table.Cell>Kebolehkesanan</Table.Cell>
          <Table.Cell>{x.ht_file_name == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/Traceability/"+x.ht_file_name} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>11</Table.Cell>
          <Table.Cell>Prosedur Operasi Standard Kebolehkesanan</Table.Cell>
          <Table.Cell>{x.hst_file_name == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/SOP_traceability/"+x.hst_file_name} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>12</Table.Cell>
          <Table.Cell>Prosedur Operasi Standard Panggil Semula Produk</Table.Cell>
          <Table.Cell>{x.hpr_file_name == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/SOP_product_recall/"+x.hpr_file_name} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>13</Table.Cell>
          <Table.Cell>Semakan HAS</Table.Cell>
          <Table.Cell>{x.hc_file_name == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/HAS_Checklist/"+x.hc_file_name} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>14</Table.Cell>
          <Table.Cell>Analisis Makmal</Table.Cell>
          <Table.Cell>{x.hla_file_name == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/Lab_Analysis/"+x.hla_file_name} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>15</Table.Cell>
          <Table.Cell>Sertu</Table.Cell>
          <Table.Cell>{x.hs_file_name == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/Sertu/"+x.hs_file_name} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>16</Table.Cell>
          <Table.Cell>Prosedur Operasi Standard Sertu</Table.Cell>
          <Table.Cell>{x.hss_file_name == null ? <em>Tiada Fail</em> :
            <Button.Group basic size='small'>
              <Popup content='Muat Turun Fail'position='top center' trigger={<Button href={"/files/HASFILE/"+x.ad_fk_company_id+"/SOP_Sertu/"+x.hss_file_name} target="_blank"  icon='download' />} />    
            </Button.Group>
          }     
          </Table.Cell>
        </Table.Row>
      </>
      );
  
        return <Table>
          {/*///////////////////////////////////////////////// TABLE HEADER/////////////////////////////////////////////////////////////////// */}
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Nama Fail</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
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

  if (companyadvisor)
  {
     const detail=companyadvisor[index];
     return (

      <Transition transitionOnMount={true} animation="fade" duration={1000}>
        <div className="in innerContainer listScroll" >
        <Grid>
          <Grid.Row>
            <Grid.Column width={13}>
            {companyadvisor == 0 ? 
                <Message warning>    
                  <Message.Header>Sila Pilih Advisor Terdahulu</Message.Header>
                  <p>Sila Pilih Advisor Atau Klik <Link to="/ClientAdvisor"><em>Di Sini</em></Link> Untuk Membuat Permohonan Advisor</p>
                </Message> :
              <RenderCompany data={companyadvisor}/>}
            </Grid.Column>
            <Grid.Column width={3}>
              <Card style={{ marginTop: '0.1em'}}>
                <div style={{ margin: '1em 1em 1em 1em'}}>
                  <Image src={detail.cmpnyConfig.headerLogo} wrapped/>
                </div>
                <Card.Content>
                  <Card.Header textAlign='center'>HAS FILE : {detail.cmpnyName}</Card.Header>
                  <Card.Meta textAlign='center'></Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  {/* {HASRawMat.map(({size}) => (size.id)) == null ? "null" : "size."} */}
                </Card.Content>
              </Card>
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

export default CompanyAdvisorDetails