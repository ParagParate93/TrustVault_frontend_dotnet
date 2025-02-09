import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationBar3.css";

const NavigationBar2 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const email = localStorage.getItem("email"); // Retrieve the email from localStorage
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token"); // Remove token after logout
    localStorage.removeItem("email"); // Remove email after logout
    localStorage.removeItem("name");
    localStorage.removeItem("phone");
    localStorage.removeItem("role");
    localStorage.setItem("loggedIn", false);
    navigate("/login", {replace: "true"});
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/AdminDashboard">TrustVault</Link>
      </div>
      <ul className="navbar-links">
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li className="profile-container2" onClick={toggleDropdown}>
              <button className="profile-button">Profile</button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <p style={{ margin: "15px" }}>{userEmail}</p>
                  <Link to="/ProfilePage">
                    <button className="dropdown-item">Admin Profile</button>
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar2;
