import React, { Component } from 'react';
import { Button, Header, Segment, Image, Icon, Table, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class CharityDetails extends Component {
    handleDelete = () => {
        this.props.deleteCharity(this.props.selectedCharity.id)
        this.props.history.push('/charities')
    }  
    render() {

        return(
            <>
             <Link to={`charity-details/${this.props.selectedCharity.id}`} />  
             <Button onClick={this.handleDelete}>Delete</Button> 
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
                        <br></br>
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
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
      </Table.Row>
    </Table.Body>

  </Table>

            </>
        )
    }
}

export default CharityDetails