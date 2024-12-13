
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

export default function SingleBook({ user, token }) {
    const [bookState, setBookState] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();
    

    useEffect(() => {
        fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
          .then((response) => response.json()) 
          .then((data) => {
            setBookState(data.book);
            
            console.log(data.book);
          })
          .catch((error) => {
            setError(error);
            
          });
      }, []); 
    


    
    function handleReserve(){}
        

    

    

    if (error) return (
        <div>
            Error: {error}
            <button onClick={() => setBookState(prev => ({ ...prev, error: null }))}>Retry</button>
        </div>
    );
    if (!bookState) return <div>Book not found</div>;

    return (
        <div className="single-book-container">
            <h2>{bookState.title}</h2>
            <p><strong>Author:</strong> {bookState.author}</p>
            <p><strong>Description:</strong> {bookState.description || "No description available"}</p>
            <img src={bookState.coverimage} alt={bookState.title} loading="" />
            <p><strong>Status:</strong> {bookState.available ? "Available" : "Checked Out"}</p>
            {bookState.available && token && (
                <button onClick={handleReserve}>Reserve this book</button>
            )}
        </div>
    );
}
