import React from "react"
import ProfileCard from "./profile card/ProfileCard";
import "../../css/profilepage/profilePage.css"
import { USERINFORMATION } from "../Specification";

export default function Profilepage(){
    return (
        <main>
            <div className="profilePage">
                <div><ProfileCard /></div>
                <div id="profileInformation">
                    <h1>Hi! {USERINFORMATION.FirstName} {USERINFORMATION.LastName}</h1>
                </div>
            </div>
        </main>
    )
}