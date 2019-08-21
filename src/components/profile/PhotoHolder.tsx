import React from "react"
import {PROFILEPHOTO} from "../Specification.js"
import "../../css/photoHolder/photoHolder.css"

function PhotoHolder(props){
    return(
        <div className="photoHolder">
            {/* {props.url} */}
            <img src={props.url} alt="Hai"/>
        </div>
    )
}

export default PhotoHolder