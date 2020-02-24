import React, { Component } from "react";
// import PaintingsNew from "./PaintingsNew";
// import PaintingsList from "./PaintingsList";
// import PaintingShow from "./PaintingShow";
// import { Route, Switch } from "react-router-dom";
import { api } from "../services/api";

class CharitiesContainer extends Component {
  constructor() {
    super();

    this.state = {
      charities: []
    };

    // this.handleDelete = this.handleDelete.bind(this);
    // this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    } else {
      api.auth.getCurrentUser().then(user => {
        // console.log(user);
        if (user.error) {
          this.props.history.push("/login");
        } else {
          api.charities.getCharities().then(data => {
            this.setState({
              charities: data.slice(0, 20).sort((a, b) => b.votes - a.votes)
            });
          });
        }
      });
    }
  }


}
  export default CharitiesContainer;
