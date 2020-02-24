import React, { Component } from 'react';
import { Menu, Dropdown, Input, Button, Sticky, Image } from 'semantic-ui-react'
import {Link} from  'react-router-dom';

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
              {this.props.user && this.props.user.id ? <Link to="/">Home</Link> : null }
            </Menu.Item>
            
            <Menu.Item floated='left'>
    {this.props.user && this.props.user.id ? <Link to="/my-profile">{`${this.props.user.username}'s Profile`}</Link> : null }
            </Menu.Item>

            <Menu.Item floated='left' onClick={this.props.onLogout}>
               {this.props.user && this.props.user.id ? <Link to="/login">Log Out</Link> : null}
            </Menu.Item>
        </Menu>
          </div>
        </Menu>
      </Sticky>
      </div> 
    )
  }
}

export default NavBar;