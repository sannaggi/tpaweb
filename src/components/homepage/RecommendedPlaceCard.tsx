import React from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function RecommendedPlaceCard({place, currency} : {place: any, currency:any}){
    
    function getCurrency(price:any) {
        return currency.icon + Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(price * currency.rate)
    }

    return(
        <div className="cards" key={place.id}>
            <Link to={"/places/" + place.id} target="_blank">
                <img src={place.images[0]} alt=""/>
                <br/>
                <div className="card-category">{place.category.toUpperCase()}</div>
                <div className="card-name">{place.name}</div>
                <div className="card-price">{getCurrency(place.price)}/night</div>
                <div className="card-review"><span> &#9733;</span><strong>{place.averagerating}</strong>({place.ratingcount}) - NoobHost</div>
            </Link>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    currency: state.currency.item
})

export default connect(mapStateToProps, {})(RecommendedPlaceCard)