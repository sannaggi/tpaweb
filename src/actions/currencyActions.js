import { SET_CURRENCY } from "./types";
import axios from 'axios'

async function takeData(data) {
    return new Promise((resolve) => {
        resolve(data.data);
    })
}

export function setCurrency(symbol) {
    return function (dispatch) {
        axios.get("https://api.exchangeratesapi.io/latest?base=USD&symbols=" + symbol, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(takeData)
        .then(data => dispatch({
            type: SET_CURRENCY,
            payload: {
                symbol: symbol,
                rate: data.rates[Object.keys(data.rates)[0]]
            }
        }))
    }
}