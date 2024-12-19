import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const User = () => {
    const [books, setBooks] = useState([]);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setStatus("Fetching")
                const response = await
                fetch('/api/book/', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                setStatus(data.status);
                if (data.status === 'success') {
                    setBooks(data.books);
                }
                
            }
            catch(error) {
                setStatus('Error', error.message);
            }
        };
        fetchBooks();
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
                navigate("/login");
            }
        }
        catch(error) {
            setStatus('Error', error.message);
        }
    }

    if (!books.length) {
        return (
            <div>
                <h1>Your Books</h1>
                <Link to="/user/addbook">Add Book</Link>
                <button onClick={handleClick}>Log Out</button>
                <p>{status}</p>
                <p>No books found.</p>
            </div>
        );
    }
    
    return (
        <div>
            <h1>Your Books</h1>
            <Link to="/user/addbook">Add Book</Link>
            <button onClick={handleClick}>Log Out</button>
            <p>{status}</p>
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