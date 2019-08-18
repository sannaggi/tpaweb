import { GET_ALL_WISHLISTS } from "./types";
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