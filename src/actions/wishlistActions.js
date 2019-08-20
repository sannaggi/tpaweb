import { GET_ALL_WISHLISTS, SET_CURRENT_WISHLIST, SET_ACTIVE_WISHLIST_MODAL } from "./types";
import axios from "axios";

export function getAllWishlists(id) {
    return function(dispatch) {
        axios.get(`https://aivbnbapi.herokuapp.com/api/wishlist/u/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(data => dispatch({
            type: GET_ALL_WISHLISTS,
            payload: data.data
        }))
    };
}

export function getWishlist(id) {
    return function (dispatch){
        axios.get("https://aivbnbapi.herokuapp.com/api/wishlist/" + id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(data => {
            dispatch({
                type: SET_CURRENT_WISHLIST,
                payload: data.data
            })
        })
    }
}

export function setActiveWishlistModal(data) {
    return function (dispatch){
        dispatch({
            type: SET_ACTIVE_WISHLIST_MODAL,
            payload: data
        })
    }
}