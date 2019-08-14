import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchRecommendedPlaces } from '../../actions/placeActions'
import { Link } from "react-router-dom";
import '../../css/homepage/recommendation.css'
import RecommendedPlaceCard from './RecommendedPlaceCard';

function RecommendedPlace({places, fetchRecommendedPlaces} : {places:any, fetchRecommendedPlaces:any}) {

    useEffect(() => {
        fetchRecommendedPlaces()
    }, [fetchRecommendedPlaces])

    return (            
        <div className="recomContainer place">
            <div className="recomTitle">
                <h2>Recommended place to stay</h2>
                <small>- Sorted by average star rating -</small>
            </div>
            <div className="cardsContainer">
                {places.map((place:any) => (
                    <RecommendedPlaceCard key={place.id} place={place} />
                ))}
            </div>
            <Link to='/places' className="showMore">Show all Aivbnb places ></Link>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    places: state.places.recommendation
})

export default connect(mapStateToProps, { fetchRecommendedPlaces })(RecommendedPlace)
