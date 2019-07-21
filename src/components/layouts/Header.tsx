import React from 'react'
import '../../css/header.css'
import SearchBox from './SearchBox'
import { Link } from 'react-router-dom'
import NavBar from './Navbar'

function Header() {
    return (
        <div className="header">
            <div className="header-content">
                <Link to="/"><img className="bnbLogo" src="https://dummyimage.com/200x200/" alt=""/></Link>
                    <SearchBox />
            </div>
            <div className="header-content">
                <NavBar />
            </div>
        </div>
    )
}

export default Header
