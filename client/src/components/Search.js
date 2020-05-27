import React, { Component } from 'react'
import Container from './Container'
import { Results, SingleResult } from "./Results"
import Moment from "moment"
import { Redirect } from "react-router-dom"

export default class Search extends Component {
    state = {
        searchResults: [],
        redirect: null
    }

    // async occasionSearch() {
    //     const data = this.props
    //     console.log(data)

    //     let type = data.type
    //     let adults = data.adults
    //     let genres = data.genre
    //     let year = data.year

    //     if (year === "") {
    //         year = "noYear"
    //     }

    //     const url = `/search/${type}/${adults}/${genres}/${year}`
    //     console.log("URL: ", url)
    //     const response = await fetch(url)
    //     const searchResults = await response.json()
    //     this.setState({searchResults})
    // }

    componentDidMount() {
        const logCheck = this.props.isLoggedIn
        console.log(logCheck)

        // if (!logCheck) {
        //     this.setState({ redirect: "/" })
        // }

        this.setState({ searchResults: this.props.searchResults })

        // this.occasionSearch()
    }

    saveMovie(movie) {
        const data = {
            adult: movie.adult,
            genre_ids: movie.genre_ids,
            id: movie.id,
            overview: movie.overview,
            popularity: movie.popularity,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            title: movie.title
        }
        fetch("/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(function (){
            alert("This movie has been saved to your favorites.")
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const search = this.state.searchResults

        return (
            <Container>
                <div className="contentHolder">

                    {!search.length ? (
                        <Results>
                            <h3 id="noResults">No Search Results to Display</h3>
                        </Results>
                    ) : (
                            <Results>

                                <h3 id="yourRecs">Your Search Results</h3>

                                {search.map((film, i) => {
                                    let formattedDate = Moment(film.release_date ? film.release_date : film.first_air_date).format("YYYY")

                                    return (
                                        <SingleResult
                                            key={i}
                                            title={film.title ? film.title : film.name}
                                            year={formattedDate}
                                            filmImg={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                            dbBtnText={"Add to Favorites"}
                                            btnClassNames={"btn btn-danger saveMovie"}
                                            detailsClickFunc={() => this.props.setState(film)}
                                            dbClickFunc={() => this.saveMovie(film)}
                                        />
                                    )
                                })}
                            </Results>
                        )}

                </div>
            </Container>
        )
    }
}
