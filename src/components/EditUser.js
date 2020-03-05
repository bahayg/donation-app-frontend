import React, { Component } from 'react';
import { Button, Modal, Form, Dropdown } from 'semantic-ui-react';

class EditUser extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            is_admin: '', 
            email: '',
            image: ''
        }
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    handleAdminChange = (e, value) => {
        this.setState({is_admin: value.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.closeEditUserModal()
        this.props.onEditUser(this.state, this.props.userId)
        // this.props.history.push(`/users/${this.props.user.username}/charities/${this.props.selectedCharity.id}`)
    }

    render() {
        const { username, password, is_admin, email, image } = this.state
        const userType = [
            { key: 1, text: 'I need help - Organization', value: 'true' },
            { key: 2, text: 'I want to help - Donor', value: 'false' },
          ]
        return(
                <>
                <Modal.Header >Update User Info</Modal.Header>
                    <Modal.Content>
                     <Form onSubmit={e => this.handleSubmit(e)} onChange={e => this.handleChange(e)}>

                        <Form.Field>
                            <label>Username </label>
                            <input placeholder='Username' type="text" name="username" defaultValue={username}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input placeholder='Password' type="text" name="password" defaultValue={password}/>
                        </Form.Field>
                        <Form.Field>
                            <label>E-mail Address</label>
                            <input placeholder='E-mail Address' type="text" name="email" defaultValue={email}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Profile Picture</label>
                            <input placeholder='Profile Picture Url' type="text" name="image" defaultValue={image}/>
                        </Form.Field>

                        <label style={{ fontWeight: "600"}}>User Type</label>
                        <Dropdown
                            placeholder='Select User Type'
                            fluid
                            selection
                            options={userType}
                            value={is_admin}
                            onChange={this.handleAdminChange}
                        />
                        <br></br>
                        <Form.Field>
                            <Button fluid type='submit' >Submit</Button>
                        </Form.Field>
                    </Form> 
                    </Modal.Content>
                 </>
        )
    }
}

export default EditUser