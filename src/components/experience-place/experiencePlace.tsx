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
import ExperienceHost from "./ExperienceHost";

// const AnyReactComponent = ({ text }) => <div>{text}</div>
import ImagesNavigation from "../reusable/ImagesNavigation";
import { Link } from "react-router-dom";
import BannerImage from "../place detail/BannerImage";

function ExperiencePlace({ setCurrentExperience, match, experience } : { setCurrentExperience: any, match: any, experience: any }){
    // var storiesRef
    useEffect(() => {
        setCurrentExperience(match.params.id)
    }, [setCurrentExperience, match.params.id])

    var perPage = 5
    const [sentComments, setsentComments] = useState([])
    const [commentSection, setCommentSection] = useState()

    useEffect(() => {
        if(experience.rating === undefined) return
        setsentComments(experience.rating.slice(0, 1 * perPage + perPage))
        setCommentSection(true)
        
    }, [experience.rating, setsentComments, perPage])
    
    var stories = []
    var greenStar = {
        width: "calc(20px * " + experience.averagerating + ")",
        overflow: "hidden",
    }

    const storyRef = React.createRef<Stories>()

    function getStories(){
        if(experience.rating === undefined) return (<div></div>)
        let story = experience.story
        story.forEach(e => {
            let isVideo = e.endsWith("webm")
            let obj;
            if(isVideo){
                obj = {
                    url: process.env.PUBLIC_URL + e,
                    type: 'video'
                }
            }
            else{
                obj = {
                    url: process.env.PUBLIC_URL + e,
                }
            }
            stories.push(obj)
        })
        return <Stories ref={storyRef} stories={stories} loop={true}/>
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
            <div key={amenity.type} className="amenity">
                <div className="title"><strong>{amenity.type}</strong></div>
                <div>{amenity.detail}</div>
            </div>
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

    //images/experiences/1/gallery
    
    const [fullImageSrc, setFullImageSrc] = useState("")
    const [gallery, setGallery] = useState([])
    const [images, setImages] = useState([])

    const handleImageClick = e => {
        setFullImageSrc(e.target.src)
    }

    function getRandomImage(){
        if(experience.gallery === undefined) return

        let images1 = []
        let img = experience.gallery.concat()
        let outImg = []
        for(let i = 0 ; i < 6; i++){
            let rand = (Math.random() * 10) % img.length
            let tem = img.splice(rand, 1)
            outImg.push(tem)
        }

        while(img.length > 0){
            let tem = img.splice(0, 1)
            outImg.push(tem.toString())
        }

        for(let i = 0 ; i < 6; i++){
            var obj = {
                imgNum: i,
                banner: <BannerImage handleImageClick={handleImageClick} url={outImg[i][0]} id={"id" + i} alt="uhuy"/>,
                key: "id" + i,
            }
            images1.push(obj)
        }
        
        return {
            images1,
            outImg
        }
    }

    function showImgNav(e){
        document.getElementById("imagesNavigation").setAttribute("style", "display: block")
        setTimeout(() => {
            document.getElementById("imgNavContent").setAttribute("style", "opacity: 1; transition: opacity 0.5s ease-in-out !important;")
            
        }, 150)
    }

    function getImages(){
        if(experience === undefined)return(<div></div>)
        return images.map((obj : any) => <div onClick={showImgNav} key={obj.key} id={obj.key} className="bannerImage"> {obj.banner}</div>)
    }

    const getNav = () => {
        if(gallery === [])return (<div></div>)
        return <ImagesNavigation handleImageClick={handleImageClick} fullImageSrc={fullImageSrc} images={gallery}/>
    }

    const getAllPhotos = () => {
        if(gallery === []) return ""
        return <Link to="#" onClick={showImgNav}>Show All Photos</Link>
    }

    useEffect(() => {
        if(experience.rating === undefined) return
        const obj = getRandomImage()
        setImages(obj.images1)
        setGallery(obj.outImg)
        setFullImageSrc(obj.outImg[0])
        // eslint-disable-next-line
    }, [experience])

    var storyPlaying = true
    const pausePlayClick = (e) => {
        if(storyPlaying){
            storyRef.current.pause(true)
            document.getElementById('stopBtn').setAttribute("style", "display: none")
            document.getElementById('playBtn').setAttribute("style", "display: block")
        }
        else{
            storyRef.current.play()
            document.getElementById('playBtn').setAttribute("style", "display: none")
            document.getElementById('stopBtn').setAttribute("style", "display: block")
        }
        storyPlaying = !storyPlaying
    }

    const getPausePlay = () => {
        if(experience.story === undefined) return ""
        return (
        <div id="pausePlay" onClick={pausePlayClick}>
            <div id="stopBtn">■</div>
            <div id="playBtn" style={{display: "none"}}>►</div>
        </div>
        )
    }

    return(
        <div id="expPlace">
            {getNav()}
            <Sharing id={experience.id} isPlace={true}/>
            <div id="expContainer">
                <div className="section" id="first-sec">
                    <div className="left">
                        <div id="storiess">
                            {getStories()}
                            {getPausePlay()}
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
                            <div className="info-profile">
                                <div className="left">
                                    <div className="info-sec-head">About your host</div>
                                    <div className="info-sec-desc">
                                        {experience.abouthost}
                                    </div>
                                </div>
                                <div className="right">
                                    <ExperienceHost id={experience.hostid}/>
                                </div>
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
                        <div>
                            {getImages()}
                            {/* <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                            <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                            <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                            <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                            <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/>
                            <img src="https://a0.muscache.com/im/pictures/f4cf0e67-5ccc-44f6-9b06-384aed09ad20.jpg?aki_policy=large" alt=""/> */}
                        </div>
                        {getAllPhotos()}
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