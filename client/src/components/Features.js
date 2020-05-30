import React, { Component } from 'react'
import Container from './Container'
import { Redirect } from "react-router-dom"

export default class Features extends Component {
    state = {
        redirect: null,
        type: "movie",
        adults: "true",
        genres: "28",
        year: "noYear"
    }

    componentDidMount() {
        const logCheck = this.props.isLoggedIn

        if (!logCheck) {
            this.setState({ redirect: "/" })
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    async featuresSearch() {
        const formData = this.state

        let type = formData.type
        let adults = formData.adults
        let genres = formData.genres
        let year = formData.year

        const url = `/search/${type}/${adults}/${genres}/${year}`
        console.log("URL: ", url)
        const response = await fetch(url)
        const searchResults = await response.json()
        console.log("Search Results: ",searchResults)

        
            for (let i = 0; i < searchResults.length; i++) {
                if (this.state.type === "movie") {
                    searchResults[i].type = "movie"
                } else if (this.state.type === "tv") {
                    searchResults[i].type = "show"
                }
            }

        this.setState({ redirect: "/search" })
        this.props.setState({searchResults})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        
        return (
            <Container>
                <div id="featuresTitle">
                    <h3>Search by Features</h3>
                    <p>Your results will be sorted by most popular first.</p>
                </div>

                <div id="formBody">
                    <form>
                        <div className="form-group">
                            <label htmlFor="formType">Movie or TV Show?</label>
                            <select name="type" className="form-control choose" id="formType" onChange={(event) => this.handleInputChange(event)} required>
                                <optgroup label="Choose One">
                                    <option value="movie">Movie</option>
                                    <option value="tv">TV Show</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="formAdults">Kid Friendly? &mdash; (Does not apply for tv shows.)</label>
                            <select name="adults" className="form-control choose" id="formAdults" onChange={(event) => this.handleInputChange(event)} required>
                                <optgroup label="Choose One">
                                    <option value="true">No</option>
                                    <option value="false">Yes</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="formGenres">Genre</label>
                            <select name="genres" className="form-control choose" id="formGenres" onChange={(event) => this.handleInputChange(event)} required>
                                <optgroup label="Choose One">
                                    <option value="28">Action</option>
                                    <option value="12">Adventure</option>
                                    <option value="16">Animation</option>
                                    <option value="35">Comedy</option>
                                    <option value="80">Crime</option>
                                    <option value="99">Documentary</option>
                                    <option value="18">Drama</option>
                                    <option value="10751">Family</option>
                                    <option value="14">Fantasy</option>
                                    <option value="36">History</option>
                                    <option value="27">Horror</option>
                                    <option value="10402">Music</option>
                                    <option value="9648">Mystery</option>
                                    <option value="10749">Romance</option>
                                    <option value="878">Science Fiction</option>
                                    <option value="10770">TV Movie</option>
                                    <option value="53">Thriller</option>
                                    <option value="10752">War</option>
                                    <option value="37">Western</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="formYear">Specific Year &mdash; (For TV shows, this is the first air date year.)</label>
                            <input name="year" type="text" className="form-control" id="formYear" placeholder="optional" onChange={(event) => this.handleInputChange(event)}/>
                        </div>
                        
                    </form>
                    <button className="btn btn-danger" id="featuresSubmit" onClick={ () => this.featuresSearch() }>Submit</button>
                </div>
            </Container>
        )
    }
}