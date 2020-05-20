import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./components/pages/Home"
import MovieSearch from "./components/pages/MovieSearch"
import ShowSearch from "./components/pages/ShowSearch"
import OccasionSearch from "./components/pages/OccasionSearch"
import ShowFavorites from "./components/pages/ShowFavorites"
import OccasionResults from "./components/pages/OccasionResults"
import SingleFilm from "./components/SingleFilm"

function App() {
  const [film, setFilm] = useState({})

  return (
    <Router>
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/movies" component={() => <MovieSearch setFilm={setFilm}/>} />
        <Route exact path="/tv" component={() => <ShowSearch setFilm={setFilm}/>} />
        <Route exact path="/occasion" component={OccasionSearch} />
        <Route exact path="/search" component={() => <OccasionResults setFilm={setFilm}/>} />
        <Route exact path="/favorites" component={() => <ShowFavorites setFilm={setFilm}/>} />
        <Route exact path="/singleFilm" component={() => <SingleFilm film={film}/>} />
      </div>
    </Router>
  )
}

export default App