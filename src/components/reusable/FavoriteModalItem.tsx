import React, { useState } from 'react'
import FavoriteButton from "../layouts/FavoriteButton";
import { connect } from 'react-redux';
import axios from "axios";
import { getAllWishlists } from "../../actions/wishlistActions";

function FavoriteModalItem({wishlist, current, user, getAllWishlists} : {wishlist: any, current: any, user: any, getAllWishlists: any}) {

    const [isInWishlist, setIsInWishlist] = useState(false)

    function addToWishlist(data: any) {
        axios({
            url: `https://aivbnbapi.herokuapp.com/api/wishlist/${wishlist.id}`,
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(_ => getAllWishlists(user.id))
    }

    function removeFromWishlist(data: any) {
        axios({
            url: `https://aivbnbapi.herokuapp.com/api/wishlist/d/${wishlist.id}`,
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(_ => getAllWishlists(user.id))
    }

    function handleClick(toAdd: boolean) {
        let data = {
            id: current.id,
            isPlace: current.isPlace
        }
        if(toAdd) addToWishlist(data)
        else removeFromWishlist(data)
    }

    function onWishlistClick() {
        handleClick(!isInWishlist)
    }

    return (
        <div className="fav-wishlist-container" onClick={onWishlistClick} key={wishlist.id}>
            <div>{wishlist.name}</div>
            <div><FavoriteButton setIsInWishlist={setIsInWishlist} wishlist={wishlist} onClick={() => {}} id={current.id} isPlace={current.isPlace} forCard={false}/></div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    current: state.wishlist.active,
    user: state.user.item
})

export default connect(mapStateToProps, { getAllWishlists })(FavoriteModalItem)
