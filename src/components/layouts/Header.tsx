import React, { useState, useEffect } from 'react'
import '../../css/header.css'
import SearchBox from './SearchBox'
import { Link } from 'react-router-dom'
import NavBar from './Navbar'
import ArrowDown from '../../images/arrow-down.png'
import aivlogo from '../../images/aivbnblogo.png'

function Header() {

    const [click, setClick] = useState(false)
    const [visible, setVisible] = useState(true)

    const [screen, setScreen] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreen({
                width: window.innerWidth,
                height: window.innerHeight
            })
        })
    }, [])

    function onClick() {
        if(screen.width <= 1200) {
            setClick(!click);
            if(screen.width <= 750){
                setVisible(!visible);
            }
        }
    }

    function returnLogo() {
        return (
            <div className="logo" onClick={onClick}>
                <img className="bnbLogo" src={aivlogo} alt=""/>
                <img src={ArrowDown} alt="" className="arrowDown"/>
            </div>
        )
    }

    function getStyle() {
        if(click)
            return {
                display: 'block',
            }
    }

    function getVisible() {
        if(visible)
            return {
                display: 'block',
            }
        else return {
            display: 'none'
        }
    }

    function checkScreen() {
        if(screen.width > 1200) return <Link to="/aa">{returnLogo()}</Link>;
        return <div>
            {returnLogo()}
            <nav className="dropdown-content" style={getStyle()}>
                <Link to="/becomehost"><div className="dropdown-link">Become a Host</div></Link>
                <div className="dropdown-link">Register</div>
                <div className="dropdown-link">Login</div>
            </nav>
        </div>;
    }

    return (
        <div className="header">
            <div className="header-content">
                {checkScreen()}
                <div className="searchContainer" style={getVisible()}>
                    <SearchBox />
                </div>
            </div>
            <div className="header-content">
                <NavBar />
            </div>
        </div>
    )
}

export default Header
