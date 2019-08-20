import React, { useState, useEffect } from "react";
import Sharing from "../reusable/sharing";
import "../../css/experience-place/experiencePlace.css";
import GoogleMapReact from "google-map-react";
import Stories from 'react-insta-stories'
import StarReview from "../reusable/StarReview";
import ReactPaginate from "react-paginate";
import GuestComment from "../reusable/GuestComment";
import { connect } from "react-redux";
import { setCurrentExperience } from "../../actions/experienceActions";

// const AnyReactComponent = ({ text }) => <div>{text}</div>

function ExperiencePlace({ setCurrentExperience, match, experience } : { setCurrentExperience: any, match: any, experience: any }){

    useEffect(() => {
        setCurrentExperience(match.params.id)
    }, [setCurrentExperience, match.params.id])

    var perPage = 5
    // var fetchComment = [
    //     {comment: "This place is fucking awesome"},
    //     {comment: "This place is fucking awesome"},
    //     {comment: "This place is fucking awesome"},
    //     {comment: "This place is fucking awesome"},
    //     {comment: "This place is fucking awesome"},
    //     {comment: "This place is fucking great"},
    //     {comment: "This place is fucking great"},
    //     {comment: "This place is fucking great"},
    //     {comment: "This place is fucking great"},
    //     {comment: "This place is fucking great"},
    //     {comment: "This place is fucking cool"},
    //     {comment: "This place is fucking cool"},
    //     {comment: "This place is fucking cool"},
    //     {comment: "This place is fucking cool"},
    //     {comment: "This place is fucking cool"},
    // ]
    const [sentComments, setsentComments] = useState([])
    const [commentSection, setCommentSection] = useState()

    useEffect(() => {
        if(experience.rating === undefined) return
        setsentComments(experience.rating.slice(0, 1 * perPage + perPage))
        setCommentSection(true)
    }, [experience.rating, setsentComments, perPage])
    
    const stories = [{ url: 'https://picsum.photos/1080/1920' }, { url: 'https://fsa.zobj.net/crop.php?r=dyJ08vhfPsUL3UkJ2aFaLo1LK5lhjA_5o6qEmWe7CW6P4bdk5Se2tYqxc8M3tcgYCwKp0IAyf0cmw9yCmOviFYb5JteeZgYClrug_bvSGgQxKGEUjH9H3s7PS9fQa3rpK3DN3nx-qA-mf6XN' }, { url: 'https://media.idownloadblog.com/wp-content/uploads/2016/04/iPhone-wallpaper-abstract-portrait-stars-macinmac.jpg' }, { url: 'https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4', type: 'video', duration: 1000 }, { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', type: 'video'}, { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', type: 'video' }, 'https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80']
    var greenStar = {
        width: "calc(20px * " + experience.averagerating + ")",
        overflow: "hidden",
    }

    function handlePageChange(data){
        setsentComments(experience.rating.slice(data.selected * perPage, data.selected * perPage + perPage))
    }

    function getTopAmenities() {
        if(experience.amenities === undefined) return
        let amenities = ""
        let first = true
        for (let index = 0; index < (experience.amenities.length > 3 ? 3 : experience.amenities.length); index++) {
            const e = experience.amenities[index].type;
            if(first) {
                first = false;
                amenities += e
            } else amenities += ", " + e
        }
        return amenities
    }

    function getLanguages() {
        if(experience.languages === undefined) return
        let languages = ""
        let first = true;
        for (let index = 0; index < experience.languages.length; index++) {
            const e = experience.languages[index];
            if(first) {
                first = false;
                languages += e
            } else languages += ", " + e
        }
        return languages
    }

    function getAmenities() {
        if(experience.amenities === undefined) return
        return experience.amenities.map((amenity:any) => (
            <React.Fragment key={amenity.type}>
                <div>{amenity.type}</div>
                <div>{amenity.detail}</div>
            </React.Fragment>
        ))
    }

    function getRequirements() {
        if(experience.requirement === undefined) return
        return experience.requirement.map((requirement:any) => (
            <React.Fragment key={requirement}>
                <div>{requirement}</div>
            </React.Fragment>
        ))
    }

    function getCommentSection() {
        if(commentSection) {
            return <React.Fragment>
                <GuestComment comments={sentComments} viewStar={true}/>
                <ReactPaginate
                    onPageChange={handlePageChange}
                    pageCount={experience.rating.length / perPage}
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

    return(
        <div id="expPlace">
            <Sharing />
            <div id="expContainer">
                <div className="section" id="first-sec">
                    <div className="left">
                        <div>
                            <Stories 
                                stories={stories}
                                defaultInterval={8000}
                                loop={true}
                            />
                        </div>
                    </div>
                    <div className="right">
                        <div id="expCategory">
                            {experience.category}
                        </div>
                        <div id="expName">
                            {experience.name}
                        </div>
                        <div id="expBasicInfo">
                            <div>{experience.geolocation}</div>
                            <div>{experience.duration} hours total</div>
                            <div>{getTopAmenities()}</div>
                            <div>Offered in {getLanguages()}</div>
                        </div>
                        <div className="hr"></div>
                        <div className="info-sec">
                            <div className="left">
                                <div className="info-sec-head">About your host</div>
                                <div className="info-sec-desc">
                                    {experience.abouthost}
                                </div>
                            </div>
                            <div className="right">

                            </div>
                        </div>
                        <div className="hr"></div>
                        <div className="info-sec">
                            <div className="left">
                                <div className="info-sec-head">What we'll do</div>
                                <div className="info-sec-desc">
                                    {experience.detail}
                                </div>
                            </div>
                            <div className="right">

                            </div>
                        </div>
                        <div className="hr"></div>
                        <div className="info-sec">
                            <div className="left">
                                <div className="info-sec-head">What I'll provide</div>
                                <div className="info-sec-desc">
                                    {getAmenities()}
                                </div>
                            </div>
                            <div className="right">

                            </div>
                        </div>
                        <div className="hr"></div>
                        <div className="info-sec">
                            <div className="left">
                                <div className="info-sec-head">What to bring</div>
                                <div className="info-sec-desc">
                                    {getRequirements()}
                                </div>
                            </div>
                            <div className="right">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="section" id="second-sec">
                    <div className="left">
                        <div className="section-head">Guest photos</div>
                    </div>
                    <div className="right">
                        <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                        <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                        <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                        <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                        <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                        <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                    </div>
                </div>
                <div className="section" id="section-reviews">
                    <div className="left">
                        <div className="section-head">Guest reviews</div>
                        <div id="rating">{experience.averagerating}<StarReview greenStar={greenStar}/></div>
                    </div>
                    <div className="right">
                        {getCommentSection()}
                    </div>
                </div>
                <div className="section">
                    <div className="left">
                        <div className="section-head">Where you'll be</div>
                    </div>
                    <div className="right">
                        World's 2nd oldest National Park - Royal National Park, NSW Figure 8 Pools Burning Palms Beach Wattamolla Lagoon and Beach Bald Hill Lookout Sea Cliff Bridge on the Grand Pacific Drive
                    </div>
                </div>
                <div className="section" style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        defaultCenter={{lat: 59.95  , lng: 30.33}}
                        defaultZoom={11}
                    >
                    </GoogleMapReact>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    experience: state.experiences.item,
})

export default connect(mapStateToProps, { setCurrentExperience })(ExperiencePlace)