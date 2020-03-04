import React, { Component } from 'react';
import { Button, Header, Segment, Image, Icon, Table, Grid, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class CharityDetails extends Component {

    handleStatusClick = (request, status) => {
        this.props.onEditRequestStatusAndId(request, status)
    }

    render() {
        return(
            <>
             <Link to={`charities/${this.props.selectedCharity.city}/${this.props.selectedCharity.id}`} />  
             <Segment placeholder>
                {/* <Header as='h1' textAlign='center'>
                    {this.props.selectedCharity.name}
                    <br></br>
                </Header> */}
                <Image size='medium' centered src={this.props.selectedCharity.image} />
            </Segment>

            <Segment icon="true">
                <Grid columns={3} stackable textAlign='center'>
                    <Grid.Column>
                        <Icon name="map marker" />
                        {this.props.selectedCharity.address}
                    </Grid.Column>
                </Grid>
            </Segment>

            <Segment >
                <Header as='h2' textAlign='center'>
                     Current List of Requests by {`${this.props.selectedCharity.name}`}
                </Header>
            </Segment>

            <Table celled color={'blue'}>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Expires</Table.HeaderCell>
                    <Table.HeaderCell>Info</Table.HeaderCell>
                    <Table.HeaderCell>Status
                    <Popup  wide inverted trigger={<Button icon='help circle' />} >
                        <Grid centered divided columns={2}>
                            <Grid.Column textAlign='center'>
                                <Header as='h4'>Open</Header>
                                <p>
                                    Click to "Donate" to donate this item and wait for approval.
                                </p>
                                </Grid.Column>

                                <Grid.Column textAlign='center'>
                                    <Header as='h4'>Pending</Header>
                                    <p>
                                        Another user is waiting for approval to donate this item, 
                                        you can not donate it.
                                    </p>
                                    </Grid.Column>
                                </Grid>
                    </Popup>
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.props.charityRequests.map((request, index) => {
                        return (
                            <Table.Row key={index}>
                            {request.status.toLowerCase() !== 'closed' && request.status.toLowerCase() !== 'approved' ? <Table.Cell >{request.expiration_date}</Table.Cell> : null}
                            {request.status.toLowerCase() !== 'closed' && request.status.toLowerCase() !== 'approved' ?<Table.Cell>{request.info}</Table.Cell> : null} 
                            {request.status.toLowerCase() === 'open' ? <Table.Cell positive>{request.status.toLowerCase()}<Button onClick={() => this.handleStatusClick(request, "pending")} floated='right' inverted color='green'>
              Donate</Button></Table.Cell> : null }
                            {request.status.toLowerCase() === 'pending' ? <Table.Cell warning><Icon name='attention' />{request.status.toLowerCase()}</Table.Cell> : null }
                            </Table.Row>
                        )
                    })}
            </Table.Body>
            </Table>
            </>
        )
    }
}

export default CharityDetails