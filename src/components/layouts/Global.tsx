import React, { useEffect } from 'react'
import { decode } from "jsonwebtoken";
import { connect } from 'react-redux';
import { cookieLogin } from "../../actions/userActions";
import { getAllWishlists } from "../../actions/wishlistActions";
import WishlistModal from "../wishlist/WishlistModal";
import { setSocket } from "../../actions/userActions";
import io from "socket.io-client";

function Global({cookieLogin, getAllWishlists, user, setSocket} : {setSocket: any, cookieLogin: any, getAllWishlists: any, user: any}) {

    useEffect(() => {
        if(localStorage.getItem("aiv-token") === null) return

        const token: any = decode(localStorage.getItem("aiv-token"))
        cookieLogin(token.data.id)
    }, [cookieLogin, setSocket])
    
    useEffect(() => {
        if(user.id === undefined) return
        getAllWishlists(user.id)
    }, [getAllWishlists, user.id])

    useEffect(() => {
        if(user.id === undefined) return

        const port = process.env.PORT || 6969
        const url = "http://localhost:" + port
        const socket = io(url)
        setSocket(socket)
        
        socket.on('connect', () => {
            socket.emit('new user', user.id)
        })
    }, [user.id, setSocket])

    return (
        <React.Fragment>
            <WishlistModal/>
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    wishlists: state.wishlist.items,
    user: state.user.item
})

export default connect(mapStateToProps, { cookieLogin, getAllWishlists, setSocket })(Global)
