import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/pages/Home"
import IndvFilm from "./components/pages/IndvFilm"

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/indvfilm" component={IndvFilm} />
      </div>
    </Router>
  )
}

export default App