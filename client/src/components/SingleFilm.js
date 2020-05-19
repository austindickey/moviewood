import React, { Component } from 'react'
import Container from "./Container"
import Moment from "moment"

export default class SingleFilm extends Component {
    render() {
        const data = this.props
        console.log(data)

        let formattedDate = Moment(data.film.release_date === undefined ? data.film.first_air_date : data.film.release_date).format("MMMM Do, YYYY")

        return (
            <Container>
                <div className="contentHolder">
                    <div id="filmDetails">
                        <img src={`https://image.tmdb.org/t/p/w500${data.film.poster_path}`} alt="Film Pic" />
                        <div id="data">
                            <h3>{data.film.title === undefined ? data.film.name : data.film.title}</h3>
                            <p>Release Date: {formattedDate}</p>
                            <p>Overview: {data.film.overview}</p>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}
