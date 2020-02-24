import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { api } from "./services/api";
import NavBar from "./components/NavBar";


class App extends Component {
  constructor() {
    super();

    this.state = {
        user: {}
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      // make a request to the backend and find our user
      api.auth.getCurrentUser().then(data => {
        // console.log(data)
        this.setState({ user: data.user });
      });
    }
  }

  // componentDidMount = () => {
  //   this.getUsers()
  // }
  
  // getUsers = () => {
  //   fetch('http://localhost:3000/users', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json'
  //   },
  //   body: JSON.stringify({
  //     user: {
  //       username: "Abby",
  //       password: "test2",
  //       is_admin: "false"
  //     }
  //   })
  // })
  //   .then(r => r.json())
  //   .then(console.log)
  // }

  login = data => {
    localStorage.setItem("token", data.jwt);
    this.setState({ user: data.user });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ user: {} });
  };
  

   renderPage = () => {
     if (this.state.user && this.state.user.id) {
       return (
        <NavBar 
        user={this.state.user}
        onLogout={this.logout}
        />
       )
     } else {
       return (
        <Route
        exact
        path="/login"
        render={props => <Login {...props} onLogin={this.login} />}
      />
       )
     }
   }


 

  render() {
    return (
      <Router>
      {/* <Route exact path="/" component={About} /> */}
      
        {this.renderPage()}      
      </Router>
    );

  }

}

export default App;
