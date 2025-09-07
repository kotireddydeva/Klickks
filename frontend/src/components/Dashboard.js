import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setLoggedIn }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/dashboard`, { withCredentials: true })
      .then(res => setMessage(res.data.message))
      .catch(() => {
        setLoggedIn(false);
        navigate("/login");
      });
  }, [navigate, setLoggedIn]);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
