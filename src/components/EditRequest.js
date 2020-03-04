import React, { Component } from 'react';
import { Button, Modal, Form, Dropdown } from 'semantic-ui-react';

class EditRequest extends Component {
    constructor(){
        super()
        this.state = {
            expiration_date: '',
            info: '',
            category: ''
        }
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    handleCategoryChange = (e, value) => {
        this.setState({category: value.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.closeEditModal()
        this.props.onEditRequest(this.state, this.props.requestId)
        // this.props.history.push(`/users/${this.props.user.username}/charities/${this.props.selectedCharity.id}`)
    }

    render() {
        const { expiration_date, info, category } = this.state
        const categoryType = [
            { key: 'Clothing', text: 'Clothing', value: 'Clothing' },
            { key: 'Food', text: 'Food', value: 'Food' },
            { key: 'Hygiene Product', text: 'Hygiene Product', value: 'Hygiene Product' },
            { key: 'Volunteer', text: 'Volunteer', value: 'Volunteer' },
          ]
        return(
                <>
                <Modal.Header >Update Request</Modal.Header>
                    <Modal.Content>
                     <Form onSubmit={e => this.handleSubmit(e)} onChange={e => this.handleChange(e)}>

                     <label style={{ fontWeight:"600" }}> Category </label>
                        <Dropdown
                        placeholder='Select Category'
                        fluid
                        selection
                        options={categoryType}
                        value={category}
                        onChange={this.handleCategoryChange}
                        />
                        <br></br>

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