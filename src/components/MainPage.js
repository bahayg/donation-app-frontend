import React, { Component} from 'react'
import { Button, Form, Grid, Header, Image, Segment, Dropdown, Menu} from 'semantic-ui-react'
// import CharitiesContainer from '../containers/CharitiesContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom';


class MainPage extends Component {

    componentDidMount() {
        this.uniqCities()
    }
    
    uniqCities = () => {
        if (!this.props.allCharities.message) {
            // console.log(this.props.allCharities)
            const uniq = this.props.allCharities.map(charity => charity.city).filter((v, i, a) => a.indexOf(v) === i).sort().map(city => city);
            uniq.unshift("All") 
            //   console.log(uniq)
            return uniq.map(city => <div className="item"><li>{city}</li></div>)
        } else {
            return null
        }
      }

      handleCitySelect = (e) => {
        const city = e.target.innerText
        // console.log(city)
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
                    <Header as='h3' textAlign='center'>
                        My app will connect individuals with surplus items to local organizations and charities who are in need. 
                    </Header>
                </Header>
            </Segment>

            <Segment >
                <Header as='h3' textAlign='center'>
                    Select a city to explore local organizations
                </Header>
            </Segment>

            <Menu centered vertical>
                <Dropdown item centered text= 'Select City'>
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