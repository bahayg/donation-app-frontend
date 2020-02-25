import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainPage from "./components/MainPage";
import CharitiesContainer from "./containers/CharitiesContainer";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { api } from "./services/api";
import NavBar from "./components/NavBar";

class App extends Component {
  constructor() {
    super();
    this.state = {
        user: {},
        allCharities: [],
        filteredCharities: [],
        city: ""
        }
    };

  componentDidMount() {
    this.getUser();
    this.getCharities()
  }

  getUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // make a request to the backend and find our user
      api.auth.getCurrentUser().then(data => {
        // console.log(data)
        this.setState({ user: data.user });
      });
    }
  }

  getCharities = () => {
    api.charities.getCharities().then(data => {
      // this.setState({ allCharities: data }, () => console.log(this.state.allCharities[0].city))
      this.setState({ allCharities: data })
    })
  }

  login = data => {
    localStorage.setItem("token", data.jwt);
    this.setState({ user: data.user });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ user: {} });
  };

  changeCity = (city) => {
    if (city !== "All") {
      this.setState({ city: city }, () => {this.listFilteredCharities()})
    } else {
      this.setState({ city: "" }, () => {this.listFilteredCharities()})
    }
  }

  listFilteredCharities = () => {
    const filterCharByCity = this.state.allCharities.filter(charity => charity.city.includes(this.state.city))
      this.setState({ filteredCharities: filterCharByCity}, () => { 
        // console.log(this.state.filteredCharities)
        })
    }
  

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
        {this.renderPage()}      
        <Route
          exact
          path="/signup"
          render={props => <Signup {...props} onLogin={this.login} />} 
        />
        <Route 
          path="/" 
          exact
          render={props => <MainPage {...props}  allCharities={this.state.allCharities} changeCity={this.changeCity}/>}
        />
        <Route 
          path="/charities" 
          exact
          render={() => <CharitiesContainer user={this.state.user} charities={this.state.allCharities} charityList={this.state.filteredCharities}/>}
        />

        </Router>
    );
  }
}

export default App;