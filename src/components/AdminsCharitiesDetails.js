import React, { Component } from 'react';
import { Button, Header, Segment, Image, Icon, Table, Grid, Popup, Modal, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { api } from "../services/api";
import AddRequest from './AddRequest';
import EditRequest from './EditRequest';

class AdminsCharitiesDetails extends Component {

    constructor(){
        super()
        this.state = {
            showModal: false,
            showEditModal: false, 
            selectedRequest: ''
        }
    }
    
    closeModal  = (e) => {
        this.setState({ showModal: false})
    }

    closeEditModal  = (e) => {
        this.setState({ showEditModal: false})
    }

    handleDeleteCharity = () => {
        api.charities.deleteCharity(this.props.selectedCharity.id)
        .then((data) => {
            // console.log(data)
            this.props.deleteCharitySet(data.id)
            this.props.history.push(`/users/${this.props.user.username}/charities`)
            // this.props.history.push('/home')

        })
    }

    handleStatusClick = (request, status) => {
        console.log("Approved")
        this.props.onEditRequestStatus(request.id, status)
    }

    render() {

        return(
            <>
             {/* <Link to={`charities/${this.props.selectedCharity.city}/${this.props.selectedCharity.id}`} />   */}
             <Button floated="right" onClick={this.handleDeleteCharity}>Delete Charity</Button> <br></br>
             
             <Modal as={Form} onClose={this.closeModal} open={this.state.showModal} size="tiny" trigger={<Button onClick={() => this.setState({ showModal: true })}>Add Request</Button>}>
                 <AddRequest user={this.props.user} closeModal={this.closeModal} selectedCharity={this.props.selectedCharity} onAddRequest={this.props.onAddRequest} /></Modal>

             {/* <Button as={Link} to={`/users/${this.props.user.username}/charities/${this.props.selectedCharity.id}/add-request`} floated="right" onClick={this.handleAddRequest}>Add Request</Button> <br></br> */}
             <Segment placeholder>
                <Header as='h1' textAlign='center'>
                        {this.props.selectedCharity.name}
                        <br></br>
                </Header>
                <Image size='medium' centered src={this.props.selectedCharity.image} />
            </Segment>

            <Segment icon>
                <Grid columns={3} stackable textAlign='center'>
                    <Grid.Column>
                        <Icon name="map marker" centered />
                        {this.props.selectedCharity.address}
                    </Grid.Column>
                </Grid>
            </Segment>

            <Segment >
                <Header as='h2' textAlign='center'>
                        Current List of Requests 
                </Header>
            </Segment>

            <Table celled>
                   
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Expires</Table.HeaderCell>
                    <Table.HeaderCell>Info</Table.HeaderCell>
                    <Table.HeaderCell>Status
                    <Popup  wide inverted trigger={<Button icon='help circle' />} >
                        <Grid centered divided columns={3}>
                            <Grid.Column textAlign='center'>
                                <Header as='h4'>Open</Header>
                                <p>
                                Click to "open" to donate and wait for approval
                                </p>
                                </Grid.Column>
                                <Grid.Column textAlign='center'>
                                    <Header as='h4'>Pending</Header>
                                    <p>
                                    Another user is waiting for approval to donate, 
                                    you can not donate
                                    </p>
                                    </Grid.Column>
                                    <Grid.Column textAlign='center'>
                                        <Header as='h4'>Closed</Header>
                                        <p>
                                        Another user already donated, you can not donate
                                        </p>
                                        </Grid.Column>
                                </Grid>
                    </Popup>
                    </Table.HeaderCell>

                    {/* <Table.HeaderCell>User</Table.HeaderCell> */}

                    <Table.HeaderCell>Edit</Table.HeaderCell>
                    

                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
                
            <Table.Body>
                    {this.props.charityRequests.map(request => {
                        return (
                            <Table.Row>
                            <Table.Cell>{request.expiration_date}</Table.Cell>
                            <Table.Cell>{request.info}</Table.Cell>

                            {request.status.toLowerCase() === 'open' ? <Table.Cell positive>{request.status.toLowerCase()} </Table.Cell> : null }
                            {request.status.toLowerCase() === 'closed' ? <Table.Cell negative>{request.status.toLowerCase()}</Table.Cell> : null }
                            {request.status.toLowerCase() === 'pending' ? <Table.Cell warning>{request.status.toLowerCase()}<Button onClick={() => this.handleStatusClick(request, "approved")} floated='right' color='orange'>
              Approve</Button></Table.Cell> : null }
                            {request.status.toLowerCase() === 'approved' ? <Table.Cell warning>{request.status.toLowerCase()}<Button onClick={() => this.handleStatusClick(request, "closed")} floated='right' color='red'>
              Close</Button></Table.Cell> : null }

                            {/* <Table.Cell icon='edit'></Table.Cell> */}

                            {request.status.toLowerCase() === 'open' ? 
                            <Modal as={Form} open={this.state.showEditModal} onClose={this.closeEditModal} size="tiny" trigger={<Table.Cell icon='edit' onClick={() => this.setState({ showEditModal: true, selectedRequest: request })}></Table.Cell>}>
                 <EditRequest user={this.props.user} requestId={this.state.selectedRequest.id} closeEditModal={this.closeEditModal} selectedCharity={this.props.selectedCharity} onEditRequest={this.props.onEditRequest} /></Modal>
                        : <Table.Cell></Table.Cell>}

                            <Table.Cell icon='trash alternate'></Table.Cell>
                            </Table.Row>

                            // <Modal
                            // Variations / Size /Mini
                            // />
                        )
                    })}
              
            </Table.Body>

            </Table>
            </>
        )
    }
}

export default AdminsCharitiesDetails