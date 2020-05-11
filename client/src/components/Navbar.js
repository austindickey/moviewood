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
        Logo {/* <img src={window.location.origin + "/img/bookstack.png"} alt="Logo"/> */}
      </a>
      <div className="navbar-nav">
        <Link onClick={() => getRoute("/")} to="/" className={route === "/" ? "nav-link active" : "nav-link"}>
          Home
        </Link>
        <Link onClick={() => getRoute("/indvfilm")} to="/indvfilm" className={route === "/indvfilm" ? "nav-link active" : "nav-link"}>
          Individual Film
        </Link>
      </div>
    </nav>
  )
}

export default Navbar