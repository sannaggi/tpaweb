import { combineReducers } from 'redux'
import bookingReducer from './bookingReducer.js'

export default combineReducers({
    bookings: bookingReducer,
})