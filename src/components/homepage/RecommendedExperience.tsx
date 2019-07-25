import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchRecomExperience } from '../../actions/experienceActions'
import '../../css/homepage/recomExp.css'
import { Link } from "react-router-dom";

function RecommendedExperience({experiences, fetchRecomExperience} : {experiences:Array<Object>, fetchRecomExperience:any}) {
    
    useEffect(() => {
        fetchRecomExperience()
    }, [fetchRecomExperience])

    function getStyle(experience:any) {
        return {
            backgroundImage : "url('" + experience.headerimage + "')"
        }
    }

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
                    <Link to={"/experiences/" + experience.id} target="_blank">
                        <div className="expCard" key={experience.id}>
                            <div className="cardImage" style={getStyle(experience)}></div>
                            <div className="card-category">{experience.category.toUpperCase()} &#183; {experience.location.toUpperCase()}</div>
                            <div className="card-name">{experience.name}</div>
                            <div className="card-price">From ${experience.price}/person</div>
                            <div className="card-review"><span>{experience.averagerating}&#9733;</span> ({experience.totalrating})</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    experiences: state.experiences.items
})

export default connect(mapStateToProps, { fetchRecomExperience })(RecommendedExperience)