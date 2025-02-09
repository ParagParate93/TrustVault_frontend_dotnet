import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';

import "../Styles/Login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    otp: "",  
    role: ""  
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [isOtpSent, setIsOtpSent] = useState(false);  
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();

    setIsSubmitting(true); 
    console.log("Submitting email and password");

    try {
      const response = await axios.post("http://localhost:8080/create/authenticate", {
        email: loginData.email,
        password: loginData.password,
      });

      console.log(response.data);

      if (response.data) {
        setErrorMessage("");
        
        localStorage.setItem('token', response.data.response1.token);
        localStorage.setItem('id', response.data.response1.id);
        localStorage.setItem('name', response.data.response1.name);
        localStorage.setItem('email', response.data.response1.email);
        localStorage.setItem('phone', response.data.response1.phone);
        localStorage.setItem('role', response.data.response1.role);  
        setLoginData({ ...loginData, role: response.data.response1.role }); 
        
        toast.success("OTP sent to your email.");
        setIsOtpSent(true); 

        
        setTimeout(() => {
          setIsOtpVerified(false);
        }, 1000);
      } else {
        toast.error("Invalid email or password!");
      }
    } catch (error) {
      toast.error("Invalid email or password!");
    } finally {
      setIsSubmitting(false); 
    }
  };

  // Step 2: Handle OTP verification
  const handleOtpVerification = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);  // Start loading while verifying OTP

    try {
      const response = await axios.post("http://localhost:8080/api/otp/verify", {
        email: loginData.email,
        otp: loginData.otp,
      });

      if (response.data.success) {
        setIsOtpVerified(true);
        toast.success("OTP Verified Successfully!");

        localStorage.setItem("loggedIn", true); 

        setTimeout(() => {
          if (response.data.role === "ROLE_ADMIN") {
            navigate("/AdminDashboard");
          } else {
            navigate("/UserDashboard");
          }
        }, 1000);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Error verifying OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Resend OTP to email
  const handleResendOtp = async () => {
    try {
     
      const response = await axios.post(`http://localhost:8080/api/otp/request/${loginData.email}/${loginData.role}`, {
        email: loginData.email,
        role: loginData.role,
      });
      console.log(response.data);
      toast.success("OTP has been resent to your email.");
    } catch (error) {
      toast.error("Error resending OTP.");
    }
  };

  return (
    <div className="login">
      <h2 style={{ color: 'black' }}>Welcome Back!</h2>
      <p className="text-gray-600">Please sign in to your account</p>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {!isOtpSent ? (
        // Step 1: Email and password form
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn" style={{ backgroundColor: "green" }} disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      ) : (
        // Step 2: OTP input form
        <form onSubmit={handleOtpVerification}>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={loginData.otp}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn" style={{ backgroundColor: "green" }} disabled={isSubmitting}>
            {isSubmitting ? 'Verifying OTP...' : 'Verify OTP'}
          </button>
          <button
            type="button"
            className="btn resend-otp"
            onClick={handleResendOtp}
            disabled={isSubmitting}
          >
            Resend OTP
          </button>
        </form>
      )}

      <p>
        Don't have an account? <Link to="/signup">Register here</Link><br />
        Forgot password? <Link to="/forgot-password">Click here</Link>
      </p>
    </div>
  );
};

export default Login;
