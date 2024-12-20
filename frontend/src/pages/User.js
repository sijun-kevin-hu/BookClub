import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const User = () => {
    const [username, setUsername] = useState('');
    const [books, setBooks] = useState();
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

    if (!books) {
        return (
            <div>
                <h1>Your Books</h1>
                <h1>Hi, {username}!</h1>
                <Link to="/user/addbook">Add Book</Link>
                <button onClick={handleClick}>Log Out</button>
                <p>{message}</p>
                <p>No books found.</p>
            </div>
        );
    }
    
    return (
        <div>
            <h1>Hi, {username}!</h1>
            <h1>Your Books</h1>
            <Link to="/user/addbook">Add Book</Link>
            <button onClick={handleClick}>Log Out</button>
            <p>{message}</p>
            <ul>
                {books.map((book, index) => (
                    <li key={index}>
                        <h2>{book.title}</h2>
                        <p>Author: {book.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default User;