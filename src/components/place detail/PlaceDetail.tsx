import React, { useEffect } from "react"
import BannerImage from "./BannerImage";
import { connect } from 'react-redux';
import "../../css/place detail/placeDetail.css";
import { setCurrentPlace } from '../../actions/placeActions'
import {FacebookShareButton, EmailShareButton} from 'react-share';
import { timeout } from "q";

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
                            <div className="reviews">
                                <div id="star-container">
                                    <div className="star">
                                        <img src="data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' fill='%23D8D8D8'%3E%3Cpath d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z'/%3E%3C/svg%3E" alt=""/>
                                        <img src="data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' fill='%23D8D8D8'%3E%3Cpath d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z'/%3E%3C/svg%3E" alt=""/>
                                        <img src="data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' fill='%23D8D8D8'%3E%3Cpath d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z'/%3E%3C/svg%3E" alt=""/>
                                        <img src="data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' fill='%23D8D8D8'%3E%3Cpath d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z'/%3E%3C/svg%3E" alt=""/>
                                        <img src="data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' fill='%23D8D8D8'%3E%3Cpath d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z'/%3E%3C/svg%3E" alt=""/>
                                    </div>
                                    <div className="star" style={greenStar}>
                                        <img src="data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' fill='%23008489'%3E%3Cpath d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z'/%3E%3C/svg%3E" alt=""/>
                                        <img src="data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' fill='%23008489'%3E%3Cpath d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z'/%3E%3C/svg%3E" alt=""/>
                                        <img src="data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' fill='%23008489'%3E%3Cpath d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z'/%3E%3C/svg%3E" alt=""/>
                                        <img src="data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' fill='%23008489'%3E%3Cpath d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z'/%3E%3C/svg%3E" alt=""/>
                                        <img src="data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' fill='%23008489'%3E%3Cpath d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z'/%3E%3C/svg%3E" alt=""/>
                                    </div>
                                </div>
                            </div>
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