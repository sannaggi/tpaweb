import React, { useEffect, useState } from 'react'
import '../../../css/loginModal.css'
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "../../../css/registerModal.css";
import NewWindow from "react-new-window";
import { connect } from 'react-redux';
import { setNewOauthUser } from "../../../actions/userActions";

function LoginModal({ setNewOauthUser } : { setNewOauthUser: any }) {

    const [window, setWindow] = useState(false)
    const [auth, setAuth] = useState("")
    const [userData, setUserData] = useState()

    function onClick(e) {
        if(e.target.className === 'modal' || e.target.className === 'close-modal')
            document.getElementById("registerModal").setAttribute("style", "display: none");
    }

    useEffect(() => {
        document.getElementById("registerModal").addEventListener("click", onClick);
    }, [])

    function onUnload() {
        setWindow(false)
        setNewOauthUser(userData)
    }

    function registerWindow() {
        if(window) return (
            <NewWindow url={"/register/" + auth + "/" + userData.firstname + "/" + userData.lastname + "/" + userData.email} center="screen"  copyStyles={true} onUnload={onUnload}>
            </NewWindow>
        )
    }

    function responseOAuth(res) {
        if(!res.accessToken) return;
        let data = {
            firstname: "",
            lastname: "",
            email: "",
            profileimage: "",
            googleid: "",
            facebookid: ""
        }
        if(auth === "Google") {
            const profile = res.profileObj
            data.firstname = profile.givenName;
            data.lastname = profile.familyName;
            data.email = profile.email;
            data.googleid = profile.googleId;
            data.profileimage = profile.imageUrl;
        } else {
            data.firstname = res.name.substr(0, res.name.indexOf(' '));
            data.lastname = res.name.substr(res.name.lastIndexOf(' '));
            data.email = res.email;
            data.facebookid = res.facebookid;
            data.profileimage = res.picture.data.url;
        }
        setUserData(data)
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

export default connect(null, { setNewOauthUser })(LoginModal)