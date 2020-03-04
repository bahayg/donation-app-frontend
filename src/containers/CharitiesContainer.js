import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Button } from 'semantic-ui-react'
import CharityCard from "../components/CharityCard";

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
    return  this.props.charityList.map ((charity, index) => {
    return <CharityCard key={index} style={{ paddingRight:"10px", paddingTop:"10px" }} onShowCharityDetails={this.props.onShowCharityDetails} onGetCharityRequests={this.props.onGetCharityRequests} charity={charity} />
    })
  }

  render() {
    return(
      <>

        {this.props.user.is_admin ? <Button as={Link} to="/charity/add" floated="right">Add New Charity / Organization</Button> : null}

      <Container style={{padding: '40px'}}>
        <Card.Group centered itemsPerRow={3}>
          {this.charityCards()}
        </Card.Group>
      </Container>

      </>
    )
  }
}
  export default CharitiesContainer;