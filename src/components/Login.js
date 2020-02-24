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
        console.log(data)
        if (data.error) {
          console.log(data.error)
          this.setState({error: true});
        } else {
          this.props.onLogin(data)
          this.props.history.push('/');
        }
    })
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/DonationIcon2.png' /> Log in to your account
          </Header>
          <div>
            {this.state.error ? <h1>Try again...</h1> : null}
          </div>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input 
                fluid 
                icon='user' 
                iconPosition='left' 
                name="username"
                placeholder='Username' 
                type='username'
                // E-mail address
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
              <Button color='teal' fluid size='large'>
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