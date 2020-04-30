import React, { Component} from 'react'
import { api } from '../services/api';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formFields: {
        username: '',
        password: ''
      },
      error: false
    };
  }

  handleChange = e => {
    let newFormFields = { ...this.state.formFields, [e.target.name]: e.target.value };
    this.setState({ formFields: newFormFields });
  };

  handleSubmit = e => {
    e.preventDefault()
    api.auth.login(this.state.formFields)
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
    return (
      <Grid textAlign='center' style={{ padding: '20px' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Image size="medium" src='/LogoV1.png' />
          <Header as='h2' style={{ color:'#68C3D4' }} textAlign='center'>
             Log in to your account
          </Header>
          <div>
            {this.state.error ? <h1 style={{ color:'#68C3D4' }}>Try again...</h1> : null}
          </div>
          <Form autocomplete="off" size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input 
                fluid 
                icon='user' 
                iconPosition='left' 
                name="username"
                placeholder='Username' 
                type='username'
                value={this.state.formFields.username}
                onChange={this.handleChange}
            />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                name="password"
                placeholder='Password'
                type='password'
                value={this.state.formFields.password}
                onChange={this.handleChange}
              />
              <Button fluid size='large'>
                Log in
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='/signup'>Sign up</a>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login