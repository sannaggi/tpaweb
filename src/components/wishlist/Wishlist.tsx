import React, {  } from 'react'
import EmptyWishlist from "./EmptyWishlist";
import '../../css/wishlist/wishlist.css'
import WishlistModal from "./WishlistModal";

function Wishlist() {

    function showModal() {
        document.getElementById("wishlistModal").setAttribute("style", "display: block")
    }

    return (
        <div className="wishlist-container">
            <div className="wishlist-header">
                <h2>Lists</h2>
                <button className="wish-button white-button" onClick={showModal}>Create a list</button>
            </div>
            <div className="wishlist-detail-container">
                <EmptyWishlist showModal={showModal}/>
            </div>
            <WishlistModal/>
        </div>
    )
}

export default Wishlist
