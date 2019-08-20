import React from 'react'
import "../../css/places/place.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from './Slider'
import { setHoveredCard } from "../../actions/placeActions";
import FavoriteButton from "../layouts/FavoriteButton";

function place({place, currency, setHoveredCard} : {place:any, currency:any, setHoveredCard:Function}) {

    function getCurrency(price:any) {
        return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    }

    return (
        <div className="placeContainer" onMouseEnter={() => setHoveredCard(place.id)}>
            <div className="sliderContainer">
                <Slider images={place.images} id={place.id}/>
            </div>
            <Link to={"/places/" + place.id} target="_blank">
                <div className="placeDetailContainer">
                    <FavoriteButton id={place.id} isPlace={true}/>
                    <div className="upperDetail">
                        <h4>{place.category.toUpperCase()}</h4>
                        <h3>{place.name}</h3>
                        <div className="detail">{place.guests} guests &#183; {place.bedrooms} bedrooms &#183; {place.bedrooms} beds &#183; {place.baths} bath</div>
                        <div className="detail">Amenities pos</div>
                    </div>
                    <div className="lowerDetail">
                        <span className="rating"><span>&#9733;</span><strong>{place.averagerating}</strong>({place.ratingcount})</span>
                        <span className="price">{getCurrency(place.price)}/night</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    currency: state.currency.item
})

export default connect(mapStateToProps, { setHoveredCard })(place)
