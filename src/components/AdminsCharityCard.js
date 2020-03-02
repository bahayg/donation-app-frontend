import React, { Component } from "react";
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

 class AdminsCharityCard extends Component {

    handleClick = () => {
        this.props.onShowCharityDetails(this.props.charity)
        this.props.onGetCharityRequests(this.props.charity.id)
    }

     render() {
         return(

            <Card onClick={() => this.handleClick() }>
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