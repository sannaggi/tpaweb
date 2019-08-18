import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

function WishlistCard({wishlist} : {wishlist: any}) {

    const [backgroundImage, setbackgroundImage] = useState("")

    function getBackground(type: string, id: string) {
        axios.get(`https://aivbnbapi.herokuapp.com/api/${type}/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(data => {
            setbackgroundImage(data.data.images[0])
        })
    }

    function getS(e) {       
        return (e.length !== 1)? "s" : ""
    }

    function getWishesCount() {
        let string = ""
        let hasBackground = false;
        if(wishlist.stays !== null) {
            string += wishlist.stays.length + " stay" + getS(wishlist.stays)
            getBackground("places", wishlist.stays[0])
            hasBackground = true;
        }
        if(wishlist.experiences !== null) {
            string += ((wishlist.stays !== null)? " &#183; " : "") + wishlist.experiences.length + " experience" + getS(wishlist.experiences)
            if(!hasBackground) getBackground("experiences", wishlist.experiences[0])
        }
        
        return string
    }

    return (
        <Link style={{backgroundImage: `url(${backgroundImage})`}} to={"/wishlist/" + wishlist.id} className="wishlistCard">
            <div className="cardDetail">
                <h4>{wishlist.name}</h4>
                <h4>{getWishesCount()}</h4>
            </div>
        </Link>
    )
}

export default WishlistCard 
