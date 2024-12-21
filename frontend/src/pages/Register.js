import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting');
        const user = {
            username: username,
            email: email,
            password: password
        };
        try {  
            const response = await
            fetch("/auth/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const data = await response.json();
            setStatus(data.status);
            if (data.status === 'success') {
                navigate("/login");
            }
        }
        catch (error) {
            setStatus('Error');
        }
    };

    return (
        <div className='register-page'>
            <Navbar />
            <div className='register-container'>
                <form className='register-form' onSubmit={handleSubmit}>
                    <div className='register-input'>
                        <label htmlFor='username'>Username:</label>
                        <input type="text" name="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div className='register-input'>
                        <label htmlFor='email'>Email:</label>
                        <input type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <label htmlFor='password'>Password:</label>
                    <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" class="submit-btn">Register</button>
                    <div className='links'>
                        <a href='/login'>Have an account? Sign In</a>
                    </div>
                    {status && <p>Status: {status}</p>}
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Register;