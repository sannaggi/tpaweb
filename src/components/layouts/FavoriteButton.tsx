import React from 'react'
import { connect } from 'react-redux';

function FavoriteButton({id, wishlists, isPlace} : {id: any, wishlists: any, isPlace: Boolean}) {

    function check(accomodation) {
        if(accomodation === null) return false;
        return accomodation.includes(id)
    }

    function isInWishlists() {
        let isInWishlists = false;
        for (const wishlist of wishlists) {
            if(isPlace) isInWishlists = check(wishlist.stays)
            else isInWishlists = check(wishlist.experiences)

            if(isInWishlists) break
        }

        return isInWishlists
    }

    function getHeart() {
        if(isInWishlists()) return <span className="red-heart" style={{color: "rgb(252, 60, 60)", fontSize: "25px"}}>&#10084;</span>
        return <React.Fragment>&#9825;</React.Fragment>
    }

    return (
        <div className="btnFavorite" style={{position: "absolute", top: "0px", right: "10px", fontSize: "30px"}}>
            {getHeart()}
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    wishlists: state.wishlist.items
})

export default connect(mapStateToProps, {})(FavoriteButton)
