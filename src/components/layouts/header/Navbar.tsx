import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <React.Fragment>
            <div className="navbar-link"><Link to="/">Become a Host</Link></div>
            <div className="navbar-link"><Link to="/">Register</Link></div>
            <div className="navbar-link"><Link to="/">Login</Link></div>
        </React.Fragment>
    )
}

export default Navbar
