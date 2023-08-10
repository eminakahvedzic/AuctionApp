import React from "react";
import "../styles/navbar.css";
import twitterIcon from "../images/twitter.png";
import facebookIcon from "../images/facebook.png";
import instagramIcon from "../images/instagram.png";
import logo from "../images/logo.png";
import searchicon from "../images/searchimg.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="upper-black">
        <div className="social-media-icons">
          <div className="facebook">
            <a href="https://facebook.com">
              <img src={facebookIcon} alt="Facebook" />
            </a>
          </div>
          <div className="instagram">
            <a href="https://instagram.com">
              <img src={instagramIcon} alt="Instagram" />
            </a>
          </div>
          <div className="twitter">
            <a href="https://twitter.com">
              <img src={twitterIcon} alt="Twitter" />
            </a>
          </div>
        </div>

        <div className="user-info">
          <a href="/login">Login</a>
          <span className="or-text">or</span>
          <a href="/register">Create an account</a>
        </div>
      </div>

      <div className="main-white">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className="hidden">
          <div className="search-bar">
            <div className="search-input">
              <input type="text" placeholder="Try enter: Shoes" />
            </div>
            <div className="search-img">
              <img src={searchicon} alt="Search Icon" />
            </div>
          </div>
        </div>
        <div className="menu">
          <a href="/">HOME</a>
          <a href="/">SHOP</a>
          <a href="/">MY ACCOUNT</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
