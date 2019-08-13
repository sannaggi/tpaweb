import { LOGIN, REGISTER_STATUS, LOGOUT } from "./types";
import axios from "axios";
import { decode, sign } from "jsonwebtoken";

function decodeJWT(res) {
  return new Promise((resolve, reject) => {
    if(res.data === null || res.data === undefined) reject("Failed to log in")
    else resolve(decode(res.data).user)
  })
}

function setCookie(data, expiration, accessToken) {
    localStorage.setItem("aiv-token", sign(
        {
          data: {
            expiration: expiration,
            id: data.id,
            accessToken: accessToken
          }
        },
        "nolep"
    ));
}

function clearCookie() {
  localStorage.removeItem("aiv-token");
}

export function cookieLogin(id) {
  return function(dispatch) {
    axios({
      url: "https://aivbnbapi.herokuapp.com/api/login/c",
      method: "POST",
      data: {
        id: id
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(decodeJWT)
    .then(data =>
        dispatch({
        type: LOGIN,
        payload: data
      })
    )
  };
}

export function emailLogin(email, password, rememberMe) {
  return function(dispatch) {
    axios({
      url: "https://aivbnbapi.herokuapp.com/api/login/e",
      method: "POST",
      data: {
        email: email,
        password: password
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(decodeJWT)
    .then(data => {
      dispatch({
        type: LOGIN,
        payload: data
      })
      return new Promise(resolve => resolve(data))
    })
    .then(data => {
      return new Promise((resolve, reject) => {
        if(!rememberMe) reject(false)
        else {
          setCookie(data, "", "")
          resolve(data)
        }
      }) 
    })
    .catch(alert)
  };
}

export function oauthLogin(id, expiration, accessToken, authenticator) {
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
    .then(data => {
      dispatch({
        type: LOGIN,
        payload: data
      })
    })
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

export function logout() {
  return function(dispatch) {
    dispatch({
      type: LOGOUT
    })
    clearCookie()
  };
}