import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import NavigationBar2 from "../components/NavigationBar2";
import NavigationBar3 from "../components/NavigationBar3";

const ProfilePage = () => {
  // Get auth token, email, and role from localStorage.
  const [authtoken] = useState(localStorage.getItem("authtoken"));
  const [userEmail] = useState(localStorage.getItem("email"));
  const [role] = useState(localStorage.getItem("role") || "");

  // Initialize profile state with fallback default strings.
  const [user, setUser] = useState({
    name: localStorage.getItem("name") || 'Parag Parate',
    email: localStorage.getItem("email") || 'parag.parate@example.com',
    phone: localStorage.getItem("phone") || '+1234567890',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    profileImage: '/default-profile.png', // Changed from profilePicture to profileImage
    password: ''
  });

  // Create a copy for editing
  const [editedUser, setEditedUser] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);

  // Manage validation errors
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    password: ''
  });

  // Regex patterns for validation
  const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
  const phoneRegex = /^\+?\d{10,15}$/; // 10-15 digits with optional +
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/; // 6-20 characters, letters & numbers, special characters

  // Fetch user profile data from the backend using the email
  useEffect(() => {
    if (userEmail) {
      // Updated endpoint URL to match the controller's route (capital "C")
      axios.get(`http://localhost:8080/Create/profile?email=${userEmail}`, {
        headers: {
          'Authorization': `Bearer ${authtoken}`
        }
      })
      .then(response => {
        // Provide fallback defaults for missing data
        const data = {
          name: response.data.name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          bio: response.data.bio || '',
          profileImage: response.data.profileImage || '/default-profile.png', // Changed property name from profilePicture
          password: response.data.password ||''
        };
        setUser(data);
        setEditedUser(data);
      })
      .catch(error => console.error('Error fetching profile:', error));
    }
  }, [userEmail, authtoken]);

  // Validate input fields
  const validateField = (name, value) => {
    let errorMessage = '';
    switch (fieldName) {
      case 'name':
        if (!value.match(nameRegex)) errorMessage = 'Name must contain only letters and spaces.';
        break;
      case 'phone':
        if (!value.match(phoneRegex)) errorMessage = 'Phone number must be between 10 and 15 digits.';
        break;
      case 'password':

        // Allow empty password if not changing
        if (value && !value.match(passwordRegex)) {
          const errorMessage = 'Password must be 6-20 characters and contain at least one letter, one number, and one special character.';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
    validateField(name, value);
  };

  // Check if the form is valid, handling null values safely
  const isFormValid = () => {
    // Check that name, email, phone, and bio are non-empty
    const requiredFieldsValid = ['name', 'email', 'phone', 'bio'].every(key => {
      const value = editedUser[key];
      return typeof value === 'string' ? value.trim() !== '' : value !== null;
    });
    // Ensure no validation errors exist
    const noErrors = !Object.values(errors).some(error => error !== '');
    return requiredFieldsValid && noErrors;
  };

  // Toggle edit mode and update profile on save
  const toggleEditMode = () => {
    if (isEditing && isFormValid()) {
      axios.put('http://localhost:8080/Create/profile/update', editedUser, {
        headers: {
          'Authorization': `Bearer ${authtoken}`
        }
      })
      .then(response => {
        setUser(editedUser);
        // Update localStorage for name and phone if needed
        localStorage.setItem("name", editedUser.name);
        localStorage.setItem("phone", editedUser.phone);
        setIsEditing(false);
      })
      .catch(error => console.error('Error updating profile:', error));
    } else {
      setIsEditing(true);
    }
  };
  
  return (
    <div className="user-dashboard-container">
      {role && (role === "ROLE_ADMIN" ? <NavigationBar3 /> : <NavigationBar2 />)}
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <h2>{isEditing ? 'Edit Profile' : 'Profile'}</h2>
            <button
              className="btn btn-edit"
              onClick={toggleEditMode}
              disabled={isEditing && !isFormValid()}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
          <div className="profile-content">
            <div className="profile-picture">
              {/* Updated to use profileImage instead of profilePicture */}
              <img src={user.profileImage} alt="Profile" />
              {isEditing && (
                <input
                  type="file"
                  name="profileImage" // Changed from profilePicture to profileImage
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setEditedUser(prev => ({ ...prev, profileImage: reader.result })); // Changed property name
                    };
                    if (file) {
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              )}
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
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                  </>
                ) : (
                  <p>{user.name}</p>
                )}
              </div>
              <div className="profile-info-item">
                <label>Email</label>
                {/* Email is read-only */}
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  disabled
                />
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
                  <>
                  <textarea
                    name="bio"
                    value={editedUser.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                  />
                  <p className="error-message"> * Bio is required. </p>
                  </>
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
                      placeholder="Enter new password (leave blank if unchanged)"
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                    <p className="error-message"> * Password must be 6-20 characters and contain at least one letter, number, and special character. </p>
                  </>
                ) : (
                  <p>**********</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
