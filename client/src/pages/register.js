import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/register.css";
import dotenv from "dotenv";
import { AuthService } from "../services/authService";

dotenv.config();

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!firstName) {
      errors.firstName = "First name is required.";
    }

    if (!lastName) {
      errors.lastName = "Last name is required.";
    }

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

  const handleRegistration = async () => {
    if (validateForm()) {
      try {
        await AuthService.register(firstName, lastName, email, password);
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="registration-page">
      <Navbar />
      <div className="registration-container">
        <div className="registration-box">
          <h5 className="registration-title">REGISTER</h5>
          <p className="input-name">First Name:</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errorMessages.firstName && (
              <p className="error-message">{errorMessages.firstName}</p>
            )}
          </div>
          <p className="input-name">Last Name:</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errorMessages.lastName && (
              <p className="error-message">{errorMessages.lastName}</p>
            )}
          </div>
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
          <button className="registration-button" onClick={handleRegistration}>
            Register
          </button>
          <div className="login-link-container">
            <p className="already-have-account">Already have an account?</p>
            <Link to="/login" className="login-link">
              Login
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Registration;
