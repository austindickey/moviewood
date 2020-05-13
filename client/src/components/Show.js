import React from "react"
import Container from "./Container"

class Show extends React.Component {
    state = {
        data: [],
        searchQuery: ""
    }

    async showSearch() {
        const url = `/api/tv/${this.state.searchQuery}`
        const response = await fetch(url)
        const data = await response.json()
        console.log("data: ", data)
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
                    <div id="searchBox">
                        <h3>Search for a TV Show</h3>
                        <form className="form-inline">
                            <div className="form-group mb-2">
                                <input type="text" name="searchQuery" value={this.state.searchQuery} onChange={(event) => this.handleInputChange(event)} className="form-control" id="searchQuery" placeholder="Movie or TV Show Name" />
                            </div>
                        </form>
                        <button className="btn btn-danger mb-2" id="apiTestButton" onClick={() => this.showSearch()}>Search</button>
                    </div>
                </div>
            </Container>
        )
    }
}

export default Show