import { GET_ALL_WISHLISTS, SET_CURRENT_WISHLIST, SET_ACTIVE_WISHLIST_MODAL } from "../actions/types";

const initialState = {
  items: [],
  item: {},
  active: {}
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
    case SET_ACTIVE_WISHLIST_MODAL:
      return {
        ...state,
        active: action.payload
      };
    default:
      return state;
  }
}
