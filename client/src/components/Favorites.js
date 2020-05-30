import React, { Component } from 'react'
import Container from './Container'
import { Results, SingleResult } from "./Results"
import Moment from "moment"
import { Redirect } from "react-router-dom"

export default class Favorites extends Component {

    state = {
        favorites: [],
        username: "",
        redirect: null
    }

    showFavorites() {
        const name = this.props.username

        fetch(`/favorites/${name}`)
            .then(response => response.json())
            .then(res => this.setState({favorites: res.favorites}))
            .catch(err => console.log("Error: ", err))
        
    }

    componentDidMount() {
        const logCheck = this.props.isLoggedIn
        console.log(logCheck)

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
                            <Results resultsClass="favResults">

                                <h3 id="yourRecs">Your Favorite TV Shows</h3>

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
