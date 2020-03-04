import React, { Component} from 'react'
import {Header, Segment, Dropdown, Menu, Grid} from 'semantic-ui-react'

class MainPage extends Component {

    componentDidMount() {
        this.uniqCities()
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
                        <Grid columns={3}  style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}textAlign='center'>
                <Grid.Column>
            <Segment circular style = {{ width: 325, height: 325 }}>
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

            <Segment >
                <Header as='h3' textAlign='center'>
                    Select a city to explore local organizations
                </Header>
            </Segment>

            {/* <Menu  vertical> */}
            <Grid columns={3}  textAlign='center'>
                <Grid.Column>
                <Dropdown item text= 'Select City'>
                    <Dropdown.Menu>
                        <Dropdown.Item  onClick={(e) => this.handleCitySelect(e)}>{this.uniqCities()}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Grid.Column>
</Grid>
            {/* </Menu> */}
            </>
        )
    }
} 

export default MainPage

{/* <Segment icon="true">
<Grid columns={3} stackable textAlign='center'>
    <Grid.Column>
        <Icon name="map marker" />
        {this.props.selectedCharity.address}
    </Grid.Column>
</Grid>
</Segment> */}