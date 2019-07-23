import React from "react"
import "../../css/profilepage/profilePageEdit.css"
import { USERINFORMATION } from "../Specification.js";

export default function ProfilepageEdit(){
    return (
        <div id="profileEdit">
            <input type="text" placeholder={USERINFORMATION.Description}/>
            <div className="hr"></div>
            <ul>
                <li className="inp">
                    <div className="name" id="firstName">
                        <input type="text" name="firstName" id="firstName" placeholder={USERINFORMATION.FirstName}/>
                        <div className="inpLabel">First Name</div>
                    </div>
                    <div className="name" id="lastName">
                        <input type="text" name="lastName" id="lastName" placeholder={USERINFORMATION.LastName}/>
                        <div className="inpLabel">Last Name</div>
                    </div>
                </li>
                <li className="inp">
                    <div>
                        <input type="text" name="emailAddress" id="emailAddress" placeholder={USERINFORMATION.EmailAddress}/>
                        <div className="inpLabel" aria-hidden="true">Email Address</div>
                    </div>
                </li>
                <li className="inp">
                    <div className="gpd" id="gender">
                        <select name="" id="" placeholder="Gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <div className="inpLabel">Gender</div>
                    </div>
                    <div className="gpd" id="phoneNumber">
                        <input type="text" name="phoneNumber" id="" placeholder={USERINFORMATION.PhoneNumber}/>
                        <div className="inpLabel">Phone Number</div>
                    </div>
                    <div className="gpd" id="dob">
                        <input type="date" name="" id="" defaultValue={USERINFORMATION.DoB}/>
                        <div className="inpLabel">Birthdate</div>
                    </div>
                </li>
                <li className="inp">
                    <div>
                        <textarea name="" id="address" placeholder={USERINFORMATION.Address}></textarea>
                        <div className="inpLabel">Address</div>
                    </div>
                </li>
            </ul>
        </div>
    )
}