import React, { useState } from 'react'
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import sha from "sha256";

function RegisterEmailModal({setAuth, responseOAuth, newDefaultUser} : {setAuth: any, responseOAuth: any, newDefaultUser: any}) {
    
    const [newUser, setNewUser] = useState({
        email: "",
        firstname: "",
        lastname: "",
        password: ""
    })

    function showLogin() {
        document.getElementById("registerModal").setAttribute("style", "display: hidden")
        document.getElementById("loginModal").setAttribute("style", "display: block")
    }

    function onChange(e) {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    function onSubmit(e) {
        e.preventDefault()
        newDefaultUser({...newUser, password: sha(newUser.password)})
    }

    return (
        <React.Fragment>
            <div className="emailLoginTop">
                Sign up with <FacebookLogin
                    appId="415665872376918"
                    callback={responseOAuth}
                    fields="name,email,picture"
                    onClick={() => setAuth("Facebook")}
                    render= {renderProps => (
                        <span onClick={renderProps.onclick} className="oauthLoginLink">Facebook</span>
                    )}
                    /> or <span onClick={() => setAuth("Google")}>
                    <GoogleLogin 
                        clientId="232788565524-a87fa8h01gsko8ef3lh7l2jridbp3227.apps.googleusercontent.com"
                        render={renderProps => (
                            <span onClick={renderProps.onClick} className="oauthLoginLink">Google</span>
                        )}
                        onSuccess={responseOAuth}
                        onFailure={responseOAuth}
                        cookiePolicy={'single_host_origin'}
                        />
                </span>
            </div>
            <form onSubmit={onSubmit}>
                <div className="separator">
                    <hr/>
                    <span className="separator-text">or</span>
                </div>
                
                <div className="inputField">
                    <div className="inputText">
                        <div>
                            <input
                                type="email"
                                onChange={onChange}
                                value={newUser.email}
                                name="email"
                                placeholder="Email address"
                            />
                        </div>
                        <span className="inputLogo">&#9993;</span>
                    </div>
                </div>
                <div className="inputField">
                    <div className="inputText">
                        <div>
                            <input
                                type="text"
                                onChange={onChange}
                                value={newUser.firstname}
                                name="firstname"
                                placeholder="First name"
                            />
                        </div>
                        <span className="inputLogo"><i className="fa fa-user"></i></span>
                    </div>
                </div>
                <div className="inputField">
                    <div className="inputText">
                        <div>
                            <input
                                type="text"
                                onChange={onChange}
                                value={newUser.lastname}
                                name="lastname"
                                placeholder="Last name"
                            />
                        </div>
                        <span className="inputLogo"><i className="fa fa-user"></i></span>
                    </div>
                </div>
                <div className="inputField">
                    <div className="inputText">
                        <div>
                            <input
                                type="password"
                                onChange={onChange}
                                value={newUser.password}
                                name="password"
                                placeholder="Create a password"
                            />
                        </div>
                        <span className="inputLogo"><i className="fa fa-eye"></i></span>
                    </div>
                </div>
                <hr/>
                <div className="offer">We’ll send you marketing promotions, special offers, inspiration, and policy updates via email.</div>
                <div className="inputField">
                    <input type="submit" value="Sign up"/>
                </div>
            </form>
            <div className="signUp">Already have an account? <span className="clickableText" onClick={showLogin}>Log in</span></div>
        </React.Fragment>
    )
}

export default RegisterEmailModal
