import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    hobbies: [],
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("userRegistration");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        let hobbies = [...prevData.hobbies];
        if (checked) {
          hobbies.push(value);
        } else {
          hobbies = hobbies.filter((hobby) => hobby !== value);
        }
        return { ...prevData, hobbies };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      errors.username = "Username is required.";
      isValid = false;
    }

    if (!formData.email) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format.";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    if (!formData.dob) {
      errors.dob = "Date of birth is required.";
      isValid = false;
    }

    if (!formData.gender) {
      errors.gender = "Please select your gender.";
      isValid = false;
    }

    if (formData.hobbies.length === 0) {
      errors.hobbies = "Please select at least one hobby.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      localStorage.setItem("userRegistration", JSON.stringify(formData));

      alert("Registration Successful! Redirecting to login...");

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
        gender: "",
        hobbies: [],
      });

      setErrors({});
      
      navigate("/login");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.username}</div>
        </div>

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
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.password}</div>
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.confirmPassword}</div>
        </div>

        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.dob}</div>
        </div>

        <div>
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          /> Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          /> Female
          <div style={{ color: "red" }}>{errors.gender}</div>
        </div>

        <div>
          <label>Hobbies:</label>
          <input
            type="checkbox"
            name="hobbies"
            value="Reading"
            checked={formData.hobbies.includes("Reading")}
            onChange={handleChange}
          /> Reading
          <input
            type="checkbox"
            name="hobbies"
            value="Gaming"
            checked={formData.hobbies.includes("Gaming")}
            onChange={handleChange}
          /> Gaming
          <input
            type="checkbox"
            name="hobbies"
            value="Traveling"
            checked={formData.hobbies.includes("Traveling")}
            onChange={handleChange}
          /> Traveling
          <input
            type="checkbox"
            name="hobbies"
            value="Music"
            checked={formData.hobbies.includes("Music")}
            onChange={handleChange}
          /> Music
          <div style={{ color: "red" }}>{errors.hobbies}</div>
        </div>

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <button onClick={() => navigate("/login")}>Login</button></p>
    </div>
  );
};

export default Register;
