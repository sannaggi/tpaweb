import React, { useState, useEffect } from "react";
import "../../../css/loginModal.css";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { oauthLogin, emailLogin } from "../../../actions/userActions";
import { connect } from "react-redux";
import sha from "sha256";

function LoginModal({ oauthLogin, emailLogin }: { oauthLogin: any, emailLogin: any }) {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
    rememberMe: ""
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

  function showRegister() {
    document.getElementById("loginModal").setAttribute("style", "display: hidden")
    document.getElementById("registerModal").setAttribute("style", "display: block")
  }

  function responseOAuth(res) {
    if (!res.accessToken) return;
    if (res.googleId !== undefined) {
      oauthLogin(res.googleId, res.tokenObj.expires_at, res.accessToken, "googleid");
      document.getElementById("loginModal").setAttribute("style", "display: hidden");
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    if(login.password.length < 4) alert("Password must be longer than 3 characters long")
    else {
      document.getElementById("loginModal").setAttribute("style", "display: hidden");
      emailLogin(login.email, sha(login.password), login.rememberMe)
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
        <form onSubmit={onSubmit}>
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
            <input type="checkbox" onChange={onChange} name="rememberMe" id="remember" />
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
        </form>
        <div className="inputField forgotPass">
          <span className="clickableText">Forgot password?</span>
        </div>
        <hr />
        <div className="signUp">
          Don't have an account? <span className="clickableText" onClick={showRegister}>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default connect(
  null,
  { oauthLogin, emailLogin }
)(LoginModal);
