import React from "react"
import ProfileCard from "./profile card/ProfileCard";
import "../../css/profilepage/profilePage.css"
import { USERINFORMATION } from "../Specification";
import { Route } from "react-router";
import ProfilepageEdit from "./ProfilepageEdit";
import ProfilepageInformation from "./ProfilepageInformation";

export default function Profilepage(){
    return (
        <div className="profilePage">
            <div id="divCard"><ProfileCard /></div>
            <div id="profileInformation">
                <h1 id="fullName">Hi! {USERINFORMATION.FirstName} {USERINFORMATION.LastName}</h1>
                <ProfilepageEdit />
            </div>
        </div>
    )
}