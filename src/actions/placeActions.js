import { FETCH_ALL_PLACE } from "./types";
import axios from 'axios'

async function takeData(data) {
    return new Promise((resolve) => {
        resolve(data.data);
    })
}

export function fetchAllPlace() {
    return function (dispatch) {
        axios.get("https://aivbnbapi.herokuapp.com/api/places", {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(takeData)
        .then(data => dispatch({
            type: FETCH_ALL_PLACE,
            payload: data
        }))
    }
}