import React, { useState } from "react";
import "./HomePageO.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';


function Footer(){

return(
<footer className="homepage-footer">
  <div className="footer-container">
    <div className="footer-section about">
      <h3>About TrustVault</h3>
      <p>
        Your trusted platform for secure and seamless document sharing. Built with advanced security for your peace of mind.
      </p>
    </div>
    <div className="footer-section links">
  <h3>Quick Links</h3>
  <ul>
    <li><Link to="/about"><i className="fas fa-info-circle"></i><span> About Us</span></Link></li>
    <li><Link to="/contact"><i className="fas fa-envelope"></i><span> Contact Us</span></Link></li>
    <li><Link to="/PrivacyPolicy"><i className="fas fa-shield-alt"></i><span> Privacy Policy</span></Link></li>
  </ul>
</div>

    <div className="footer-section social">
      <h3>Follow Us</h3>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <p>&copy; 2024 TrustVault. All rights reserved.</p>
  </div>
</footer>
)
};
export default Footer;