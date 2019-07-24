import { combineReducers } from 'redux'
import bookingReducer from './bookingReducer.js'
import placeReducer from './placeReducer.ts'

export default combineReducers({
    bookings: bookingReducer,
    places: placeReducer
})