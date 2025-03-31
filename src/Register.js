import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
    const [register, setRegister] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
    });

    const handleChange = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(register);

        try {
            const response = await axios.post("http://localhost:8082/api/addUser", register);
            console.log(response.data);
            alert("User added successfully");
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Failed to register user.");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Register Page</h2>

                <label>First Name:</label>
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder="Enter your first name" 
                    value={register.firstName} 
                    onChange={handleChange} 
                    required
                />
                

                <label>Last Name:</label>
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Enter your last name" 
                    value={register.lastName} 
                    onChange={handleChange} 
                    required
                />
                

                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    value={register.email} 
                    onChange={handleChange} 
                    required
                />

                <label>Phone Number:</label>
                <input 
                    type="text" 
                    name="phoneNumber" 
                    placeholder="Enter your phone number" 
                    value={register.phoneNumber} 
                    onChange={handleChange} 
                    required
                />

                <label>Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    value={register.password} 
                    onChange={handleChange} 
                    required
                />
    
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
