import { Link } from 'react-router-dom';
import './HomePage.css';
import Footer from './Footer';

import secureShareLogo from '../assets/secureShareLogo.jpg';
import encryptionImage from '../assets/encryption.jpg';
import userInterfaceImage from '../assets/userInterface.jpg';
import accessControlImage from '../assets/accessControl.jpg';

import trustVaultImage1 from '../assets/trustVaultImage1.jpg'; // First image for carousel
import trustVaultImage2 from '../assets/trustVaultImage2.jpeg'; // Second image for carousel
import trustVaultImage3 from '../assets/trustVaultImage3.jpg'; // Third image for carousel
import NavigationBar from './NavigationBar';

import { Carousel } from 'react-bootstrap';
import { colors } from '@mui/material';

const HomePage = () => {
  return (
    <div>
      <NavigationBar/>
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="header-content">
          <img src={secureShareLogo} alt="SecureShare Logo" className="logo" />
          <h1>Welcome to TrustVault</h1>
          <p className="tagline">
            Your trusted platform for secure and seamless document sharing.
          </p>
        </div>
      </header>

      <main className="homepage-main">
        {/* Hero Section with Carousel */}
        <section className="hero-section">
          <h2>TrustVault: Simplifying Secure Sharing</h2>
          <p>
            TrustVault empowers you to securely share and manage your documents
            with confidence. Built with cutting-edge encryption technology and
            a commitment to privacy, your data is always in safe hands.
          </p>

          {/* Carousel Component */}
          <Carousel interval={3000}>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src={trustVaultImage1}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Secure Document Sharing</h3>
                <p>Experience the power of seamless and secure document sharing.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src={trustVaultImage2}
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>End-to-End Encryption</h3>
                <p>Your documents are protected with state-of-the-art encryption technology.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src={trustVaultImage3}
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Trusted Platform</h3>
                <p>We are committed to providing the most secure platform for document sharing.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="feature">
            <img src={encryptionImage} alt="Encryption" className="feature-img" />
            <h3>End-to-End Encryption</h3>
            <p>
              All documents shared through TrustVault are encrypted, ensuring
              that only intended recipients can access your files.
            </p>
          </div>
          <div className="feature">
            <img
              src={userInterfaceImage}
              alt="User Interface"
              className="feature-img"
            />
            <h3>User-Friendly Interface</h3>
            <p>
              Our intuitive platform makes document sharing effortless for
              everyone, from individuals to businesses.
            </p>
          </div>
          <div className="feature">
            <img
              src={accessControlImage}
              alt="Role-Based Access"
              className="feature-img"
            />
            <h3>Role-Based Access</h3>
            <p>
              Control who can view, edit, or share your files with our flexible
              role-based access permissions.
            </p>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="cta-section">
        <p className='tgl'>Ready to experience secure document sharing?</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-signup">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-signin">
              Sign In
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </div>
  );
};

export default HomePage;