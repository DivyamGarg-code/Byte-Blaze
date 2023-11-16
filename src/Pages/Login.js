import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const SignUp = () => {
    const [userInfo, setUserInfo] = useState({
        "name": "",
        "email": "",
        "password": "",
        "confirmPassword": "",
        "role": "user1", // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userInfo.password!==userInfo.confirmPassword){
            alert("Please fill the correct password");
        }else{
            // Handle form submission, e.g., send data to the server or perform validation
            const fetchData = async () => {
                const url = "http://localhost:3000/user/signup";
                try {
                    console.log(JSON.stringify(userInfo));
                    const data = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json", // Specify the content type as JSON
                        },
                        body: JSON.stringify(userInfo), // Convert the dummy object to JSON string
                    });
    
                    const json = await data.json();
                    console.log("Date get ",json);
                } catch (error) {
                    console.error("Error:", error);
                }
            };
    
            fetchData();
        }

        // console.log(userInfo);
        // window.location.href = "/home";
    };

    return (
        <div className='wrapper'>
            <div className='login_container'>
                <h1 className='font-bold text-2xl'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='login_form'>
                    <label>
                        Name:<br />
                        <input type="text" name="name" value={userInfo.name} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Email:<br />
                        <input type="email" name="email" value={userInfo.email} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Password:<br />
                        <input type="password" name="password" value={userInfo.password} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Confirm Password:<br />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={userInfo.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Role:<br />
                        <select name="role" value={userInfo.role} onChange={handleChange}>
                            <option value="user1">User 1</option>
                            <option value="user2">User 2</option>
                            <option value="user3">User 3</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit" className='btn'>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

const Login = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user1', // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to the server or perform validation
        console.log(userInfo);
        window.location.href = "/home";
    };

    return (
        <div className='wrapper'>
            <div className='login_container'>
                <h1 className='font-bold text-2xl'>Login</h1>
                <form onSubmit={handleSubmit} className='login_form'>
                    <label>
                        Email:<br />
                        <input type="email" name="email" value={userInfo.email} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Password:<br />
                        <input type="password" name="password" value={userInfo.password} onChange={handleChange} required />
                    </label>
                    <br />
                    <button type="submit" className='btn'>Login</button>
                </form>
            </div>
        </div>
    );
}

export const UserLoginPage = () => {
    const [activeState, setactiveState] = useState(null)
    return (
        <div className="wrapper">
            {activeState == null ? <div className='flex flex-row gap-4'>
                <div className='btn' onClick={() => { setactiveState("Sign Up") }}>Sign Up</div>
                <div className='btn' onClick={() => { setactiveState("Login") }}>Login</div>
            </div> :
                activeState == "Sign Up" ? <SignUp /> : <Login />
            }
        </div>
    );
}

