import React, { useEffect } from "react"
import BannerImage from "./BannerImage";
import { connect } from 'react-redux';
import "../../css/place detail/placeDetail.css";
import { setCurrentPlace } from '../../actions/placeActions'
import Sharing from "../reusable/sharing";
import StarReview from "../reusable/StarReview";

function PlaceDetail({place, setCurrentPlace, match} : {place:any, setCurrentPlace:any, match:any}){

    useEffect(() => {
        setCurrentPlace(match.params.id);
    }, [setCurrentPlace, match.params.id])

    var greenStar = {
        width: "calc(10px * " + place.averagerating + ")",
        overflow: "hidden",
    }

    var images : any = []
    for(let i = 1; i <= 6; i++){
        var obj = {
            banner: <BannerImage url={"/images/places/" + place.id + "/" + i + ".jpg"} id={"id" + i} alt="uhuy"/>,
            key: "id" + i,
        }
        images.push(obj)
    }

    return(
        <div className="placeDetail">
            <Sharing id={place.id} isPlace={true}/>
            <div className="placePhoto">
                {images.map((obj : any) => <div key={obj.key} id={obj.key} className="bannerImage"> {obj.banner}</div>)}
            </div>
            <div className="placeInformation">
                <div className="left">
                    <div>
                        <div id="name">{place.name}</div>
                        <div>14 guest • 7 bedrooms • 7 baths</div>
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