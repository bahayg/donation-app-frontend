import React, { Component } from 'react';
import { Button, Header, Segment, Image, Icon, Table, Grid, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class UserProfile extends Component {

    // handleStatusClick = (request, status) => {
    //     this.props.onEditRequestStatusAndId(request, status)
    // }


    render() {
        return(
            
            <>
            
             <Link to={`users/${this.props.user.username}/requests`} />  
             

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
                    <Table.HeaderCell>Charity Name</Table.HeaderCell>
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
                </Table.Row>
                </Table.Header>

                <Table.Body>
                
                    {this.props.userRequests.map(request => {
                        return (
                            <Table.Row>
                            <Table.Cell>{request.expiration_date}</Table.Cell> 
                            <Table.Cell>{request.info}</Table.Cell> 
                             <Table.Cell>{request.charity.name}</Table.Cell> 


                            {request.status.toLowerCase() === 'pending' ? <Table.Cell warning>{request.status.toLowerCase()}<Button onClick={() => this.handleStatusClick(request, "open")} floated='right' color='green'>
              Drop</Button></Table.Cell> : null }
                            {request.status.toLowerCase() === 'approved' ? <Table.Cell warning>{request.status.toLowerCase()}<Button onClick={() => this.handleStatusClick(request, "open")} floated='right' color='green'>
              Drop</Button></Table.Cell> : null }
                            {/* {request.status.toLowerCase() === 'closed' ? <Table.Cell negative>{request.status.toLowerCase()}</Table.Cell> : null } */}
                            {request.status.toLowerCase() === 'closed' ? <Table.Cell negative>{request.status.toLowerCase()}</Table.Cell> : null }
                            
                            </Table.Row>
                        )
                    })}
              
            </Table.Body>

            </Table>
            </>
        )
    }
}

export default UserProfile