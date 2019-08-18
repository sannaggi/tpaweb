import { GET_ALL_WISHLISTS } from "../actions/types";

const initialState = {
  items: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_WISHLISTS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
