import React from 'react'
import "../../css/places/place.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function place({place, currency} : {place:any, currency:any}) {

    function getCurrency(price:any) {
        return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    }

    return (
        <Link to={"/places/" + place.id} target="_blank">
            <div className="placeContainer">
                <div className="sliderContainer"><img src="https://via.placeholder.com/150" alt=""/></div>
                <div className="placeDetailContainer">
                    {/* TODO red heart : &#10084; */}
                    <div className="btnFavorite">&#9825;</div>
                    <div className="upperDetail">
                        <h4>{place.category.toUpperCase()}</h4>
                        <h3>{place.name}</h3>
                        <div className="detail">4 guests &#183; 2 bedrooms &#183; 3 beds &#183; 1 shared bath</div>
                        <div className="detail">Amenities pos</div>
                    </div>
                    <div className="lowerDetail">
                            <span className="rating"><span>&#9733;</span><strong>{place.averagerating}</strong>({place.ratingcount})</span>
                            <span className="price">{getCurrency(place.price)}/night</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const mapStateToProps = (state: any) => ({
    currency: state.currency.item
})

export default connect(mapStateToProps, {})(place)
