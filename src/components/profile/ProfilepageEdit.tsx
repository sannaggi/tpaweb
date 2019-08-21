import React, { useEffect } from "react"
import "../../css/profilepage/profilePageEdit.css"
// import { user } from "../Specification.js";
export default function ProfilepageEdit({user/*, loggedUser*/} : {user: any, /*loggedUser: any*/}){
    const loggedUser = {}

    useEffect(() => {
        if(user === loggedUser) setAllEditInput()
    })
    
    function getSubmit(){
        return(
            <input type="submit" value=""/>
        )
    }

    function setAllEditInput(){
        document.querySelectorAll("#editForm input").forEach(e => {
            e.setAttribute("style", "pointer-events: none")
        })
        document.getElementById("gender").setAttribute("style", "pointer-events: none")
    }
    

    return (
        <form action="" id="editForm">
        <div id="profileEdit">
            <input type="text" defaultValue={user.description}/>
            <div className="hr"></div>
            <ul>
                <li className="inp">
                    <div className="name" id="firstName">
                        <input type="text" name="firstName" id="firstName" defaultValue={user.firstname}/>
                        <div className="inpLabel">First Name</div>
                    </div>
                    <div className="name" id="lastName">
                        <input type="text" name="lastName" id="lastName" defaultValue={user.lastname}/>
                        <div className="inpLabel">Last Name</div>
                    </div>
                </li>
                <li className="inp">
                    <div>
                        <input type="text" name="emailAddress" id="emailAddress" defaultValue={user.email}/>
                        <div className="inpLabel" aria-hidden="true">Email Address</div>
                    </div>
                </li>
                <div id="setLeftRight">
                    <li className="inp" id="forLeft">
                        <div className="gpd" id="gender">
                            <select name="" id="genderSelect" defaultValue={user.gender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <div className="inpLabel">Gender</div>
                        </div>
                        <div className="gpd" id="phoneNumber">
                            <input type="text" name="phoneNumber" id="pNumber" defaultValue={user.phonenumber}/>
                            <div className="inpLabel">Phone Number</div>
                        </div>
                        <div className="gpd" id="dob">  
                            <input type="date" name="" id="birthDate" defaultValue={user.birthdate}/>
                            <div className="inpLabel">Birthdate</div>
                        </div>
                    </li>
                </div>
            </ul>
        </div>
        </form>
    )
}