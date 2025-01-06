import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await
                fetch('/auth/user', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                if (data.status === "success") {
                    navigate("/user")
                }
            }
            catch(error) {
                
            }
        };
        checkUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting')
        const user = {
            email: email,
            password: password
        };

        try {
            const response = await
            fetch("/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const data = await response.json();
            setStatus(data.status);
            if (data.status === 'success') {
                navigate("/user")
            }

        }
        catch(error) {
            setStatus("Error")
        }
    };

    return (
        <div className='login-page'>
            <Navbar />
            <div className='login-container'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='input'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='input'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder='Enter your email' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className='submit-btn'>Log In</button>
                    <div className='links'>
                        <a href="/forgot-password">Forgot Password?</a>
                        <a href="/register">Don't have an account? Register</a>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Login;