import React, { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/book/").then(
      res => res.json()
    ).then(
      data => {
        console.log(data)
        setBooks(data)
      }
    )
  }, [])

  return (
    <div>App</div>
  )
}

export default App
