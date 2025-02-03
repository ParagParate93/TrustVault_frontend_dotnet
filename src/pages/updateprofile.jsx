import React, { useState } from "react";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  // Initialize state for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Handle file input change (for profile image)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Password validation
    if (password && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Form submission logic (e.g., make an API call)
    console.log("Profile Updated:");
    console.log({ name, email, phone, bio, password, profileImage });

    // Clear error state if successful
    setError("");
    
    // Optionally reset form fields after submission
    setName("");
    setEmail("");
    setPhone("");
    setBio("");
    setPassword("");
    setConfirmPassword("");
    setProfileImage(null);
  };

  return (
    <div className="update-profile-container">
      <h2>Update Your Profile</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

       

        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a new password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            value={confirmPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Confirm your Old password"
          />
        </div>

        

        <button type="submit" className="update-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;