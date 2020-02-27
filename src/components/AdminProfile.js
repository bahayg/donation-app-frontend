import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import { Card, Container} from 'semantic-ui-react'
import AdminsCharityCard from "../components/AdminsCharityCard";

class AdminProfile extends Component {
    adminsCharityCards = () => {
        return  this.props.adminsCharities.map (charity => {
        return (
          <div style={{ paddingRight:"10px", paddingTop:"10px" }}>
            <AdminsCharityCard onShowCharityDetails={this.props.onShowCharityDetails} charity={charity} />
          </div>
          )
        })
      }
    render() {
        return(
            <Container>
                <Card.Group centered itemsPerRow={3}>
                {this.adminsCharityCards()}
                </Card.Group>
            </Container>
        )
    }
}

export default AdminProfile;