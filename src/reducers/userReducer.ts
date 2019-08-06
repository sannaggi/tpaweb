import { LOGIN_OAUTH2 } from "../actions/types";

const initialState = {
  item: {}
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_OAUTH2:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
