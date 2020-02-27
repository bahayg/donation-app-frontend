import React, { Component } from 'react';
import { Button, Header, Segment, Image, Icon, Table, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class AdminsCharitiesDetails extends Component {
    
    // handleCharityDelete = () => {
    //     fetch(`http://localhost:3000/charities/${this.props.selectedCharity.id}`, {
    //       method: 'DELETE',
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         Authorization: localStorage.getItem('token')
    //       },
    //     })
    //       .then(() => this.setState(prevState => ({
    //         allCharities: prevState.allCharities.filter(charity => charity.id !== id)
    //       })))
    //       this.props.history.push(`/users/${this.props.user.username}/charities`)
    //   }
    
    handleDelete = () => {
        this.props.deleteCharity(this.props.selectedCharity.id)
        this.props.history.push(`/users/${this.props.user.username}/charities`)
    }  

    // handleAddRequest = () => {

    // }

    render() {

        return(
            
            <>
            
             <Link to={`charities/${this.props.selectedCharity.city}/${this.props.selectedCharity.id}`} />  
             <Button floated="right" onClick={this.handleDelete}>Delete Charity</Button> <br></br>
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
                    <Table.Cell>03/01/2020</Table.Cell>
                    <Table.Cell>Salmon, 5 lbs</Table.Cell>
                    <Table.Cell>Open</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>03/11/2020</Table.Cell>
                    <Table.Cell>Oatmeal, 10 Servings</Table.Cell>
                    <Table.Cell>Pending</Table.Cell>
                </Table.Row>
                </Table.Body>

            </Table>
            </>
        )
    }
}

export default AdminsCharitiesDetails