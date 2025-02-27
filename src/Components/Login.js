import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      navigate("/dashboard"); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!loginData.email) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errors.email = "Invalid email format.";
      isValid = false;
    }

    if (!loginData.password) {
      errors.password = "Password is required.";
      isValid = false;
    } else if (loginData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const storedUser = JSON.parse(localStorage.getItem("userRegistration"));

      if (
        storedUser &&
        storedUser.email === loginData.email &&
        storedUser.password === loginData.password
      ) {
        alert("Login Successful! ✅");
        localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
        navigate("/dashboard");
      } else {
        alert("Invalid email or password ❌");
      }

      setLoginData({ email: "", password: "" });
      setErrors({});
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.email}</div>
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.password}</div>
        </div>

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <button onClick={() => navigate("/register")}>Register</button></p>
    </div>
  );
};

export default Login;
