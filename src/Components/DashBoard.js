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
      <div className="Buttons">
      <button onClick={() => navigate("/stopwatch")}>Stopwatch</button>
      <button onClick={() => navigate("/counter")}>Counter</button>
      <button onClick={() => navigate("/formFunc")}>Form with Functional Component</button>
      <button onClick={() => navigate("/formClass")}>Form with Class Component</button>
      <button onClick={() => navigate("/calc")}>Calculator</button>
      <button onClick={() => navigate("/changePassword")}>Change Password</button>
      
      </div>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
