import React, { useState } from "react";

const FormFunc = () => {
    const [formData, setFormData] = useState({
        email: "",
        number: "",
        gender: "",
        hobbies: [],
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!formData.email) {
            formIsValid = false;
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formIsValid = false;
            errors.email = "Invalid email format.";
        }

        if (!formData.number) {
            formIsValid = false;
            errors.number = "Number is required.";
        } else if (isNaN(formData.number) || formData.number <= 0) {
            formIsValid = false;
            errors.number = "Enter a valid positive number.";
        }

        if (!formData.gender) {
            formIsValid = false;
            errors.gender = "Please select your gender.";
        }

        if (formData.hobbies.length === 0) {
            formIsValid = false;
            errors.hobbies = "Please select at least one hobby.";
        }

        setErrors(errors);
        return formIsValid;
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("Form submitted successfully!");
            setFormData({
                email: "",
                number: "",
                gender: "",
                hobbies: [],
            });
            setErrors({});
        }
    };

    return (
        <div>
            <h2>React Form with Validation (Functional Component)</h2>
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
                    <label>Age:</label>
                    <input
                        type="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                    />
                    <div style={{ color: "red" }}>{errors.number}</div>
                </div>
                <div>
                    <label>Gender:</label>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                    />{" "}
                    Male
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                    />{" "}
                    Female
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
                    />{" "}
                    Reading
                    <input
                        type="checkbox"
                        name="hobbies"
                        value="Traveling"
                        checked={formData.hobbies.includes("Traveling")}
                        onChange={handleChange}
                    />{" "}
                    Traveling
                    <input
                        type="checkbox"
                        name="hobbies"
                        value="Gaming"
                        checked={formData.hobbies.includes("Gaming")}
                        onChange={handleChange}
                    />{" "}
                    Gaming
                    <input
                        type="checkbox"
                        name="hobbies"
                        value="Sports"
                        checked={formData.hobbies.includes("Sports")}
                        onChange={handleChange}
                    />{" "}
                    Sports
                    <div style={{ color: "red" }}>{errors.hobbies}</div>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormFunc;
