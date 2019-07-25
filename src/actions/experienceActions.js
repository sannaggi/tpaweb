import { FETCH_RECOMMENDED_EXPERIENCE } from "./types";
import axios from 'axios'

async function takeData(data) {
    return new Promise((resolve) => {
        resolve(data.data);
    })
}

export function fetchRecomExperience() {
    return function (dispatch) {
        axios.get("https://aivbnbapi.herokuapp.com/api/experiences", {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(takeData)
        .then(data => dispatch({
            type: FETCH_RECOMMENDED_EXPERIENCE,
            payload: data
        }))
    }
}