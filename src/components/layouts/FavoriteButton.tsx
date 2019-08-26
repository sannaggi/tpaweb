import React from 'react'
import { connect } from 'react-redux';

function FavoriteButton({setIsInWishlist, id, wishlists, isPlace, onClick, forCard, wishlist} : {setIsInWishlist: any, id: any, wishlists: any, isPlace: Boolean, onClick: any, forCard: Boolean, wishlist: any}) {

    function check(accomodation) {
        if(accomodation === null) return false;
        return accomodation.includes(id)
    }

    function checkWishlist(isInWishlists: any, wishlist: any) {
        if(isPlace) isInWishlists = check(wishlist.stays)
        else isInWishlists = check(wishlist.experiences)
        return isInWishlists
    }

    function isInWishlists() {
        if(!wishlists) return false

        let isInWishlists = false;
        for (const wishlist of wishlists) {
            isInWishlists = checkWishlist(isInWishlists, wishlist)
            if(isInWishlists) break
        }

        return isInWishlists
    }

    function getHeart() {
        if(forCard) {
            if(isInWishlists()) {
                setIsInWishlist(true)
                return <span className="red-heart" style={{color: "rgb(252, 60, 60)", fontSize: "25px"}}>&#10084;</span>
            }
            setIsInWishlist(false)
            return <React.Fragment>&#9825;</React.Fragment>
        }
        if(checkWishlist(false, wishlist)) {
            setIsInWishlist(true)
            return <span className="red-heart" style={{color: "rgb(252, 60, 60)", fontSize: "25px"}}>&#10084;</span>
        }
        setIsInWishlist(false)
        return <React.Fragment>&#9825;</React.Fragment>
    }

    return (
        <div className="btnFavorite" onClick={() => onClick()}>
            {getHeart()}
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    wishlists: state.wishlist.items
})

export default connect(mapStateToProps, {})(FavoriteButton)
