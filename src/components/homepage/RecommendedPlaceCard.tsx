import React from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import StarReview from "../reusable/StarReview";

function RecommendedPlaceCard({place, currency} : {place: any, currency:any}){
    
    function getCurrency(price:any) {
        return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    }
    
    var greenStar = {
        width: "calc(10px * " + place.averagerating + ")",
        overflow: "hidden",
    }

    return(
        <div className="placeCard" key={place.id}>
            <Link to={"/places/" + place.id}>
                <img src={place.images[0]} alt=""/>
                <br/>
                <div className="card-category">{place.category.toUpperCase()}</div>
                <div className="card-name">{place.name}</div>
                <div className="card-price">{getCurrency(place.price)}/night</div>
                <div className="card-review"><span><StarReview greenStar={greenStar}/></span><strong>{place.averagerating}</strong>({place.ratingcount}) - NoobHost</div>
            </Link>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    currency: state.currency.item
})

export default connect(mapStateToProps, {})(RecommendedPlaceCard)