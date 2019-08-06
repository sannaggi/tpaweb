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

function Header({ setGeoLocation, user }: { setGeoLocation: any, user: any }) {
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
  }, []);

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
    if (click) return {height: "140px"}
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
  }

  function getMenus() {
      if(user.id === undefined)
        return (
            <React.Fragment>
                <div className="dropdown-link" onClick={() => showForm("registerModal")}>
                    Register
                </div>
                <div className="dropdown-link" onClick={() => showForm("loginModal")}>
                    Login
                </div>
            </React.Fragment>
        )
      return (
        <React.Fragment>
          <Link to="/users/:id">
            <div className="dropdown-link">Profile</div>
          </Link>
          <Link to="/becomehost">
            <div className="dropdown-link">Become a Host</div>
          </Link>
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
    </header>
  );
}

const mapStateToProps = (state: any) => ({
    user: state.user.item
})

export default connect(
  mapStateToProps,
  { setGeoLocation }
)(Header);
