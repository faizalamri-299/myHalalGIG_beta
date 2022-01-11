import PropTypes from 'prop-types'
import React, { Component, useState, useEffect } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import ScrollToTop from "react-scroll-to-top";
import ReactCardCarousel from 'react-card-carousel';

const fixed = true;


/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='myHalalgig'
      inverted
      id="Barcode"
      style={{
        fontSize: mobile ? '2em' : '6em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '2em',
      }}
    />
    <Header
      
      content='Connecting Halal Experts to the Rest of the World'
      id="Qwitcher"
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '2.75em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '0.5em',
      }}
    />
    <Button primary size='huge' style={{marginTop:'0.5em'}} onClick={()=>{window.scrollTo({top: 730,behavior: 'smooth'});}}>
      Baca Selanjutnya
      <Icon name='right arrow' />
    </Button>
  </Container>
)


const Home = () => (
  
  <>
  
    <Visibility
      once={false}
      onBottomPassed={true}
      onBottomPassedReverse={false}
    >
    <Segment
      inverted color='teal' secondary
      textAlign='center'
      style={{ minHeight: 700, padding: '1em 0em' }}
      vertical
    >
    
    <Menu
      fixed={fixed ? 'top' : null}
      inverted={true}
      color='teal'
      pointing={false}
      secondary={false}
      size='large'
      tabular
    >
      <Container>
        <Menu.Item as='a' onClick={()=>{window.scrollTo({top: 0,behavior: 'smooth'});}}>
          Home
        </Menu.Item>
        <Menu.Item as='a' onClick={()=>{window.scrollTo({top: 730,behavior: 'smooth'});}}>
          About
        </Menu.Item>
        <Menu.Item as='a' onClick={()=>{window.scrollTo({top: 1460,behavior: 'smooth'});}}>
          Features
        </Menu.Item>
        <Menu.Item as='a' onClick={()=>{window.scrollTo({top: 2200,behavior: 'smooth'});}}>
          Reviews
        </Menu.Item>
        <Menu.Item position='right'>
          <Button as='a' href='login' inverted color='grey'>
            Log in
          </Button>
          <Button as='a' inverted={true} href='register'  style={{ marginLeft: '0.5em' }}>
            Sign Up
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
    
    <HomepageHeading />
  </Segment>
  </Visibility>
    <Segment style={{ padding: '15em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em', }}>
              Kami Bantu Semua
            </Header>
            <p style={{ fontSize: '1.33em',textAlign:'justify' }}>
            MyHalalGig adalah satu inisiatif baru dalam membantu pengusaha industri bagi permohonan halal JAKIM.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Apa Yang MyHalalGIG Tawarkan?
            </Header>
            <p style={{ fontSize: '1.33em',textAlign:'justify' }}>
            MyHalalGig adalah satu sistem pasaran bebas dan bakat Halal yang pertama di dunia dimana ia dapat menghubungkan syarikat-syarikat berkaitan Halal (pelanggan) dan pekerja bebas (penasihat) secara global. Melalui sistem pasaran ini, pelanggan boleh memilih penasihat untuk melakukan pekerjaan dalam bidang seperti pematuhan Halal, latihan dan pembangunan Halal, kemasukan data, reka bentuk produk, analisis makmal, penjualan dan pemasaran, dan perkhidmatan perundangan.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image rounded size='large' src='/images/gig-banner.png' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '26em 0em' }} vertical>
      <ReactCardCarousel autoplay={ true } autoplay_speed={ 2500 }>
        <div style={{height: '600px', width: '800px',paddingTop: '80px',textAlign: 'center',background: '#52C0F5',color: '#FFF',fontSize: '12px',textTransform: 'uppercase',borderRadius: '10px',}}>
        <Segment vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em', }}>
                  Kami Bantu Semua
                </Header>
                <p style={{ fontSize: '1.33em',textAlign:'justify' }}>
                MyHalalGig adalah satu inisiatif baru dalam membantu pengusaha industri bagi permohonan halal JAKIM.
                </p>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Apa Yang MyHalalGIG Tawarkan?
                </Header>
                <p style={{ fontSize: '1.33em',textAlign:'justify' }}>
                MyHalalGig adalah satu sistem pasaran bebas dan bakat Halal yang pertama di dunia dimana ia dapat menghubungkan syarikat-syarikat berkaitan Halal (pelanggan) dan pekerja bebas (penasihat) secara global. Melalui sistem pasaran ini, pelanggan boleh memilih penasihat untuk melakukan pekerjaan dalam bidang seperti pematuhan Halal, latihan dan pembangunan Halal, kemasukan data, reka bentuk produk, analisis makmal, penjualan dan pemasaran, dan perkhidmatan perundangan.
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image rounded size='large' src='/images/gig-banner.png' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        </div>
        <div style={{height: '600px', width: '800px',paddingTop: '80px',textAlign: 'center',background: '#52C0F5',color: '#FFF',fontSize: '12px',textTransform: 'uppercase',borderRadius: '10px',}}>
          Second Card<Image rounded size='large' src='/images/gig-banner.png' />
        </div>
        <div style={{height: '600px', width: '800px',paddingTop: '80px',textAlign: 'center',background: '#52C0F5',color: '#FFF',fontSize: '12px',textTransform: 'uppercase',borderRadius: '10px',}}>
          Third Card<Image rounded size='large' src='/images/gig-banner.png' />
        </div>
        <div style={{height: '600px', width: '800px',paddingTop: '80px',textAlign: 'center',background: '#52C0F5',color: '#FFF',fontSize: '12px',textTransform: 'uppercase',borderRadius: '10px',}}>
          Fourth Card<Image rounded size='large' src='/images/gig-banner.png' />
        </div>
        <div style={{height: '600px', width: '800px',paddingTop: '80px',textAlign: 'center',background: '#52C0F5',color: '#FFF',fontSize: '12px',textTransform: 'uppercase',borderRadius: '10px',}}>
          Fifth Card<Image rounded size='large' src='/images/gig-banner.png' />
        </div>
      </ReactCardCarousel>
    </Segment>

    <Segment style={{ padding: '5em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Sangat Memudahkan Urusan Dalam Fail Halal!"
            </Header>
            <p style={{ fontSize: '1.33em' }}>Antara Ulasan Dari Pengguna Sistem Ini</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "MyhalalGIG Banyak Membantu Syarikat Kami "
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='/images/HL0016 - Copy.png' />
              <b>CEO FarhaBeauty</b> Hamizah Farhanah
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '5em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Sangat Memudahkan Urusan Dalam Fail Halal!"
            </Header>
            <p style={{ fontSize: '1.33em' }}>Antara Ulasan Dari Pengguna Sistem Ini</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "MyhalalGIG Banyak Membantu Syarikat Kami "
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='/images/HL0016 - Copy.png' />
              <b>CEO FarhaBeauty</b> Hamizah Farhanah
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
    <ScrollToTop smooth />
  </>
)

export default Home