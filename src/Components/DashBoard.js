import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUsername(loggedInUser.username);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); 
    navigate("/login"); 
  };

  return (
    <div>
      <h2>Welcome, {username}! 🎉</h2>
      <p>You have successfully logged in.</p>
      <button onClick={() => navigate("/stopwatch")}>Stopwatch</button>
      <button onClick={() => navigate("/counter")}>Counter</button>
      <button onClick={() => navigate("/")}>Form with Functional Component</button>
      <button onClick={() => navigate("/stopwatch")}>Form with Class Component</button>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
