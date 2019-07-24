import { NEW_BOOKING } from '../actions/types'

const initialState = {
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case NEW_BOOKING:
            break;
        default:
            return state;
    }
}