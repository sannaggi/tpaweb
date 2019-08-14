import React from 'react'

function EmptyWishlist({showModal} : {showModal: any}) {
    return (
        <div className="empty-container">
            <div className="empty-details">
                <h2>Save and share anything on Airbnb</h2>
                <p>Lists make it easy to find the perfect spot and plan a trip with others.</p>

                <button className="wish-button green-button" onClick={showModal}>Create a list</button>
            </div>
            <div className="empty-image"></div>
        </div>
    )
}

export default EmptyWishlist
