import React, { useState, useEffect } from "react"; // Import useEffect here
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/login.css";
import "../components/constants.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberMeCookie = Cookies.get("rememberMe");
    setRememberMe(rememberMeCookie === "true");
    const rememberedEmail = Cookies.get("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
    }
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    const data = {
      email: email,
      password: password,
    };

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/login",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const responseData = response.data;

          const token = responseData.token;
          Cookies.set("jwtToken", token, { expires: 7 });

          Cookies.set("rememberMe", rememberMe ? "true" : "false", {
            expires: 365,
          });

          if (rememberMe) {
            Cookies.set("rememberedEmail", email, { expires: 365 });
          } else {
            Cookies.remove("rememberedEmail");
          }

          console.log("Login successful");
          navigate("/");
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleForgotPassword = () => {
    navigate("/password-recovery");
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <h5 className="login-title">LOGIN</h5>
          <p className="input-email">Email:</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="user@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorMessages.email && (
              <p className="error-message">{errorMessages.email}</p>
            )}
          </div>
          <p className="input-password">Password:</p>
          <div className="input-container">
            <input
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessages.password && (
              <p className="error-message">{errorMessages.password}</p>
            )}
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              className="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span class="checkmark"></span>
            <label htmlFor="remember">Remember me</label>
          </div>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <div className="social-buttons">
            <div className="social-button facebook-button">
              <img src="images/fbicon.png" alt="Facebook" />
              <p>Login with Facebook</p>
            </div>
            <div className="social-button google-button">
              <img src="images/googleicon.png" alt="Gmail" />
              <p>Login with Gmail</p>
            </div>
          </div>
          <a
            href="#"
            className="forgot-password"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
