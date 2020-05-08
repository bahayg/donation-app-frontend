import React, { Component } from "react";
import { Form, Button, Header } from 'semantic-ui-react'

class CharityAddForm extends Component {

    constructor(){
        super()
        this.state = {
            name: '',
            image: '',
            address: '',
            city: '',
            description: ''
        }
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    handleEditCharity = (e) => {
        e.preventDefault()
            this.props.onEditCharity(this.state, this.props.selectedCharity.id)
            this.props.history.push(`/home`)
            // this.props.history.push(`/users/${this.props.user.username}/charities`)
    }

    render() {
        const { name, image, address, city, description } = this.state
        return(
            <>
            <Header as='h1' textAlign='left' style={{ paddingLeft:"300px" }}>
                Organization / Charity Edit Form
            </Header>
                <br></br>
            <Form style={{ paddingRight:"500px", paddingLeft:"40px" }} onSubmit={e => this.handleEditCharity(e)} onChange={e => this.handleChange(e)}>
                <Form.Field >
                    <label>Name of the Organization</label>
                    <input placeholder='Name' type="text" name="name" defaultValue={name}/>
                </Form.Field>
    
                <Form.Field>
                    <label>Logo / Photo </label>
                    <input placeholder='Logo' type="text" name="image" defaultValue={image}/>
                </Form.Field>

                <Form.Field>
                    <label>Address</label>
                    <input placeholder='Address' type="text" name="address" defaultValue={address}/>
                </Form.Field>

                <Form.Field>
                    <label>City</label>
                    <input placeholder='City' type="text" name="city" defaultValue={city}/>
                </Form.Field>

                <Form.Field>
                    <label>Description</label>
                    <input placeholder='Description' type="text" name="description" defaultValue={description}/>
                </Form.Field>

                <Form.Field>
                    <Button type='submit'>Edit</Button>
                </Form.Field>
            </Form>
        </>
        )
    }
}

export default CharityAddForm