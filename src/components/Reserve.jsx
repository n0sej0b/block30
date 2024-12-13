import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BookList({ token, user }) {
  const [books, setBooks] = useState([]);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/docs/#-get-api-books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleReserve(bookId) {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/docs/#-get-api-reservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookId,
            userId: user.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reserve book");
      }

      await fetchBooks();

      alert("Book reserved successfully!");
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <div>Error: {error}</div>;
  if (!books.length) return <div>No books available</div>;

  return (
    <div className="book-list">
      <h2>Available Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-details">
              <img
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                loading="lazy"
              />
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Status: {book.available ? "Available" : "Reserved"}</p>
              <button
                onClick={() => handleReserve(book.id)}
                disabled={!book.available}
                className={`reserve-button ${
                  !book.available ? "disabled" : ""
                }`}
              >
                {book.available ? "Reserve Book" : "Currently Reserved"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
