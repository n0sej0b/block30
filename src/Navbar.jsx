import React from 'react';
import './index.css'; 
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
    <ul className="navbar-list">
      <li className="navbar-item">
        <Link to="/" className="navbar-link">Home</Link> 
      </li>
      <li className="navbar-item">
        <Link to="/Account" className="navbar-link">Account</Link> 
      </li>
      <li className="navbar-item">
        <Link to="/books" className="navbar-link">Books</Link> 
      </li>
      
    </ul>
  </nav>
);
}

export default Navbar;