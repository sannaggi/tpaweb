import React from "react"
import {USERINFORMATION} from "../Specification.js"
import "../../css/profilepage/profilepageInformation.css"

export default function ProfilepageInformation(){
    return(
        <div id="profileInformation">
            <div>{USERINFORMATION.Description}</div>
            <div className="hr"></div>
            <ul>
                <li>
                    <div className="name">
                        <div className="information">{USERINFORMATION.FirstName}</div>
                        <div className="label">First Name</div>
                    </div>
                    <div className="name">
                        <div className="information">{USERINFORMATION.LastName}</div>
                        <div className="label">Last Name</div>
                    </div>
                </li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}