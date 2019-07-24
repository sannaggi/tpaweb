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
                    <div className="cards" key={place.id}>
                        <Link to={"/places/" + place.id}>
                            <img src={place.images[0]} alt=""/>
                            <br/>
                            <div className="card-category">{place.category.toUpperCase()}</div>
                            <div className="card-name">{place.name}</div>
                            <div className="card-price">${place.price}/night</div>
                            <div className="card-review"><span> &#9733;</span><strong>{place.averagerating}</strong>({place.ratingcount}) - NoobHost</div>
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
