import { FETCH_RECOMMENDED_EXPERIENCE, FETCH_ALL_EXPERIENCES, FETCH_FILTERED_EXPERIENCES } from "./types";
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

export function fetchAllExperiences() {
    return function (dispatch) {
        axios.get("https://aivbnbapi.herokuapp.com/api/experiences", {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(takeData)
        .then(data => dispatch({
            type: FETCH_ALL_EXPERIENCES,
            payload: data
        }))
    }
}

export function fetchFilteredExperiences(category) {
    return function (dispatch) {
        axios({
            url: 'https://aivbnbapi.herokuapp.com/api/experiences/search',
            method: 'POST',
            data: category,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(takeData)
        .then(data => dispatch({
            type: FETCH_FILTERED_EXPERIENCES,
            payload: data
        }))
    }
}