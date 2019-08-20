import React, { useEffect, useState } from 'react'
import EmptyWishlist from "./EmptyWishlist";
import '../../css/wishlist/wishlist.css'
import WishlistModal from "./WishlistModal";
import { getAllWishlists } from "../../actions/wishlistActions";
import { connect } from 'react-redux';
import Wishlists from "./Wishlists";

function Wishlist({ wishlists, getAllWishlists, user } :  { wishlists: any, getAllWishlists: any, user: any }) {

    const [wishlistContent, setWishlistContent] = useState()

    function refreshWishlists() {
        getAllWishlists(user.id)
    }

    useEffect(() => {
        if(wishlists !== null && wishlists[0] !== undefined)
            setWishlistContent(<Wishlists wishlists={wishlists}/>)
        else
            setWishlistContent(<EmptyWishlist showModal={showModal}/>)
    }, [wishlists])

    function showModal() {
        document.getElementById("wishlistModal").setAttribute("style", "display: block")
    }

    return (
        <main className="wishlist-container">
            <div className="wishlist-header">
                <h2>Lists</h2>
                <button className="wish-button white-button" onClick={showModal}>Create a list</button>
            </div>
            <div className="wishlist-detail-container">
                {wishlistContent}
            </div>
            <WishlistModal refreshWishlists={refreshWishlists}/>
        </main>
    )
}

const mapStateToProps = (state: any) => ({
    wishlists: state.wishlist.items,
    user: state.user.item
})

export default connect(mapStateToProps, { getAllWishlists })(Wishlist)
