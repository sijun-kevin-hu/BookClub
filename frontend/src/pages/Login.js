import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

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
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Log In</button>
                {status && <p>Status: {status}</p>}
                {location?.state?.message && <p>{location.state.message}</p>}
            </form>
            <Link to="/">Back to Home</Link>
        </div>

    );
};

export default Login;