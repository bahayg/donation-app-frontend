import React, { Component } from "react";
import { Card, Container, Image, Button, Item, Segment } from 'semantic-ui-react'


 class CharityCard extends Component {
     render() {
         return(
      
          
            <Card>

                <Card.Content>
                    <Card.Header>{this.props.charity.name}</Card.Header>
                </Card.Content>

                <Card.Content>
                    <Image src={this.props.charity.image} size="medium" rounded />
                </Card.Content>
            </Card>
         )
     }
 }

 export default CharityCard