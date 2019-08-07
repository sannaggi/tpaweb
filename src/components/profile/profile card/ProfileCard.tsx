import React from "react"
import PhotoHolder from "../PhotoHolder";
import {USERINFORMATION} from "../../Specification.js"
import "../../../css/profileCard.css"
import { Link } from "react-router-dom";

function ProfileCard(){
    return(
        <div className="profileCard">
            <PhotoHolder />
            <div>
                <b><Link to="./">Perbarui foto</Link></b>
            </div>
            <div id="hr"></div>
            <div><b>{USERINFORMATION.FirstName} {USERINFORMATION.LastName}</b></div>
            <div>{USERINFORMATION.EmailAddress}</div>
            <div>{USERINFORMATION.PhoneNumber}</div>
        </div>
    )
}

export default ProfileCard