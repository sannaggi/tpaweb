import { FETCH_ALL_PLACE, SET_CURRENT_PLACE, FETCH_HOST } from '../actions/types'

const initialState = {
    items: [],
    item: {},
    host: null,
}

export default function(state = initialState, action:any) {
    switch(action.type) {
        case FETCH_ALL_PLACE:
            // console.log(action.payload)
            return {
                ...state,
                items: action.payload
            }
        case SET_CURRENT_PLACE:
            return {
                ...state,
                item: action.payload
            }
        case FETCH_HOST:
            return {
                ...state,
                host: action.payload
            }
        default:
            return state;
    }
}