import React, { Component } from "react";
import EditUser from "../components/EditUser";
import {
  Button,
  Header,
  Segment,
  Table,
  Grid,
  Popup,
  Icon,
  Image,
  Modal,
  Form,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      showEditUserModal: false,
    };
  }

  closeModal = (e) => {
    this.setState({ showModal: false });
  };

  closeEditUserModal = (e) => {
    this.setState({ showEditUserModal: false });
  };

  handleStatusClick = (request) => {
    // console.log("Dropped")
    this.props.onEditRequestStatusDonor(request.id);
  };

  handleDeleteUser = () => {
    api.auth.deleteUser(this.props.user.id).then(() => {
      this.props.onLogout();
      this.props.history.push(`/login`);
    });
  };

  render() {
    const { username, is_admin, email, image } = this.props.user;
    return (
      <>
        <Link to={`users/${this.props.user.username}/requests`} />
        <Segment placeholder>
          <Grid centered divided columns={2} stackable={true}>
            <Grid.Row>
              <Grid.Column>
                <Image size="medium" circular centered src={image} />
              </Grid.Column>
              <Grid.Column>
                <Grid.Row>
                  <p>
                    <label style={{ fontWeight: "600" }}>
                      <Icon name="user" /> Username:
                    </label>{" "}
                    {username}
                  </p>
                  <p>
                    <label style={{ fontWeight: "600" }}>
                      <Icon name="mail" /> E-mail Address:
                    </label>{" "}
                    {email}
                  </p>
                  <p>
                    <label style={{ fontWeight: "600" }}>Is Admin?:</label>{" "}
                    {is_admin ? "Yes" : "No"}
                  </p>
                </Grid.Row>
                <br></br>
                <br></br>
                <Grid.Row>
                  <Modal
                    as={Form}
                    open={this.state.showEditUserModal}
                    onClose={this.closeEditUserModal}
                    size="tiny"
                    trigger={
                      <Button
                        floated="left"
                        onClick={() =>
                          this.setState({ showEditUserModal: true })
                        }
                      >
                        Edit My Account
                      </Button>
                    }
                  >
                    <EditUser
                      user={this.props.user}
                      closeEditUserModal={this.closeEditUserModal}
                      onEditUser={this.props.onEditUser}
                    />
                  </Modal>
                </Grid.Row>
                <Button onClick={this.handleDeleteUser}>
                  Delete My Account
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment>
          <Header as="h3" textAlign="center">
            Current List of Requests that {`${this.props.user.username}`}{" "}
            Selected
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
          color={"orange"}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: "10%" }}>
                Expires
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "15%" }}>
                Category
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "25%" }}>
                Charity Name
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "25%" }}>Info</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "25%" }}>
                Status
                <Popup
                  wide
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
                    columns={3}
                    stackable={true}
                    style={{ width: "100%" }}
                  >
                    <Grid.Column textAlign="center">
                      <Header as="h3" color="orange">
                        pending
                      </Header>
                      <p>
                        Wait for approval to donate this item or click to
                        "Drop", if you do not want to donate it anymore.
                      </p>
                    </Grid.Column>

                    <Grid.Column textAlign="center">
                      <Header as="h3" color="brown">
                        approved
                      </Header>
                      <p>
                        You can deliver this item or click to "Drop", if you do
                        not want to donate it anymore.
                      </p>
                    </Grid.Column>

                    <Grid.Column textAlign="center">
                      <Header as="h3" color="red">
                        closed
                      </Header>
                      <p>You already donated this item.</p>
                    </Grid.Column>
                  </Grid>
                </Popup>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.userRequests.map((request, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{request.expiration_date}</Table.Cell>
                  <Table.Cell>{request.category}</Table.Cell>
                  <Table.Cell>{request.charity.name}</Table.Cell>
                  <Table.Cell>{request.info}</Table.Cell>

                  {request.status.toLowerCase() === "pending" ? (
                    <Table.Cell warning>
                      <Icon name="attention" />
                      {request.status.toLowerCase()}
                      <Button
                        onClick={() => this.handleStatusClick(request, "open")}
                        floated="right"
                        color="red"
                        size="small"
                        compact
                        circular
                      >
                        Drop
                      </Button>
                    </Table.Cell>
                  ) : null}
                  {request.status.toLowerCase() === "approved" ? (
                    <Table.Cell warning>
                      <Icon name="checkmark" />
                      {request.status.toLowerCase()}
                      <Button
                        onClick={() => this.handleStatusClick(request, "open")}
                        floated="right"
                        color="red"
                        size="small"
                        compact
                        circular
                      >
                        Drop
                      </Button>
                    </Table.Cell>
                  ) : null}
                  {request.status.toLowerCase() === "closed" ? (
                    <Table.Cell negative>
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

export default UserProfile;
