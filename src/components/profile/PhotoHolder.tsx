import React from "react"
import "../../css/photoHolder/photoHolder.css"

function PhotoHolder(props){
    return(
        <div className="photoHolder">
            <img src={props.url} alt="Hai"/>
        </div>
    )
}

export default PhotoHolder