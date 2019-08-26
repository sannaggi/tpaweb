import React, { useEffect, useState } from 'react'
import EmptyWishlist from "./EmptyWishlist";
import '../../css/wishlist/wishlist.css'
import { getAllWishlists } from "../../actions/wishlistActions";
import { connect } from 'react-redux';
import Wishlists from "./Wishlists";
import PublicWishlists from "./PublicWishlists";

function Wishlist({ wishlists} :  { wishlists: any}) {

    const [wishlistContent, setWishlistContent] = useState()

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
            <div className="wishlist-detail-container">
                <PublicWishlists />
            </div>
        </main>
    )
}

const mapStateToProps = (state: any) => ({
    wishlists: state.wishlist.items,
})

export default connect(mapStateToProps, { getAllWishlists })(Wishlist)
