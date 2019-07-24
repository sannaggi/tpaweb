import { FETCH_ALL_PLACE } from '../actions/types'

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action:any) {
    switch(action.type) {
        case FETCH_ALL_PLACE:
            // console.log(action.payload)
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}