import React from 'react'
import '../../css/places/places.css'
import PlaceList from "./PlaceList";

function Places() {
    return (
        <main className="placesContainer">
            <div className="detail-container">
                <PlaceList />
            </div>
            <div className="map-container">
                <img src="https://via.placeholder.com/150" alt=""/>
            </div>
        </main>
    )
}

export default Places
