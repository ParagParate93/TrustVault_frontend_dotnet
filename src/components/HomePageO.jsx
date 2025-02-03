import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Footer from './Footer';

import secureShareLogo from '../assets/secureShareLogo.jpg'; 

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <img src={secureShareLogo} alt="SecureShare Logo" className="logo" />
        <h1>Welcome to TrustVault</h1>
        <p>Your trusted platform for secure document sharing.</p>
      </header>

      <main className="homepage-main">
        <section className="homepage-about">
          <h2>About TrustVault</h2>
          <p>
          TrustVault ensures that your confidential documents are shared 
            safely and securely. With advanced encryption and user-friendly 
            tools, you can trust TrustVault for all your document-sharing needs.
          </p>
        </section>

        <section className="homepage-links">
          <Link to="/signup" className="btn-signup">Sign Up</Link>
          <Link to="/login" className="btn-signin">Sign In</Link>
        </section>
      </main>

      
      <Footer />
    </div>
    
  );
};

export default HomePage;