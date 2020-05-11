import React from "react"

class ApiTest extends React.Component {
    state = {
    }

    async apiCall() {
        const url = `/api`
        const response = await fetch(url)
        console.log("response: ", response)
        const data = await response.json()
        console.log("data: ", data)
    }

    render() {
        return (
            <button className="btn btn-danger mb-2" id="apiTestButton" onClick={() => this.apiCall()}>Search</button>
        )
    }
}

export default ApiTest