import { SET_CURRENCY } from '../actions/types'

const initialState = {
    item: {
        symbol: "USD",
        rate: 1.0
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENCY :
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}