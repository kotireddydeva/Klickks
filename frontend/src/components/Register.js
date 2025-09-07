import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { email, password });
      alert("Registration successful! Please login.");
    } catch (err) {
      alert("Registration failed! User may already exist.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Register</h2>
      <input
        className="form-input"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="form-input"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className="form-button" onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
