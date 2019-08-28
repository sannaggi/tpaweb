import { NEW_BOOKING } from '../actions/types'

const initialState = {
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case NEW_BOOKING:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}