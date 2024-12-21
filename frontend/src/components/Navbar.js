import React from 'react';
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <a href="/">BookClub</a>
            </div>

            <div className='navbar-user'>
                <a href='/register' className='navbar-btn'>Register</a>
                <a href="/login" className='navbar-btn'>Sign In</a>
            </div>
        </nav>
    );
};

export default Navbar;