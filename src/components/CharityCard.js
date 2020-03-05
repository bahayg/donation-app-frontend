import React, { Component } from "react";
import { Card, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

 class CharityCard extends Component {

    handleClick = () => {
        this.props.onShowCharityDetails(this.props.charity)
        this.props.onGetCharityRequests(this.props.charity.id)
    }

     render() {
         return(
            <Card onClick={() => this.handleClick() } as={NavLink} to={`${this.props.charity.city}/${this.props.charity.id}`} >
                <Card.Content style={{ backgroundColor: '#EEB4B3'}}>
                    <Card.Header>{this.props.charity.name}</Card.Header>
                </Card.Content>
                <Card.Content style={{borderColor: 'transparent', backgroundColor: '#EEB4B3'}}>
                    <Image src={this.props.charity.image} size="medium" rounded/>
                </Card.Content>
            </Card>
         )
     }
 }

 export default CharityCard