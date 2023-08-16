import React from "react";
import "./constants.css";
import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="static-pages">
        <span className="auction-text">AUCTION</span>
        <a href="/">About Us</a>
        <a href="https://www.termsandcondiitionssample.com/live.php?token=OA0eR5hEPn1ZdWpIrSyMXHjgFq6wT7I3">
          Terms and Conditions
        </a>
        <a href="https://ctxt.io/2/AABQuFWtFw">Privacy and Policy</a>
      </div>

      <div className="contact-info">
        <span className="get-in-touch">GET IN TOUCH</span>

        <a href="/">Call us at: +123 797-567-2535</a>
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
