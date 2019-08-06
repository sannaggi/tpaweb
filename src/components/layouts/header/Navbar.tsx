import React from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

function Navbar({ user } : { user: any }) {

    function showForm(com) {
        document.getElementById(com).setAttribute("style", "display: block");
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
                <div className="navbar-link"><div>Become a Host</div></div>
                <div className="navbar-link"><div id="profileImage"><Link to={`users/${user.id}`}><img src={user.profileimage} alt=""/></Link></div></div>
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
