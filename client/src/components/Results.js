import React from 'react'
import { Link } from "react-router-dom"

export function Results({ resultsClass, children }) {
    return <div className={resultsClass}>{children}</div>
}

export function SingleResult({
    filmImg,
    title,
    year,
    dbBtnText,
    btnClassNames,
    detailsClickFunc,
    dbClickFunc
}) {
    return (
        <div className="singleResult">
            <img src={filmImg} alt="Film Pic" />
            <h5>{title}</h5>
            <p className="filmYear">({year})</p>
            <div className="buttonHolder">
                <button className={btnClassNames} onClick={dbClickFunc}>{dbBtnText}</button>
                <Link onClick={detailsClickFunc} to="/singleFilm" className={"btn btn-danger viewDetails"}>
                    View Details
                </Link>
            </div>
        </div>
    )
}