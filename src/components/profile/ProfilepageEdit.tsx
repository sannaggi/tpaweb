import React, { useEffect, useState } from "react"
import "../../css/profilepage/profilePageEdit.css"
export default function ProfilepageEdit({user, loggedUser} : {user: any, loggedUser: any}){
    
    useEffect(() => {
        if(user.id !== loggedUser.id) setAllEditInput()
    })
    const [inputData, setInputData] = useState(Object.assign({}, user))
    
    const handleChange = (e) => {
        let val = e.target.value
        let currInput = Object.assign({}, inputData)
        switch(e.target.id){
            case "firstName":
                currInput.firstname = val
                break
            case "lastName":
                currInput.lastname = val
                break
            case "emailAddress":
                currInput.email = val
                break
            case "genderSelect":
                currInput.gender = val
                break
            case "pNumber":
                currInput.phonenumber = val
                break
            case "birthDate":
                currInput.birthdate = val
                break
        }
        setInputData(currInput)
        let submit = document.getElementById("submitBtn")
        if(JSON.stringify(user) === JSON.stringify(currInput)) submit.setAttribute("disabled", "true")
        else submit.removeAttribute("disabled")
    }

    function onSubmit(e){
        e.preventDefault()
    }

    function getSubmit(){
        if(user.id !== loggedUser.id)
            return (
                ""
            )
        else return(
            <input type="submit" value="Save" disabled={true} id="submitBtn"/>
        )
    }

    function setAllEditInput(){
        document.querySelectorAll("#editForm input").forEach(e => {
            e.setAttribute("style", "pointer-events: none")
        })
        document.getElementById("gender").setAttribute("style", "pointer-events: none")
    }
    

    return (
        <form id="editForm" onSubmit={onSubmit}>
        <div id="profileEdit">
            <input type="text" defaultValue={user.description}/>
            <div className="hr"></div>
            <ul>
                <li className="inp">
                    <div className="name" id="firstName">
                        <input type="text" name="firstName" id="firstName" onChange={handleChange} defaultValue={user.firstname}/>
                        <div className="inpLabel">First Name</div>
                    </div>
                    <div className="name" id="lastName">
                        <input type="text" name="lastName" id="lastName" onChange={handleChange} defaultValue={user.lastname}/>
                        <div className="inpLabel">Last Name</div>
                    </div>
                </li>
                <li className="inp">
                    <div>
                        <input type="text" name="emailAddress" id="emailAddress" onChange={handleChange} defaultValue={user.email}/>
                        <div className="inpLabel" aria-hidden="true">Email Address</div>
                    </div>
                </li>
                <div id="setLeftRight">
                    <li className="inp" id="forLeft">
                        <div className="gpd" id="gender">
                            <select name="" id="genderSelect" onChange={handleChange} defaultValue={user.gender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <div className="inpLabel">Gender</div>
                        </div>
                        <div className="gpd" id="phoneNumber">
                            <input type="text" name="phoneNumber" id="pNumber" onChange={handleChange} defaultValue={user.phonenumber}/>
                            <div className="inpLabel">Phone Number</div>
                        </div>
                        <div className="gpd" id="dob">  
                            <input type="date" name="" id="birthDate" onChange={handleChange} defaultValue={user.birthdate}/>
                            <div className="inpLabel">Birthdate</div>
                        </div>
                    </li>
                </div>
                {getSubmit()}
            </ul>
        </div>
        </form>
    )
}