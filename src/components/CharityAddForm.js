import React, { Component } from "react";
import { Form, Button, Header } from "semantic-ui-react";
import { api } from "../services/api";

class CharityAddForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      image: "",
      address: "",
      city: "",
      description: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAddCharity = (e) => {
    e.preventDefault();
    api.charities.addNewCharity(this.state, this.props.user.id).then((data) => {
      this.props.onAddNewCharity(data);
      this.props.history.push(`/home`);
      // this.props.history.push(`/users/${this.props.user.username}/charities`)
    });
  };

  render() {
    const { name, image, address, city, description } = this.state;
    return (
      <>
        <Header as="h2" style={{ textAlign: "center" }}>
          Organization / Charity Add Form
        </Header>
        <br></br>
        <Form
          style={{ marginLeft: "20px", marginRight: "30px" }}
          onSubmit={(e) => this.handleAddCharity(e)}
          onChange={(e) => this.handleChange(e)}
        >
          <Form.Field>
            <label>Name of the Organization</label>
            <input
              placeholder="Name"
              type="text"
              name="name"
              defaultValue={name}
            />
          </Form.Field>

          <Form.Field>
            <label>Logo / Photo </label>
            <input
              placeholder="Logo"
              type="text"
              name="image"
              defaultValue={image}
            />
          </Form.Field>

          <Form.Field>
            <label>Address</label>
            <input
              placeholder="Address"
              type="text"
              name="address"
              defaultValue={address}
            />
          </Form.Field>

          <Form.Field>
            <label>City</label>
            <input
              placeholder="City"
              type="text"
              name="city"
              defaultValue={city}
            />
          </Form.Field>

          <Form.Field>
            <label>Description</label>
            <input
              placeholder="Description"
              type="text"
              name="description"
              defaultValue={description}
            />
          </Form.Field>

          <Form.Field>
            <Button fluid type="submit">
              Add
            </Button>
          </Form.Field>
        </Form>
      </>
    );
  }
}

export default CharityAddForm;
