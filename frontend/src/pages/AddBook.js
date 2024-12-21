import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './AddBook.css';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting');

        const book = {
            title: title,
            author: author
        };

        try {
            const response = await
            fetch("/api/book/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            })
            const data = await response.json();
            setStatus(data.status);
            setMessage(data.message)
            if (data.status === 'success') {
                navigate("/user");
            }
        }
        catch(error) {
            setStatus("Error");
            setMessage("Server Error");
        }
    }

    const handleBackClick = () => {
        navigate("/user");
    }

    return (
        <div className='add-book-page'>
            <div className='add-book-container'>
                <h1>Add a New Book</h1>
                <button className='back-btn' onClick={handleBackClick}>&larr; Back to Books</button>
                <form className='add-book-form' onSubmit={handleSubmit}>
                    <div className='book-input'>
                        <label htmlFor='title'>Title:</label>
                        <input type="text" value={title} placeholder="Enter the title" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='book-input'>
                        <label htmlFor='author'>Author:</label>
                        <input type="text" value={author} placeholder="Enter the author" onChange={(e) => setAuthor(e.target.value)} />
                    </div>

                    <button type="submit" className='submit-btn'>Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AddBook;