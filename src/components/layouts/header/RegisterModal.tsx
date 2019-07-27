import React, { useEffect, useState } from 'react'
import '../../../css/loginModal.css'
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "../../../css/registerModal.css";
import NewWindow from "react-new-window";

function LoginModal() {

    const [window, setWindow] = useState(false)
    const [auth, setAuth] = useState("")
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    function onClick(e) {
        if(e.target.className === 'modal' || e.target.className === 'close-modal')
            document.getElementById("registerModal").setAttribute("style", "display: none");
    }

    useEffect(() => {
        document.getElementById("registerModal").addEventListener("click", onClick);
    }, [])

    function registerWindow() {
        if(window) return (
            <NewWindow url={"/register/" + auth + "/" + userData.firstName + "/" + userData.lastName + "/" + userData.email} center="screen" copyStyles={true} onUnload={() => {setWindow(false)}}>
            </NewWindow>
        )
    }
    function responseOAuth(res) {
        if(!res.accessToken) return;
        
        let firstName:string;
        let lastName:string;
        let email:string;
        if(auth === "Google") {
            firstName = res.profileObj.givenName;
            lastName = res.profileObj.familyName;
            email = res.profileObj.email;
        } else {
            firstName = res.name.substr(0, res.name.indexOf(' '));
            lastName = res.name.substr(res.name.lastIndexOf(' '));
            email = res.email;
        }
        setUserData({
            firstName: firstName,
            lastName: lastName,
            email: email
        })

        setWindow(true);
    }


    return (
        <div className="modal" id="registerModal">
            <div className="modal-content login-content">
                <div className="close-modal">&#10005;</div>

                {registerWindow()}

                <FacebookLogin
                    appId="415665872376918"
                    callback={responseOAuth}
                    fields="name,email,picture"
                    onClick={() => setAuth("Facebook")}
                    render= {renderProps => (
                        <button className="facebook-login" onClick={renderProps.onClick}>
                            <img src="/images/icons/facebook.png" alt=""/>
                            <span>Continue with Facebook</span>
                        </button>
                    )}
                />

                <div onClick={() => setAuth("Google")}>
                    <GoogleLogin 
                        clientId="232788565524-a87fa8h01gsko8ef3lh7l2jridbp3227.apps.googleusercontent.com"
                        render={renderProps => (
                            <button className="google-login" onClick={renderProps.onClick}>
                                <img src="/images/icons/google.png" alt=""/>
                                <span>Continue with Google</span>
                            </button>
                        )}
                        onSuccess={responseOAuth}
                        onFailure={responseOAuth}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>

                <div className="separator">
                    <hr/>
                    <span className="separator-text">or</span>
                </div>
                <div className="inputField">
                    <input type="submit" value="&#9993; Sign up with email"/>
                </div>
                <hr/>
                <div className="signUp">Already have an account? <span className="clickableText">Log in</span> </div>
            </div>
        </div>
    )
}

export default LoginModal