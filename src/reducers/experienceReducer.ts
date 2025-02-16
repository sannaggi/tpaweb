import { SET_CURRENT_EXPERIENCE, FETCH_RECOMMENDED_EXPERIENCES, FETCH_ALL_EXPERIENCES, FETCH_FILTERED_EXPERIENCES, FETCH_LIMITED_EXPERIENCES } from '../actions/types'

const initialState = {
    items: [],
    limitedItems: [],
    item: {},
    recommended: [],
}

export default function(state = initialState, action:any) {
    switch(action.type) {
        case FETCH_RECOMMENDED_EXPERIENCES:
            return {
                ...state,
                recommended: action.payload
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
        case SET_CURRENT_EXPERIENCE:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}