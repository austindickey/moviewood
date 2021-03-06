import React, { Component } from "react"
import Container from "./Container"
import Moment from "moment"
import { Redirect } from "react-router-dom"

export default class SingleFilm extends Component {
    state = {
        actors: [],
        rating: "",
        redirect: null
    }

    async grabActors() {
        let url = ""

        if (this.props.film.type === "movie") {
            url = `/api/actors/movie/${this.props.film.id}`
        } else if (this.props.film.type === "show") {
            url = `/api/actors/tv/${this.props.film.id}`
        }

        const response = await fetch(url)
        const data = await response.json()
        const actors = data.cast
        actors.length = 6
        this.setState({actors})
    }

    async grabRating() {
        let url = ""

        if (this.props.film.type === "movie") {
            url = `/api/rating/movie/${this.props.film.id}`
        } else if (this.props.film.type === "show") {
            url = `/api/rating/tv/${this.props.film.id}`
        }

        const response = await fetch(url)
        const data = await response.json()
        this.setState({rating: data.value})
    }

    componentDidMount() {
        const logCheck = this.props.isLoggedIn

        if (!logCheck) {
            this.setState({ redirect: "/" })
        }

        this.grabRating()
        this.grabActors()
    }

    saveFav(film) {
        const data = {
            adult: film.adult,
            genre_ids: film.genre_ids,
            id: film.id,
            overview: film.overview,
            popularity: film.popularity,
            poster_path: film.poster_path,
            release_date: film.release_date,
            title: film.title === undefined ? film.name : film.title,
            type: film.type
        }

        const username = this.props.username

        fetch(`/add/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(function (){
            alert("This movie has been saved to your favorites.")
        })
    }

    addToWatchList(film) {
        const data = {
            adult: film.adult,
            genre_ids: film.genre_ids,
            id: film.id,
            overview: film.overview,
            popularity: film.popularity,
            poster_path: film.poster_path,
            release_date: film.release_date,
            title: film.title === undefined ? film.name : film.title,
            type: film.type
        }

        const username = this.props.username

        fetch(`/add/watchlist/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(function (){
            alert("This movie has been added to your watchlist.")
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const data = this.props
        let rating = this.state.rating
        let actors = this.state.actors
        let genres = data.film.genre_ids

        let formattedDate = Moment(data.film.release_date === undefined ? data.film.first_air_date : data.film.release_date).format("MMMM Do, YYYY")

        for (let i = 0; i < genres.length; i++) {

            let defaultValue = genres[i]

            switch (genres[i]) {
                case 28:
                    genres[i] = "Action"
                    break

                case 12:
                    genres[i] = "Adventure"
                    break

                case 16:
                    genres[i] = "Animation"
                    break

                case 35:
                    genres[i] = "Comedy"
                    break

                case 80:
                    genres[i] = "Crime"
                    break

                case 99:
                    genres[i] = "Documentary"
                    break

                case 18:
                    genres[i] = "Drama"
                    break

                case 10751:
                    genres[i] = "Family"
                    break

                case 14:
                    genres[i] = "Fantasy"
                    break

                case 36:
                    genres[i] = "History"
                    break

                case 27:
                    genres[i] = "Horror"
                    break

                case 10402:
                    genres[i] = "Music"
                    break

                case 9648:
                    genres[i] = "Mystery"
                    break

                case 10749:
                    genres[i] = "Romance"
                    break

                case 878:
                    genres[i] = "Science Fiction"
                    break

                case 10770:
                    genres[i] = "TV Movie"
                    break

                case 53:
                    genres[i] = "Thriller"
                    break

                case 10752:
                    genres[i] = "War"
                    break

                case 37:
                    genres[i] = "Western"
                    break
                
                default:
                    genres[i] = defaultValue
                    break
            }
        }

        return (
            <Container>
                <div id="filmDetails">

                    <div className="col-md-4">
                        <img id="filmDetailsPic" src={`https://image.tmdb.org/t/p/w500${data.film.poster_path}`} alt="Film Pic" />
                    </div>

                    <div className="col-md-8">
                        <div id="data">
                            <h3>{data.film.title === undefined ? data.film.name : data.film.title}</h3>
                            <p><span>Release Date:</span> &nbsp;{formattedDate}</p>
                            <p><span>Rating:</span> &nbsp;{rating}</p>
                            <p><span>Genres:</span> &nbsp;{genres.join(", ")}</p>
                            <p><span>Summary:</span> &nbsp;{data.film.overview}</p>
                            <button className={"btn btn-danger saveMovie"} onClick={() => this.saveFav(data.film)}>Add to Favorites</button>
                            <button className={"btn btn-danger addToWatchList"} onClick={() => this.addToWatchList(data.film)}>Add to Watchlist</button>

                            <hr/>

                            <h5 className="text-center">Actors</h5>
                            <div id="filmActors">
                                {actors.map((actor, i) => {
                                    return (
                                        <div key={i} className="singleActor">
                                            <img className="singleActorPic" src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt="Actor Pic" />
                                            <h5>{actor.name}</h5>
                                            <p className="characterName">Character: {actor.character}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </Container>
        )
    }
}