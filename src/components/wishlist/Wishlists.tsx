import React from 'react'
import WishlistCard from "./WishlistCard";

function Wishlists({wishlists} : {wishlists: any}) {

    function getWishlists() {
        return wishlists.map((wishlist:any) => (
            <WishlistCard key={wishlist.id} wishlist={wishlist}/>
        ))
    }

    return (
        <div className="wishlists-container">
            <div className="wishHeader">
                <h3>Your lists</h3>
                <h3>{wishlists.length}</h3>
            </div>
            <div className="cardsContainer">
                {getWishlists()}
            </div>
        </div>
    )
}

export default Wishlists
