import React, { Component } from 'react';
import AdminsCharityCard from "../components/AdminsCharityCard";
import EditUser from "../components/EditUser";
import { api } from "../services/api";
import { Button, Header, Segment, Table, Grid, Popup, Icon, Image, Card, Container, Modal, Form } from 'semantic-ui-react'

class AdminProfile extends Component {

    constructor(){
        super()
        this.state = { 
            showEditUserModal: false
        }
    }
    
    closeModal  = (e) => {
        this.setState({ showModal: false})
    }

    closeEditUserModal = (e) => {
        this.setState({ showEditUserModal: false})
    }

    // handleDeleteUser = () => {
    //     api.auth.deleteUser(this.props.user.id)
    //         this.props.history.push(`/login`)
   
    // }

    adminsCharityCards = () => {
        return  this.props.adminsCharities.map ((charity, index) => {
        return <AdminsCharityCard style={{ paddingRight:"10px", paddingTop:"10px" }} key={index} onShowCharityDetails={this.props.onShowCharityDetails} onGetCharityRequests={this.props.onGetCharityRequests} charity={charity} />
        })
      }

    render() {
        const { username, is_admin, email, image } = this.props.user

        return(
            <>
            <Segment placeholder>
            <Grid centered divided columns={2}>
                <Grid.Column>
                    <Image size='medium' circular centered src={image} />
                </Grid.Column>
                <Grid.Column>
                    <p><label style={{ fontWeight:"600" }}><Icon name="user"/> Username:</label> {username}</p>
                    <p><label style={{ fontWeight:"600" }}><Icon name="mail"/> E-mail Address:</label> {email}</p>
                    <p><label style={{ fontWeight:"600" }}>Is Admin?:</label> {is_admin ? "Yes" : "No"}</p>

                 
                    <Modal as={Form} open={this.state.showEditUserModal} onClose={this.closeEditUserModal} size="tiny" trigger={<Button floated="left" onClick={() => this.setState({ showEditUserModal: true })}>Edit My Account</Button>}>
                 <EditUser user={this.props.user} closeEditUserModal={this.closeEditUserModal} onEditUser={this.props.onEditUser} /></Modal>
                       

                    {/* <Button onClick={this.handleDeleteUser}>Delete My Account</Button> */}
                </Grid.Column>
            </Grid>
        </Segment>
            
            <Container style={{padding: '40px'}}>
                <Card.Group centered itemsPerRow={3}>
                {this.adminsCharityCards()}
                </Card.Group>
            </Container>

            </>
        )
    }
}

export default AdminProfile;