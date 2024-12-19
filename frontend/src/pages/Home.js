import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <h1>BookClub Home Page</h1>
            <div class="link">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default Home;