import React from 'react';
import { useState } from 'react';
import axios from "axios";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

function Login () {

    const [password, setPasswordValue] = useState("");
    const [userId, setUserIdValue] = useState("");
    const navigate = useNavigate();

    const setPassword = (e) => {
        setPasswordValue(e.target.value);
    }

    const setUserId = (e) => {
        setUserIdValue(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //api call
        console.log("this is our data " + userId +"   "+ password);

        //craete an object with userId and password for passing the api
        const data = {
            "userId": userId,
            "password": password
        }

        try{
            const response = await axios.post("http://localhost:8082/api/loginUser", data);

            console.log("this is the response " + response.data);
            if(!response.data) {
                alert("Invalid UserId or Password");
            }
            else {
                navigate('/home');
            }
        } catch(error) {
            console.log(error);
        }
    }

    const redirectToRegister = () => {
        window.location.href = "/register";
    }

    return (
        <>
        <div className='container'>
            <form onSubmit={handleSubmit}>
            <h1> Login Page </h1>

                <label>User ID:</label>
                <input type="email" placeholder="Enter your User ID" value={userId} onChange={setUserId}></input>

                <label>Password:</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={setPassword}></input>
                

                <a onClick={redirectToRegister}>don't have an account</a>
                <button type="submit">Login</button>
            </form>
        </div>
        </>
    )
}
export default Login;