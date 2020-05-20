import React from "react"
import Container from "./Container"
import { Results, SingleResult } from "./Results"

class Show extends React.Component {
    state = {
        shows: [],
        searchQuery: ""
    }

    async showSearch() {
        const url = `/api/tv/${this.state.searchQuery}`
        const response = await fetch(url)
        const shows = await response.json()
        this.setState({shows})
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    saveShow(show) {
        const data = {
            adult: show.adult,
            genre_ids: show.genre_ids,
            id: show.id,
            overview: show.overview,
            popularity: show.popularity,
            poster_path: show.poster_path,
            release_date: show.first_air_date,
            title: show.name
        }
        fetch("/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(function (){
            alert("This tv show has been saved to your favorites.")
        })
    }

    render() {
        let shows = this.state.shows
        return (
            <Container>
                <div className="contentHolder">
                    <div id="searchBox">
                        <h3>Search for a TV Show</h3>
                        <form className="form-inline">
                            <div className="form-group mb-2">
                                <input type="text" name="searchQuery" value={this.state.searchQuery} onChange={(event) => this.handleInputChange(event)} className="form-control" id="searchQuery" placeholder="TV Show Name" />
                            </div>
                        </form>
                        <button className="btn btn-danger mb-2" id="showSearch" onClick={() => this.showSearch()}>Search</button>
                    </div>

                    {!shows.length ? (
                        <Results>
                            <h3 id="noResults">No Recommendations to Display</h3>
                        </Results>
                    ) : (   
                            <Results>

                                <h3 id="yourRecs">Your Recommendations</h3>

                                {shows.map((show, i) => {

                                    return (
                                        <SingleResult
                                            key={i}
                                            title={show.name}
                                            filmImg={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                            dbBtnText={"Add to Favorites"}
                                            btnClassNames={"btn btn-danger saveMovie"}
                                            detailsClickFunc={ () => this.props.setFilm(show) }
                                            dbClickFunc={() => this.saveShow(show)}
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

export default Show