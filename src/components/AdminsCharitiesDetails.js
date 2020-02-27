import React, { Component } from 'react';
import { Button, Header, Segment, Image, Icon, Table, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { api } from "../services/api";

class AdminsCharitiesDetails extends Component {
    

    handleDeleteCharity = () => {
        api.charities.deleteCharity(this.props.selectedCharity.id)
        .then((data) => {
            // console.log(data)
            this.props.deleteCharitySet(data.id)
            this.props.history.push(`/users/${this.props.user.username}/charities`)
        })
    }

    // handleAddRequest = () => {

    // }


    handleCharityRequests = () => {
        return this.props.charityRequests.map(request => {
            return (
                <div>
                <Table.Cell>{request.expiration_date}</Table.Cell>
                <Table.Cell>{request.info}</Table.Cell>
                <Table.Cell>{request.status}</Table.Cell>
                </div>
            )
        })
    }

    render() {

        return(
            
            <>
            
             <Link to={`charities/${this.props.selectedCharity.city}/${this.props.selectedCharity.id}`} />  
             <Button floated="right" onClick={this.handleDeleteCharity}>Delete Charity</Button> <br></br>
             <Button floated="right" onClick={this.handleAddRequest}>Add Request</Button> <br></br>
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
                        Current List of Requests by This Charity
                </Header>
            </Segment>

            <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Expires</Table.HeaderCell>
                    <Table.HeaderCell>Info</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                <Table.Row>
                    {this.handleCharityRequests()}
                </Table.Row>
                </Table.Body>

            </Table>
            </>
        )
    }
}

export default AdminsCharitiesDetails