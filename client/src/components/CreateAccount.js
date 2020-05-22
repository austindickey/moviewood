import React, { Component } from 'react'
import Container from './Container'
import { Redirect } from "react-router-dom"

export default class LoginBox extends Component {
    state = {
        email: "",
        username: "",
        newPassword: "",
        verifyPassword: "",
        redirect: null
    }
    
    // Validation Function for the email
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }

    async newUserSubmit() {
        // Assigning state values to constants
        const email = this.state.email
        const name = this.state.username
        const newPassword = this.state.newPassword
        const verifyPassword = this.state.verifyPassword

        // Email Validator
        if (!this.validateEmail(email)) {
            this.setState({
                email: "",
                username: "",
                newPassword: "",
                verifyPassword: ""
            })
            return alert("Please provide a valid email address.")
        }
        
        // Username Validator
        if (name.length < 4) {
            this.setState({
                username: "",
                newPassword: "",
                verifyPassword: ""
            })
            return alert("Username must be at least 4 characters long.")
        } else if (name.length > 20) {
            this.setState({
                username: "",
                newPassword: "",
                verifyPassword: ""
            })
            return alert("Username must be less than 20 characters long.")
        } else if (!name.match("^[A-Za-z0-9]+$")) {
            this.setState({
                username: "",
                newPassword: "",
                verifyPassword: ""
            })
            return alert("Username must contain only letters and numbers.")
        }

        // New Password Validator
        if (newPassword.length < 4) {
            this.setState({
                newPassword: "",
                verifyPassword: ""
            })
            return alert("Password must be at least 4 characters long.")
        } else if (newPassword.length > 20) {
            this.setState({
                newPassword: "",
                verifyPassword: ""
            })
            return alert("Password must be less than 20 characters long.")
        } else if (!newPassword.match(/^(?=.*[A-Za-z])(?=.*\d)/)){
            this.setState({
                newPassword: "",
                verifyPassword: ""
            })
            return alert("Password must contain at least 1 letter and 1 number.")
        }

        // Verify Password Validator
        if (verifyPassword !== newPassword) {
            this.setState({
                verifyPassword: ""
            })
            return alert("Passwords do not match.")
        }
        
        // Checking for existing email and username
        const url = `/check/${email}/${name}`
        const response = await fetch(url)
        const data = await response.json()

        if (data.email === email) {
            this.setState({
                email: "",
                username: "",
                newPassword: "",
                verifyPassword: ""
            })
            alert("This email is already on file.")
        } else if (data.username === name) {
            this.setState({
                username: "",
                newPassword: "",
                verifyPassword: ""
            })
            alert("This username is already taken.")
        } else if (data.fields === "validated") {
            // Both the email and username are unique; creating new account
            const userFields = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.newPassword
            }

            fetch("/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userFields)
            }).then(function (){
                alert("Your account has been created.")
            })

            this.setState({ redirect: "/home" })
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        console.log("Redirect: ", this.state.redirect)
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Container>
                <div className="contentHolder">
                    <div className="createAccount">
                        <h4 id="createHeader">Create an Account</h4>
                        <form className="form-inline">
                            <div className="form-group mb-2">
                                <input type="email" name="email" value={this.state.email} onChange={(event) => this.handleInputChange(event)} className="form-control" id="createEmail" placeholder="Email" required/>
                            </div>
                            <div className="form-group mb-2">
                                <input type="text" name="username" value={this.state.username} onChange={(event) => this.handleInputChange(event)} className="form-control" id="loginUsername" placeholder="Username" required/>
                            </div>
                            <div className="form-group mb-2">
                                <input type="password" name="newPassword" value={this.state.newPassword} onChange={(event) => this.handleInputChange(event)} className="form-control" id="newPassword" placeholder="Password" required/>
                            </div>
                            <div className="form-group mb-2">
                                <input type="password" name="verifyPassword" value={this.state.verifyPassword} onChange={(event) => this.handleInputChange(event)} className="form-control" id="verifyPassword" placeholder="Verify Password" required/>
                            </div>                         
                        </form>
                        <button className="btn btn-danger mb-2" id="createSubmit" onClick={() => this.newUserSubmit()}>Create</button>
                    </div>
                </div>
            </Container>
        )
    }
}
