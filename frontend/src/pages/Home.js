import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import './Home.css';

const Home = () => {
    return (
        <div className='container'>
            <Navbar />
            <div className='hero'>
                <HeroSection />
            </div>
            <Footer />
        </div>
    );
};

export default Home;