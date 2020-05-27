import React from "react"
import Container from "./Container"
import { Results, SingleResult } from "./Results"
import Moment from "moment"
import { Link, Redirect } from "react-router-dom"

class Movie extends React.Component {
    state = {
        movies: [],
        masterMovie: {},
        searchQuery: "",
        redirect: null
    }

    async movieSearch() {
        const url = `/api/movie/${this.state.searchQuery}`
        const response = await fetch(url)
        const movies = await response.json()
        this.setState({masterMovie: movies[movies.length -1]})
        movies.pop()
        this.setState({movies})
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
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
            title: movie.title,
            type: movie.type
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

    componentDidMount() {
        const logCheck = this.props.isLoggedIn

        if (!logCheck) {
            this.setState({ redirect: "/" })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const master = this.state.masterMovie
        const movies = this.state.movies

        let masterFormattedDate = Moment(master.release_date).format("YYYY")

        master.type = "movie"
        
        return (
            <Container>
                <div className="contentHolder">
                    <div id="searchBox">
                        <h3>Search for a Movie</h3>
                        <form className="form-inline">
                            <div className="form-group mb-2">
                                <input type="text" name="searchQuery" value={this.state.searchQuery} onChange={(event) => this.handleInputChange(event)} className="form-control" id="searchQuery" placeholder="Movie Name" />
                            </div>
                        </form>
                        <button className="btn btn-danger mb-2" id="movieSearchButton" onClick={() => this.movieSearch()}>Search</button>
                    </div>

                    {!movies.length ? (
                        <Results>
                            <h3 id="noResults">No Recommendations to Display</h3>
                        </Results>
                    ) : (   
                            
                            <Results>
                                <div id="showingFor">
                                    <h3>Showing Recommendations For</h3>
                                    <div className="singleResult">
                                        <img src={`https://image.tmdb.org/t/p/w500${master.poster_path}`} alt="Film Pic" />
                                        <h5>{master.title}</h5>
                                        <p className="filmYear">({masterFormattedDate})</p>
                                        <div id="showingForButtons">
                                            <button className={"btn btn-danger saveMovie"} onClick={() => this.saveMovie(master)}>{"Add to Favorites"}</button>
                                            <Link onClick={() => this.props.setState({film: master})} to="/singleFilm" className={"btn btn-danger viewDetails"}>
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <h3 id="yourRecs">Your Recommendations</h3>

                                {movies.map((movie, i) => {
                                    let formattedDate = Moment(movie.release_date).format("YYYY")
                                    movie.type = "movie"
                                    return (
                                        <SingleResult
                                            key={i}
                                            title={movie.title}
                                            year={formattedDate}
                                            filmImg={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            dbBtnText={"Add to Favorites"}
                                            btnClassNames={"btn btn-danger saveMovie"}
                                            detailsClickFunc={ () => this.props.setState({film: movie}) }
                                            dbClickFunc={() => this.saveMovie(movie)}
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

export default Movie