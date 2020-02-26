import React, { Component } from 'react';
import { Menu, Dropdown, Input, Button, Sticky, Image } from 'semantic-ui-react'
import {Link} from  'react-router-dom';

class NavBar extends Component{

    // renderNavBar = () => {
    //     if(this.props.user) {
    //         return (
    //             <div className="nav-bar">       
    //   <Sticky style={{padding: "20px"}}>                                                                 
    //     <Menu
    //       size='massive'
    //       attached='top'
    //       tabular
    //       margin-bottom="10em"
    //       style={{ backgroundColor: '#fff', paddingTop: '1em' }}>         
    
    //         <div className="left menu">
    //         <Menu>

    //             <Menu.Item floated='left'>
    //              <Link to="/">Home</Link> 
    //             </Menu.Item>
                
    //             <Menu.Item floated='left'>
    //                 <Link to="/my-profile">{`${this.props.user.username}'s Profile`}</Link> 
    //             </Menu.Item>

    //             <Menu.Item floated='left' onClick={this.props.onLogout}>
    //                  <Link to="/login">Log Out</Link>
    //             </Menu.Item>
    //         </Menu>
    //         </div>
    //     </Menu>
    //   </Sticky>
    //   </div> 
    //         )

    //     } else {
    //         return(
    //             <div className="nav-bar">       
    //   <Sticky style={{padding: "20px"}}>                                                                 
    //     <Menu
    //       size='massive'
    //       attached='top'
    //       tabular
    //       margin-bottom="10em"
    //       style={{ backgroundColor: '#fff', paddingTop: '1em' }}>         
    
    //         <div className="left menu">
    //         <Menu>

    //             <Menu.Item floated='left'>
    //              <Link to="/">Home</Link> 
    //             </Menu.Item>

    //             <Menu.Item floated='left' onClick={this.props.onLogin}>
    //                  <Link to="/login">Log In</Link> }
    //             </Menu.Item>
    //         </Menu>
    //         </div>
    //     </Menu>
    //   </Sticky>
    //   </div> 
    //         )
    //     }
    // }
  
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
                 <Link to="/">Home</Link> 
                </Menu.Item>
                
                {this.props.user.id ? (<Menu.Item floated='left'><Link to="/my-profile">{`${this.props.user.username}'s Profile`}</Link></Menu.Item>
                ) 
                :
                ( 
                null)}
                
                {this.props.user.id ?  (<Menu.Item floated='left' onClick={this.props.onLogout}><Link to="/">Log Out</Link></Menu.Item>
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