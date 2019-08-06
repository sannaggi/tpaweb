import { SET_GUEST_COUNT } from "./types";

export function setGuestCount(guestCount) {
    return function dispatch(dispatch) {
        dispatch({
            type: SET_GUEST_COUNT,
            payload: guestCount
        })
    }
}