import React, { Component} from 'react'
import { api } from '../services/api';
import { Button, Form, Grid, Header, Image, Segment, Dropdown, Message, Radio } from 'semantic-ui-react'

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      formFields: {
        username: '',
        password: '',
        is_admin: ''
      },
      error: false
    };
  }

  
  handleChange = e => {
    let newFormFields = { ...this.state.formFields, [e.target.name]: e.target.value };
    this.setState({ formFields: newFormFields });
  };

  handleAdminChange = (e, value) => {
    //   console.log(value.value)
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
    // console.log(this.state.formFields)
    api.auth.signup({user: this.state.formFields})
      .then(data => {
          console.log(data)
        if (data.error) {
          this.setState({error: true});
        } else {
          this.props.onLogin(data)
          this.props.history.push('/home');
        }
    })
  }

render() {
    const userType = [
        { key: 1, text: 'I need help - Organization', value: 'true' },
        { key: 2, text: 'I want to help - Donor', value: 'false' },
      ]
    return (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/DonationIcon2.png' /> Create your account
      </Header>
      <div>
        {this.state.error ? <h1>Try again...</h1> : null}
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
            <Dropdown
                placeholder='Select User Type'
                fluid
                selection
                options={userType}
                value={this.state.formFields.is_admin}
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
        
            <Button color='teal' fluid size='large'>
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