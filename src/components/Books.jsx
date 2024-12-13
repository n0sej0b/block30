/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";


const Book = ({token,account,rBook,setRbook}) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [checkOut, setCheckOut] = useState([]);
  const [bookId, setBookId] = useState(null);
  

  let navigate = useNavigate();

  // Function to handle removing books (checked-out books)
  const removeBook = (index) => {
    const bookToCheckout = books[index];
    setCheckOut((prevCheckOut) => [...prevCheckOut, bookToCheckout]);
    setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
  };

  const handleBookClick = (book) => {
    navigate(`/books/${book.id}`);
  };

  useEffect(() => {
    fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.books);

        console.log(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);


  async function handleReserve(id) {
    if (!token) {
      navigate("/login");
      return;
    }

  try {
   await fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          available:false,
        }),      
      } 
    ); 
  }
  catch(error) {
    setError(error);
  }
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  

  return (
    <div
      style={{ fontSize: "28px", backgroundColor: "#333", textAlign: "center" }}
    >
      <h3
        style={{
          fontSize: "28px",
          backgroundColor: "crimson",
          textAlign: "center",
        }}
      >
        Available Books
      </h3>
      <SearchBar catalog={books} setBookId={setBooks} />

      <form onSubmit={(e) => e.preventDefault()}>
        <div style={styles.container}>
          <div style={styles.grid}>
            {books.map((book, index) => (
              <div style={{ fontSize: "18px", color: "cyan" }} key={book.id}>
                <p>{book.author}</p>
                <img
                  src={book.coverimage}
                  width={200}
                  height={250}
                  alt={book.title}
                  onClick={(e) => {
                    e.preventDefault();
                    handleBookClick(book);
                  }}
                />
                <button
                  onClick={() => handleReserve(book.id)}
                  disabled={checkOut.includes(book)}
                >
                  Check Out/Reserve
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
                <p>
                  {book.author} - {book.title}
                </p>
                <img
                  src={book.coverimage}
                  width={100}
                  height={125}
                  alt={book.title}
                />
                
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
    display: "grid",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    paddingTop: "50px",
    gap: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
  },
  button: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Book;
