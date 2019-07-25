import React, { useEffect } from "react"
import BannerImage from "./BannerImage";
import { connect } from 'react-redux';
import "../../css/place detail/placeDetail.css";
import { setCurrentPlace } from '../../actions/placeActions'
import {FacebookShareButton, EmailShareButton} from 'react-share';

function PlaceDetail({place, setCurrentPlace, match} : {place:any, setCurrentPlace:any, match:any}){

    useEffect(() => {
        setCurrentPlace(match.params.id);
    }, [setCurrentPlace, match.params.id])

    var images : any = []
    for(let i = 1; i <= 6; i++){
        var obj = {
            banner: <BannerImage url={"/images/places/" + place.id + "/" + i + ".jpg"} id={"id" + i} alt="uhuy"/>,
            key: "id" + i,
        }
        images.push(obj)
    }

    function clipBoard(){
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);dummy.value = window.location.href;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    return(
        <div className="placeDetail">
            <div id="btn">
                <div id="shareBtn">
                    <div className="shareChild" id="firstSC" onClick={clipBoard}></div>
                    <div className="shareChild" id="secondSC"><FacebookShareButton url={window.location.href}/></div>
                    <div className="shareChild" id="thirdSC"><EmailShareButton url={window.location.href} /></div>
                </div>
                <div id="saveBtn"></div>
            </div>
            <div className="placePhoto">
                {images.map((obj : any) => <div key={obj.key} id={obj.key} className="bannerImage"> {obj.banner}</div>)}
            
            </div>
            <div className="placeInformation">
                <div className="left">
                    <div id="name">{place.name}</div>
                    <div>14 guest • 7 bedrooms • 7 baths • ${place.price}/night</div>
                    <div>hosted by <strong>PewDiePie</strong></div>
                </div>
                <div className="right">
                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium mollitia quaerat dolore corrupti esse magnam vitae aperiam reprehenderit laborum quasi. Quos cumque provident, ipsam omnis autem blanditiis iusto praesentium pariatur. lor</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    place: state.places.item
})

export default connect(mapStateToProps, { setCurrentPlace })(PlaceDetail)