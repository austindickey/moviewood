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

        return (
            <Container>
                <div className="contentHolder">
                {!favoritesList.length ? (
                        <Results>
                            <h3 id="noResults">No Favorites Have Been Saved</h3>
                        </Results>
                    ) : (   
                            <Results>

                                <h3 id="yourRecs">Your Favorites</h3>

                                {favoritesList.map((fav, i) => {
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
            </Container>
        )
    }
}
