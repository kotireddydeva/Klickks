import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/dashboard"); 
    }
  }, [loggedIn, navigate]);

  const handleLogin = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, 
        { email, password }, 
        { withCredentials: true }
      );
      setLoggedIn(true);  
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
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
      <button className="form-button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
