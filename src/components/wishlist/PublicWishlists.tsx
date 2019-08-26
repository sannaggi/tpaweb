import React, { useState, useEffect } from 'react'
import WishlistCard from "./WishlistCard";
import axios from "axios";

function PublicWishlists() {

    const [wishlists, setwishlists] = useState([])

    useEffect(() => {
        axios.get("https://aivbnbapi.herokuapp.com/api/wishlist/public", {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(data => setwishlists(data.data))
    }, [])

    return (
        <div className="wishlists-container">
            <div className="wishHeader">
                <h3>Recommended for you</h3>
            </div>
            <div className="cardsContainer">
                {wishlists.map(wishlist => (
                    <WishlistCard wishlist={wishlist}/>
                ))}
            </div>
        </div>
    )
}

export default PublicWishlists
