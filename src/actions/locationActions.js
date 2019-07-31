import { SET_GEO_LOCATION } from "./types";

export function setGeoLocation(position) {
    return function dispatch(dispatch) {
        dispatch({
            type: SET_GEO_LOCATION,
            payload: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
        })
    }
}