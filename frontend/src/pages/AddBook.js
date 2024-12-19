import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

    return (
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Author:</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />

            <button type="submit">Submit</button>
            {status && <p>Status: {status}</p>}
            {message && <p>Message: {message}</p>}
        </form>
    );
}

export default AddBook;