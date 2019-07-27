import React from "react"
import { Link } from "react-router-dom";

function RecommendedPlaceCard({place} : {place: any}){
    
    return(
        <div className="cards" key={place.id}>
            <Link to={"/places/" + place.id} target="_blank">
                <img src={place.images[0]} alt=""/>
                <br/>
                <div className="card-category">{place.category.toUpperCase()}</div>
                <div className="card-name">{place.name}</div>
                <div className="card-price">${place.price}/night</div>
                <div className="card-review"><span> &#9733;</span><strong>{place.averagerating}</strong>({place.ratingcount}) - NoobHost</div>
            </Link>
        </div>
    )
}

export default RecommendedPlaceCard