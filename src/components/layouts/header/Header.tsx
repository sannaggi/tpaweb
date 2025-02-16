import React, { useState, useEffect } from "react";
import "../../../css/header.css";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";
import ArrowDown from "../../../images/arrow-down.png";
import aivlogo from "../../../images/aivbnblogo.png";
import { TABLETWIDTH, MOBILEWIDTH } from "../../Specification";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import CurrencySelect from "./CurrencySelect";
import { setGeoLocation } from "../../../actions/locationActions";
import { connect } from "react-redux";
import { logout } from "../../../actions/userActions";
import FavoriteModal from "../../reusable/FavoriteModal";

function Header({ setGeoLocation, user, logout }: { setGeoLocation: any, user: any, logout: any }) {
  const [click, setClick] = useState(false);
  const [visible, setVisible] = useState(true);

  const [screen, setScreen] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setGeoLocation);
  }, [setGeoLocation]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight
      });
      if (window.innerWidth > MOBILEWIDTH) setVisible(true);
      if (window.innerWidth > TABLETWIDTH) setClick(false);
    });
  }, [setScreen]);

  function onClick() {
    if (screen.width <= TABLETWIDTH) {
      setClick(!click);
      if (screen.width <= MOBILEWIDTH) {
        setVisible(!visible);
      }
    }
  }

  function returnLogo() {
    return (
      <div className="logo" onClick={onClick}>
        <img className="bnbLogo" src={aivlogo} alt="" />
        <img src={ArrowDown} alt="" className="arrowDown" />
      </div>
    );
  }

  function getStyle() {
    if (click) {
      if (screen.width <= MOBILEWIDTH) {
        if(user.id === undefined) return {height: "161px"}
        return {height: "379px"}
      }
      if(user.id === undefined) return {height: "210px"}
      return {height: "490px"}
    }
  }

  function getVisible() {
    if (visible)
      return {
        display: "block"
      };
    else
      return {
        display: "none"
      };
  }

  function showForm(com) {
    document.getElementById(com).setAttribute("style", "display: block");
    document.getElementById("register-content").setAttribute("style", "opacity: 0");
    document.getElementById("login-content").setAttribute("style", "opacity: 0");
    setTimeout(() => {
      document.getElementById("register-content").setAttribute("style", "opacity: 1; transition: 0.5s ease-in-out;");
      document.getElementById("login-content").setAttribute("style", "opacity: 1; transition: 0.5s ease-in-out;");
    }, 150)
  }

  function clickLink(cb: any) {
    setClick(false)
    if(cb) cb()
  }

  function getMenus() {
      if(user.id === undefined)
        return (
            <React.Fragment>
                <Link to="/" onClick={() => clickLink(null)}>
                  <div className="dropdown-link">Home</div>
                </Link>
                <div className="dropdown-link" onClick={() => clickLink(showForm("loginModal"))}>
                    Login
                </div>
                <div className="dropdown-link" onClick={() => clickLink(showForm("registerModal"))}>
                    Register
                </div>
            </React.Fragment>
        )
      return (
        <React.Fragment>
          <Link to="/" onClick={() => clickLink(null)}>
            <div className="dropdown-link">Home</div>
          </Link>
          <Link to={'/users/' + user.id}>
            <div className="dropdown-link">Profile</div>
          </Link>
          <Link to="/experience-host">
            <div className="dropdown-link">Become a Host</div>
          </Link>
          <Link to="/wishlist" onClick={() => clickLink(null)}>
            <div className="dropdown-link">Saved</div>
          </Link>
          <Link to="/booking" onClick={() => clickLink(null)}>
            <div className="dropdown-link">Bookings</div>
          </Link>
          <Link to="/chat" onClick={() => clickLink(null)}>
            <div className="dropdown-link">Chats</div>
          </Link>
          <div className="dropdown-link" onClick={() => clickLink(logout())}>Logout</div>
        </React.Fragment>
      )
  }

  function checkScreen() {
    if (screen.width > TABLETWIDTH) return <Link to="/">{returnLogo()}</Link>;
    return (
      <div>
        {returnLogo()}
        <nav className="dropdown-content" style={getStyle()}>
          {getMenus()}
        </nav>
      </div>
    );
  }

  return (
    <header>
      <div className="header-content">
        {checkScreen()}
        <div className="searchContainer" style={getVisible()}>
          <SearchBox />
        </div>
      </div>
      <div className="header-content">
        <CurrencySelect />
        <NavBar />
      </div>
      <LoginModal />
      <RegisterModal />
      <FavoriteModal />
    </header>
  );
}

const mapStateToProps = (state: any) => ({
    user: state.user.item
})

export default connect(
  mapStateToProps,
  { setGeoLocation, logout }
)(Header);
