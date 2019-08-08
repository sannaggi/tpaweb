import { LOGIN_OAUTH2, REGISTER_STATUS } from "./types";
import axios from "axios";
import { decode, sign } from "jsonwebtoken";

function decodeJWT(res) {
  return new Promise((resolve) => {resolve(decode(res.data).user)})
}

function setCookie(id, expiration, accessToken) {
    localStorage.setItem("aiv-token", sign(
        {
          data: {
            expiration: expiration,
            id: id,
            accessToken: accessToken
          }
        },
        "nolep"
    ));
}

export function oauth2Login(id, expiration, accessToken, authenticator) {
  return function(dispatch) {
    axios({
      url: "https://aivbnbapi.herokuapp.com/api/login/o",
      method: "POST",
      data: {
        id: id,
        authenticator: authenticator
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(decodeJWT)
    .then(data =>
        dispatch({
        type: LOGIN_OAUTH2,
        payload: data
      })
    )
    .then(setCookie(id, expiration, accessToken))
  };
}

export function setNewOauthUser(data) {
  return function(dispatch) {
    axios({
      url: "https://aivbnbapi.herokuapp.com/api/users/",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(
      dispatch({
        type: REGISTER_STATUS,
        payload: true
      })
    )
  };
}

export function setRegisterStatus(data) {
  return function(dispatch) {
    dispatch({
      type: REGISTER_STATUS,
      payload: data
    })
  };
}