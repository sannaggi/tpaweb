import React from "react"
import "../../css/profilepage/profilepageInformation.css"
import {USERINFORMATION} from "../Specification.js"

export default function ProfilepageInformation(){
    return(
        <div id="userInformation">
            <div>{USERINFORMATION.Description}</div>
            <div className="hr"></div>
            <ul>
                <li className="setColumn">
                    <div className="name" id="firstName">
                        <div className="information">{USERINFORMATION.FirstName}</div>
                        <div className="label">First Name</div>
                    </div>
                    <div className="name" id="lastName">
                        <div className="information">{USERINFORMATION.LastName}</div>
                        <div className="label">Last Name</div>
                    </div>
                </li>
                <li>
                    <div>
                        <div className="information">{USERINFORMATION.EmailAddress}</div>
                        <div className="label">Email Address</div>
                    </div>
                </li>
                <div id="setLeftRight">
                    <li id="forLeft">
                        <div className="gpd" id="gender">
                            <div className="information">{USERINFORMATION.Gender}</div>
                            <div className="label">Gender</div>
                        </div>
                        <div className="gpd" id="phoneNumber">
                            <div className="information">{USERINFORMATION.PhoneNumber}</div>
                            <div className="label">Phone Number</div>
                        </div>
                        <div className="gpd" id="birthDate">
                            <div className="information">{USERINFORMATION.DoB}</div>
                            <div className="label">Birthdate</div>
                        </div>
                    </li>
                    <li id="forRight">
                        <div>
                            <div id="addressOut" className="information">{USERINFORMATION.Address}</div>
                            <div className="label">Address</div>
                        </div>
                    </li>
                </div>
            </ul>
        </div>
    )
}