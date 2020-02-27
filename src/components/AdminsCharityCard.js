import React, { Component } from "react";
import { Card, Container, Image, Button, Item, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'



 class AdminsCharityCard extends Component {

    handleShowCharityDetails = () => {
        this.props.onShowCharityDetails(this.props.charity)
    }

     render() {
         return(
      
            <Card onClick={() => this.handleShowCharityDetails()}>
                <Link to={`charities/${this.props.charity.id}`} >
                <Card.Content>
                    <Card.Header>{this.props.charity.name}</Card.Header>
                </Card.Content>

                <Card.Content>
                    <Image src={this.props.charity.image} size="medium" rounded />
                </Card.Content>
                </Link>
            </Card>
         )
     }
 }

 export default AdminsCharityCard