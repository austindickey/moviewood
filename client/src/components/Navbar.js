import React, { useState } from "react"
import { Link } from "react-router-dom"

function Navbar(props) {
  const [route, setRoute] = useState(window.location.pathname)

  function getRoute(name) {
    setRoute(name)
  }

  function logoutSubmit() {
    props.setState({
      username: "",
      isLoggedIn: null
    })
  }

  return (
    <nav className="navbar navbar-expand-lg">

      <a className="logo" href="/home">
        <img src={window.location.origin + "/img/logo.png"} alt="Logo"/>
      </a>

      <button className="navbar-toggler" data-toggle="collapse" data-target="#mobileDropdown">
        <i class="fas fa-bars"/>
      </button>
      
      <div className="collapse navbar-collapse" id="mobileDropdown">
        <ul className="navbar-nav">

          <li className="nav-item">
            <Link onClick={() => getRoute("/home")} to="/home" className={route === "/home" ? "nav-link active" : "nav-link"}>
              Home
            </Link>
          </li>

          <li className="nav-item">
            <span className="nav-link divider"/>
          </li>

          <li className="nav-item">
            <Link onClick={() => getRoute("/movies")} to="/movies" className={route === "/movies" ? "nav-link active" : "nav-link"}>
              Search by Movie
            </Link>
          </li>

          <li className="nav-item">
            <span className="nav-link divider"/>
          </li>

          <li className="nav-item">
            <Link onClick={() => getRoute("/tv")} to="/tv" className={route === "/tv" ? "nav-link active" : "nav-link"}>
              Search by TV Show
            </Link>
          </li>

          <li className="nav-item">
            <span className="nav-link divider"/>
          </li>

          <li className="nav-item">
            <Link onClick={() => getRoute("/features")} to="/features" className={route === "/features" ? "nav-link active" : "nav-link"}>
              Search by Features
            </Link>
          </li>

          <li className="nav-item">
            <span className="nav-link divider"/>
          </li>

          <li className="nav-item">
            <Link onClick={() => getRoute("/favorites")} to="/favorites" className={route === "/favorites" ? "nav-link active" : "nav-link"}>
              Your Favorites
            </Link>
          </li>

          <li className="nav-item">
            {!props.isLoggedIn ? (
              <div className="loggedInFalse"/>
            ) : (
              <div className="loggedInTrue">
                <div className="redLine"/>

                <span id="loggedInAs"><span>Logged in as:</span> &nbsp;{props.username}</span>
                <button className="btn btn-danger mb-2" id="logoutButton" onClick={() => logoutSubmit()}>Logout</button>
              </div>
            )}
          </li>

        </ul>
      </div>

    </nav>
  )
}

export default Navbar