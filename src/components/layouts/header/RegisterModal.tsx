import React, { useEffect, useState } from 'react'
import '../../../css/loginModal.css'
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "../../../css/registerModal.css";
import NewWindow from "react-new-window";
import { connect } from 'react-redux';
import { setNewOauthUser, setRegisterStatus, oauth2Login } from "../../../actions/userActions";
import axios from "axios";

function LoginModal({ setNewOauthUser, registerStatus, setRegisterStatus, oauth2Login } : { setNewOauthUser: any, registerStatus: any, setRegisterStatus: any, oauth2Login: any }) {

    const [window, setWindow] = useState(false)
    const [auth, setAuth] = useState("")
    const [userData, setUserData] = useState()
    const [token, setToken] = useState()

    function onClick(e) {
        if(e.target.className === 'modal' || e.target.className === 'close-modal')
            document.getElementById("registerModal").setAttribute("style", "display: none");
    }

    function userLogin(currToken) {
        oauth2Login(currToken.id, currToken.expiration, currToken.accessToken, currToken.authenticator)
        document.getElementById("registerModal").setAttribute("style", "display: hidden");
    }

    useEffect(() => {
        document.getElementById("registerModal").addEventListener("click", onClick);
    }, [])

    useEffect(() => {
        if(registerStatus === true) {
            setRegisterStatus(false)
            setTimeout(() => {
                oauth2Login(token.id, token.expiration, token.accessToken, token.authenticator)
                document.getElementById("registerModal").setAttribute("style", "display: hidden"); 
            }, 500);
        }
    }, [registerStatus, token, oauth2Login, setRegisterStatus])

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

        let tempToken = {
            id: "",
            expiration: "",
            accessToken: "",
            authenticator: ""
        }

        if(auth === "Google") {
            const profile = res.profileObj

            data.firstname = profile.givenName;
            data.lastname = profile.familyName;
            data.email = profile.email;
            data.googleid = profile.googleId;
            data.profileimage = profile.imageUrl;
            
            tempToken.id = res.googleId
            tempToken.expiration = res.tokenObj.expires_at
            tempToken.accessToken = res.accessToken
            tempToken.authenticator = "googleid"

            setToken(tempToken)
        } else {
            data.firstname = res.name.substr(0, res.name.indexOf(' '));
            data.lastname = res.name.substr(res.name.lastIndexOf(' '));
            data.email = res.email;
            data.facebookid = res.facebookid;
            data.profileimage = res.picture.data.url;
        }
        axios({
            url: "https://aivbnbapi.herokuapp.com/api/users/check",
            method: "POST",
            data: data,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
        .then(res => {
            if(res.data) {
                setUserData(data)
                setWindow(true);
            } else {
                userLogin(tempToken)
            }
        })
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

const mapStateToProps = (state:any) => ({
    registerStatus: state.user.registerStatus
})

export default connect(mapStateToProps, { setNewOauthUser, setRegisterStatus, oauth2Login })(LoginModal)