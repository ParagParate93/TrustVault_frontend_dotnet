import React, { useState } from "react";
import "./ContactUs.css";
import NavigationBar from "../components/NavigationBar";

const FancyContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showContactInfo, setShowContactInfo] = useState(false);
  const [statusMessage, setStatusMessage] = useState(""); // For feedback to the user

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to send to the backend
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      submittedAt: new Date().toISOString(), // Submitted at current date and time
    };

    try {//http://localhost:8080/ContactUs/SubmitContactForm
      // Make a POST request to the backend API
      const response = await fetch("http://localhost:8080/contactus/submitcontactform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // Convert form data to JSON
      });

      if (response.ok) {
        const responseData = await response.json();
        setStatusMessage("Your message has been submitted successfully!"); // Success message
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatusMessage("Failed to submit your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatusMessage("There was an error with the submission. Please try again.");
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="fancy-contact-us-container">
        <h1 style={{ fontFamily: 'FancyFont', fontSize: '2em', color: 'lightgreen' }}>
          We'd Love to Hear from You
        </h1>
        <p style={{ fontFamily: 'FancyFont', fontSize: '1.2em', color: 'lightgreen' }}>
          Drop us a message and we’ll get back to you soon!
        </p>

        {statusMessage && (
          <p style={{ color: 'lightgreen', fontStyle: 'italic' }}>
            {statusMessage}
          </p>
        )} {/* Status Message */}

        <div className="fancy-form-container">
          <form onSubmit={handleSubmit}>
            <div className="fancy-form-field">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="fancy-input"
                placeholder=" "
              />
              <label htmlFor="name" className="fancy-label">
                Full Name
              </label>
            </div>
            <div className="fancy-form-field">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="fancy-input"
                placeholder=" "
              />
              <label htmlFor="email" className="fancy-label">
                Email Address
              </label>
            </div>
            <div className="fancy-form-field">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="fancy-textarea"
                placeholder=" "
              />
              <label htmlFor="message" className="fancy-label">
                Your Message
              </label>
            </div>
            <button type="submit" className="fancy-submit-button">
              Send Message
            </button>
          </form>
        </div>

        <button
          className="fancy-contact-toggle"
          onClick={() => setShowContactInfo(!showContactInfo)}
        >
          {showContactInfo ? "Hide Contact Info" : "Show Contact Info"}
        </button>

        {showContactInfo && (
          <div className="fancy-contact-info">
            <h2>Our Contact Details</h2>
            <p>
              📞 <span>+971 934 8769</span>
            </p>
            <p>
              ✉ <span>support@trustvault.com</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default FancyContactUs;