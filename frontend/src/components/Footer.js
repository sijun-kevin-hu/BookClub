import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <p>&copy; 2024 BookClub. All rights reserved.</p>
            <div className='legal'>
                <a href="/terms">Terms of Services</a>
                <a href="/privacy">Privacy Policy</a>
            </div>
        </footer> 
    );
};

export default Footer;