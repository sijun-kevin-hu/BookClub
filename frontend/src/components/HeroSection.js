import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <div className='hero'>
            <h1>Welcome to BookClub!</h1>
            <p>Track your reading progress, discover new books, and share your favorites with others.</p>
            <p>Join the BookClub community and start logging your pages!</p>
            <div className='hero-btns'>
                <a href='/login' className='hero-btn'>Sign In</a>
                <a href='/register' className='hero-btn'>Register</a>
            </div>
        </div>
    );
};

export default HeroSection;