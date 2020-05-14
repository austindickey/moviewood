import React from 'react'

export function Results({ children }) {
    return <div id="results">{children}</div>
}

export function SingleResult({
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
                <button className={"btn btn-danger viewDetails"} onClick={detailsClickFunc}>View Details</button>
            </div>
        </div>
    )
}