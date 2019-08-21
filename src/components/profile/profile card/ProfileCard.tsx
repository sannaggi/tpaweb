import React from "react"
import PhotoHolder from "../PhotoHolder";
import {USERINFORMATION} from "../../Specification.js"
import "../../../css/profileCard.css"
import { Link } from "react-router-dom";

function ProfileCard({user}: {user: any}){
    return(
        <div className="profileCard">
            <PhotoHolder url={user.profileimage}/>
            <div>
                <b><Link to="./">Perbarui foto</Link></b>
            </div>
            <div id="hr"></div>
            <div><b>{user.firstname} {user.lastname}</b></div>
            <div>{user.email}</div>
            <div>{user.phonenumber}</div>
        </div>
    )
}

export default ProfileCard