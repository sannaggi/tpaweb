import React, { useState } from "react"
import PhotoHolder from "../PhotoHolder";
import "../../../css/profilepage/profileCard.css"
import { Link } from "react-router-dom";
import ImageEdit from "../../reusable/ImageEdit";
import { setEditedProfile } from "../../../actions/userActions";
import { connect } from "react-redux";

function ProfileCard({user, loggedUser, setEditedProfile} : {user: any, loggedUser: any, setEditedProfile: any}){
    
    const [profilePhoto, setProfilePhoto] = useState(getBiggerSize(user.profileimage))

    function getChangePhoto(){
        if(user.id !== loggedUser.id) return(
            ""
        )
        else return(
            <div onClick={() => {
                document.getElementById("imageEdit").setAttribute("style", "display: flex")
            }}>
                <b><Link to="#" >Perbarui foto</Link></b>
            </div>
        )
    }

    function getBiggerSize(url){
        let str = (url + "")
        if(str.search("s96-c") === -1) return str
        return (str.replace("s96-c", "s10000") + "")
    }

    const handleSaveChange = (img: any) => {
        let change = Object.assign({}, user)
        change.profileimage = img
        setEditedProfile(change)
        setProfilePhoto(img)
        
    }
    
    return(
        <div className="profileCard">
            <ImageEdit src={getBiggerSize(profilePhoto)} setProfilePhoto={handleSaveChange}/>
            <PhotoHolder url={profilePhoto}/>
            {getChangePhoto()}
            <div id="hr"></div>
            <div><b>{user.firstname} {user.lastname}</b></div>
            <div>{user.email}</div>
            <div>{user.phonenumber}</div>
        </div>
    )
}
export default connect(null, { setEditedProfile })(ProfileCard)