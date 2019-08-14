import React from "react"
import "../../css/profilepage/profilePageEdit.css"
import { USERINFORMATION } from "../Specification.js";

export default function ProfilepageEdit(){
    return (
        <div id="profileEdit">
            <input type="text" defaultValue={USERINFORMATION.Description}/>
            <div className="hr"></div>
            <ul>
                <li className="inp">
                    <div className="name" id="firstName">
                        <input type="text" name="firstName" id="firstName" defaultValue={USERINFORMATION.FirstName}/>
                        <div className="inpLabel">First Name</div>
                    </div>
                    <div className="name" id="lastName">
                        <input type="text" name="lastName" id="lastName" defaultValue={USERINFORMATION.LastName}/>
                        <div className="inpLabel">Last Name</div>
                    </div>
                </li>
                <li className="inp">
                    <div>
                        <input type="text" name="emailAddress" id="emailAddress" defaultValue={USERINFORMATION.EmailAddress}/>
                        <div className="inpLabel" aria-hidden="true">Email Address</div>
                    </div>
                </li>
                <div id="setLeftRight">
                    <li className="inp" id="forLeft">
                        <div className="gpd" id="gender">
                            <select name="" id="" defaultValue="Gender">
                                <option defaultValue="Male">Male</option>
                                <option defaultValue="Female">Female</option>
                            </select>
                            <div className="inpLabel">Gender</div>
                        </div>
                        <div className="gpd" id="phoneNumber">
                            <input type="text" name="phoneNumber" id="" defaultValue={USERINFORMATION.PhoneNumber}/>
                            <div className="inpLabel">Phone Number</div>
                        </div>
                        <div className="gpd" id="dob">  
                            <input type="date" name="" id="birthDate" defaultValue={USERINFORMATION.DoB}/>
                            <div className="inpLabel">Birthdate</div>
                        </div>
                    </li>
                    <li className="inp" id="forRight">
                        <div>
                            <textarea name="" id="address" defaultValue={USERINFORMATION.Address}></textarea>
                            <div className="inpLabel">Address</div>
                        </div>
                    </li>
                </div>
            </ul>
        </div>
    )
}