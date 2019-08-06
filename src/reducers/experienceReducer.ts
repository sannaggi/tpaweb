import { FETCH_RECOMMENDED_EXPERIENCE, FETCH_ALL_EXPERIENCES, FETCH_FILTERED_EXPERIENCES, FETCH_LIMITED_EXPERIENCES } from '../actions/types'

const initialState = {
    items: [],
    limitedItems: []
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
        case FETCH_FILTERED_EXPERIENCES:
            return {
                ...state,
                items: action.payload
            }
        case FETCH_LIMITED_EXPERIENCES:
            return {
                ...state,
                limitedItems: action.payload
            }
        default:
            return state;
    }
}