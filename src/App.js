import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainPage from "./components/MainPage";
import CharitiesContainer from "./containers/CharitiesContainer";
import CharityDetails from "./components/CharityDetails";
import CharityCard from "./components/CharityCard";
import CharityAddForm from "./components/CharityAddForm";
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
      selectedCharity: false,
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
      if (!data.message) {
        this.setState({ allCharities: data })
      }
      console.log(data)
    })
  }

  addNewCharity = (charityInfo) => {
    fetch(`http://localhost:3000/charities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify(charityInfo)
    })
      .then(res => res.json())
      .then(data =>
        this.setState(prevState => ({
          allCharities: [...prevState.allCharities, data.charity]
        }))
      )
  }

  showCharityDetails = charity => {
    this.setState({ selectedCharity: charity })
  }

  deleteCharity = (id) => {
    fetch(`http://localhost:3000/charities/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem('token')
      },
    })
      .then(() => this.setState(prevState => ({
        allCharities: prevState.allCharities.filter(charity => charity.id !== id)
      })))
  }


  login = data => {
    localStorage.setItem("token", data.jwt);
    this.setState({ user: data.user }, this.getCharities);
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ user: {} });
  };

  changeCity = (city) => {
    if (city !== "All") {
      this.setState({ city: city }, () => { this.listFilteredCharities() })
    } else {
      this.setState({ city: "" }, () => { this.listFilteredCharities() })
    }
  }

  listFilteredCharities = () => {
    const filterCharByCity = this.state.allCharities.filter(charity => charity.city.includes(this.state.city))
    this.setState({ filteredCharities: filterCharByCity }, () => {
      // console.log(this.state.filteredCharities)
    })
  }

  render() {
    return (
      <Router>
         <NavBar
          user={this.state.user}
          onLogout={this.logout}
        />

        <Route
          exact
          path="/login"
          render={props => <Login {...props} onLogin={this.login} />}
        />
        <Route
          exact
          path="/signup"
          render={props => <Signup {...props} onLogin={this.login} />}
        />

        <Route
          path="/"
          exact
          render={props => <MainPage {...props} allCharities={this.state.allCharities} changeCity={this.changeCity} />}
        />
        
        <Route
          path="/charities"
          exact
          render={() => <CharitiesContainer user={this.state.user} charities={this.state.allCharities} onShowCharityDetails={this.showCharityDetails} charityList={this.state.filteredCharities} />}
        />

        <Route
          path="/charities-add"
          exact
          render={props => <CharityAddForm {...props} user={this.state.user} onAddNewCharity={this.addNewCharity}/>}
        />

        <Route
            path="/charity-details/:id"
            exact
            render={props => (

                <CharityDetails
                  {...props}
                  selectedCharity={this.state.selectedCharity}
                  deleteCharity={this.deleteCharity}
                />
              )}
            />

        {/* <Route
          path="/charities/:city"
          exact
          render={props => <CharityCard {...props} user={this.state.user} filteredCharities={this.filteredCharities}/>}
        /> */}

      </Router>
    );
  }
}

export default App;