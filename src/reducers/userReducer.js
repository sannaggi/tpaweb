import { LOGIN, REGISTER_STATUS, SET_REGISTER_END, LOGOUT, SET_USER_PROFILE, SET_EDITED_PROFILE, SET_SOCKET } from "../actions/types";

const initialState = {
  item: {},
  userProfile: {},
  newItem: {},
  registerStatus: false,
  socket: null
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
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      }
    case SET_EDITED_PROFILE:
      return {
        ...state,
        item: action.payload
      }
    default:
      return state;
  }
}
