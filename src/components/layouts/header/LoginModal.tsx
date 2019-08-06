import React, { useState, useEffect } from "react";
import "../../../css/loginModal.css";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import { sign, decode } from "jsonwebtoken";
// import Axios from "axios";
import { oauth2Login } from "../../../actions/userActions";
import { connect } from "react-redux";

function LoginModal({ oauth2Login }: { oauth2Login: any }) {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  function willShow(state: Boolean) {
    if (state === show) return { display: "block" };
    return { display: "none" };
  }

  function onClick(e) {
    if (e.target.className === "modal" || e.target.className === "close-modal")
      document
        .getElementById("loginModal")
        .setAttribute("style", "display: none");
  }

  useEffect(() => {
    document.getElementById("loginModal").addEventListener("click", onClick);
  }, []);

  function onChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  // function loginGoogle(res) {
    // let test = sign(
    //   {
    //     data: {
    //       expiration: res.tokenObj.expires_at,
    //       id: res.googleId,
    //       accessToken: res.accessToken
    //     }
    //   },
    //   "nolep"
    // );
    // localStorage.setItem("aiv-token", test);
  // }

  function responseOAuth(res) {
    if (!res.accessToken) return;
    if (res.googleId !== undefined) {
      oauth2Login(res.googleId, res.tokenObj.expires_at, res.accessToken, "googleid");
      document.getElementById("loginModal").setAttribute("style", "display: hidden");
    }
  }

  return (
    <div className="modal" id="loginModal">
      <div className="modal-content login-content">
        <div className="close-modal">&#10005;</div>

        <FacebookLogin
          appId="415665872376918"
          callback={responseOAuth}
          fields="name,email,picture"
          render={renderProps => (
            <button className="facebook-login" onClick={renderProps.onClick}>
              <img src="/images/icons/facebook.png" alt="" />
              <span>Log in with Facebook</span>
            </button>
          )}
        />

        <GoogleLogin
          clientId="232788565524-a87fa8h01gsko8ef3lh7l2jridbp3227.apps.googleusercontent.com"
          render={renderProps => (
            <button className="google-login" onClick={renderProps.onClick}>
              <img src="/images/icons/google.png" alt="" />
              <span>Log in with Google</span>
            </button>
          )}
          onSuccess={responseOAuth}
          onFailure={responseOAuth}
          cookiePolicy={"single_host_origin"}
        />

        <div className="separator">
          <hr />
          <span className="separator-text">or</span>
        </div>
        <div className="inputField">
          <div className="inputText">
            <div>
              <input
                type="email"
                onChange={onChange}
                value={login.email}
                name="email"
                placeholder="Email Address"
              />
            </div>
            <span className="inputLogo">&#9993;</span>
          </div>
        </div>
        <div className="inputField">
          <div className="inputText">
            <div>
              <input
                type="password"
                name="password"
                onChange={onChange}
                value={login.password}
                style={willShow(false)}
                placeholder="Password"
              />
              <input
                type="text"
                name="password"
                onChange={onChange}
                value={login.password}
                style={willShow(true)}
                placeholder="Password"
              />
            </div>
            <span className="inputLogo">
              <i className="fa fa-lock" />
            </span>
          </div>
        </div>
        <div className="inputField helper">
          <input type="checkbox" name="" id="remember" />
          <label htmlFor="remember"> Remember me</label>
          <span
            className="clickableText show-pass"
            onClick={() => setShow(!show)}
          >
            Show password
          </span>
        </div>
        <div className="inputField">
          <input type="submit" value="Log in" />
        </div>
        <div className="inputField forgotPass">
          <span className="clickableText">Forgot password?</span>
        </div>
        <hr />
        <div className="signUp">
          Don't have an account? <span className="clickableText">Sign up</span>{" "}
        </div>
      </div>
    </div>
  );
}

export default connect(
  null,
  { oauth2Login }
)(LoginModal);
