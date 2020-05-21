import React, { Component } from 'react'
import Container from './Container'
import { Link } from "react-router-dom"

export default class LoginBox extends Component {
    state = {
        username: "",
        password: ""
    }

    async loginSubmit() {
        const url = `/login`
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
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
                    <div className="loginBox">
                        <h4 id="existingUsers">Existing Users</h4>
                        <form className="form-inline">
                            <div className="form-group mb-2">
                                <input type="text" name="username" value={this.state.username} onChange={(event) => this.handleInputChange(event)} className="form-control" id="loginUsername" placeholder="Username" required/>
                            </div>
                            <div className="form-group mb-2">
                                <input type="password" name="password" value={this.state.password} onChange={(event) => this.handleInputChange(event)} className="form-control" id="loginPassword" placeholder="Password" required/>
                            </div>                            
                        </form>
                        <button className="btn btn-danger mb-2" id="loginSubmit" onClick={() => this.loginSubmit()}>Submit</button>
                        
                        <hr/>

                        <h4 id="newUsers">New Users</h4>
                        <Link to="/new-account" className={"btn btn-danger mb-2"}>Create Account</Link>
                    </div>
                </div>
            </Container>
        )
    }
}
