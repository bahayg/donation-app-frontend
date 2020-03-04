import React, { Component } from 'react';
import { Card, Container} from 'semantic-ui-react'
import AdminsCharityCard from "../components/AdminsCharityCard";

class AdminProfile extends Component {
    adminsCharityCards = () => {
        return  this.props.adminsCharities.map ((charity, index) => {
        return <AdminsCharityCard style={{ paddingRight:"10px", paddingTop:"10px" }} key={index} onShowCharityDetails={this.props.onShowCharityDetails} onGetCharityRequests={this.props.onGetCharityRequests} charity={charity} />
        })
      }
    render() {
        return(
            <Container style={{padding: '40px'}}>
                <Card.Group centered itemsPerRow={3}>
                {this.adminsCharityCards()}
                </Card.Group>
            </Container>
        )
    }
}

export default AdminProfile;