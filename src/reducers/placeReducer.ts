import { FETCH_ALL_PLACE, SET_CURRENT_PLACE, FETCH_HOST, SET_HOVERED_CARD, FETCH_RECOMMENDED_PLACES } from '../actions/types'

const initialState = {
    items: [],
    item: {},
    host: null,
    currCard: null,
    recommendation: [],
}

export default function(state = initialState, action:any) {
    switch(action.type) {
        case FETCH_RECOMMENDED_PLACES:
            return {
                ...state,
                recommendation: action.payload
            }
        case FETCH_ALL_PLACE:
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
        case SET_HOVERED_CARD:
            return {
                ...state,
                currCard: action.payload
            }
        default:
            return state;
    }
}