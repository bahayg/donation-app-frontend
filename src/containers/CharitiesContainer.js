import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { api } from "../services/api";
import { Card, Container, Button } from 'semantic-ui-react'
import CharityCard from "../components/CharityCard";
import { Link } from 'react-router-dom';



class CharitiesContainer extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     charities: []
  //   };

    // this.handleDelete = this.handleDelete.bind(this);
    // this.handleVote = this.handleVote.bind(this);
  

  // componentDidMount() {
  //   if (!localStorage.getItem("token")) {
  //     this.props.history.push("/login");
  //   } else {
  //     api.auth.getCurrentUser().then(user => {
  //       // console.log(user);
  //       if (user.error) {
  //         this.props.history.push("/login");
  //       } else {
  //         api.charities.getCharities().then(data => {
  //           this.setState({
  //             charities: data.sort((a, b) => b.votes - a.votes)
  //           });
  //         });
  //       }
  //     });
  //   }
  // }

  // checkAdmin = () => {
  //   api.auth.getCurrentUser()
  // }

  charityCards = () => {
    return  this.props.charityList.map (charity => {
    return (
      <div style={{ paddingRight:"10px", paddingTop:"10px" }}>
        <CharityCard onShowCharityDetails={this.props.onShowCharityDetails} charity={charity} />
      </div>
      )
    })
  }

  render() {
    return(
      <div>

        {this.props.user.is_admin ? <Button floated="right"><Link to="/charities-add">Add New Charity / Organization</Link></Button> : null}

      <Container>
        <Card.Group centered itemsPerRow={3}>
          {this.charityCards()}
        </Card.Group>
      </Container>

      </div>
    )
  }


}
  export default CharitiesContainer;
