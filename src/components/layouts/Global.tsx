import React, { useEffect } from 'react'
import { decode } from "jsonwebtoken";
import { connect } from 'react-redux';
import { cookieLogin } from "../../actions/userActions";
import { getAllWishlists } from "../../actions/wishlistActions";

function Global({cookieLogin, getAllWishlists, user} : {cookieLogin: any, getAllWishlists: any, user: any}) {

    useEffect(() => {
        if(localStorage.getItem("aiv-token") === null) return
        const token: any = decode(localStorage.getItem("aiv-token"))
        cookieLogin(token.data.id)
    }, [cookieLogin])
    
    useEffect(() => {
        if(user.id === undefined) return
        getAllWishlists(user.id)
    }, [getAllWishlists, user.id])

    return (
        <React.Fragment></React.Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    wishlists: state.wishlist.items,
    user: state.user.item
})

export default connect(mapStateToProps, { cookieLogin, getAllWishlists })(Global)
