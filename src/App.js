import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainPage from "./components/MainPage";
import NavBar from "./components/NavBar";
import CharitiesContainer from "./containers/CharitiesContainer";
import CharityDetails from "./components/CharityDetails";
import AdminsCharitiesDetails from "./components/AdminsCharitiesDetails";
import CharityAddForm from "./components/CharityAddForm";
import EditCharity from "./components/EditCharity";
import AdminProfile from "./components/AdminProfile";
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { api } from "./services/api";

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
      userRequests: []
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
        if (data.user) {
          this.setState({ user: data.user });
          } else {
            this.logout()
          }
      });
    }
  }

  getCharities = () => {
    api.charities.getCharities().then(data => {
      // this.setState({ allCharities: data }, () => console.log(this.state.allCharities[0].city))
      // if (!data.message) {
        this.setState({ allCharities: data })
      // }
    })
  }

  getAdminsCharities = () => {
    api.charities.getAdminsCharities(this.state.user.id)
    .then(data => this.setState({ adminsCharities: data }))
  }

  getUserRequests = () => {
    api.requests.getUserRequests(this.state.user.id)
    .then(data => this.setState({ userRequests: data }))
  }

  getCharityRequests = (charityId) => {
    api.requests.getCharityRequests(charityId, this.state.user.id)
    .then(data => this.setState({ charityRequests: data }))
  }

  addNewCharity = (data) => {
        this.setState(prevState => ({
          allCharities: [...prevState.allCharities, data.charity]
        }))
  }
  
  addRequest = (requestInfo, charityId, userId) => {
    api.requests.addRequest(requestInfo, charityId, userId)
    .then(data => this.setState(prevState => ({ 
      charityRequests: [...prevState.charityRequests, data.request]
    })))
  }

  editUser = (userInfo) => {
    api.auth.editUser(userInfo, this.state.user.id)
    .then(data => { this.setState({ user: data }) })
  }

  editCharity = (charityInfo, charityId) => {
    api.charities.editCharity(charityInfo, charityId, this.state.user)
    .then(data => {
      let updatedCharity = this.state.allCharities.findIndex(charity => charity.id === charityId)
      let copyOfCharities = Object.assign([], this.state.allCharities)
      copyOfCharities[updatedCharity] = data
      this.setState({
        allCharities: copyOfCharities
      })
    })
  }
      
  editRequest = (requestInfo, requestId) => {
    api.requests.editRequest(requestInfo, requestId) 
      .then(data => {
        let updatedRequest = this.state.charityRequests.findIndex(request => request.id === requestId)
        let copyOfRequests = Object.assign([], this.state.charityRequests)
        copyOfRequests[updatedRequest] = data
        this.setState({
          charityRequests: copyOfRequests
        })     
      })
  }

  //ADMIN APPROVES DONATION
  editRequestStatus = (requestId, status) => {
    api.requests.editRequestStatus(requestId, status)
      .then(data => {
        let updatedRequest = this.state.charityRequests.findIndex(request => request.id === requestId)
        let copyOfRequests = Object.assign([], this.state.charityRequests)
        copyOfRequests[updatedRequest] = data
        this.setState({
          charityRequests: copyOfRequests
        })     
      })
  }

  //TO CANCEL A DONATION BY A USER
  editRequestStatusDonor = (requestId) => {
    api.requests.editRequestStatusDonor(requestId)
      .then(data => {
        let updatedUserRequest = this.state.userRequests.filter(r => r.id !== requestId)
        let updatedCharityRequest = this.state.charityRequests.findIndex(r => r.id === requestId)
        let copyOfCharityRequests = Object.assign([], this.state.charityRequests)
        copyOfCharityRequests[updatedCharityRequest] = data
           this.setState({
              charityRequests: copyOfCharityRequests,
                  userRequests: updatedUserRequest
            })     
      })
  }

  //UPDATE REQUEST TO BE TIED TO A SPECIFIC USER
  editRequestStatusAndId = (request, status) => {
    api.requests.editRequestStatusAndId(request, status, this.state.user.id)
      .then(data => {
        let updatedRequest = this.state.charityRequests.findIndex(r => r.id === request.id)
        let copyOfRequests = Object.assign([], this.state.charityRequests)
        copyOfRequests[updatedRequest].status = data.status
        copyOfRequests[updatedRequest].charity.user_id = data.user.id
        this.setState({
          charityRequests: copyOfRequests
        })     
      })
  }

  showCharityDetails = charity => {
    this.setState({ selectedCharity: charity })
  }

  deleteCharitySet = (id) => {
    // console.log("charity to delete id: ", id)
     this.setState(prevState => ({
      allCharities: prevState.allCharities.filter(charity => charity.id !== id), 
      adminsCharities: prevState.adminsCharities.filter(charity => charity.id !== id)
    }))
  }

  charityRequestDelete = (requestId) => {
    this.setState(prevState => ({
      charityRequests: prevState.charityRequests.filter(request => request.id !== requestId)
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
          onGetUserRequests={this.getUserRequests}
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
          render={props => (<MainPage 
            {...props} 
            allCharities={this.state.allCharities} 
            changeCity={this.changeCity}
            getCharities={this.getCharities} />)}
        />
        
        <Route
          path="/charities/:city"
          exact
          render={() => (<CharitiesContainer 
            user={this.state.user} 
            charities={this.state.allCharities} 
            onShowCharityDetails={this.showCharityDetails} 
            charityList={this.state.filteredCharities} 
            onGetCharityRequests={this.getCharityRequests}/>)}
        />

        <Route
            path="/charities/:city/:id" 
            exact
            render={props => (<CharityDetails 
              {...props} 
              user={this.state.user} 
              selectedCharity={this.state.selectedCharity} 
              charityRequests={this.state.charityRequests} 
              onEditRequestStatus={this.editRequestStatus} 
              onEditRequestStatusAndId={this.editRequestStatusAndId}/>)}
        />

        <Route
          path="/charity/add"
          exact
          render={props => (<CharityAddForm 
            {...props} 
            user={this.state.user} 
            onAddNewCharity={this.addNewCharity}/>)}
        />

        <Route
          path="/charity/edit"
          exact
          render={props => (<EditCharity 
            {...props} 
            user={this.state.user} 
            selectedCharity={this.state.selectedCharity}
            onEditCharity={this.editCharity}/>)}
        />

        <Route
            path="/users/:username/charities"
            exact
            render={props => (<AdminProfile 
              {...props} 
              onLogout={this.logout} 
              adminsCharities={this.state.adminsCharities} 
              onShowCharityDetails={this.showCharityDetails} 
              onGetCharityRequests={this.getCharityRequests} 
              user={this.state.user}  
              onEditUser={this.editUser}/>)}
        />

        <Route
            path="/users/:username/charities/:id" 
            exact
            render={(props, index) => (<AdminsCharitiesDetails 
              key={index}
              {...props} 
              selectedCharity={this.state.selectedCharity} 
              user={this.state.user} 
              deleteCharitySet={this.deleteCharitySet}
              charityRequests={this.state.charityRequests}
              onAddRequest={this.addRequest}
              onEditRequest={this.editRequest}
              onEditRequestStatus={this.editRequestStatus}
              onCharityRequestDelete={this.charityRequestDelete}
            />)}
        />

      <Route
            path="/users/:username/requests"
            exact
            render={props => (<UserProfile 
              {...props} user={this.state.user} 
              onLogout={this.logout} 
              userRequests={this.state.userRequests} 
              onEditRequestStatusDonor={this.editRequestStatusDonor} 
              onEditUser={this.editUser}/>)}
        />  
        <Route
          path="/"
          render={props => <Footer {...props} />}
        />
      </Router>
    );
  }
}

export default App;