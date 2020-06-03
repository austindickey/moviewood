import React, { Component } from "react"
import Container from "./Container"
import { Results, SingleResult } from "./Results"
import Moment from "moment"
import { Redirect } from "react-router-dom"

export default class WatchList extends Component {

    state = {
        watchList: [],
        movieNames: [],
        showNames: [],
        username: "",
        redirect: null
    }

    async favoriteMovieRecommendations() {
        const favs = this.state.movieNames

        const url = `/api/favorites/movies/recommendations/${favs}`
        const response = await fetch(url)
        const movies = await response.json()
        
        this.setState({ redirect: "/search" })
        this.props.setState({searchResults: movies})
    }

    async favoriteShowRecommendations() {
        const favs = this.state.showNames

        const url = `/api/favorites/shows/recommendations/${favs}`
        const response = await fetch(url)
        const shows = await response.json()

        this.setState({ redirect: "/search" })
        this.props.setState({searchResults: shows})
    }

    showWatchList() {
        const name = this.props.username

        fetch(`/watchlist/${name}`)
            .then(response => response.json())
            .then(res => {
                this.setState({watchList: res.watchList})

                const favs = this.state.watchList
                let movieNames = []
                let showNames = []

                for (let i = 0; i < favs.length; i++) {
                    if (favs[i].type === "movie") {
                        movieNames.push(favs[i].title)
                    } else if (favs[i].type === "show") {
                        showNames.push(favs[i].title)
                    }
                }

                this.setState({movieNames, showNames})
            })
            .catch(err => console.log("Error: ", err))
    }

    componentDidMount() {
        const logCheck = this.props.isLoggedIn

        if (!logCheck) {
            this.setState({ redirect: "/" })
        }

        this.showWatchList()
    }

    removeSingleWatchItem(fav) {
        const name = this.props.username

        fetch(`/remove/watchlist/${name}/${fav.id}`, {
            method: "POST"
        }).then(()=> {
            this.showWatchList()
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const watchList = this.state.watchList
        const movieWatch = watchList.filter(fav => fav.type === "movie")
        const tvWatch = watchList.filter(fav => fav.type === "show")

        return (
            <Container>
                <div className="row">
                    <div className="col-lg-6">
                        {!movieWatch.length ? (
                            <Results resultsClass="results">
                                <h3 className="noResults">No Movies in Your Watch List</h3>
                            </Results>
                        ) : (   
                            <Results resultsClass="favResults">

                                <h3 id="yourRecs">Your Movie Watch List</h3>

                                <div className="generateRecommendations">
                                    <button className="btn btn-danger mb-2" id="favoriteMovieRecommendations" onClick={() => this.favoriteMovieRecommendations()}>Generate Recommendations</button>
                                </div>

                                {movieWatch.map((single, i) => {
                                    let formattedDate = Moment(single.release_date ? single.release_date : single.first_air_date).format("YYYY")

                                    return (
                                        <SingleResult
                                            key={i}
                                            title={single.title}
                                            year={formattedDate}
                                            filmImg={`https://image.tmdb.org/t/p/w500${single.poster_path}`}
                                            dbBtnText={"Remove Film"}
                                            btnClassNames={"btn btn-danger removeWatchItem"}
                                            detailsClickFunc={ () => this.props.setState({film: single}) }
                                            dbClickFunc={() => this.removeSingleWatchItem(single)}
                                        />
                                    )
                                })}
                            </Results>
                        )}
                    </div>
                    
                    <div className="col-lg-6">
                        {!tvWatch.length ? (
                            <Results resultsClass="results">
                                <h3 className="noResults">No TV Shows in Your Watch List</h3>
                            </Results>
                        ) : (   
                            <Results resultsClass="favResults2">

                                <h3 id="yourRecs">Your TV Show Watch List</h3>

                                <div className="generateRecommendations">
                                    <button className="btn btn-danger mb-2" id="favoriteShowRecommendations" onClick={() => this.favoriteShowRecommendations()}>Generate Recommendations</button>
                                </div>

                                {tvWatch.map((single, i) => {
                                    let formattedDate = Moment(single.release_date ? single.release_date : single.first_air_date).format("YYYY")

                                    return (
                                        <SingleResult
                                            key={i}
                                            title={single.title}
                                            year={formattedDate}
                                            filmImg={`https://image.tmdb.org/t/p/w500${single.poster_path}`}
                                            dbBtnText={"Remove Film"}
                                            btnClassNames={"btn btn-danger removeWatchItem"}
                                            detailsClickFunc={ () => this.props.setState({film: single}) }
                                            dbClickFunc={() => this.removeSingleWatchItem(single)}
                                        />
                                    )
                                })}
                            </Results>
                        )}
                    </div>
                </div>
            </Container>
        )
    }
}