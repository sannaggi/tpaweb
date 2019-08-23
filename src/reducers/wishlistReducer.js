import { GET_ALL_WISHLISTS, SET_CURRENT_WISHLIST, SET_ACTIVE_WISHLIST_MODAL, SET_ISCREATING } from "../actions/types";

const initialState = {
  items: [],
  item: {},
  active: {},
  isCreating: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_WISHLISTS:
      return {
        ...state,
        items: action.payload
      };
    case SET_ISCREATING:
      return {
        ...state,
        isCreating: action.payload
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
