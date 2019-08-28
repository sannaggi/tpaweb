import React, { useEffect, useState } from "react"
import BannerImage from "./BannerImage"
import { connect } from 'react-redux'
import "../../css/place detail/placeDetail.css"
import { setCurrentPlace } from '../../actions/placeActions'
import Sharing from "../reusable/sharing"
import StarReview from "../reusable/StarReview"
import ImagesNavigation from "../reusable/ImagesNavigation"

function PlaceDetail({place, setCurrentPlace, match} : {place:any, setCurrentPlace:any, match:any}){

    useEffect(() => {
        setCurrentPlace(match.params.id);
    }, [setCurrentPlace, match.params.id])

    const [fullImageSrc, setFullImageSrc] = useState("/images/places/" + place.id + "/1.jpg")

    useEffect(() => {
        if(place.images === undefined) return
        setFullImageSrc(place.images[0])
    }, [place])

    const handleImageClick = e => {
        // e.target.setAttribute("style", "opacity: 0; transition: opacity 0.15s ease-in-out")
        // setTimeout(() =>{
            setFullImageSrc(e.target.src)
            // e.target.setAttribute("style", "opacity: 1; transition: opacity 0.15s ease-in-out")
        // }, 150)
    }

    var images : any = []
    for(let i = 1; i <= 6; i++){
        var obj = {
            imgNum: i,
            banner: <BannerImage handleImageClick={handleImageClick} url={"/images/places/" + place.id + "/" + i + ".jpg"} id={"id" + i} alt="uhuy"/>,
            key: "id" + i,
        }
        images.push(obj)
    }

    function showImgNav(e){
        document.getElementById("imagesNavigation").setAttribute("style", "display: block")
        setTimeout(() => {
            document.getElementById("imgNavContent").setAttribute("style", "opacity: 1; transition: opacity 0.5s ease-in-out !important;")
            
        }, 150)
    }

    function getImages(){
        if(place === undefined) return(<div></div>)
        return images.map((obj : any) => <div onClick={showImgNav} key={obj.key} id={obj.key} className="bannerImage"> {obj.banner}</div>)
    }

    var greenStar = {
        width: "calc(10px * " + place.averagerating + ")",
        overflow: "hidden",
    }

    const getNav = () => {
        if(place.images === undefined) return <div></div>
        return (<ImagesNavigation handleImageClick={handleImageClick} fullImageSrc={fullImageSrc} images={place.images}/>)
    }

    const getShowBtn = () => {
        if(place.images === undefined) return ""
        return <button id="viewPhotosBtn" onClick={showImgNav}>View Photos</button>
    }

    return(
        <div className="placeDetail">
            {getNav()}
            <Sharing />
            <div className="placePhoto">
                {getImages()}
                {getShowBtn()}
            </div>
            <div className="placeInformation">
                <div className="left">
                    <div>
                        <div id="name">{place.name}</div>
                        <div>{place.guests} guest • {place.bedrooms} bedrooms • {place.baths} baths</div>
                        <div>hosted by <strong>PewDiePie</strong></div>
                    </div>
                    <div id="detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium mollitia quaerat dolore corrupti esse magnam vitae aperiam reprehenderit laborum quasi. Quos cumque provident, ipsam omnis autem blanditiis iusto praesentium pariatur. lor</div>
                </div>
                <div className="right">
                    <div className="booking">
                        <div>
                            <div className="price"><div id="price">${place.price}</div><div>/night</div></div>
                            <StarReview greenStar={greenStar} />
                        </div>
                        <div className="hr"></div>
                        <div id="checkinout">
                            <div id="checkin">Check-in
                                <div className="inputDate">
                                    <input type="date" name="" id=""/>
                                </div>
                            </div>
                            <div id="checkout">Check-out
                                <div className="inputDate">
                                    <input type="date" name="" id=""/>
                                </div>
                            </div>
                        </div>
                        <div id="reserveBtn">Reserve</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    place: state.places.item
})

export default connect(mapStateToProps, { setCurrentPlace })(PlaceDetail)