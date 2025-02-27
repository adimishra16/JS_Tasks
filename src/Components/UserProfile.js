import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    gender: "",
    hobbies: [],
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
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

  const handleSave = () => {
    if (validateForm()) {
      localStorage.setItem("userRegistration", JSON.stringify(formData));
      alert("Profile updated successfully!");
      setIsEditing(false);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      
      <div>
        <label>Username:</label>
        {isEditing ? (
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        ) : (
          <p>{formData.username}</p>
        )}
        <div style={{ color: "red" }}>{errors.username}</div>
      </div>

      <div>
        <label>Email:</label>
        {isEditing ? (
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        ) : (
          <p>{formData.email}</p>
        )}
        <div style={{ color: "red" }}>{errors.email}</div>
      </div>

      <div>
        <label>Date of Birth:</label>
        {isEditing ? (
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        ) : (
          <p>{formData.dob}</p>
        )}
        <div style={{ color: "red" }}>{errors.dob}</div>
      </div>

      <div>
        <label>Gender:</label>
        {isEditing ? (
          <>
            <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male
            <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female
          </>
        ) : (
          <p>{formData.gender}</p>
        )}
        <div style={{ color: "red" }}>{errors.gender}</div>
      </div>

      <div>
        <label>Hobbies:</label>
        {isEditing ? (
          <>
            <input type="checkbox" name="hobbies" value="Reading" checked={formData.hobbies.includes("Reading")} onChange={handleChange} /> Reading
            <input type="checkbox" name="hobbies" value="Gaming" checked={formData.hobbies.includes("Gaming")} onChange={handleChange} /> Gaming
            <input type="checkbox" name="hobbies" value="Traveling" checked={formData.hobbies.includes("Traveling")} onChange={handleChange} /> Traveling
            <input type="checkbox" name="hobbies" value="Music" checked={formData.hobbies.includes("Music")} onChange={handleChange} /> Music
          </>
        ) : (
          <p>{formData.hobbies.join(", ")}</p>
        )}
        <div style={{ color: "red" }}>{errors.hobbies}</div>
      </div>

      {isEditing ? (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
      )}

      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
};

export default UserProfile;
