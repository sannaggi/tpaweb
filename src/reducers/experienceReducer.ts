import { FETCH_RECOMMENDED_EXPERIENCE, FETCH_ALL_EXPERIENCES } from '../actions/types'

const initialState = {
    items: []
}

export default function(state = initialState, action:any) {
    switch(action.type) {
        case FETCH_RECOMMENDED_EXPERIENCE:
            return {
                ...state,
                items: action.payload
            }
        case FETCH_ALL_EXPERIENCES:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}