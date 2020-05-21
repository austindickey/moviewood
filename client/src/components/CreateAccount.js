import React, { Component } from 'react'
import Container from './Container'

export default class LoginBox extends Component {
    state = {
        email: "",
        username: "",
        newPassword: "",
        verifyPassword: ""
    }

    async newUserSubmit() {


        // Checking for existing email and username
        const email = this.state.email
        const name = this.state.username
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
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
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
