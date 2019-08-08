import { LOGIN_OAUTH2, REGISTER_STATUS, SET_REGISTER_END } from "../actions/types";

const initialState = {
  item: {},
  newItem: {},
  registerStatus: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_OAUTH2:
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
    default:
      return state;
  }
}
