import { NEW_BOOKING } from './types'

export function book(bookingData) {
    return function(dispatch) {
        dispatch({
            type: NEW_BOOKING,
            payload: bookingData
        })
    }
}