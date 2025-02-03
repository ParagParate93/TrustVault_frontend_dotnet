import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  // State to manage the profile data
  const [user, setUser] = useState({
    name: 'Parag Parate',
    email: 'parag.parate@example.com',
    phone: '+1234567890',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    profilePicture: 'https://via.placeholder.com/150',
    password: 'password123',
  });

  // State to manage the form visibility (for editing)
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  // State to manage validation errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  // Regex patterns for validation
  const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Simple email validation
  const phoneRegex = /^\+?\d{10,15}$/; // Phone number with optional + and 10-15 digits
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/; // Password: 6-20 characters, must contain letters and numbers

  // Handle changes in the profile form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });

    // Validate the field being edited
    validateField(name, value);
  };

  // Validate individual fields
  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'name':
        if (!value.match(nameRegex)) {
          errorMessage = 'Name must only contain letters and spaces.';
        }
        break;
      case 'email':
        if (!value.match(emailRegex)) {
          errorMessage = 'Please enter a valid email address.';
        }
        break;
      case 'phone':
        if (!value.match(phoneRegex)) {
          errorMessage = 'Phone number must be between 10 and 15 digits.';
        }
        break;
      case 'password':
        if (!value.match(passwordRegex)) {
          errorMessage = 'Password must be 6-20 characters and contain both letters and numbers.';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  // Check if the form is valid
  const isFormValid = () => {
    return !Object.values(errors).some((error) => error !== '') && Object.values(editedUser).every((field) => field.trim() !== '');
  };

  // Toggle between view and edit mode
  const toggleEditMode = () => {
    if (isEditing && isFormValid()) {
      setUser(editedUser); // Save changes
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h2>{isEditing ? 'Edit Profile' : 'Profile'}</h2>
          <button
            className="btn btn-edit"
            onClick={toggleEditMode}
            disabled={!isFormValid()} // Disable Save button if form is invalid
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-picture">
            <img src={user.profilePicture} alt="Profile" />
            {isEditing && <input type="file" name="profilePicture" />}
          </div>

          <div className="profile-info">
            <div className="profile-info-item">
              <label>Name</label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="error-message">{errors.name}</p>}
                </>
              ) : (
                <p>{user.name}</p>
              )}
            </div>

            <div className="profile-info-item">
              <label>Email</label>
              {isEditing ? (
                <>
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </>
              ) : (
                <p>{user.email}</p>
              )}
            </div>

            <div className="profile-info-item">
              <label>Phone Number</label>
              {isEditing ? (
                <>
                  <input
                    type="tel"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="error-message">{errors.phone}</p>}
                </>
              ) : (
                <p>{user.phone}</p>
              )}
            </div>

            <div className="profile-info-item">
              <label>Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editedUser.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                />
              ) : (
                <p>{user.bio}</p>
              )}
            </div>

            <div className="profile-info-item">
              <label>Password</label>
              {isEditing ? (
                <>
                  <input
                    type="password"
                    name="password"
                    value={editedUser.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  {errors.password && <p className="error-message">{errors.password}</p>}
                </>
              ) : (
                <p>**********</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;