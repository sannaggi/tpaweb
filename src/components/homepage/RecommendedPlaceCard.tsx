import React from "react"
import { Link } from "react-router-dom";
import { setCurrentPlace } from '../../actions/placeActions';
import { connect } from 'react-redux'

function RecommendedPlaceCard({place, setCurrentPlace} : {place: any, setCurrentPlace : any }){
    
    function onClick(){
        setCurrentPlace(place)
    }
    
    return(
        <div className="cards" key={place.id} onClick={onClick}>
            <Link to={"/places/" + place.id}>
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

export default connect(null, { setCurrentPlace })(RecommendedPlaceCard)