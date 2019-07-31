import React, { useEffect } from 'react'
import '../../css/experiences/experiences.css'
import { fetchAllExperiences } from "../../actions/experienceActions";
import { connect } from 'react-redux';
import FavoriteButton from "../layouts/FavoriteButton";

function Experiences({ experiences, fetchAllExperiences, currency } : { experiences:Array<any>, fetchAllExperiences:Function, currency:any }) {
    
    useEffect(() => {
        fetchAllExperiences();
    }, [fetchAllExperiences])

    function getCurrency(price:any) {
        return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    }

    function getAmenities(amenities) {
        let str = amenities[0].type;
        if(amenities[1].type !== undefined) str += ", " + amenities[1].type;
        return str
    }

    return (
        <div>
            <div className="filterBar">
                <button>Dates</button>
                <button>Guests</button>
                <button>Price</button>
                <button>Time of day</button>
                <button>Language offered</button>
            </div>
            <div className="experienceContainer">
                {experiences.map((experience) => (
                    <div key={experience.id} className="experienceCard">
                        <FavoriteButton />
                        <div className="experience-image" style={{backgroundImage: "url(" + experience.headerimage + ")"}}></div>
                        <div className="card-title">{experience.name}</div>
                        <div className="card-category">From {getCurrency(experience.price)}/person &#183; {experience.duration} hours &#183; {getAmenities(experience.amenities)} included</div>
                        <div><span className="card-rating">{experience.averagerating}</span><span className="star">&#9733;</span><span className="card-review"> ({experience.totalrating})</span></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    experiences: state.experiences.items,
    currency: state.currency.item
})

export default connect(mapStateToProps, { fetchAllExperiences })(Experiences)
