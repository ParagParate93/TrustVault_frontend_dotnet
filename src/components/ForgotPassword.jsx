import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';  
import "../Styles/ForgotPassword.css";
import { toast } from 'react-toastify';
import axios from "axios"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const navigate = useNavigate(); 

  
  const handleSendOtp = () => {
    axios.post(`http://localhost:8080/api/ForgotPassword/send-otp/${email}`) 
      .then((response) => {
        toast.success("OTP sent to your email!");
        setStep(2);
      })
      .catch((error) => {
        toast.error("Email not found or error sending OTP.");
      });
  };

  const handleVerifyOtp = () => {
    axios.post(`http://localhost:8080/api/ForgotPassword/reset-password`, {
      email,
      ResetCode : otp,
      newPassword
    })
      .then((resetResponse) => {
        toast.success("Password updated successfully!");
        navigate("/login"); 
      })
      .catch((error) => {
        console.error(error.response?.data);
        toast.error("Error updating password.");
      });
  };
  

  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify & Update Password</button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
