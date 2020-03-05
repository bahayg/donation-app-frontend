import React, { Component } from 'react';
import { Menu, Sticky, Image, Segment } from 'semantic-ui-react'
import {Link, NavLink} from  'react-router-dom';

class NavBar extends Component{

  render() {    
    return(
      <div> 
                <Image size="medium" src='/LogoV2.png' centered/>   

            <Menu pointing secondary style={{ paddingTop: '0.1em', paddingBottom: '0.1em' }} >

                <Menu.Item floated='left' name='home' as={NavLink} to='/home'></Menu.Item>
                
                {this.props.user && this.props.user.id && this.props.user.is_admin ? (<Menu.Item floated='left'  onClick={this.props.onGetAdminsCharities} as={NavLink} to={`/users/${this.props.user.username}/charities`}>{`${this.props.user.username}'s Profile`}</Menu.Item>
                ) 
                :
                (this.props.user && this.props.user.id && !this.props.user.is_admin ? (<Menu.Item floated='left'  onClick={this.props.onGetUserRequests} as={NavLink} to={`/users/${this.props.user.username}/requests`}>{`${this.props.user.username}'s Profile`}</Menu.Item>)
                :
                null)
              }
                
                {this.props.user && this.props.user.id ?  (<Menu.Item floated='left' onClick={this.props.onLogout} as={NavLink} to="/login">Log Out</Menu.Item>
                ) 
                : 
                (
                  <Menu.Item floated='left' as={NavLink} to='/login' name='Log In'></Menu.Item>)
                }

  
            </Menu>

      </div> 
    )
  }
}

export default NavBar;