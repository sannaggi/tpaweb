import React, { useEffect } from "react"
import BannerImage from "./BannerImage";
import { connect } from 'react-redux';
import "../../css/place detail/placeDetail.css";
import { setCurrentPlace } from '../../actions/placeActions'

function PlaceDetail({place, setCurrentPlace, match} : {place:any, setCurrentPlace:any, match:any}){

    useEffect(() => {
        setCurrentPlace(match.params.id);
    }, [setCurrentPlace, match.params.id])

    var images : any = []
    for(let i = 1; i <= 6; i++){
        var obj = {
            banner: <BannerImage url={"/images/places/" + place.id + "/" + i + ".jpg"} alt="uhuy"/>,
            key: "id" + i,
        }
        images.push(obj)
    }

    return(
        <div className="placeDetail">
            <div className="placePhoto">{images.map((obj : any) => <div key={obj.key} id={obj.key} className="bannerImage"> {obj.banner} </div>)} </div>
            <div className="placeInformation">
                <div className="left">
                    <div id="name">{place.name}</div>
                    <div>14 guest - 7 bedrooms - 7 baths</div>
                </div>
                <div className="right"></div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    place: state.places.item
})

export default connect(mapStateToProps, { setCurrentPlace })(PlaceDetail)