import React from "react"
import { Link } from "react-router-dom";
import '../../css/homepage/recomExp.css';
import { connect } from "react-redux";

function RecommendedExperienceCard({experience, currency} : {experience : any, currency:any}){

    function getStyle(experience:any) {
        return {
            backgroundImage : "url('" + experience.headerimage + "')"
        }
    }
    
    function getCurrency(price:any) {
        return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    }

    return (
        <Link to={"/experiences/" + experience.id} key={experience.id} target="_blank">
            <div className="expCard" key={experience.id}>
                <div className="cardImage" style={getStyle(experience)}></div>
                <div className="card-category">{experience.category.toUpperCase()} &#183; {experience.location.toUpperCase()}</div>
                <div className="card-name">{experience.name}</div>
                <div className="card-price">{getCurrency(experience.price)} /person</div>
                <div className="card-review"><span>{experience.averagerating}&#9733;</span> ({experience.totalrating})</div>
            </div>
        </Link>
    )
}

const mapStateToProps = (state:any) => ({
    currency: state.currency.item
})

export default connect(mapStateToProps, {})(RecommendedExperienceCard)