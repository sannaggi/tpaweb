import { SET_GEO_LOCATION } from '../actions/types'

const initialState = {
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_GEO_LOCATION:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}