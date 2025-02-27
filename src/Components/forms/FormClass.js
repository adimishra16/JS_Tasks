import React from "react";

class FormClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            number: "",
            gender: "",
            hobbies: [],
            errors: {}
        };
    }

    validateForm = () => {
        let errors = {};
        let formIsValid = true;

 
        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
            formIsValid = false;
            errors["email"] = "Invalid email format.";
        }

       
        if (!this.state.number) {
            formIsValid = false;
            errors["number"] = "Number is required.";
        } else if (isNaN(this.state.number) || this.state.number <= 0) {
            formIsValid = false;
            errors["number"] = "Enter a valid positive number.";
        }

       
        if (!this.state.gender) {
            formIsValid = false;
            errors["gender"] = "Please select your gender.";
        }

        
        if (this.state.hobbies.length === 0) {
            formIsValid = false;
            errors["hobbies"] = "Please select at least one hobby.";
        }

        this.setState({ errors });
        return formIsValid;
    };

    handleChange = (e) => {
        const { name, type, value, checked } = e.target;

        if (type === "checkbox") {
            this.setState((prevState) => {
                let hobbies = [...prevState.hobbies];
                if (checked) {
                    hobbies.push(value);
                } else {
                    hobbies = hobbies.filter((hobby) => hobby !== value);
                }
                return { hobbies };
            });
        } else {
            this.setState({ [name]: value });
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            alert("Form submitted successfully!");
            this.setState({
                email: "",
                number: "",
                gender: "",
                hobbies: [],
                errors: {}
            });
        }
    };

    render() {
        return (
            <div>
                <h2>React Form with Validation</h2>
                <form onSubmit={this.handleSubmit}>
                  
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <div style={{ color: "red" }}>{this.state.errors.email}</div>
                    </div>
                    <div>
                        <label>Age:</label>
                        <input
                            type="Age"
                            name="Age"
                            value={this.state.number}
                            onChange={this.handleChange}
                        />
                        <div style={{ color: "red" }}>{this.state.errors.number}</div>
                    </div>
                    <div>
                        <label>Gender:</label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={this.state.gender === "male"}
                            onChange={this.handleChange}
                        /> Male
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={this.state.gender === "female"}
                            onChange={this.handleChange}
                        /> Female
                        <div style={{ color: "red" }}>{this.state.errors.gender}</div>
                    </div>
                    <div>
                        <label>Hobbies:</label>
                        <input
                            type="checkbox"
                            name="hobbies"
                            value="Reading"
                            checked={this.state.hobbies.includes("Reading")}
                            onChange={this.handleChange}
                        /> Reading
                        <input
                            type="checkbox"
                            name="hobbies"
                            value="Traveling"
                            checked={this.state.hobbies.includes("Traveling")}
                            onChange={this.handleChange}
                        /> Traveling
                        <input
                            type="checkbox"
                            name="hobbies"
                            value="Gaming"
                            checked={this.state.hobbies.includes("Gaming")}
                            onChange={this.handleChange}
                        /> Gaming
                        <input
                            type="checkbox"
                            name="hobbies"
                            value="Sports"
                            checked={this.state.hobbies.includes("Sports")}
                            onChange={this.handleChange}
                        /> Sports
                        <div style={{ color: "red" }}>{this.state.errors.hobbies}</div>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default FormClass;
