import React, { useEffect } from "react"
import ProfileCard from "./profile card/ProfileCard";
import "../../css/profilepage/profilePage.css"
import { USERINFORMATION } from "../Specification";
import ProfilepageEdit from "./ProfilepageEdit";
import { setUserProfile } from "../../actions/userActions";
import { connect } from 'react-redux';

function Profilepage({userProfile, setUserProfile, match} : {userProfile: any, setUserProfile: any, match: any}){
    
    useEffect(() => {
        setUserProfile(match.params.id)
    }, [setUserProfile, match.params.id])

    function userProfileRender(){
        if(userProfile.firstname === undefined){
            return(
                " "
            )
        }
        else{
            console.log(userProfile)
            return(
                "" + userProfile.firstname + " " + userProfile.lastname
            )
        }
    }

    function userInformation(){
        if(userProfile.firstname === undefined){
            return(
                <div></div>
            )
        }
        else{
            return(
                <ProfilepageEdit user={userProfile}/>
            )
        }
    }

    function getProfileCard(){if(userProfile.firstname === undefined){
        return(
                <div></div>
            )
        }
        else{
            return(
                <ProfileCard user={userProfile}/>
            )
        }
    }

    return (
        <div className="profilePage">
            <div id="divCard">{getProfileCard()}</div>
            <div id="profileInformation">
                <h1 id="fullName">Hi! {userProfileRender()}</h1>
                {userInformation()}
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    userProfile: state.user.userProfile
})

export default connect(
  mapStateToProps, {setUserProfile}
)(Profilepage);