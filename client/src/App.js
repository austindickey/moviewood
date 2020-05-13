import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/pages/Home"
import MovieSearch from "./components/pages/MovieSearch"
import ShowSearch from "./components/pages/ShowSearch"
import Occasion from "./components/pages/Occasion"
import Favorites from "./components/pages/Favorites"

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/movies" component={MovieSearch} />
        <Route exact path="/tv" component={ShowSearch} />
        <Route exact path="/occasion" component={Occasion} />
        <Route exact path="/favorites" component={Favorites} />
      </div>
    </Router>
  )
}

export default App