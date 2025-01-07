import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ResetPassword.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        const response = await
        fetch(`/auth/reset-password/${token}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                password: password
            })
        })
        const data = await response.json();
        if (data.status === "success") {
            setMessage('Password reset successful! You can now login with your new password.')
            navigate('/login');
        } else {
            setMessage('Failed to send reset email. Please try again.');
        }
    };
    
    return (
        <div class='reset-password-page'>
            <Navbar />
            <div className='reset-password-container'>
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit} className='reset-password-form'>
                    <div className='reset-password-input'>
                        <label htmlFor='password'>New Password:</label>
                        <input type='password' id='password' placeholder='Enter your new password' value={password} required onChange={(e) => setPassword(e.target.value)} required />
                        <button type='submit' className='submit-btn'>Reset Password</button>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
            <Footer />
        </div>
    );
};

export default ResetPassword;