import React from "react"
import { Link } from "react-router-dom";
import '../../css/homepage/recomExp.css';

function RecommendedExperienceCard({experience} : {experience : any}){

    function getStyle(experience:any) {
        return {
            backgroundImage : "url('" + experience.headerimage + "')"
        }
    }

    return (
        <Link to={"/experiences/" + experience.id} key={experience.id} target="_blank">
            <div className="expCard" key={experience.id}>
                <div className="cardImage" style={getStyle(experience)}></div>
                <div className="card-category">{experience.category.toUpperCase()} &#183; {experience.location.toUpperCase()}</div>
                <div className="card-name">{experience.name}</div>
                <div className="card-price">From ${experience.price}/person</div>
                <div className="card-review"><span>{experience.averagerating}&#9733;</span> ({experience.totalrating})</div>
            </div>
        </Link>
    )
}

export default RecommendedExperienceCard