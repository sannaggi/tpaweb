import { LOGIN_OAUTH2, NEW_OAUTH_USER, SET_REGISTER_END } from "../actions/types";

const initialState = {
  item: {},
  newItem: {},
  registerEnd: false
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_OAUTH2:
      return {
        ...state,
        item: action.payload
      };
    case NEW_OAUTH_USER:
      return {
        ...state,
        newItem: {...state.newItem, ...action.payload}
      };
    case SET_REGISTER_END:
      return {
        ...state,
        registerEnd: action.payload
      };
    default:
      return state;
  }
}
