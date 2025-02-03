import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <header className="privacy-header">
        <h1>Privacy Policy</h1>
        <p className="effective-date">
          <strong>Effective Date:</strong> December 7, 2024
        </p>
      </header>

      <main>
        <section className="section">
          <h2>Information We Collect</h2>
          <ul>
            <li>
              <strong>Personal Information:</strong> Your name, email address, and contact details when you register or use our service.
            </li>
            <li>
              <strong>Document Information:</strong> Data related to documents, such as file names, types, and metadata, when uploading or sharing.
            </li>
            <li>
              <strong>Usage Information:</strong> Information like IP addresses, browser types, and activity logs to improve your experience.
            </li>
          </ul>
        </section>

        <section className="section">
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and improve our document-sharing services.</li>
            <li>To personalize your experience.</li>
            <li>To send transactional emails and notifications.</li>
            <li>To maintain the security of our platform.</li>
          </ul>
        </section>

        <section className="section">
          <h2>Data Security</h2>
          <p>
            We use advanced encryption and industry-standard measures to protect your data. However, no system is entirely immune to breaches.
          </p>
        </section>

        <section className="section">
          <h2>Third-Party Services</h2>
          <p>
            We collaborate with trusted third-party services to operate the platform (e.g., hosting and email services) but never sell or rent your information for marketing purposes.
          </p>
        </section>

        <section className="section">
          <h2>Your Rights</h2>
          <ul>
            <li>Access, correct, or delete your personal information.</li>
            <li>Withdraw consent for data processing.</li>
            <li>Opt-out of receiving promotional communications.</li>
          </ul>
        </section>

        <section className="section">
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this policy occasionally. Check this page for updates with a revised effective date.
          </p>
        </section>

        <section className="section">
          <h2>Contact Us</h2>
          <p>
            Have questions? Email us at{' '}
            <a href="mailto:support@trustvault.com">support@trustvault.com</a>.
          </p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
