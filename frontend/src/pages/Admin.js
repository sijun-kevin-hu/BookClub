import React, { useState, useEffect } from 'react';

const Admin = () => {
    const [users, setUsers] = useState();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const response = await
                fetch('/auth/all', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                setMessage(data.message);
                if (data.status === "success") {
                    setUsers(data.users);
                }
            }
            catch(error) {
                setMessage("Fetching user error")
            }
        }
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>All Users</h1>
            {message && <p>{message}</p>}
            <ul>
                {users && users.map((user, index) => (
                    <li key={index}>
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                        <p>{user.password}</p>
                        {user.books && user.books.map((book, ind) => {
                            <li key={ind}>
                                <h2>{book.title}</h2>
                                <p>{book.author}</p>
                            </li>
                        })}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;