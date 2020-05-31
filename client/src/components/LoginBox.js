import React, { Component } from "react"
import Container from "./Container"
import { Link, Redirect } from "react-router-dom"

export default class LoginBox extends Component {
    state = {
        username: "",
        password: "",
        redirect: null
    }

    async loginSubmit() {
        const name = this.state.username
        const pass = this.state.password
        const url = `/login/${name}`
        const response = await fetch(url)
        const data = await response.json()

        if (data.username === name && data.password === pass) {
            this.setState({ redirect: "/home" })
            this.props.setState({
                username: data.username,
                isLoggedIn: true
            })
        } else if (data.username === name && pass === "") {
            this.setState({
                password: ""
            })
            alert("The password field was blank.")
        } else if (data.username === name && data.password !== pass) {
            this.setState({password: ""})
            alert("The password you entered was incorrect.")
        } else if (data.username === "wrong") {
            this.setState({
                username: "",
                password: ""
            })
            alert("The username you entered was incorrect.")
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        
        return (
            <Container>
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
                    <Link to="/new-account" className={"btn btn-danger"}>Create Account</Link>
                </div>
            </Container>
        )
    }
}