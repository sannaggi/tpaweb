import React from 'react'

function Navbar() {

    function showLoginForm() {
        var a = document.getElementById("loginModal");
        a.setAttribute("style", "display: block");
    }

    return (
        <React.Fragment>
            <div className="navbar-link"><div>Become a Host</div></div>
            <div className="navbar-link"><div>Register</div></div>
            <div className="navbar-link" onClick={showLoginForm}><div>Login</div></div>
        </React.Fragment>
    )
}

export default Navbar
