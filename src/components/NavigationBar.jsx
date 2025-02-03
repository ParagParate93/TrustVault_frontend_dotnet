import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  return (
    <nav className={`navbar ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="navbar-logo">
        <Link to="/" className="logo">
          TrustVault
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
        </li>
        <li className="theme-toggle">
          <button onClick={toggleTheme}>Toggle Theme</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
