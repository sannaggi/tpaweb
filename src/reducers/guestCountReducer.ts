import { SET_GUEST_COUNT } from '../actions/types'

const initialState = {
    item: {}
}

export default function (state = initialState, action:any) {
    switch(action.type) {
        case SET_GUEST_COUNT:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}