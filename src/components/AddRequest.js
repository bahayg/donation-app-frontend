import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

class AddRequest extends Component {
    constructor(){
        super()
        this.state = {
            requestId: '',
            expiration_date: '',
            info: '',
            status: '',
        }
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        console.log("MODAL FORM SUBMITTED")
        e.preventDefault()
        this.props.closeModal()
        this.props.onAddRequest(this.state, this.props.selectedCharity.id, this.props.user.id)
        // this.props.history.push(`/users/${this.props.user.username}/charities/${this.props.selectedCharity.id}`)
    }

    render() {
        const { expiration_date, info, status } = this.state
        return(
                <>
                 <Modal.Header textAlign='center' >Add New Request</Modal.Header>
                <Modal.Content>
                     <Form onSubmit={e => this.handleSubmit(e)} onChange={e => this.handleChange(e)}>
                        <Form.Field>
                            <label>Expiration_date </label>
                            <input placeholder='Expiration_date' type="text" name="expiration_date" value={expiration_date}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Info</label>
                            <input placeholder='Info' type="text" name="info" value={info}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Status</label>
                            <input placeholder='Status' type="text" name="status" value={status}/>
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

export default AddRequest