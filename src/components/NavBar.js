import React, { Component } from 'react';
import { Menu, Sticky } from 'semantic-ui-react'
import {Link, NavLink} from  'react-router-dom';

class NavBar extends Component{

  render() {    
    return(
      <div className="nav-bar">       
      <Sticky style={{padding: "20px"}}>                                                                 
        <Menu
          size='massive'
          attached='top'
          tabular
          margin-bottom="10em"
          style={{ backgroundColor: '#fff', paddingTop: '1em' }}>         
    
            <div className="left menu">
            <Menu>

                <Menu.Item floated='left'>
                 <Link to="/home">Home</Link> 
                </Menu.Item>
                
                {this.props.user.id && this.props.user.is_admin ? (<Menu.Item floated='left'  onClick={this.props.onGetAdminsCharities} as={NavLink} to={`/users/${this.props.user.username}/charities`}>{`${this.props.user.username}'s Profile`}</Menu.Item>
                ) 
                :
                  (this.props.user.id && !this.props.user.is_admin ? (<Menu.Item floated='left'  onClick={this.props.onGetUserRequests} as={NavLink} to={`/users/${this.props.user.username}/requests`}>{`${this.props.user.username}'s Profile`}</Menu.Item>)
                :
                null)
              }
                
                {this.props.user.id ?  (<Menu.Item floated='left' onClick={this.props.onLogout} as={NavLink} to="/home">Log Out</Menu.Item>
                ) 
                : 
                (
                <Menu.Item floated='left'><Link to="/login">Log In</Link></Menu.Item>)
                }
  
            </Menu>
            </div>
        </Menu>
      </Sticky>
      </div> 
    )
  }
}

export default NavBar;