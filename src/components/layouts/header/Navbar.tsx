import React from 'react'

function Navbar() {

    function showForm(com) {
        document.getElementById(com).setAttribute("style", "display: block");
    }

    return (
        <React.Fragment>
            <div className="navbar-link"><div>Become a Host</div></div>
            <div className="navbar-link" onClick={() => showForm("registerModal")}><div>Register</div></div>
            <div className="navbar-link" onClick={() => showForm("loginModal")}><div>Login</div></div>
        </React.Fragment>
    )
}

export default Navbar
