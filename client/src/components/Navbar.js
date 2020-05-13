import React, {useState} from "react"
import { Link } from "react-router-dom"

function Navbar() {
  const [route, setRoute] = useState(window.location.pathname)

  function getRoute(name) {
    setRoute(name)
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <a className="logo" href="/">
        <img src={window.location.origin + "/img/logo.png"} alt="Logo"/>
      </a>
      <div className="navbar-nav">
        <Link onClick={() => getRoute("/")} to="/" className={route === "/" ? "nav-link active" : "nav-link"}>
          Home
        </Link>
        <Link onClick={() => getRoute("/movies")} to="/movies" className={route === "/movies" ? "nav-link active" : "nav-link"}>
          Search by Movie
        </Link>
        <Link onClick={() => getRoute("/tv")} to="/tv" className={route === "/tv" ? "nav-link active" : "nav-link"}>
          Search by TV Show
        </Link>
        <Link onClick={() => getRoute("/occasion")} to="/occasion" className={route === "/occasion" ? "nav-link active" : "nav-link"}>
          Search by Occasion
        </Link>
        <Link onClick={() => getRoute("/favorites")} to="/favorites" className={route === "/favorites" ? "nav-link active" : "nav-link"}>
          Your Favorites
        </Link>
      </div>
    </nav>
  )
}

export default Navbar