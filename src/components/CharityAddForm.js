import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Form, Button, Header } from 'semantic-ui-react'

class CharityAddForm extends Component {

    constructor(){
        super()
        this.state = {
            name: '',
            image: '',
            address: '',
            city: '',
        }
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onAddNewCharity(this.state, this.props.user.id)
        this.props.history.push('/home')
    }

    render() {
        const { name, image, address, city } = this.state
        return(
            <>
            {/* <Link to="/add"/> */}
            <Header as='h1' textAlign='left' style={{ paddingLeft:"300px" }}>
                    Organization / Charity Add Form
            </Header>
            <br></br>
            <Form style={{ paddingRight:"500px", paddingLeft:"40px" }} onSubmit={e => this.handleSubmit(e)} onChange={e => this.handleChange(e)}>
                <Form.Field >
            
                    <label>Name of the Organization</label>
                    <input placeholder='Name' type="text" name="name" value={name}/>
        
                </Form.Field>
    
                <Form.Field>
            
                    <label>Logo / Photo </label>
                    <input placeholder='Logo' type="text" name="image" value={image}/>
        
                </Form.Field>

                <Form.Field>
            
                    <label>Address</label>
                    <input placeholder='Address' type="text" name="address" value={address}/>
            
                </Form.Field>

                <Form.Field>
            
                    <label>City</label>
                    <input placeholder='City' type="text" name="city" value={city}/>
            
                </Form.Field>

                <Form.Field>

                    <Button type='submit'>Add</Button>
                
                </Form.Field>
    
            </Form>
        </>
        )
    }
}

export default CharityAddForm