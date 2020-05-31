import React, { Component } from "react"
import Container from "./Container"
import { Results, SingleResult } from "./Results"
import Moment from "moment"
import { Redirect } from "react-router-dom"

export default class Favorites extends Component {

    state = {
        favorites: [],
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

    showFavorites() {
        const name = this.props.username

        fetch(`/favorites/${name}`)
            .then(response => response.json())
            .then(res => {
                this.setState({favorites: res.favorites})

                const favs = this.state.favorites
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

        this.showFavorites()
    }

    removeFav(fav) {
        const name = this.props.username

        fetch(`/remove/${name}/${fav.id}`, {
            method: "POST"
        }).then(()=> {
            this.showFavorites()
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const favoritesList = this.state.favorites
        const movieFavs = favoritesList.filter(fav => fav.type === "movie")
        const tvFavs = favoritesList.filter(fav => fav.type === "show")

        return (
            <Container>
                <div className="row">
                    <div className="col-lg-6">
                        {!movieFavs.length ? (
                            <Results resultsClass="results">
                                <h3 className="noResults">No Favorite Movies Have Been Saved</h3>
                            </Results>
                        ) : (   
                            <Results resultsClass="favResults">

                                <h3 id="yourRecs">Your Favorite Movies</h3>

                                <div className="generateRecommendations">
                                    <button className="btn btn-danger mb-2" id="favoriteMovieRecommendations" onClick={() => this.favoriteMovieRecommendations()}>Generate Recommendations</button>
                                </div>

                                {movieFavs.map((fav, i) => {
                                    let formattedDate = Moment(fav.release_date ? fav.release_date : fav.first_air_date).format("YYYY")

                                    return (
                                        <SingleResult
                                            key={i}
                                            title={fav.title}
                                            year={formattedDate}
                                            filmImg={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
                                            dbBtnText={"Remove Favorite"}
                                            btnClassNames={"btn btn-danger removeFav"}
                                            detailsClickFunc={ () => this.props.setState({film: fav}) }
                                            dbClickFunc={() => this.removeFav(fav)}
                                        />
                                    )
                                })}
                            </Results>
                        )}
                    </div>
                    
                    <div className="col-lg-6">
                        {!tvFavs.length ? (
                            <Results resultsClass="results">
                                <h3 className="noResults">No Favorite TV Shows Have Been Saved</h3>
                            </Results>
                        ) : (   
                            <Results resultsClass="favResults2">

                                <h3 id="yourRecs">Your Favorite TV Shows</h3>

                                <div className="generateRecommendations">
                                    <button className="btn btn-danger mb-2" id="favoriteShowRecommendations" onClick={() => this.favoriteShowRecommendations()}>Generate Recommendations</button>
                                </div>

                                {tvFavs.map((fav, i) => {
                                    let formattedDate = Moment(fav.release_date ? fav.release_date : fav.first_air_date).format("YYYY")

                                    return (
                                        <SingleResult
                                            key={i}
                                            title={fav.title}
                                            year={formattedDate}
                                            filmImg={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
                                            dbBtnText={"Remove Favorite"}
                                            btnClassNames={"btn btn-danger removeFav"}
                                            detailsClickFunc={ () => this.props.setState({film: fav}) }
                                            dbClickFunc={() => this.removeFav(fav)}
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