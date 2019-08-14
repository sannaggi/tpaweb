import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchRecommendedExperience } from '../../actions/experienceActions'
import '../../css/homepage/recomExp.css'
import { Link } from "react-router-dom";
import RecommendedExperienceCard from './RecommendedExperienceCard';

function RecommendedExperience({experiences, fetchRecommendedExperience} : {experiences:Array<Object>, fetchRecommendedExperience:any}) {
    
    useEffect(() => {
        fetchRecommendedExperience()
    }, [fetchRecommendedExperience])

    return (
        <div className="recomContainer">
            <div className="recomTitleContainer">
                <Link to="/experiences">
                    <h2 style={{display: "inline"}}>Top rated experiences</h2><p style={{display: "inline"}}> - Book activities led by local hosts on your next trip</p>
                    <br/>
                    <small>- Sorted by average star rating -</small>
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
    experiences: state.experiences.recommended
})

export default connect(mapStateToProps, { fetchRecommendedExperience })(RecommendedExperience)