import React, { Component } from 'react';
import { Button, Header, Segment, Image, Icon, Table, Grid, Popup, Modal, Form } from 'semantic-ui-react'
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
            this.props.deleteCharitySet(data.id)
            this.props.history.push(`/users/${this.props.user.username}/charities`)
            // this.props.history.push('/home')
        })
    }

    handleDeleteRequest = (request) => {
        api.requests.deleteRequest(request.id)
        .then(data => {
            this.props.onCharityRequestDelete(data.id)
            this.props.history.push(`/users/${this.props.user.username}/charities/${this.props.selectedCharity.id}`)
    })
}

    handleStatusClick = (request, status) => {
        // console.log("Approved")
        this.props.onEditRequestStatus(request.id, status)
    }

    render() {
        const { name, image, address, description } = this.props.selectedCharity

        return(
            <>
             {/* <Link to={`charities/${this.props.selectedCharity.city}/${this.props.selectedCharity.id}`} />   */}
             <Button floated="right" onClick={this.handleDeleteCharity}>Delete Charity</Button> <br></br>
             
             <Modal as={Form} onClose={this.closeModal} open={this.state.showModal} size="tiny" trigger={<Button onClick={() => this.setState({ showModal: true })}>Add Request</Button>}>
                 <AddRequest user={this.props.user} closeModal={this.closeModal} selectedCharity={this.props.selectedCharity} onAddRequest={this.props.onAddRequest} /></Modal>

                <Segment placeholder>
                <Grid centered divided columns={2}>
                    <Grid.Column>
                        <Image size='medium' centered src={image} />
                    </Grid.Column>
                    <Grid.Column>
                        <p><label style={{ fontWeight:"600" }}>Name:</label> {name}</p>
                        <p><label style={{ fontWeight:"600" }}>Address:<Icon name="map marker"/></label> {address}</p>
                        <p><label style={{ fontWeight:"600" }}>Description:</label> {description}</p>
                    </Grid.Column>
                </Grid>
                </Segment>

                 {/* <Grid columns={3} stackable textAlign='center'> */}

            <Segment >
                <Header as='h2' textAlign='center'>
                    Current List of Requests by {`${this.props.selectedCharity.name}`}
                </Header>
            </Segment>

            <Table celled color={'green'}>
                   
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Expires</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Info</Table.HeaderCell>
                    <Table.HeaderCell>Status
                    <Popup  wide="very" inverted trigger={<Button icon='help circle' />} >
                        <Grid centered divided columns={4}>
                            <Grid.Column textAlign='center'>
                                <Header as='h4'>Open</Header>
                                <p>
                                    The item is listed. You can edit and/or remove it from your list.
                                </p>
                            </Grid.Column>
                            <Grid.Column textAlign='center'>
                                <Header as='h4'>Pending</Header>
                                <p>
                                    A volunteer is waiting for approval to donate this item. Click to "Approve" and wait for the volunteer to deliver it. 
                                </p>
                            </Grid.Column>
                            <Grid.Column textAlign='center'>
                                <Header as='h4'>Approved</Header>
                                <p>
                                    Wait for the volunteer to deliver this item and then click to "Close" after it is delivered.
                                </p>
                            </Grid.Column>
                            <Grid.Column textAlign='center'>
                                <Header as='h4'>Closed</Header>
                                    <p>
                                        The item is donated. You can remove it from your list.
                                    </p>
                            </Grid.Column>
                        </Grid>
                    </Popup>
                    </Table.HeaderCell>
                    <Table.HeaderCell>Edit</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
                
            <Table.Body>
                {this.props.charityRequests.map((request, index) => {
                    return (
                        <Table.Row key={index}>
                            <Table.Cell>{request.expiration_date}</Table.Cell>
                            <Table.Cell>{request.category}</Table.Cell>
                            <Table.Cell>{request.info}</Table.Cell>

                            {request.status.toLowerCase() === 'open' ? <Table.Cell positive>{request.status.toLowerCase()} </Table.Cell> : null }
                            {request.status.toLowerCase() === 'closed' ? <Table.Cell negative>{request.status.toLowerCase()}</Table.Cell> : null }
                            {request.status.toLowerCase() === 'pending' ? <Table.Cell warning><Icon name='attention' />{request.status.toLowerCase()}<Button onClick={() => this.handleStatusClick(request, "approved")} floated='right' inverted color='brown'>
              Approve</Button></Table.Cell> : null }
                            {request.status.toLowerCase() === 'approved' ? <Table.Cell warning><Icon name='checkmark' />{request.status.toLowerCase()}<Button onClick={() => this.handleStatusClick(request, "closed")} floated='right' inverted color='red'>
              Close</Button></Table.Cell> : null }


                            {request.status.toLowerCase() === 'open' ? 
                            <Modal as={Form} open={this.state.showEditModal} onClose={this.closeEditModal} size="tiny" trigger={<Table.Cell icon='edit' onClick={() => this.setState({ showEditModal: true, selectedRequest: request })}></Table.Cell>}>
                 <EditRequest user={this.props.user} requestId={this.state.selectedRequest.id} closeEditModal={this.closeEditModal} selectedCharity={this.props.selectedCharity} onEditRequest={this.props.onEditRequest} /></Modal>
                        : <Table.Cell></Table.Cell>}


                            {request.status.toLowerCase() === 'open' || request.status.toLowerCase() === 'closed' ? <Popup content='Click to remove this item from your list' position='top center' trigger={<Table.Cell icon='trash alternate' onClick={() => this.handleDeleteRequest(request)}></Table.Cell>}/>
                            : <Table.Cell></Table.Cell>}

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