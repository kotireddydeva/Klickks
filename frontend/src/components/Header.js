import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const Header = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/dashboard`, { withCredentials: true })
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false));
  }, [setLoggedIn]);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {}, { withCredentials: true });
      setLoggedIn(false);
      navigate("/login", { state: { message: "You have been logged out!" } });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav>
      {!loggedIn ? (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Header;
