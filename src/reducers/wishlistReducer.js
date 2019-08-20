import { GET_ALL_WISHLISTS, SET_CURRENT_WISHLIST } from "../actions/types";

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_WISHLISTS:
      return {
        ...state,
        items: action.payload
      };
    case SET_CURRENT_WISHLIST:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
