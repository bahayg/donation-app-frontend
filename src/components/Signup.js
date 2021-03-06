import React, { Component} from 'react'
import { api } from '../services/api';
import { Button, Form, Grid, Header, Image, Segment, Dropdown, Message } from 'semantic-ui-react'

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      formFields: {
        username: '',
        password: '',
        is_admin: '', 
        email: '',
        image: ''
      },
      error: false
    };
  }

  handleChange = e => {
    let newFormFields = { ...this.state.formFields, [e.target.name]: e.target.value };
    this.setState({ formFields: newFormFields });
  };

  handleAdminChange = (e, value) => {
    this.setState({formFields: {...this.state.formFields, is_admin: value.value}
    })
}
//   handleChangeAdmin  = (e, value) => {
//         //   console.log(value.value)
//         this.setState({formFields: {...this.state.formFields, is_admin: value.value}
//         })
//     }

  handleSubmitSignUp = e => {
    e.preventDefault()
    api.auth.signup({user: this.state.formFields})
      .then(data => {
        if (data.error) {
          this.setState({error: true});
        } else {
          this.props.onLogin(data)
          this.props.history.push('/home');
        }
    })
  }

render() {

    const { username, password, is_admin, email, image } = this.state.formFields
    const userType = [
        { key: 1, text: 'I need help - Organization', value: 'true' },
        { key: 2, text: 'I want to help - Donor', value: 'false' },
      ]
    return (
        <Grid textAlign='center' style={{ padding: '20px' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
          <Image size="medium" src='/LogoV1.png' />
            <Header as='h2' style={{ color:'#68C3D4' }} textAlign='center'>
               Create your account
            </Header>
            <div>
              {this.state.error ? <h1 style={{ color: '#68C3D4' }} >Try again...</h1> : null}
            </div>
            <Form size='large' onSubmit={this.handleSubmitSignUp}>
              <Segment stacked>
                <Form.Input 
                  fluid 
                  icon='user' 
                  iconPosition='left' 
                  name="username"
                  placeholder='Username' 
                  type='username'
                  value={username}
                  onChange={this.handleChange}
              />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  name="password"
                  placeholder='Password'
                  type='password'
                  value={password}
                  onChange={this.handleChange}
                />
                <Form.Input 
                  fluid 
                  icon='mail' 
                  iconPosition='left' 
                  name="email"
                  placeholder='E-mail Address' 
                  type='email'
                  value={email}
                  onChange={this.handleChange}
              />
              <Form.Input 
                  fluid 
                  icon='image' 
                  iconPosition='left' 
                  name="image"
                  placeholder='Profile Picture Url' 
                  type='text'
                  value={image}
                  onChange={this.handleChange}
              />
                  <Dropdown
                      placeholder='Select User Type'
                      fluid
                      selection
                      options={userType}
                      value={is_admin}
                      onChange={this.handleAdminChange}
                  />
                  <br></br>
                  <br></br>
                  <br></br>
                
              {/* <Form.Group>
                <Radio
                  label='I need help - Organization'
                  name='radioGroup'
                  value='true'
                  checked={this.state.formFields.is_admin === 'true'}
                  onChange={this.handleChangeAdmin}
                />
              </Form.Group>

              <Form.Group>
                <Radio
                  label='I want to help - Donor'
                  name='radioGroup'
                  value='false'
                  checked={this.state.formFields.is_admin === 'false'}
                  onChange={this.handleChangeAdmin}
                />
              </Form.Group> */}
              
                  <Button fluid size='large'>
                      Sign up
                </Button>
              </Segment>
            </Form>
            <Message>
              Have an account? <a href='/login'>Log in</a>
            </Message>
          </Grid.Column>
        </Grid>
    )
}
}

export default Signup