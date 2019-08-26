import React from 'react'
import { Link } from "react-router-dom";
import FavoriteButton from "../layouts/FavoriteButton";
import { connect } from 'react-redux';
import '../../css/experiences/experienceCard.css'
import { setActiveWishlistModal } from "../../actions/wishlistActions";

function ExperienceCard({experience, currency, setActiveWishlistModal, user} : {user: any, experience: any, currency: any, setActiveWishlistModal: any}) {
    
    function getCurrency(price:any) {
        return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    }
    
    function getAmenities(amenities) {
        let str = amenities[0].type;
        if(amenities[1].type !== undefined) str += ", " + amenities[1].type;
        return str
    }

    function onClick() {
        if(user.id === undefined) {
            document.getElementById("loginModal").setAttribute("style", "display: block")
            return
        }
        setActiveWishlistModal({
            id: experience.id,
            isPlace: false
        })
        document.getElementById("favoriteModal").setAttribute("style", "display: block")
    }

    return (
        <div className="experienceCardContainer">
            <FavoriteButton setIsInWishlist={() => {}} wishlist={null} onClick={onClick} id={experience.id} isPlace={false} forCard={true}/>
            <Link key={experience.id} to={`/experiences/${experience.id}`} target="_blank">
                <div className="experienceCard">
                    <div className="experience-image" style={{backgroundImage: "url(" + experience.headerimage + ")"}}></div>
                    <div className="card-title">{experience.name}</div>
                    <div className="card-category">From {getCurrency(experience.price)} /person &#183; {experience.duration} hours &#183; {getAmenities(experience.amenities)} included</div>
                    <div><span className="card-rating">{experience.averagerating}</span><span className="star">&#9733;</span><span className="card-review"> ({experience.totalrating})</span></div>
                </div>
            </Link>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    currency: state.currency.item,
    user: state.user.item
})

export default connect(mapStateToProps, {setActiveWishlistModal})(ExperienceCard)
