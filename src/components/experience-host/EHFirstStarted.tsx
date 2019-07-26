import React from "react"
import "../../css/experience-host/EHFirstStarted.css";
import { Link } from "react-router-dom";

export default function EHFirstStarted(){
    function onLoad(){
        document.getElementById("EHFirstStarted").setAttribute("style", "opacity: 1");
    }

    function onClick(){
        document.getElementById("EHFirstStarted").setAttribute("style", "opacity: 0;");
        // setTimeout(function(){
            document.getElementById("EHFirstStarted").setAttribute("style", "position:absolute; pointer-evets: none;");
        // }, 500);
    }

    return(
        <div id="EHFirstStarted" onLoad={onLoad}>
            <div className="left">
                <div><h1>Welcome [user.name]!</h1></div>
                <div>    
                    We’re excited to learn about the experience you’d like to host on Airbnb.
                </div>
                <div>
                    In just a few minutes, you’ll start to create your experience page, then you’ll submit it to be reviewed by Aivbnb.
                </div>
                <div>
                    <Link to={"/experience-host/get-started"}>
                        <div className="nextBtn" onClick={onClick}>
                            Get started!
                        </div>
                    </Link>
                </div>
            </div>
            <div className="right">
                <img src="https://a0.muscache.com/pictures/fa546cb5-beea-4427-8af3-5b0c0efa00ee.jpg" alt=""/>
            </div>
        </div>
    )
}