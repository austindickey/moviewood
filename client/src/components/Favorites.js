import React, { Component } from 'react'
import Container from './Container'
import { Results, SingleResult } from "./Results"
import Moment from "moment"

export default class Favorites extends Component {

    state = {
        favorites: []
    }

    showFavorites() {

        fetch('/favorites')
            .then(response => response.json())
            .then(res => this.setState({favorites: res}))
            .catch(err => console.log("Error: ", err))
        
    }

    componentDidMount() {
        this.showFavorites()
    }

    removeFav(fav) {
        fetch(`/remove/${fav._id}`, {
            method: "POST"
        }).then(()=> {
            this.showFavorites()
        })
    }

    render() {
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
                                            detailsClickFunc={ () => this.props.setFilm(fav) }
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
