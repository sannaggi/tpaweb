import React from 'react'
import "../../css/places/place.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from './Slider'
import { setHoveredCard } from "../../actions/placeActions";
import FavoriteButton from "../layouts/FavoriteButton";
import { setActiveWishlistModal } from "../../actions/wishlistActions";

function place({place, currency, setHoveredCard, setActiveWishlistModal, user} : {user: any, place:any, currency:any, setHoveredCard:Function, setActiveWishlistModal: any}) {

    function getCurrency(price:any) {
        return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    }

    function onClick() {
        if(user.id === undefined) {
            document.getElementById("loginModal").setAttribute("style", "display: block")
            return
        }
        setActiveWishlistModal({
            id: place.id,
            isPlace: true
        })
        document.getElementById("favoriteModal").setAttribute("style", "display: block")
    }

    return (
        <div className="placeContainer" onMouseEnter={() => setHoveredCard(place.id)}>
            <div className="sliderContainer">
                <Slider images={place.images} id={place.id}/>
            </div>
            <div className="placeCardContainer">
                <FavoriteButton setIsInWishlist={() => {}} onClick={onClick} id={place.id} isPlace={true} forCard={true} wishlist={null}/>
                <Link to={"/places/" + place.id} target="_blank">
                        <div className="placeDetailContainer">
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
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    currency: state.currency.item,
    user: state.user.item
})

export default connect(mapStateToProps, { setHoveredCard, setActiveWishlistModal })(place)
