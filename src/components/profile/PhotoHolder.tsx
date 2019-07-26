import React from "react"
import {PROFILEPHOTO} from "../Specification.js"
import "../../css/photoHolder/photoHolder.css"

function PhotoHolder(){
    return(
        <div className="photoHolder">
            <img src={PROFILEPHOTO} alt="Hai"/>
        </div>
    )
}

export default PhotoHolder