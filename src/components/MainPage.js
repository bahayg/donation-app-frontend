import React, { Component} from 'react'
import {Header, Segment, Dropdown, Menu} from 'semantic-ui-react'

class MainPage extends Component {

    componentDidMount() {
        this.uniqCities()
    }
    
    uniqCities = () => {
        if (!this.props.allCharities.message) {
            // console.log(this.props.allCharities)
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
            <Segment placeholder>
                <Header as='h1' textAlign='center'>
                    Welcome to My Donation App
                    <br></br>
                </Header>
                <p>
                        My app will connect individuals with surplus items to local organizations and charities who are in need. 
                    </p>
            </Segment>

            <Segment >
                <Header as='h3' textAlign='center'>
                    Select a city to explore local organizations
                </Header>
            </Segment>

            <Menu  vertical>
                <Dropdown item text= 'Select City'>
                    <Dropdown.Menu>
                        <Dropdown.Item  onClick={(e) => this.handleCitySelect(e)}>{this.uniqCities()}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
            </>
        )
    }
} 

export default MainPage