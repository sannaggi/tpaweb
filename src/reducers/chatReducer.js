import { SET_CHAT_DETAIL } from '../actions/types'

const initialState = {
    chat: {},
    otherUser: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CHAT_DETAIL:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}