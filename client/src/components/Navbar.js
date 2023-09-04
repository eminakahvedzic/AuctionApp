import "../styles/navbar.css";
import "./constants.css";
import React, { useState, useEffect } from "react";
import loginPathnames from "../constants";
import { Link } from "react-router-dom";

const Navbar = () => {

  const [userFirstName, setUserFirstName] = useState("");

  const isLoginPath = loginPathnames.includes(window.location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookieString = document.cookie;
    const tokenCookie = cookieString
      .split("; ")
      .find((row) => row.startsWith("jwtToken="));

    setIsLoggedIn(!!tokenCookie && tokenCookie.split("=")[1].trim() !== "");
  }, []);

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

  const handleLogout = () => {
    document.cookie =
      "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("userDetails");
    setIsLoggedIn(false);
  };

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
          <div>
            {isLoggedIn ? (
              <div className={`hi-message ${isLoggedIn ? "" : "hidden"}`}>
                <p>Hi, {userFirstName}</p>
                <div className="navigation">
                  <a className="button" href="" onClick={handleLogout}>
                    <img src="/images/logout-icon.png" alt="Profile" />
                    <div className="logout">LOGOUT</div>
                  </a>
                </div>
              </div>
            ) : (
              <div className={`user-info ${isLoggedIn ? "hidden" : ""}`}>
                <Link to="/login">Login</Link>
                <span className="or-text">or</span>
                <Link to="/register">Create an account</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="main-white">
        <div className={`main-white ${isLoginPath ? "centered-logo" : ""}`}>
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>
        </div>
        <div className={`main-white ${isLoginPath ? "hidden" : ""}`}>
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
            <Link to="/">HOME</Link>
            <Link to="/">SHOP</Link>
            <Link to="/">MY ACCOUNT</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
