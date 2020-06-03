import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Login from "./components/pages/Login"
import NewAccount from './components/pages/NewAccount'
import Home from "./components/pages/Home"
import MovieSearch from "./components/pages/MovieSearch"
import ShowSearch from "./components/pages/ShowSearch"
import FeatureForm from "./components/pages/FeatureForm"
import ShowFavorites from "./components/pages/ShowFavorites"
import FeatureResults from "./components/pages/FeatureResults"
import SingleFilm from "./components/SingleFilm"
import ShowWatchList from "./components/pages/ShowWatchList"

function App() {
  const [state,setState] = useState({
    username: "",
    isLoggedIn: null,
    film: {},
    formData: {},
    searchResults: []
  })

  const updateState = (newState) => {
    setState({...state, ...newState})
  }

  return (
    <Router>
      <div>
        <Navbar props={state} username={state.username} isLoggedIn={state.isLoggedIn} setState={updateState}/>
        <Route exact path="/" component={() => <Login username={state.username} isLoggedIn={state.isLoggedIn} setState={updateState}/>} />
        <Route exact path="/new-account" component={() => <NewAccount username={state.username} isLoggedIn={state.isLoggedIn} setState={updateState}/>} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/movies" component={() => <MovieSearch username={state.username} isLoggedIn={state.isLoggedIn} setState={updateState}/>} />
        <Route exact path="/tv" component={() => <ShowSearch username={state.username} isLoggedIn={state.isLoggedIn} setState={updateState}/>} />
        <Route exact path="/features" component={() => <FeatureForm isLoggedIn={state.isLoggedIn} setState={updateState}/>} />
        <Route exact path="/search" component={() => <FeatureResults username={state.username} searchResults={state.searchResults} isLoggedIn={state.isLoggedIn} setState={updateState}/>} />
        <Route exact path="/favorites" component={() => <ShowFavorites username={state.username} isLoggedIn={state.isLoggedIn} setState={updateState}/>} />
        <Route exact path="/watchlist" component={() => <ShowWatchList username={state.username} isLoggedIn={state.isLoggedIn} setState={updateState}/>} />
        <Route exact path="/singleFilm" component={() => <SingleFilm username={state.username} isLoggedIn={state.isLoggedIn} film={state.film}/>} />
      </div>
    </Router>
  )
}

export default App