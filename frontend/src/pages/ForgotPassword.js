import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ForgotPassword.css';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        const response = await
        fetch('/auth/forgot-password', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: email 
            })
        })
        const data = await response.json();
        if (data.status === "success") {
            setMessage('Password reset email sent! Check your inbox.')
        } else {
            setMessage('Failed to send reset email. Please try again.');
        }
    };
    
    return (
        <div class='forgot-password-page'>
            <Navbar />
            <div className='forgot-password-container'>
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit} className='forgot-password-form'>
                    <div className='forgot-password-input'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' id='forgot-password-email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <button type='submit' className='submit-btn'>Send Email</button>
                    </div>
                </form>
                {message && <p>{message}</p>}
                <p>After submitting your email, a link will be sent to confirm reset password</p>
            </div>
            <Footer />
        </div>
    );
};

export default ForgetPassword;