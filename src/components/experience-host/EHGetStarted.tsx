import React, { useEffect } from "react"
import "../../css/experience-host/EHGetStarted.css";

export default function EHGetStarted(){

    useEffect(() => {
        document.getElementById("EHFirstStarted").setAttribute("style", "opacity: 0");
        document.getElementById("EHFirstStarted").setAttribute("style", "position: absolute");
        setInterval(function(){
            let obj = document.getElementById("EHGetStarted");
            if(obj !== null)
                obj.setAttribute("style", "opacity: 1");
        }, 750);
    })

    return(
        <div id="EHGetStarted">
            
        </div>
    )
}