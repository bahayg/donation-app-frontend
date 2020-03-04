import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

class EditRequest extends Component {
    constructor(){
        super()
        this.state = {
            expiration_date: '',
            info: ''
        }
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.closeEditModal()
        this.props.onEditRequest(this.state, this.props.requestId)
        // this.props.history.push(`/users/${this.props.user.username}/charities/${this.props.selectedCharity.id}`)
    }

    render() {
        const { expiration_date, info } = this.state
        return(
                <>
                <Modal.Header >Update Request</Modal.Header>
                    <Modal.Content>
                     <Form onSubmit={e => this.handleSubmit(e)} onChange={e => this.handleChange(e)}>
                        <Form.Field>
                            <label>Expiration_date </label>
                            <input placeholder='Expiration_date' type="text" name="expiration_date" defaultValue={expiration_date}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Info</label>
                            <input placeholder='Info' type="text" name="info" defaultValue={info}/>
                        </Form.Field>
                        <Form.Field>
                            <Button fluid type='submit' >Submit</Button>
                        </Form.Field>
                    </Form> 
                    </Modal.Content>
                 </>
        )
    }
}

export default EditRequest