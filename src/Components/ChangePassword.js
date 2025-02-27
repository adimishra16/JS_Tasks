import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    const storedData = JSON.parse(localStorage.getItem("userRegistration"));

    if (!formData.email) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!storedData || storedData.email !== formData.email) {
      errors.email = "No account found with this email.";
      isValid = false;
    }

    if (!formData.currentPassword) {
      errors.currentPassword = "Current password is required.";
      isValid = false;
    } else if (storedData && formData.currentPassword !== storedData.password) {
      errors.currentPassword = "Incorrect current password.";
      isValid = false;
    }

    if (!formData.newPassword) {
      errors.newPassword = "New password is required.";
      isValid = false;
    } else if (formData.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password.";
      isValid = false;
    } else if (formData.confirmPassword !== formData.newPassword) {
      errors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      
      const updatedData = JSON.parse(localStorage.getItem("userRegistration")) || {};
      updatedData.password = formData.newPassword;
      localStorage.setItem("userRegistration", JSON.stringify(updatedData));

      setSuccessMessage("Password changed successfully!");

      
      setFormData({ email: "", currentPassword: "", newPassword: "", confirmPassword: "" });

      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.email}</div>
        </div>

        <div>
          <label>Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.currentPassword}</div>
        </div>

        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.newPassword}</div>
        </div>

        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.confirmPassword}</div>
        </div>

        <button type="submit">Change Password</button>
      </form>

      {successMessage && <div style={{ color: "green", marginTop: "10px" }}>{successMessage}</div>}
    </div>
  );
};

export default ChangePassword;
