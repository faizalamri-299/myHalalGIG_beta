/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
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
  Transition,
  Modal
} from 'semantic-ui-react'
import ScrollToTop from "react-scroll-to-top";
import { HoverCard } from 'react-png-hovercard';
import {Link} from 'react-scroll'
import {isMobile} from 'react-device-detect';
import SignInScreen from '../auth/SignInScreen';
import RegisterScreen from '../auth/RegisterScreen';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container textAlign='right'>
    <Header
      id="Barcode"
      style={{
        fontSize: mobile ? '3em' : '4.5em',
        fontWeight: 'normal',
        marginTop: mobile ? '1.5em' : '1em',
        color:'#black'
      }}
      textAlign='right'
    >FAIL HAS DAN HALAL <br></br> HANYA DIHUJUNG <br></br> JARI ANDA
      
    </Header>
    <Header
      content='Cepat dan Mudah'
      id="Qwitcher"
      style={{
        fontSize: mobile ? '2.5em' : '2.75em',
        fontWeight: 'thin',
        marginTop: mobile ? '0.5em' : '0.5em',
        color:'#137f7f'
      }}
    />

    <Button circular animated color='blue' size='huge' style={{marginTop:'0.5em'}} as={Link} to="about" spy={true} smooth={true}>
      <Button.Content visible>Baca Selanjutnya</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow down' />
      </Button.Content>
    </Button>
    
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {visible: true}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  setModal = () => this.setState('')

  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }))

  confirmClick = (event, data) => {
    console.log("Passed in Prop Value: " + this.props.valueIntoModal);
    this.props.handleClose();
  }

  render() {
    const { children } = this.props
    const { fixed } = this.state
    const { visible } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onTopPassed={this.showFixedMenu}
          onTopPassedReverse={this.hideFixedMenu}
        > 
          <div id='home' className="headerimage" > 
          <Segment textAlign='center' style={{ minHeight: 700, padding: '1em 0em', paddingBottom:'5em' }}vertical>
          <Transition visible={visible} animation='flash' duration={500}>  
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={fixed ? false : false}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
              borderless
            >
              <Container>
                <Menu.Item as='a' as={Link} to="home" spy={true} smooth={true} >
                <div className='fontHomepage'>Utama</div>
                </Menu.Item>
                <Menu.Item as='a' as={Link} to="about" spy={true} smooth={true} >
                  Tentang
                </Menu.Item>

                {/* <Menu.Item as='a' as={Link} to="features" spy={true} smooth={true}>
                  Ciri-ciri
                </Menu.Item>

                <Menu.Item as='a' as={Link} to="feedback" spy={true} smooth={true}>
                  Maklumbalas
                </Menu.Item> */}

                <Menu.Item position='right'>
                  <Modal trigger={<Button style={{ marginLeft: '0.5em' }} color='blue'>Log Masuk</Button>} content={<SignInScreen />} />
                  {/* <Modal trigger={<Button style={{ marginLeft: '0.5em' }} color='teal'>Daftar</Button>} content={<RegisterScreen />} /> */}
                </Menu.Item>
              </Container>
            </Menu></Transition>
            <HomepageHeading />
          </Segment>
          </div>
          
        </Visibility>
        
        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state
    

    return (
      <div id='home'>
        <Media as={Sidebar.Pushable} at='mobile'>
          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation='overlay'
            
              onHide={this.handleSidebarHide}
              vertical
              visible={sidebarOpened}
            >
                <Menu.Item as='a' as={Link} to="home" spy={true} smooth={true} >
                Utama
                </Menu.Item>
                <Menu.Item as='a' as={Link} to="about" spy={true} smooth={true} >
                  Tentang
                </Menu.Item>

                {/* <Menu.Item as='a' as={Link} to="features" spy={true} smooth={true}>
                  Ciri-ciri
                </Menu.Item>

                <Menu.Item as='a' as={Link} to="feedback" spy={true} smooth={true}>
                  Maklumbalas
                </Menu.Item> */}

                <Menu.Item>
                  <Button as='a' href='login' color='blue'>
                    Log Masuk
                  </Button>
                  <Button as='a' href='register'  style={{ marginLeft: '0.5em' }} color='teal'>
                    Daftar
                  </Button>
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={sidebarOpened}>
              <Segment
              
                textAlign='center'
                style={{ minHeight: 350, padding: '1em 0em' }}
                vertical
              >
                <Container>
                  <Menu pointing secondary size='large'>
                    <Menu.Item onClick={this.handleToggle}>
                      <Icon name='sidebar' />
                    </Menu.Item>
                  </Menu>
                </Container>
                <HomepageHeading mobile />
              </Segment>
              <div style={{marginLeft:'1em', marginRight:'1em', fontSize:'3em'}}>
                {children}
              </div>
              
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Media>
      </div>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const MobileResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

MobileResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
<>

  <ResponsiveContainer smooth={true} spy={true}>
  <div id="about" style={{ padding: '7em 0em' }}>
    <div className="headerimage2" >
        <Grid container style={{ paddingTop: '3em'}}>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em', color: '#2185d0'}}>
                Kami Bantu Semua
              </Header>
              <p style={{ fontSize: '1.33em',textAlign:'justify', color: 'black' }}>
              MyHalalGig adalah satu inisiatif baru dalam membantu pengusaha industri bagi permohonan halal JAKIM.
              </p>
              <Header as='h3' style={{ fontSize: '2em', color: '#2185d0' }}>
                Apa Yang MyHalalGIG Tawarkan?
              </Header>
              <p style={{ fontSize: '1.33em',textAlign:'justify', color: 'black' }}>
              MyHalalGig adalah satu sistem pasaran bebas dan bakat Halal yang pertama di dunia dimana ia dapat menghubungkan syarikat-syarikat berkaitan Halal (pelanggan) dan pekerja bebas (penasihat) secara global. Melalui sistem pasaran ini, pelanggan boleh memilih penasihat untuk melakukan pekerjaan dalam bidang seperti pematuhan Halal, latihan dan pembangunan Halal, kemasukan data, reka bentuk produk, analisis makmal, penjualan dan pemasaran, dan perkhidmatan perundangan.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
  </div>

 
  {/* <div id="features" className='headerimage23' style={{ paddingTop: '10em'}}>
    <div style={{ paddingLeft: '10em'}}>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={5}>
            <HoverCard 
              front={
                <div className="Front-card1">
                  <Image rounded size='large' src='/images/banner-cloud.jpg' />
                </div>
              }
              back={
                <div className="Back-card1">
                  <div className="font1" style={{ fontSize: '2em' }}>
                    Storan Cloud
                  </div>
                    <p className="fontBody" style={{ marginLeft:'1em', paddingTop:'1em' , marginRight:'1em'}}>
                    Semua data anda selamat dengan storan cloud atas talian dan boleh mengambil data bila-bila masa diperlukan selagi ada talian internet dan dapat berkongsi data dengan pengguna lain dengan mudah.
                    </p>
                </div>
              }
              maxWidth={300}
              animationSpeed={600}
              height={450}
            />
          </Grid.Column>

          <Grid.Column width={5}>
            <HoverCard 
              front={
                <div className="Front-card2">
                  <Image rounded size='large' src='/images/banner-file.jpg' />
                </div>
              }
              back={
                <div className="Back-card2">
                  <div className="font1" style={{ fontSize: '2em' ,color:'#ffffff' }}>
                    Penyimpanan Fail
                  </div>
                    <p className="fontBody" style={{ marginLeft:'1em', paddingTop:'1em' , marginRight:'1em',color:'#ffffff'}}>
                    Bangunkan dan simpan segala fail-fail berkaitan syarikat dengan selamat dan data boleh dimuat turun selagi terdapat talian internet. 
                    </p>
                </div>
              }
              maxWidth={300}
              animationSpeed={600}
              height={450}
            />
          </Grid.Column>

          <Grid.Column width={5}>
            <HoverCard 
              front={
                <div className="Front-card3">
                  <Image rounded size='large' src='/images/banner-advisor.jpg' />
                </div>
              }
              back={
                <div className="Back-card3">
                  <div className="font1" style={{ fontSize: '2em' }}>
                    Penasihat Pakar
                  </div>
                    <p className="fontBody" style={{ marginLeft:'1em', paddingTop:'1em' , marginRight:'1em'}}>
                    Terdapat ratusan pakar bagi membantu anda. Dapatkan nasihat daripada pakar berkaitan dalam membangunkan fail Halal dan juga HAS syarikat anda. 
                    </p>
                </div>
              }
              maxWidth={300}
              animationSpeed={600}
              height={450}
            />
          </Grid.Column>
          
        </Grid.Row>
      </Grid>
    </div> 
  </div> */}

  {/* <div id="feedback" className="headerimage3">
    <Segment style={{ paddingTop:'5em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Penasihat sangat banyak membantu dan memberikan tunjuk ajar"
            </Header>
            <p style={{ fontSize: '1.33em' }}>Antara Ulasan Dari Pengguna Sistem Ini</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Urusan fail bagi HAS dan juga Halal semakin mudah dengan adanya MyHalalGIG"
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
              "MyhalalGIG Banyak Membantu Syarikat Kami"
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='/images/Fatin.png' />
              <b>Founder Lazizious Steamboat</b> Fatin Atikah
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Sangat Memudahkan Urusan Dalam Fail Halal!"
            </Header>
            <p style={{ fontSize: '1.33em' }}>Antara Ulasan Dari Pengguna Sistem Ini</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </div> */}

  <div className="headerimage4">
    <Segment vertical style={{ paddingTop:'8em' }} >
      <Container>
        <Grid divided stackable centered>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h4' content='How To Reach Us?' />
              <List>
                <List.Item>
                  <List.Icon name='map marker alternate' />
                  <List.Content>BG-F-05, Medini 6, Jalan Medini Sentral 5, Medini, 79250 Nusajaya, Johor</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name='clock outline' />
                  <List.Content>Sunday – Thursday : 8.00 am – 5.00 pm <br></br>Friday – Saturday : Closed</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name='mail' />
                  <List.Content>admin@holisticslab.my</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name='phone square' />
                  <List.Content>+6019 776 5075</List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          
            <Grid.Column width={8}>
              <Header as='h4' content='Connect with us!' />  
              <Button compact color='facebook' target="_blank" href="https://facebook.com/holisticslab">
                <Icon name='facebook' /> Facebook
              </Button>
              <Button compact color='twitter' target="_blank" href="https://twitter.com/holisticslab">
                <Icon name='twitter' /> Twitter
              </Button>
              <Button compact color='linkedin' target="_blank" href="https://linkedin.com/holisticslab">
                <Icon name='linkedin' /> LinkedIn
              </Button>
              <Button compact color='instagram' target="_blank" href="https://instagram.com/holisticslab">
                <Icon name='instagram' /> Instagram
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </div>
  <ScrollToTop smooth />  
</ResponsiveContainer>  


<MobileResponsiveContainer>
    <div id="about">
      <div>
        <Segment style={{ padding: '15em 0em' }} vertical >
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                
                <Header as='h3' style={{ fontSize: '2em'}}>
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
                
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    </div>

   
    <div id="features">
      
    {isMobile ? 
    <>
      <Grid centered>
        <Grid.Row centered>
          <HoverCard
            front={
              <div className="Front-card1">
                <Image size='large' src='/images/banner-cloud.jpg' />
              </div>
            }
            back={
              <div className="Back-card1" style={{fontSize:'0.5em'}}>
                 Semua data anda selamat dengan storan cloud atas talian dan boleh mengambil data bila-bila masa diperlukan selagi ada talian internet dan dapat berkongsi data dengan pengguna lain dengan mudah.
              </div>
            }
            maxWidth={300}
            animationSpeed={500}
            height={350}
          />
        </Grid.Row>
      </Grid>

      <Grid centered>
        <Grid.Row centered>
          <HoverCard
            front={
              <div className="Front-card2">
                <Image size='large' src='/images/banner-file.jpg' />
              </div>
            }
            back={
              <div className="Back-card1" style={{fontSize:'0.5em'}}>
                Bangunkan dan simpan segala fail-fail berkaitan syarikat dengan selamat dan data boleh dimuat turun selagi terdapat talian internet. 
              </div>
            }
            maxWidth={300}
            animationSpeed={500}
            height={350}
          />
        </Grid.Row>
      </Grid>

      <Grid centered>
        <Grid.Row centered>
          <HoverCard
            front={
              <div className="Front-card3">
                <Image size='large' src='/images/banner-advisor.jpg' />
              </div>
            }
            back={
              <div className="Back-card1" style={{fontSize:'0.5em'}}>
                Terdapat ratusan pakar bagi membantu anda. Dapatkan nasihat daripada pakar berkaitan dalam membangunkan fail Halal dan juga HAS syarikat anda. 
              </div>
            }
            maxWidth={300}
            animationSpeed={500}
            height={350}
          />
        </Grid.Row>
      </Grid> 
      
           
    </> : 
    <><br></br><br></br><br></br><br></br>
      <Segment style={{ padding: '5em 0em' }} vertical> {/* features */}
        <Grid  columns={4} style={{ marginLeft: '20em' }} >
          <Grid.Row>
            <Grid.Column>
              <HoverCard
                front={
                  <div className="Front-card1">
                    <Image size='large' src='/images/banner-cloud.jpg' />
                  </div>
                }
                back={
                  <div className="Back-card1">
                    <div className="font1" style={{ fontSize: '2em' }}>
                      Cloud Storage
                    </div>
                      <p className="fontBody" style={{ marginLeft:'1em', paddingTop:'1em' , marginRight:'1em'}}>
                      Gravity is working against me
                      And gravity wants to bring me down
                      Oh, I'll never known what makes this man
                      With all the love that his heart can stand
                      Dream of ways to throw it all away
                      </p>
                  </div>
                }
                maxWidth={450}
                animationSpeed={500}
                height={500}
              />
              </Grid.Column>
            <Grid.Column>
              <HoverCard
                front={
                  <div className="Front-card2">
                    <Image rounded size='large' src='/images/banner-file.jpg' />
                  </div>
                }
                back={
                  <div className="Back-card2">
                    <div className="font1" style={{ fontSize: '2em' }}>
                      Cloud Storage
                    </div>
                      <p className="fontBody" style={{ marginLeft:'1em', paddingTop:'1em' , marginRight:'1em'}}>
                      Gravity is working against me
                      And gravity wants to bring me down
                      Oh, I'll never known what makes this man
                      With all the love that his heart can stand
                      Dream of ways to throw it all away
                      </p>
                  </div>
                }
                maxWidth={450}
                animationSpeed={500}
                height={500}
              />
              </Grid.Column>
            <Grid.Column>
              <HoverCard
                front={
                  <div className="Front-card3">
                    <Image rounded size='large' src='/images/banner-advisor.jpg' />
                  </div>
                }
                back={
                  <div className="Back-card3">
                    <div className="font1" style={{ fontSize: '2em' }}>
                      Cloud Storage
                    </div>
                      <p className="fontBody" style={{ marginLeft:'1em', paddingTop:'1em' , marginRight:'1em'}}>
                      Gravity is working against me
                      And gravity wants to bring me down
                      Oh, I'll never known what makes this man
                      With all the love that his heart can stand
                      Dream of ways to throw it all away
                      </p>
                  </div>
                }
                maxWidth={450}
                animationSpeed={500}
                height={500}
              />
              </Grid.Column>  
          </Grid.Row>
        </Grid>
      </Segment>
    </>
    }
    
    </div>

    <div id="feedback">
      <Segment style={{ padding: '5em',paddingTop:'5em' }} vertical>
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
                "MyhalalGIG Banyak Membantu Syarikat Kami"
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
                "MyhalalGIG Banyak Membantu Syarikat Kami"
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                <Image avatar src='/images/Fatin.png' />
                <b>Founder Lazizious Steamboat</b> Fatin Atikah
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "Sangat Memudahkan Urusan Dalam Fail Halal!"
              </Header>
              <p style={{ fontSize: '1.33em' }}>Antara Ulasan Dari Pengguna Sistem Ini</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>

    <div>
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Grid divided stackable centered>
          <Grid.Row>
            <Grid.Column width={6}>
              <Header as='h4' content='How To Reach Us?' />
              <List link>
                <List.Item>
                  <List.Icon name='map marker alternate' />
                  <List.Content>BG-F-05, Medini 6, Jalan Medini Sentral 5, Medini, 79250 Nusajaya, Johor</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name='clock outline' />
                  <List.Content>Sunday – Thursday : 8.00 am – 5.00 pm <br></br>Friday – Saturday : Closed</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name='mail' />
                  <List.Content>admin@holisticslab.my</List.Content>
                </List.Item>

                <List.Item as='a'>
                  <List.Icon name='phone square' />
                  <List.Content>+6019 776 5075</List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          
            <Grid.Column width={6}>
              <Header inverted as='h4' content='Connect with us!' />  
              <Button compact color='facebook' target="_blank" href="https://facebook.com/holisticslab">
                <Icon name='facebook' /> Facebook
              </Button>
              <Button compact color='twitter' target="_blank" href="https://twitter.com/holisticslab">
                <Icon name='twitter' /> Twitter
              </Button>
              <Button compact color='linkedin' target="_blank" href="https://linkedin.com/holisticslab">
                <Icon name='linkedin' /> LinkedIn
              </Button>
              <Button compact color='instagram' target="_blank" href="https://instagram.com/holisticslab">
                <Icon name='instagram' /> Instagram
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
    <ScrollToTop smooth />        
  </MobileResponsiveContainer>
</>


  
  
)

export default HomepageLayout