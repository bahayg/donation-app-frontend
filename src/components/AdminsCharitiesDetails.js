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
  Modal,
  Form,
} from "semantic-ui-react";
import { api } from "../services/api";
import AddRequest from "./AddRequest";
import EditRequest from "./EditRequest";
// import { Link } from "react-router-dom";

class AdminsCharitiesDetails extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showEditModal: false,
      selectedRequest: "",
    };
  }

  closeModal = (e) => {
    this.setState({ showModal: false });
  };

  closeEditModal = (e) => {
    this.setState({ showEditModal: false });
  };

  handleDeleteCharity = () => {
    api.charities.deleteCharity(this.props.selectedCharity.id).then((data) => {
      this.props.deleteCharitySet(data.id);
      this.props.history.push(`/users/${this.props.user.username}/charities`);
    });
  };

  handleDeleteRequest = (request) => {
    api.requests.deleteRequest(request.id).then((data) => {
      this.props.onCharityRequestDelete(data.id);
      this.props.history.push(
        `/users/${this.props.user.username}/charities/${this.props.selectedCharity.id}`
      );
    });
  };

  handleStatusClick = (request, status) => {
    // console.log("Approved")
    this.props.onEditRequestStatus(request.id, status);
  };

  render() {
    const { name, image, address, description } = this.props.selectedCharity;

    return (
      <>
        {/* <Link to={`charities/${this.props.selectedCharity.city}/${this.props.selectedCharity.id}`} />   */}
        <Segment placeholder>
          <Grid columns={2} stackable={true}>
            <Grid.Row>
              <Grid.Column>
                <Image size="medium" src={image} />
              </Grid.Column>
              <Grid.Column>
                <Grid.Row>
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
                </Grid.Row>
                <br></br>
                <br></br>
                <Grid.Row>
                  <Grid columns={5}>
                    <Grid.Column>
                      <Modal
                        as={Form}
                        onClose={this.closeModal}
                        open={this.state.showModal}
                        size="tiny"
                        trigger={
                          <Button
                            floated="left"
                            onClick={() => this.setState({ showModal: true })}
                          >
                            Add Request
                          </Button>
                        }
                      >
                        <AddRequest
                          user={this.props.user}
                          closeModal={this.closeModal}
                          selectedCharity={this.props.selectedCharity}
                          onAddRequest={this.props.onAddRequest}
                        />
                      </Modal>
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                    {/* <Grid.Column> */}
                    {/* <Button as={Link} to="/charity/edit">Edit Charity</Button>  */}
                    {/* </Grid.Column> */}
                    <Grid.Column></Grid.Column>
                    <Grid.Column>
                      <Button
                        floated="right"
                        onClick={this.handleDeleteCharity}
                      >
                        Delete Charity
                      </Button>
                    </Grid.Column>
                  </Grid>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment>
          <Header as="h3" textAlign="center">
            Current List of Requests by {`${this.props.selectedCharity.name}`}
          </Header>
        </Segment>

        <Table
          unstackable
          style={{
            overflow: "auto",
            display: "inline-block",
            maxHeight: "inherit",
            width: "100%",
            whiteSpace: "nowrap",
          }}
          celled
          color={"green"}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: "150px" }}>
                Expires
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "200px" }}>
                Category
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "400px" }}>
                Info
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "400px" }}>
                Status
                <Popup
                  wide="very"
                  inverted
                  trigger={
                    <Icon
                      name="help circle"
                      size="large"
                      color="purple"
                      style={{ marginLeft: "8px" }}
                    />
                  }
                >
                  <Grid
                    centered
                    divided
                    columns={4}
                    stackable={true}
                    style={{ width: "100%" }}
                  >
                    <Grid.Column textAlign="center">
                      <Header as="h3" color="green">
                        open
                      </Header>
                      <p>
                        The item is listed. You can edit and/or remove it from
                        your list.
                      </p>
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                      <Header as="h3" color="orange">
                        pending
                      </Header>
                      <p>
                        A volunteer is waiting for approval to donate this item.
                        Click to "Approve" and wait for the volunteer to deliver
                        it.
                      </p>
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                      <Header as="h3" color="brown">
                        approved
                      </Header>
                      <p>
                        Wait for the volunteer to deliver this item and then
                        click to "Close" after it is delivered.
                      </p>
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                      <Header as="h3" color="red">
                        closed
                      </Header>
                      <p>
                        The item is donated. You can remove it from your list.
                      </p>
                    </Grid.Column>
                  </Grid>
                </Popup>
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "150px" }}>
                Edit
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "150px" }}>
                Delete
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.charityRequests.map((request, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{request.expiration_date}</Table.Cell>
                  <Table.Cell>{request.category}</Table.Cell>
                  <Table.Cell>{request.info}</Table.Cell>

                  {request.status.toLowerCase() === "open" ? (
                    <Table.Cell positive>
                      {request.status.toLowerCase()}{" "}
                    </Table.Cell>
                  ) : null}
                  {request.status.toLowerCase() === "closed" ? (
                    <Table.Cell negative>
                      {request.status.toLowerCase()}
                    </Table.Cell>
                  ) : null}
                  {request.status.toLowerCase() === "pending" ? (
                    <Table.Cell warning>
                      <Icon name="attention" />
                      {request.status.toLowerCase()}
                      <Button
                        onClick={() =>
                          this.handleStatusClick(request, "approved")
                        }
                        floated="right"
                        color="green"
                        size="small"
                        compact
                        circular
                      >
                        Approve
                      </Button>
                    </Table.Cell>
                  ) : null}
                  {request.status.toLowerCase() === "approved" ? (
                    <Table.Cell warning>
                      <Icon name="checkmark" />
                      {request.status.toLowerCase()}
                      <Button
                        onClick={() =>
                          this.handleStatusClick(request, "closed")
                        }
                        floated="right"
                        color="red"
                        size="small"
                        compact
                        circular
                      >
                        Close
                      </Button>
                    </Table.Cell>
                  ) : null}

                  {request.status.toLowerCase() === "open" ? (
                    <Modal
                      as={Form}
                      open={this.state.showEditModal}
                      onClose={this.closeEditModal}
                      size="tiny"
                      trigger={
                        <Table.Cell
                          icon="edit"
                          onClick={() =>
                            this.setState({
                              showEditModal: true,
                              selectedRequest: request,
                            })
                          }
                        ></Table.Cell>
                      }
                    >
                      <EditRequest
                        user={this.props.user}
                        requestId={this.state.selectedRequest.id}
                        closeEditModal={this.closeEditModal}
                        selectedCharity={this.props.selectedCharity}
                        onEditRequest={this.props.onEditRequest}
                      />
                    </Modal>
                  ) : (
                    <Table.Cell></Table.Cell>
                  )}

                  {request.status.toLowerCase() === "open" ||
                  request.status.toLowerCase() === "closed" ? (
                    <Popup
                      content="Click to remove this item from your list"
                      position="top center"
                      trigger={
                        <Table.Cell
                          icon="trash alternate"
                          onClick={() => this.handleDeleteRequest(request)}
                        ></Table.Cell>
                      }
                    />
                  ) : (
                    <Table.Cell></Table.Cell>
                  )}
                </Table.Row>

                // <Modal Variations / Size /Mini
              );
            })}
          </Table.Body>
        </Table>
      </>
    );
  }
}

export default AdminsCharitiesDetails;
