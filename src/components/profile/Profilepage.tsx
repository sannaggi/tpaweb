import React, { useEffect, useState } from "react"
import ProfileCard from "./profile card/ProfileCard";
import "../../css/profilepage/profilePage.css"
import ProfilepageEdit from "./ProfilepageEdit";
import { setUserProfile } from "../../actions/userActions";
import { connect } from 'react-redux';
import GuestComment from "../reusable/GuestComment";
import ReactPaginate from "react-paginate";
import StarReview from "../reusable/StarReview";

function Profilepage({user, userProfile, setUserProfile, match} : {user: any, userProfile: any, setUserProfile: any, match: any}){
    
    useEffect(() => {
        setUserProfile(match.params.id)
    }, [setUserProfile, match.params.id])

    function userProfileRender(){
        if(userProfile.firstname === undefined){
            return(
                ""
            )
        }
        else{
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
                <ProfilepageEdit user={userProfile} loggedUser={user}/>
            )
        }
    }

    function getProfileCard(){if(userProfile.firstname === undefined){
        return(
                ""
            )
        }
        else{
            return(
                <ProfileCard user={userProfile} loggedUser={user}/>
            )
        }
    }

    const [sentComments, setsentComments] = useState([])
    const perPage = 5

    function handlePageChange(data){
        setsentComments(userProfile.review.slice(data.selected * perPage, data.selected * perPage + perPage))

        if(data.selected * perPage + perPage >= userProfile.review.length)
            document.getElementsByClassName('next')[0].classList.add("disabled")
        else
        document.getElementsByClassName('next')[0].classList.remove("disabled")
    }
    const [commentSection, setCommentSection] = useState()

    useEffect(() => {
        if(userProfile.review === undefined || userProfile.review === null) return
        setsentComments(userProfile.review.slice(0, 1 * perPage + perPage))
        setCommentSection(true)
        
        setTimeout(() => {
            if(perPage >= userProfile.review.length)
                document.getElementsByClassName('next')[0].classList.add("disabled")
            else
            document.getElementsByClassName('next')[0].classList.remove("disabled")
        }, 1000)
    }, [userProfile.review, setsentComments, perPage])

    function getCommentSection() {
        if(commentSection) {
            return <React.Fragment>
                <GuestComment comments={sentComments} viewStar={true}/>
                <ReactPaginate
                    onPageChange={handlePageChange}
                    pageCount={userProfile.review.length / perPage}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </React.Fragment>
        }
    }
    
    function searchReview(e){
        let arr = []
        userProfile.review.forEach(el => {
            let rev = el.review + ""
            // if() arr.push(e)
            if(rev.split(e.target.value).length > 1) arr.push(el)
        })

        setsentComments(arr);
    }

    const avg = () => {
        if(userProfile.review === undefined || userProfile.review === null) return 0
        let i = 0
        userProfile.review.forEach(element => {
            i += element.rating
        });

        return i / userProfile.review.length
    }
    
    const calcGreenStar = () => {
        if(userProfile.review === undefined) return {
            width: "calc(20px * " + 0 + ")",
            overflow: "hidden",
        }

        return {
            width: "calc(20px * " + (avg() / 2) + ")",
            overflow: "hidden",
        }
    }

    function getReview(){
        if(userProfile.review === undefined) return (<div></div>)
        return (
            <div>
                {getCommentSection()}
                <div style={{marginTop: "1em"}}>
                    <div id="searchDiv">
                        <img src="/static/media/search-icon.1f703f7d.png" alt="" />
                        <input type="search" name="" id="reviewSearch" placeholder="Search Review" onChange={searchReview}/>
                    </div>
                </div>
            </div>
        )
    }

    const getReviewNum = () => {
        if(userProfile.firstname === undefined) return ""
        if(userProfile.review === null) return ""
        return userProfile.review.length
    }

    return (
        <div className="profilePage">
            <div id="profileHead">
                <div id="divCard">{getProfileCard()}</div>
                <div id="profileInformation">
                    <h1 id="fullName">Hi! {userProfileRender()}</h1>
                    {userInformation()}
                </div>
            </div>
            <div>
                <div className="l"></div>
                <div className="r">
                    <div>
                        <h1> {getReviewNum()} reviews</h1>
                        <div style={{display: "flex", alignItems: "center"}}> <div>{avg().toFixed(2)}</div> <div style={{width: "20px"}}><StarReview greenStar={calcGreenStar()}/></div> </div>
                    </div>
                    {getReview()}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    userProfile: state.user.userProfile,
    user: state.user.item,
    setUserProfile: setUserProfile
})

export default connect(
  mapStateToProps, {setUserProfile}
)(Profilepage);