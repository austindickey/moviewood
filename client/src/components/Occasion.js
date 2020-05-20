import React, { Component } from 'react'
import Container from './Container'

export default class Occasion extends Component {
    render() {
        return (
            <Container>
                <div className="contentHolder">
                    <h3 id="occasionTitle">Search by Occasion</h3>

                    <form id="formBody" action="/search" method="GET">
                        <div className="form-group">
                            <label for="formAdults">Adults Only?</label>
                            <select name="adults" className="form-control choose" id="formAdults" required>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="formGenres">Genres</label>
                            <select name="genres" className="form-control choose" id="formGenres" required>
                                <option val="28">Action</option>
                                <option val="12">Adventure</option>
                                <option val="16">Animation</option>
                                <option val="35">Comedy</option>
                                <option val="80">Crime</option>
                                <option val="99">Documentary</option>
                                <option val="18">Drama</option>
                                <option val="10751">Family</option>
                                <option val="14">Fantasy</option>
                                <option val="36">History</option>
                                <option val="27">Horror</option>
                                <option val="10402">Music</option>
                                <option val="9648">Mystery</option>
                                <option val="10749">Romance</option>
                                <option val="878">Science Fiction</option>
                                <option val="10770">TV Movie</option>
                                <option val="53">Thriller</option>
                                <option val="10752">War</option>
                                <option val="37">Western</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="formYear">Specific Year</label>
                            <input name="year" type="text" className="form-control" id="formYear" placeholder="optional" />
                        </div>
                        <button type="submit" className="btn btn-danger" id="formSubmit">Submit</button>
                    </form>
                </div>
            </Container>
        )
    }
}
