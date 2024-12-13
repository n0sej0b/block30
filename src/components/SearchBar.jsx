import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ catalog, setBookId }) {
  const [searchFilter, setSearchFilter] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    const lowercaseQuery = query.toLowerCase().trim();
    if (!lowercaseQuery) {
      setSearchFilter([]);
      return;
    }

    const filteredResults = catalog.filter(
      (book) =>
        book.author.toLowerCase().includes(lowercaseQuery) ||
        book.title.toLowerCase().includes(lowercaseQuery)
    );
    setSearchFilter(filteredResults);
  }, [query, catalog]);

  const handleBookClick = useCallback(
    (bookId) => {
      setBookId(bookId);
      navigate(`/books/${bookId}`);
    },
    [setBookId, navigate]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      handleSearch();
    },
    [handleSearch]
  );

  const handleInputChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchFilter.length) return null;

    return searchFilter.map((book) => (
      <li
        key={book.id}
        id={book.id}
        className="book-card"
        onClick={(e) => {
          e.preventDefault();
          handleBookClick(book.id);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleBookClick(book.id);
          }
        }}
      >
        <p className="title">{book.title}</p>
        <img
          src={book.coverimage}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          width="150"
          height="200"
        />
        <p className="author">{book.author}</p>
        {!book.available && <p className="checked-out">checked out</p>}
      </li>
    ));
  }, [searchFilter, handleBookClick]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Search books"
        className="search-form"
      >
        <label
          style={{ display: "block", color: "cyan" }}
          htmlFor="search-input"
        >
          Search by title or author:
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter author or title"
            aria-label="Search by author or title"
            autoComplete="off"
          />
        </label>
        <button type="submit" aria-label="Search">
          Search
        </button>
      </form>
      {searchFilter.length > 0 && (
        <ul id="catalog" aria-live="polite">
          {searchResults}
        </ul>
      )}
    </>
  );
}
