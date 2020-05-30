import React from "react"
import Container from "./Container"
import { Results, SingleResult } from "./Results"
import Moment from "moment"
import { Link, Redirect } from "react-router-dom"

class Show extends React.Component {
    state = {
        shows: [],
        masterShow: {},
        searchQuery: "",
        redirect: null
    }

    async showSearch() {
        const url = `/api/tv/${this.state.searchQuery}`
        const response = await fetch(url)
        const shows = await response.json()
        this.setState({masterShow: shows[shows.length -1]})
        shows.pop()
        this.setState({shows})
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    listenForEnter = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            this.showSearch()
        }
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
            title: show.name,
            type: show.type
        }

        const username = this.props.username

        fetch(`/add/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(function (){
            alert("This tv show has been saved to your favorites.")
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

        const shows = this.state.shows
        const master = this.state.masterShow
        master.type = "show"

        let masterFormattedDate = Moment(master.first_air_date).format("YYYY")

        return (
            <Container>
                <div id="searchBox">
                    <h3>Search for a TV Show</h3>
                    <form className="form-inline">
                        <div className="form-group mb-2">
                            <input type="text" name="searchQuery" value={this.state.searchQuery} onChange={(event) => this.handleInputChange(event)} onKeyDown={(event) => this.listenForEnter(event)} className="form-control" id="searchQuery" placeholder="TV Show Name" />
                        </div>
                    </form>
                    <button className="btn btn-danger mb-2" id="showSearch" onClick={() => this.showSearch()}>Search</button>
                </div>

                {!shows.length ? (
                    <Results resultsClass="results">
                        <h3 className="noResults">No Recommendations to Display</h3>
                    </Results>
                ) : (   
                    <Results resultsClass="results">
                        <div id="showingFor">
                            <h3>Showing Recommendations For</h3>
                            <div className="singleResult">
                                <img src={`https://image.tmdb.org/t/p/w500${master.poster_path}`} alt="Film Pic" />
                                <h5>{master.name}</h5>
                                <p className="filmYear">({masterFormattedDate})</p>
                                <div id="showingForButtons">
                                    <button className={"btn btn-danger saveMovie"} onClick={() => this.saveShow(master)}>{"Add to Favorites"}</button>
                                    <Link onClick={() => this.props.setState({film: master})} to="/singleFilm" className={"btn btn-danger viewDetails"}>
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <h3 id="yourRecs">Your Recommendations</h3>

                        {shows.map((show, i) => {
                            let formattedDate = Moment(show.first_air_date).format("YYYY")
                            show.type = "show"
                            return (
                                <SingleResult
                                    key={i}
                                    title={show.name}
                                    year={formattedDate}
                                    filmImg={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                    dbBtnText={"Add to Favorites"}
                                    btnClassNames={"btn btn-danger saveMovie"}
                                    detailsClickFunc={ () => this.props.setState({film: show}) }
                                    dbClickFunc={() => this.saveShow(show)}
                                />
                            )
                        })}
                    </Results>
                )}
            </Container>
        )
    }
}

export default Show