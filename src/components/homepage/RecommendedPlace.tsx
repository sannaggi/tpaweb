import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAllPlace } from '../../actions/placeActions'
import { Link } from 'react-router-dom'
import '../../css/homepage/recommendation.css'

function RecommendedPlace({places, fetchAllPlace} : {places:any, fetchAllPlace:any}) {

    useEffect(() => {
        fetchAllPlace()
    }, [fetchAllPlace])

    return (            
        <div className="recomContainer">
            <h2>Recommended place to stay</h2>
            <div className="cardsContainer">
                {places.map((place:any) => (
                    <div className="cards" key={place.name}>
                        <Link to={"/places/1"}>
                            <img src="https://via.placeholder.com/100x80" alt=""/>
                            <br/>
                            {place.category.toUpperCase()}
                            {/* {place.name} */}
                            {/* {place.price} */}
                            {/* {place.averagerating} */}
                            {/* {place.ratingcount} */}
                            {/* {place.hostid} */}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    places: state.places.items
})

export default connect(mapStateToProps, { fetchAllPlace })(RecommendedPlace)
