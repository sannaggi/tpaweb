import React from "react"
import BannerImage from "./BannerImage";
import "../../css/place detail/placeDetail.css";

export default function PlaceDetail(){
    var images : any = []
    for(let i = 1; i <= 6; i++){
        var obj = {
            banner: <BannerImage url={"/images/places/P0001/" + i + ".jpg"} alt="uhuy"/>,
            key: "id" + i,
        }
        images.push(obj)
    }

    return(
        <div className="placeDetail">
            <div className="placePhoto">{images.map((obj : any) => <div key={obj.key} id={obj.key} className="bannerImage"> {obj.banner} </div>)} </div>
        </div>
    )
}