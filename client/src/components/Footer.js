import React from "react";
import { Link } from "react-router-dom";
import "./constants.css";
import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="static-pages">
        <span className="auction-text">AUCTION</span>
        <Link to="/">About Us</Link>
        <Link to="/terms-and-conditions">Terms and Conditions</Link>
        <Link to="/privacy-and-policy">Privacy and Policy</Link>
      </div>

      <div className="contact-info">
        <span className="get-in-touch">GET IN TOUCH</span>
        <Link to="/">Call us at: +123 797-567-2535</Link>
        <a
          href="mailto:support@auction.com?subject=Customer%20Support"
          target="_blank"
          rel="noopener noreferrer"
        >
          support@auction.com
        </a>
        <div className="social-media-links">
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
      </div>
    </div>
  );
};

export default Footer;
