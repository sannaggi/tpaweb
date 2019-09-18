import React from "react"
import "../../css/experience-host/EHFirstStarted.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function EHFirstStarted({user}: {user: any}){
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
                <div><h1>Welcome {user.firstname} {user.lastname}!</h1></div>
                <div>    
                    We’re excited to learn about what you’d like to host on Airbnb.
                </div>
                <div>
                    In just a few minutes, you’ll start to create your own host page, then you’ll submit it to be reviewed by Aivbnb.
                </div>
                <div className="buttonContainer">
                    <div>
                        <Link to={"/become-host/experience-get-started"}>
                            <div className="nextBtn" onClick={onClick}>
                                Become an Experience Host!
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to={"/become-host/place-get-started"}>
                            <div className="nextBtn" onClick={onClick}>
                                Become an Place Host!
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="right">
                <img src="https://a0.muscache.com/pictures/fa546cb5-beea-4427-8af3-5b0c0efa00ee.jpg" alt=""/>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    user: state.user.item
})

export default connect(mapStateToProps, {})(EHFirstStarted)