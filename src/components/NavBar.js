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
                 <Link to="/home">Home</Link> 
                </Menu.Item>

                {/* onClick={(e) => this.props.getAdminsCharities(e) */}
                
                {this.props.user.id ? (<Menu.Item floated='left'  onClick={this.props.onGetAdminsCharities}><Link to={`/users/${this.props.user.username}/charities`}>{`${this.props.user.username}'s Profile`}</Link></Menu.Item>
                ) 
                :
                ( 
                null)}
                
                {this.props.user.id ?  (<Menu.Item floated='left' onClick={this.props.onLogout}><Link to="/home">Log Out</Link></Menu.Item>
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