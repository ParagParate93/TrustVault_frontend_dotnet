import React from 'react';
import './AboutUs.css'; // Make sure this path is correct

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="about-us-title">About Us</h1>
      <div className="about-us-content">
        <p>
          Welcome to Trust Vault! We are dedicated to providing a fast and secure way to share files
          across the globe. Whether it's documents, photos, or videos, our platform ensures that your
          files are safely uploaded, stored, and shared with ease.
        </p>
        <p>
          Our team consists of passionate individuals who work tirelessly to improve the platform and
          provide an excellent user experience.
        </p>
      </div>
      <div className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="../../parag_p.jpg" alt="Team Member" />
            <p>Parag Parate</p>
          </div>
          <div className="team-member">
            <img src="../../Rohit_owal.jpg" alt="Team Member" />
            <p>Rohit Owal</p>
          </div>
          <div className="team-member">
            <img src="Umesh_p.jpg" alt="Team Member" />
            <p>Umesh Pakhare</p>
          </div>
          <div className="team-member">
            <img src="Vaishnavi_k.jpg" alt="Team Member" />
            <p>Vaishnavi Kulkarni</p>
          </div>
          <div className="team-member">
            <img src="Ashwini_p.jpg" alt="Team Member" />
            <p>Ashwini Patil</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;