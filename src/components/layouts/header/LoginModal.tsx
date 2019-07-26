import React, { useState } from 'react'
import '../../../css/loginModal.css'

function LoginModal() {

    const [show, setShow] = useState(false)

    function willShow(state:Boolean) {
        if(state === show) return {display: "block"}
        return {display: "none"}
    }

    return (
        <div className="modal" id="loginModal">
            <div className="modal-content login-content">
                <div className="close-modal">&#10005;</div>
                <button className="facebook-login">
                    <img src="/images/icons/facebook.png" alt=""/>
                    <span>Log in with Facebook</span>
                </button>
                <button className="google-login">
                    <img src="/images/icons/google.png" alt=""/>
                    <span>Log in with Google</span>
                </button>
                <div className="separator">
                    <hr/>
                    <span className="separator-text">or</span>
                </div>
                <div className="inputField">
                    <div className="inputText">
                        <div>
                            <input type="email" name="" id="" placeholder="Email Address"/>
                        </div>
                        <span className="inputLogo">&#9993;</span>
                    </div>
                </div>
                <div className="inputField">
                    <div className="inputText">
                        <div>                    
                            <input type="password" name="" id="" style={willShow(false)} placeholder="Password"/>
                            <input type="text" name="" id="" style={willShow(true)} placeholder="Password"/>
                        </div>
                        <span className="inputLogo"><i className="fa fa-lock"></i></span>
                    </div>
                </div>
                <div className="inputField helper">
                    <input type="checkbox" name="" id="remember"/>
                    <label htmlFor="remember"> Remember me</label>
                    <span className="clickableText show-pass" onClick={() => setShow(!show)}>Show password</span>
                </div>
                <div className="inputField">
                    <input type="submit" value="Log in"/>
                </div>
                <div className="inputField forgotPass">
                    <span className="clickableText">Forgot password?</span>
                </div>
                <hr/>
                <div className="signUp">Don't have an account? <span className="clickableText">Sign up</span> </div>
            </div>
        </div>
    )
}

export default LoginModal