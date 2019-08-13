import { LOGIN, REGISTER_STATUS, SET_REGISTER_END, LOGOUT } from "../actions/types";

const initialState = {
  item: {},
  newItem: {},
  registerStatus: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        item: action.payload
      };
    case REGISTER_STATUS:
      return {
        ...state,
        registerStatus: action.payload
      };
    case SET_REGISTER_END:
      return {
        ...state,
        registerStatus: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        item: {}
      }
    default:
      return state;
  }
}
