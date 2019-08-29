import React, { useEffect, useState, useCallback } from 'react'
import '../../../css/loginModal.css'
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "../../../css/registerModal.css";
import NewWindow from "react-new-window";
import { connect } from 'react-redux';
import { setNewOauthUser, setRegisterStatus, oauthLogin } from "../../../actions/userActions";
import axios from "axios";
import RegisterEmailModal from "./RegisterEmailModal";

function LoginModal({ setNewOauthUser, registerStatus, setRegisterStatus, oauthLogin } : { setNewOauthUser: any, registerStatus: any, setRegisterStatus: any, oauthLogin: any }) {

    const [window, setWindow] = useState(false)
    const [auth, setAuth] = useState("")
    const [userData, setUserData] = useState()
    const [token, setToken] = useState()
    const [emailRegister, setEmailRegister] = useState(false)
    const [registerModal, setRegisterModal] = useState()

    function onClick(e) {   
        if(e.target.className === 'modal' || e.target.className === 'close-modal')
        document.getElementById("registerModal").setAttribute("style", "display: none");
    }
    
    function showLogin() {
        document.getElementById("registerModal").setAttribute("style", "display: hidden")
        document.getElementById("loginModal").setAttribute("style", "display: block")
    }
    
    const onUnload = useCallback(
        () => {
            setWindow(false)
            setNewOauthUser(userData)
        },
        [setNewOauthUser, userData],
    )
    
    const registerWindow = useCallback(
        () => {
            if(window) return (
                <NewWindow url={"/register/" + auth + "/" + userData.firstname + "/" + userData.lastname + "/" + userData.email} center="screen"  copyStyles={true} onUnload={onUnload}></NewWindow>
            )
        },
        [auth, onUnload, userData, window],
    )

    const newDefaultUser = useCallback(
        (newUser) => {
            let data = {}
            let tempToken = {}
            setData(data, newUser.firstname, newUser.lastname, newUser.email, "default-profile-image.png", "", "", newUser.password)
            
            setTempToken(tempToken, newUser.email, "", "", "email")
            setToken(tempToken)


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
                    setNewOauthUser(data)
                } else {
                    let user: any = data
                    oauthLogin(user.email, "", "", "email")
                    document.getElementById("registerModal").setAttribute("style", "display: hidden");
                }
            })
        },
        [oauthLogin, setNewOauthUser],
    )

    const responseOAuth = useCallback(
        (res) => {
            if(!res.accessToken) return;
            let data = {}
            let tempToken = {}

            if(auth === "Google") {
                const profile = res.profileObj
                setData(data, profile.givenName, profile.familyName, profile.email, profile.imageUrl, profile.googleId, "", "")
                setTempToken(tempToken, res.googleId, res.tokenObj.expires_at, res.accessToken, "googleid")
                setToken(tempToken)
            } else {
                setData(data, res.name.substr(0, res.name.indexOf(' ')), res.name.substr(res.name.lastIndexOf(' ')), res.email, res.picture.data.url, "", res.userID, "")
                setTempToken(tempToken, res.userID, res.data_access_expiration_time, res.accessToken, "facebookid")
                setToken(tempToken)
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
                    setUserData(res.data)
                    setWindow(true);
                } else {
                    let currToken: any = tempToken
                    oauthLogin(currToken.id, currToken.expiration, currToken.accessToken, currToken.authenticator)
                    document.getElementById("registerModal").setAttribute("style", "display: hidden");
                }
            })
        },
        [auth, oauthLogin],
    )

    const defaultRegisterModal = (
        <React.Fragment>
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
                <input type="button" onClick={() => {setEmailRegister(true)}} value="&#9993; Sign up with email"/>
            </div>
            <hr/>
            <div className="signUp">Already have an account? <span className="clickableText" onClick={showLogin}>Log in</span> </div>
        </React.Fragment>
    )
    
    useEffect(() => {
        if(!emailRegister) 
            setRegisterModal(defaultRegisterModal)
        else setRegisterModal(<RegisterEmailModal setAuth={setAuth} responseOAuth={responseOAuth} newDefaultUser={newDefaultUser}/>)
    }, [emailRegister, defaultRegisterModal, onUnload, responseOAuth, registerWindow, newDefaultUser])

    useEffect(() => {
        document.getElementById("registerModal").addEventListener("click", onClick);
    }, [])

    useEffect(() => {
        if(registerStatus === true) {
            setRegisterStatus(false)
            setTimeout(() => {
                oauthLogin(token.id, token.expiration, token.accessToken, token.authenticator)
                document.getElementById("registerModal").setAttribute("style", "display: hidden"); 
            }, 500);
        }
    }, [registerStatus, token, oauthLogin, setRegisterStatus])

    function setData(data, firstname, lastname, email, profileimage, googleid, facebookid, password) {
        data.firstname = firstname
        data.lastname = lastname
        data.email = email
        data.profileimage = profileimage
        data.googleid = googleid
        data.facebookid = facebookid
        data.password = password;
    }

    function setTempToken(tempToken, id, expiration, accessToken, authenticator) {
        tempToken.id = id
        tempToken.expiration = expiration
        tempToken.accessToken = accessToken
        tempToken.authenticator = authenticator
    }

    return (
        <div className="modal" id="registerModal">
            <div className="modal-content login-content" id="register-content">
                <div className="close-modal">&#10005;</div>
                {registerModal}
            </div>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    registerStatus: state.user.registerStatus
})

export default connect(mapStateToProps, { setNewOauthUser, setRegisterStatus, oauthLogin })(LoginModal)