import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Register.css";
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "ROLE_USER", // Role is now included here
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    // Prepare data for the backend, including role
    const userPayload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: formData.role, // Role is included here
    };

    try {
      const response = await fetch("http://localhost:8080/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPayload),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Registration Successful!");

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          role: "ROLE_USER", // Reset the role to default
        });

        setTimeout(() => navigate("/login"), 1000);
      } else if (response.status === 400) {
        toast.error("User already exists or invalid data");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Failed to connect to the server.");
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Email validation
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (!/((?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})/.test(data.password)) {
      errors.password =
        "Password must be 5-20 characters long, contain at least one digit, one lowercase letter, and one special character (#, @, $, *).";
    }
    

    // Confirm Password validation
    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Phone validation (checking length of the phone number)
    if (!data.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (data.phone.length !== 10) {
      errors.phone = "Phone number must be 10 digits";
    }

    return errors;
  };

  return (
    <div className="register">
      <h2>Create Account</h2>
      <p className="text-gray-600">Join our community today</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="(\+?\d{1,4}[\s-]?)?(\(?\d{1,4}\)?[\s-]?)?[\d-]{5,20}" 
            title="Please enter a valid phone number"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Register;
