import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchRecomExperience } from '../../actions/experienceActions'
import '../../css/homepage/recomExp.css'
import { Link } from "react-router-dom";
import RecommendedExperienceCard from './RecommendedExperienceCard';

function RecommendedExperience({experiences, fetchRecomExperience, currency} : {experiences:Array<Object>, fetchRecomExperience:any, currency:any}) {
    
    useEffect(() => {
        fetchRecomExperience()
    }, [fetchRecomExperience])


    // function getCurrency(price:any) {
    //     return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    // }

    return (
        <div className="recomContainer">
            <div className="recomTitleContainer">
                <Link to="/experiences">
                    <h2>Top rated experiences</h2>
                    <p>Book activities led by local hosts on your next trip</p>
                </Link>
            </div>
            <div className="cardsContainer expContainer">
                {experiences.map((experience:any) => (
                    <RecommendedExperienceCard key={experience.id} experience={experience}/>
                ))}
            </div>
            <Link to='/experiences' className="showMore">Show all Aivbnb experiences ></Link>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    experiences: state.experiences.items,
    currency: state.currency.item
})

export default connect(mapStateToProps, { fetchRecomExperience })(RecommendedExperience)