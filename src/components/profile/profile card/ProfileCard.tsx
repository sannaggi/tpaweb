import React from "react"
import PhotoHolder from "../PhotoHolder";
import {USERINFORMATION} from "../../Specification.js"
import "../../../css/profilepage/profileCard.css"

function ProfileCard(){
    return(
        <div className="profileCard">
            <PhotoHolder />
            <div>
                <b><a href="">Perbarui foto</a></b>
            </div>
            <div id="hr"></div>
            <div><b>{USERINFORMATION.FirstName} {USERINFORMATION.LastName}</b></div>
            <div>{USERINFORMATION.EmailAddress}</div>
            <div>{USERINFORMATION.PhoneNumber}</div>
        </div>
    )
}

export default ProfileCard