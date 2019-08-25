import { SET_CHAT_DETAIL } from '../actions/types'

const initialState = {
    otherUser: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CHAT_DETAIL:
            return {
                ...state,
                otherUser: action.payload
            }
        default:
            return state;
    }
}