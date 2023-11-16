import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function SignUp() {
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
    };

    return (
        <div className='wrapper'>
            <div className='login_container'>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}className='login_form'>
                    <label>
                        Name:  
                        <input type="text" name="name" value={userInfo.name} onChange={handleChange} required/>
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" value={userInfo.email} onChange={handleChange} required/>
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" value={userInfo.password} onChange={handleChange} required/>
                    </label>
                    <br />
                    <label>
                        Confirm Password:
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
                        Role:
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

export default SignUp;