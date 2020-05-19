import React from 'react'
import { Link } from "react-router-dom"

export function Results({ children }) {
    return <div id="results">{children}</div>
}

export function SingleResult({
    movie,
    filmImg,
    title,
    btnText,
    btnClassNames,
    detailsClickFunc,
    dbClickFunc
}) {
    return (
        <div className="singleResult">
            <img src={filmImg} alt="Film Pic" />
            <h5>{title}</h5>
            <div className="buttonHolder">
                <button className={btnClassNames} onClick={dbClickFunc}>{btnText}</button>
                <Link onClick={detailsClickFunc} to="/singleFilm" className={"btn btn-danger viewDetails"}>
                    View Details
                </Link>
            </div>
        </div>
    )
}