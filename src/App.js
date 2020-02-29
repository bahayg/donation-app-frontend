import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainPage from "./components/MainPage";
import CharitiesContainer from "./containers/CharitiesContainer";
import CharityDetails from "./components/CharityDetails";
import AdminsCharitiesDetails from "./components/AdminsCharitiesDetails";
import CharityCard from "./components/CharityCard";
import CharityAddForm from "./components/CharityAddForm";
import AdminProfile from "./components/AdminProfile";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { api } from "./services/api";
import NavBar from "./components/NavBar";
import AddRequest from './components/AddRequest';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      allCharities: [],
      filteredCharities: [],
      selectedCharity: false,
      city: "", 
      adminsCharities: [],
      charityRequests: [], 
      allRequests: []
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

  getAdminsCharities = () => {
    return fetch(`http://localhost:3000/users/${this.state.user.id}/charities`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ adminsCharities: data })
      );
  };

  getCharityRequests = (id) => {
    return fetch(`http://localhost:3000/users/${this.state.user.id}/charities/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ charityRequests: data }));
  };

  addNewCharity = (charityInfo, userId) => {
    fetch(`http://localhost:3000/charities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        user_id: userId,
        name: charityInfo.name,
        image: charityInfo.image,
        address: charityInfo.address,
        city: charityInfo.city
      })
    })
      .then(res => res.json())
      .then(data =>
        this.setState(prevState => ({
          allCharities: [...prevState.allCharities, data.charity]
        }))
      )
  }

  addRequest = (requestInfo, charityId, userId) => {
    console.log("MODAL TRIGERED THIS")
    fetch(`http://localhost:3000/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        user_id: userId,
        charity_id: charityId,
        expiration_date: requestInfo.expiration_date,
        info: requestInfo.info,
        status: requestInfo.status,
      })
    })
      .then(res => res.json())
      .then(data => 
        this.setState(prevState => ({
          charityRequests: [...prevState.charityRequests, data.request]
        }))
      )
  }

  editRequest = () => {

  }


  showCharityDetails = charity => {
    this.setState({ selectedCharity: charity })
  }


  deleteCharitySet = (id) => {
    // console.log("carity to delete id: ", id)
     this.setState(prevState => ({
      allCharities: prevState.allCharities.filter(charity => charity.id !== id), 
      adminsCharities: prevState.adminsCharities.filter(charity => charity.id !== id)
    }))
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
    this.setState({ filteredCharities: filterCharByCity })
  }

  render() {
    return (
      <Router>
         <NavBar
          user={this.state.user}
          onLogout={this.logout}
          onGetAdminsCharities={this.getAdminsCharities}
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
          path="/home"
          exact
          render={props => <MainPage {...props} allCharities={this.state.allCharities} changeCity={this.changeCity} />}
        />
        
        <Route
          path="/charities/:city"
          exact
          render={() => <CharitiesContainer user={this.state.user} charities={this.state.allCharities} onShowCharityDetails={this.showCharityDetails} charityList={this.state.filteredCharities} onGetCharityRequests={this.getCharityRequests}/>}
        />

        <Route
          path="/charity/add"
          exact
          render={props => <CharityAddForm {...props} user={this.state.user} onAddNewCharity={this.addNewCharity}/>}
        />

        <Route
            path="/charities/:city/:id" 
            exact
            render={props => <CharityDetails {...props} user={this.state.user} selectedCharity={this.state.selectedCharity} charityRequests={this.state.charityRequests}/>}
        />

        <Route
            path="/users/:username/charities/:id" 
            exact
            render={props => (<AdminsCharitiesDetails 
              {...props} 
              selectedCharity={this.state.selectedCharity} 
              user={this.state.user} 
              deleteCharitySet={this.deleteCharitySet}
              charityRequests={this.state.charityRequests}
              onAddRequest={this.addRequest}
              onEditRequest={this.editRequest}
            />)}
        />

        <Route
            path="/users/:username/charities"
            exact
            render={props => <AdminProfile {...props} adminsCharities={this.state.adminsCharities} onShowCharityDetails={this.showCharityDetails} onGetCharityRequests={this.getCharityRequests} />}
        />

        {/* <Route
          path="/users/:username/charities/:charity_id/add-request"
          exact
          render={props => <AddRequest {...props} user={this.state.user} selectedCharity={this.state.selectedCharity} onAddRequest={this.addRequest}/>}
        /> */}

        

      </Router>
    );
  }
}

export default App;