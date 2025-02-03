import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!nameRegex.test(formData.name)) {
      formErrors.name = "Name must contain only letters and spaces.";
    }
    if (!emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email format.";
    }
    if (!passwordRegex.test(formData.password)) {
      formErrors.password =
        "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.";
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match.";
    }
    if (otpSent && (!formData.otp || formData.otp.length !== 6 || isNaN(formData.otp))) {
      formErrors.otp = "OTP must be a 6-digit number.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const sendOtp = async () => {
    if (!formData.email) {
      setErrors({ email: "Please enter your email to send OTP." });
      return;
    }
    try {
      await axios.post("/api/send-otp", { email: formData.email });
      setOtpSent(true);
      setErrors({});
    } catch (err) {
      setErrors({ email: "Failed to send OTP. Try again." });
    }
  };

  const verifyOtp = async () => {
    if (!formData.otp) {
      setErrors({ otp: "Please enter the OTP." });
      return;
    }
    try {
      await axios.post("/api/verify-otp", { email: formData.email, otp: formData.otp });
      setOtpVerified(true);
      setErrors({});
    } catch (err) {
      setErrors({ otp: "Invalid OTP. Try again." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("/api/signup", formData);
      alert("Registration successful! Please log in.");
      setFormData({ name: "", email: "", password: "", confirmPassword: "", otp: "" });
      setOtpSent(false);
      setOtpVerified(false);
    } catch (err) {
      setErrors({ form: "Registration failed. Try again." });
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2>Sign Up</h2>
        {errors.form && <p className="error">{errors.form}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {!otpSent && (
              <button type="button" className="otp-btn" onClick={sendOtp}>
                Send OTP
              </button>
            )}
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          {otpSent && (
            <div className="form-group">
              <label>OTP</label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
              />
              <button type="button" className="otp-verify-btn" onClick={verifyOtp}>
                Verify OTP
              </button>
              {errors.otp && <p className="error">{errors.otp}</p>}
            </div>
          )}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className="submit-btn" disabled={!otpVerified}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
