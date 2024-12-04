/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React, { useEffect, useState } from 'react';

const Books = () => {
  const [books, setBooks] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const [checkOut, setCheckOut] = useState([]); 

  // Function to handle removing books (checked-out books)
  const removeBook = (index) => {
    const bookToCheckout = books[index]; 
    setCheckOut((prevCheckOut) => [...prevCheckOut, bookToCheckout]); // Add the book to the checked-out list
    setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index)); // Remove the book from available books
  };

  
  useEffect(() => {
    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books')
      .then((response) => response.json()) 
      .then((data) => {
        setBooks(data.books);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error if fetching fails
  }

  return (
    <div>
      <h3 style={{ fontSize: '28px', backgroundColor: 'crimson', textAlign: 'center' }}>Available Books</h3>
      
      <form onSubmit={(e) => e.preventDefault()}> 
        <div style={styles.container}>
          <div style={styles.grid}>
            {books.map((book, index) => (
              <div style={{ fontSize: '18px', color: 'cyan' }} key={book.id}>
                <p>{book.author}</p>
                <img src={book.coverimage} width={200} height={250} alt={book.title} />
                <button 
                  onClick={() => removeBook(index)} 
                  disabled={checkOut.includes(book)} 
                >
                  Check Out
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>

      <div>
        <h3>Checked Out Books:</h3>
        {checkOut.length === 0 ? (
          <p>No books checked out yet.</p>
        ) : (
          <ul>
            {checkOut.map((book, index) => (
              <li key={index}>
                <p>{book.author} - {book.title}</p>
                <img src={book.coverimage} width={100} height={125} alt={book.title} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    paddingTop: '50px', 
    gap: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', 
    gap: '10px', 
  },
  button: {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Books;




