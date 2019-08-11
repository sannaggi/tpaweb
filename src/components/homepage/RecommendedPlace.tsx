import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAllPlace } from '../../actions/placeActions'
import { Link } from "react-router-dom";
import '../../css/homepage/recommendation.css'
import RecommendedPlaceCard from './RecommendedPlaceCard';

function RecommendedPlace({places, fetchAllPlace} : {places:any, fetchAllPlace:any}) {

    useEffect(() => {
        fetchAllPlace()
    }, [fetchAllPlace])

    return (            
        <div className="recomContainer place">
            <h2>Recommended place to stay</h2>
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
    places: state.places.items
})

export default connect(mapStateToProps, { fetchAllPlace })(RecommendedPlace)
