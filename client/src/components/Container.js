import React from "react"

function Container(props) {
  return (
    <div className="contentHolder">
      <div className={`container${props.fluid ? "-fluid" : ""}`}>{props.children}</div>
    </div>
  )
}

export default Container