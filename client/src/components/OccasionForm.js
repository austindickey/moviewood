import React, { Component } from 'react'
import Container from './Container'

export default class OccasionForm extends Component {

    render() {
        return (
            <Container>
                <div className="contentHolder">
                    <div id="occasionTitle">
                        <h3>Search by Occasion</h3>
                        <p>Your results will be sorted by most popular first.</p>
                    </div>

                    <form id="formBody" action="/search" method="GET">
                        <div className="form-group">
                            <label htmlFor="formType">Movie or TV Show?</label>
                            <select name="type" className="form-control choose" id="formType" required>
                                <option value="movie">Movie</option>
                                <option value="tv">TV Show</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="formAdults">Kid Friendly? &mdash; (Does not apply for tv shows.)</label>
                            <select name="adults" className="form-control choose" id="formAdults" required>
                                <option value="true">No</option>
                                <option value="false">Yes</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="formGenres">Genre</label>
                            <select name="genres" className="form-control choose" id="formGenres" required>
                                <option value="28">Action</option>
                                <option value="12">Adventure</option>
                                <option value="16">Animation</option>
                                <option value="35">Comedy</option>
                                <option value="80">Crime</option>
                                <option value="99">Documentary</option>
                                <option value="18">Drama</option>
                                <option value="10751">Family</option>
                                <option value="14">Fantasy</option>
                                <option value="36">History</option>
                                <option value="27">Horror</option>
                                <option value="10402">Music</option>
                                <option value="9648">Mystery</option>
                                <option value="10749">Romance</option>
                                <option value="878">Science Fiction</option>
                                <option value="10770">TV Movie</option>
                                <option value="53">Thriller</option>
                                <option value="10752">War</option>
                                <option value="37">Western</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="formYear">Specific Year &mdash; (For TV shows, this is the first air date year.)</label>
                            <input name="year" type="text" className="form-control" id="formYear" placeholder="optional"/>
                        </div>
                        <button type="submit" className="btn btn-danger" id="formSubmit" onClick={ () => this.props.setFilm(this.state) }>Submit</button>
                    </form>
                </div>
            </Container>
        )
    }
}
