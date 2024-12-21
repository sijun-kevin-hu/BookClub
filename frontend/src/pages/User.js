import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './User.css';

const User = () => {
    const [username, setUsername] = useState('');
    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setMessage("Fetching")
                const response = await
                fetch('/api/book/', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                setMessage(data.message);
                if (data.status === 'success') {
                    setBooks(data.books);
                }
                
            }
            catch(error) {
                setMessage("Fetching server error");
            }
        };

        const fetchUser = async () => {
            try {
                setMessage("Fetching")
                const response = await
                fetch('/auth/user', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                setMessage(data.message);
                if (data.status === "success") {
                    setUsername(data.username);
                }
            }
            catch(error) {
                setMessage("Fetching Server error");
            }
        }
        fetchBooks();
        fetchUser();
    }, []);

    const handleClick = async () => {
        try {
            const response = await
            fetch("/auth/logout", {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            if (data.status === "success") {
                navigate("/login", {state:{message:"Logged out"}});
            }
        }
        catch(error) {
            setMessage('Error when logging out');
        }
    }
    
    return (
        <div className='user-page'>
            <div className='user-container'>
                <div className='user-header'>
                    <h1>Welcome, {username}!</h1>
                    <p>{message}</p>
                </div>
                <div className='user-actions'>
                    <button className='user-btn add-book-btn'><Link to='/user/addbook' id="add-book">Add Book</Link></button>
                    <button onClick={handleClick} className='user-btn logout-btn'>Log Out</button>
                </div>
                <div className='user-books'>
                    {books.length === 0 ? (
                        <p>No books found. Start by adding your favorite books!</p>
                    ) : (
                        <ul>
                            {books.map((book, index) => (
                                <li key={index} className='book-item'>
                                    <h2>{book.title}</h2>
                                    <p>Author: {book.author}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default User;