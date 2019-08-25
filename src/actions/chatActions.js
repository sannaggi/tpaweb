import { SET_CHAT_DETAIL } from "./types";

export function setChatDetail(otherUser) {
    return function (dispatch) {
        dispatch({
            type: SET_CHAT_DETAIL,
            payload: otherUser
        })
    }
}