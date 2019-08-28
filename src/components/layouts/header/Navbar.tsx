import React from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from "../../../actions/userActions";

function Navbar({ user, logout } : { user: any, logout: any }) {

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
                <Link to="/wishlist"><div className="navbar-link"><div>Saved</div></div></Link>
                <Link to="/booking"><div className="navbar-link"><div>Bookings</div></div></Link>
                <Link to="/chat"><div className="navbar-link"><div>Chats</div></div></Link>
                <div className="navbar-link" onClick={() => logout()}><div>Logout</div></div>
                <div className="navbar-link" id="nav-profile-icon"><div id="profileImage"><Link to={`users/${user.id}`}><img src={user.profileimage} alt=""/></Link></div></div>
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

export default connect(mapStateToProps, { logout })(Navbar)
