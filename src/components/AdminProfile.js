import React, { Component } from 'react';
import { Card, Container} from 'semantic-ui-react'
import AdminsCharityCard from "../components/AdminsCharityCard";

class AdminProfile extends Component {
    adminsCharityCards = () => {
        return  this.props.adminsCharities.map (charity => {
        return (
          <div style={{ paddingRight:"10px", paddingTop:"10px" }}>
            <AdminsCharityCard onShowCharityDetails={this.props.onShowCharityDetails} onGetCharityRequests={this.props.onGetCharityRequests} charity={charity} />
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