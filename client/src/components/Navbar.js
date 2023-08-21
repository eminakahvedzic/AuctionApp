import { useLocation } from "react-router-dom";
import "../styles/navbar.css";
import "./constants.css";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();

  const [userFirstName, setUserFirstName] = useState("");

  const isLoginPath =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/password-recovery";

  useEffect(() => {
    if (!isLoginPath) {
      const userDetailsString = localStorage.getItem("userDetails");
      console.log(userDetailsString);
      if (userDetailsString) {
        const userDetails = JSON.parse(userDetailsString);
        setUserFirstName(userDetails.first_name);
      }
    }
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="upper-black">
          <div className="social-media-icons">
            <div className="facebook">
              <a href="https://facebook.com">
                <img src="/images/facebook.png" alt="Facebook" />
              </a>
            </div>
            <div className="instagram">
              <a href="https://instagram.com">
                <img src="/images/instagram.png" alt="Instagram" />
              </a>
            </div>
            <div className="twitter">
              <a href="https://twitter.com">
                <img src="/images/twitter.png" alt="Twitter" />
              </a>
            </div>
          </div>
          <div className={`user-info ${isLoginPath ? "" : "hidden"}`}>
            <a href="/login">Login</a>
            <span className="or-text">or</span>
            <a href="/register">Create an account</a>
          </div>
          <div className={`hi-message ${isLoginPath ? "hidden" : ""}`}>
            {<p>Hi, {userFirstName}</p>}
          </div>
        </div>
      </div>
      <div className="main-white">
        <div className={`main-white ${isLoginPath ? "centered-logo" : ""}`}>
          <div className="logo">
            <a href="/">
              <img src="/images/logo.png" alt="Logo" />
            </a>
          </div>
        </div>
        <div className="hidden">
          <div className="search-bar">
            <div className="search-input">
              <input type="text" placeholder="Try enter: Shoes" />
            </div>
            <div className="search-img">
              <img src="images/searchimg.png" alt="Search Icon" />
            </div>
          </div>
        </div>
        <div className={`main-white ${isLoginPath ? "hidden" : ""}`}>
          <div className="menu">
            <a href="/">HOME</a>
            <a href="/">SHOP</a>
            <a href="/">MY ACCOUNT</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
