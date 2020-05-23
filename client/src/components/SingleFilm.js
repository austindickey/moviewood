import React, { Component } from 'react'
import Container from "./Container"
import Moment from "moment"

export default class SingleFilm extends Component {
    state = {
        actors: []
    }

    async grabActors() {
        const url = `/api/actors/${this.props.film.id}`
        const response = await fetch(url)
        const data = await response.json()
        const actors = data.cast
        actors.length = 6
        this.setState({actors})
    }

    componentDidMount() {
        this.grabActors()
    }

    render() {
        let actors = this.state.actors
        const data = this.props
        console.log(data)

        let formattedDate = Moment(data.film.release_date === undefined ? data.film.first_air_date : data.film.release_date).format("MMMM Do, YYYY")

        let genres = data.film.genre_ids

        for (let i = 0; i < genres.length; i++) {
            switch (genres[i]) {
                case 28:
                    genres[i] = "Action"
                    break;

                case 12:
                    genres[i] = "Adventure"
                    break;

                case 16:
                    genres[i] = "Animation"
                    break;

                case 35:
                    genres[i] = "Comedy"
                    break;

                case 80:
                    genres[i] = "Crime"
                    break;

                case 99:
                    genres[i] = "Documentary"
                    break;

                case 18:
                    genres[i] = "Drama"
                    break;

                case 10751:
                    genres[i] = "Family"
                    break;

                case 14:
                    genres[i] = "Fantasy"
                    break;

                case 36:
                    genres[i] = "History"
                    break;

                case 27:
                    genres[i] = "Horror"
                    break;

                case 10402:
                    genres[i] = "Music"
                    break;

                case 9648:
                    genres[i] = "Mystery"
                    break;

                case 10749:
                    genres[i] = "Romance"
                    break;

                case 878:
                    genres[i] = "Science Fiction"
                    break;

                case 10770:
                    genres[i] = "TV Movie"
                    break;

                case 53:
                    genres[i] = "Thriller"
                    break;

                case 10752:
                    genres[i] = "War"
                    break;

                case 37:
                    genres[i] = "Western"
                    break;
            }
        }

        return (
            <Container>
                <div className="contentHolder">
                    <div id="filmDetails">

                        <div className="col-md-4">
                            <img id="filmDetailsPic" src={`https://image.tmdb.org/t/p/w500${data.film.poster_path}`} alt="Film Pic" />
                        </div>

                        <div className="col-md-8">
                            <div id="data">
                                <h3>{data.film.title === undefined ? data.film.name : data.film.title}</h3>
                                <p className="singleFilmDate">Release Date: {formattedDate}</p>
                                <p><span>Genres:</span> {genres.join(", ")}</p>
                                <p><span>Summary:</span> {data.film.overview}</p>

                                <hr/>

                                <h5 className="text-center">Actors</h5>
                                <div id="filmActors">
                                    {actors.map((actor, i) => {
                                        console.log(actor)
                                        return (
                                            <div className="singleActor">
                                                <img className="singleActorPic" src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt="Film Pic" />
                                                <h5>{actor.name}</h5>
                                                <p className="characterName">Character: {actor.character}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </Container>
        )
    }
}
