import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CookieJar } from "tough-cookie";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/password-recovery.css";
import "../components/constants.css";

function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const initialMessage =
    "Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.";
  const [message, setMessage] = useState(initialMessage);
  const navigate = useNavigate();
  const cookieJar = new CookieJar();

  const handleResetPassword = async () => {
    try {
      setMessage("Password reset link sent to your email.");
    } catch (error) {
      console.error(error);
      setMessage("Password reset failed. Please try again.");
    }
  };
  return (
    <div className="password-recovery-page">
      <Navbar />
      <div className="password-recovery-container">
        <div className="password-recovery-box">
          <h5 className="password-recovery-title">FORGOT PASSWORD</h5>
          <p className="message">{message}</p>
          <p className="enter-email">Enter Email</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="user@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="reset-password-button"
            onClick={handleResetPassword}
          >
            RESET PASSWORD
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PasswordRecovery;
