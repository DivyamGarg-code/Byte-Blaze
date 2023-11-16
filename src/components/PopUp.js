import React, { useState } from 'react'

export const PermissionPopUp = ({userInfo,setUserInfo,togglePopUp}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name);
        if ((name === 'sid' || name === 'mobile') && isNaN(value)) {
            return; // Ignore non-numeric values for SID and Mobile
        }
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to the server or perform validation
        console.log(userInfo);
        togglePopUp(); // Close It
    };

    return (
        <div className='wrapper fixed top-0 left-0'>
            <div className='wrapper fixed top-0 left-0 bg-gray-800 opacity-20'></div>
            <div className='bg-blue-300 p-6 rounded-lg z-10 shadow-md'>
                <div className='flex flex-row items-center justify-between'>
                    <h1 className='font-bold text-2xl'>Permission Details</h1>
                    <img src={require(`../images/Multiply.png`)} alt="error" className='w-4 h-4 cursor-pointer' onClick={togglePopUp}/>
                </div>

                <form onSubmit={handleSubmit} className='login_form gap-2'>
                    <label>
                        Title:<br />
                        <input type="text" name="title" value={userInfo.title} onChange={handleChange} required />
                    </label>
                    <label>
                        Description:<br />
                        <input type="text" name="description" value={userInfo.description} onChange={handleChange} required />
                    </label>
                    <label>
                        Club/Society:<br />
                        <input type="text" name="club" value={userInfo.club} onChange={handleChange} required />
                    </label>
                    <label>
                        Request By:<br />
                        <input type="text" name="request_by" value={userInfo.request_by} onChange={handleChange} required />
                    </label>
                    <label>
                        SID:<br />
                        <input type="text" name="sid" value={userInfo.sid} onChange={handleChange} required />
                    </label>
                    <label>
                        Mobile:<br />
                        <input type="text" name="mobile" value={userInfo.mobile} onChange={handleChange} required />
                    </label>
                    <button type="submit" className='btn'>Submit</button>
                </form>
            </div>
        </div>
    );
}
