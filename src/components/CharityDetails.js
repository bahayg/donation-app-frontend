import React, { Component } from "react";
import {
  Button,
  Header,
  Segment,
  Image,
  Icon,
  Table,
  Grid,
  Popup,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class CharityDetails extends Component {
  handleStatusClick = (request, status) => {
    if (this.props.user.id) {
      this.props.onEditRequestStatusAndId(request, status);
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    const {
      id,
      name,
      image,
      address,
      city,
      description,
    } = this.props.selectedCharity;
    return (
      <>
        <Link to={`charities/${city}/${id}`} />
        <Segment placeholder>
          <Grid centered divided columns={2} stackable={true}>
            <Grid.Column>
              <Image size="medium" centered src={image} />
            </Grid.Column>
            <Grid.Column>
              <p>
                <label style={{ fontWeight: "600" }}>Name:</label> {name}
              </p>
              <p>
                <label style={{ fontWeight: "600" }}>
                  Address:
                  <Icon name="map marker" />
                </label>{" "}
                {address}
              </p>
              <p>
                <label style={{ fontWeight: "600" }}>Description:</label>{" "}
                {description}
              </p>
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment>
          <Header as="h2" textAlign="center">
            Current List of Requests by {`${this.props.selectedCharity.name}`}
          </Header>
        </Segment>

        <Table
          unstackable
          //   style={{
          //     overflow: "auto",
          //     display: "inline-block",
          //     maxHeight: "inherit",
          //   }}
          celled
          color={"blue"}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Expires</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Info</Table.HeaderCell>
              <Table.HeaderCell>
                Status
                <Popup wide inverted trigger={<Button icon="help circle" />}>
                  <Grid centered divided columns={2} stackable={true}>
                    <Grid.Column textAlign="center">
                      <Header as="h3" color="green">
                        open
                      </Header>
                      <p>
                        Click to "Donate" to donate this item and wait for
                        approval.
                      </p>
                    </Grid.Column>

                    <Grid.Column textAlign="center">
                      <Header as="h3" color="orange">
                        pending
                      </Header>
                      <p>
                        Another user is waiting for approval to donate this
                        item, you can not donate it.
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
                  {request.status.toLowerCase() !== "closed" &&
                  request.status.toLowerCase() !== "approved" ? (
                    <Table.Cell>{request.expiration_date}</Table.Cell>
                  ) : null}
                  {request.status.toLowerCase() !== "closed" &&
                  request.status.toLowerCase() !== "approved" ? (
                    <Table.Cell>{request.category}</Table.Cell>
                  ) : null}
                  {request.status.toLowerCase() !== "closed" &&
                  request.status.toLowerCase() !== "approved" ? (
                    <Table.Cell>{request.info}</Table.Cell>
                  ) : null}
                  {request.status.toLowerCase() === "open" ? (
                    <Table.Cell positive>
                      {request.status.toLowerCase()}
                      <Button
                        onClick={() =>
                          this.handleStatusClick(request, "pending")
                        }
                        floated="right"
                        color="green"
                        size="small"
                        compact
                        circular
                      >
                        Donate
                      </Button>
                    </Table.Cell>
                  ) : null}
                  {request.status.toLowerCase() === "pending" ? (
                    <Table.Cell warning>
                      <Icon name="attention" />
                      {request.status.toLowerCase()}
                    </Table.Cell>
                  ) : null}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </>
    );
  }
}

export default CharityDetails;
