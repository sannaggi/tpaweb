import React from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

function Navbar({ user } : { user: any }) {

    function showForm(com) {
        document.getElementById(com).setAttribute("style", "display: block");
        document.getElementById("register-content").setAttribute("style", "opacity: 0");
        document.getElementById("login-content").setAttribute("style", "opacity: 0");
        setTimeout(() => {
          document.getElementById("register-content").setAttribute("style", "opacity: 1; transition: 0.5s ease-in-out;");
          document.getElementById("login-content").setAttribute("style", "opacity: 1; transition: 0.5s ease-in-out;");
        }, 150)
    }

    function getMenus() {
        if(user.id === undefined) return (
            <React.Fragment>
                <div className="navbar-link" onClick={() => showForm("registerModal")}><div>Register</div></div>
                <div className="navbar-link" onClick={() => showForm("loginModal")}><div>Login</div></div>
            </React.Fragment>
        )
        return (
            <React.Fragment>
                <div className="navbar-link"><div><Link to={'/experience-host'}>Become a Host</Link></div></div>
                <div className="navbar-link"><div id="profileImage"><Link to={'/users/'+user.id}><img src={user.profileimage} alt=""/></Link></div></div>
            </React.Fragment>
        )
    }

    return (
        getMenus()
    )
}

const mapStateToProps = (state: any) => ({
    user: state.user.item
})

export default connect(mapStateToProps, { })(Navbar)
