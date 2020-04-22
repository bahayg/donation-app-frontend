import React, { Component} from 'react'
import {Header, Segment, Dropdown, Grid} from 'semantic-ui-react'

class MainPage extends Component {

    componentDidMount() {
        this.uniqCities()
        this.props.getCharities()
    }
    
    uniqCities = () => {
        if (!this.props.allCharities.message) {
            const uniq = this.props.allCharities.map(charity => charity.city).filter((v, i, a) => a.indexOf(v) === i).sort().map(city => city);
            uniq.unshift("All") 
            return uniq.map((city, index) => <div className="item" key={index}><li>{city}</li></div>)
        } else {
            return null
        }
      }

      handleCitySelect = (e) => {
        const city = e.target.innerText
        this.props.changeCity(city)
        this.props.history.push(`/charities/${city}`)
      }

    render () {
        return (
            <>
            <div className='home-segment'>
            <Grid columns={3}  style={{ paddingTop: '2.5rem', paddingBottom: '1.5rem' }}textAlign='center'>
                <Grid.Column >
                <Segment circular style = {{ width: 350, height: 350, opacity: 0.85 }}>
                    <Header as='h1' textAlign='center'>
                        Welcome to Reunited Hands
                        <br></br>
                    </Header>
                    <p>
                        My app will connect individuals with surplus items to local organizations and charities who are in need. 
                    </p>
                </Segment>
                </Grid.Column>
            </Grid>

            <Grid columns={3}  textAlign='center' fontSize="large">
                <Grid.Column>
                <Dropdown className='city-dropdown' item direction="left" text= 'Select a City to Explore Local Organizations'>
                    <Dropdown.Menu>
                        <Dropdown.Item  onClick={(e) => this.handleCitySelect(e)}>{this.uniqCities()}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Grid.Column>
            </Grid>
            </div>
            </>
        )
    }
} 

export default MainPage