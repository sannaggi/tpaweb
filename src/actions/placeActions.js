import { FETCH_ALL_PLACE, SET_CURRENT_PLACE, FETCH_HOST, SET_HOVERED_CARD, FETCH_RECOMMENDED_PLACES } from "./types";
import axios from 'axios'

async function takeData(data) {
    return new Promise((resolve) => {
        resolve(data.data);
    })
}

export function setHoveredCard(id) {
    return function (dispatch) {
        dispatch ({
            type: SET_HOVERED_CARD,
            payload: id
        })
    }
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

export function fetchRecommendedPlaces() {
    return function (dispatch) {
        axios.get("https://aivbnbapi.herokuapp.com/api/places/recommended", {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(takeData)
        .then(data => dispatch({
            type: FETCH_RECOMMENDED_PLACES,
            payload: data
        }))
    }
}

export function setCurrentPlace(id){
    return function (dispatch){
        axios.get("https://aivbnbapi.herokuapp.com/api/places/" + id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(takeData)
        .then(data => dispatch({
            type: SET_CURRENT_PLACE,
            payload: data
        }))
    }
}

export function fetchHost(placeID){
    return function (dispatch){
        axios.get("https://aivbnbapi.herokuapp.com/api/hosts", {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(takeData)
        .then(data => dispatch({
            type: FETCH_HOST,
            payload: data
        }))
    }
}