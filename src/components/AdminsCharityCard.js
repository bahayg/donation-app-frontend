import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class AdminsCharityCard extends Component {
  handleClick = () => {
    this.props.onShowCharityDetails(this.props.charity);
    this.props.onGetCharityRequests(this.props.charity.id);
  };

  render() {
    return (
      <Card
        onClick={() => this.handleClick()}
        as={NavLink}
        to={`charities/${this.props.charity.id}`}
      >
        <Card.Content style={{ backgroundColor: "#F7B267" }}>
          <Card.Header>{this.props.charity.name}</Card.Header>
        </Card.Content>

        <Card.Content
          style={{ borderColor: "transparent", backgroundColor: "#F7B267" }}
        >
          <Image src={this.props.charity.image} size="medium" rounded />
        </Card.Content>
      </Card>
    );
  }
}

export default AdminsCharityCard;
