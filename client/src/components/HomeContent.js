import React, { Component } from 'react'
import Container from './Container'

export default class HomeContent extends Component {
    render() {
        return (
            <Container>
                <div className="contentHolder">
                    {/* <h1 id="homeTitle">Moviewood</h1> */}
                    <div id="homeLogo">
                        <img src={window.location.origin + "/img/homeLogo.png"} alt="Logo"/>
                    </div>

                    <div id="aboutUs">
                        <h3>About Us</h3>
                        <p>Tired of wasting time looking for something to watch? Here at Moviewood, we strive to give you the best movie and tv show recommendations based off of your current favorites. We know that time is money, so stop wasting your valuable time and jump right into another great movie or tv show. You can search for recommendations based off of a movie title, a tv show title, or film features. You can also save your favorites.</p>
                        <p id="dataFrom">This site utilizes data from TasteDive API and TMDB API.</p>
                    </div>
                </div>
            </Container>
        )
    }
}
