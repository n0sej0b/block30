/* TODO - add your code to create a functional React component that renders a registration form */


import React, { useState } from 'react';
import App from '../App.jsx';




import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function Register() {
  // Declare state variables for form fields and validation
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic form validation
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (!name || !email || !password) {
      setError('All fields are required!');
      setLoading(false);
      return;
    }

    
    try {
      const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/docs/#-post-api-users-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        setIsRegistered(true);
        setLoading(false);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError('Failed to register. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('Something went wrong! Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      {isRegistered ? (
        <h2>Registration Successful! You can now log in.</h2>
      ) : (
        <div>
          <h1>Create an Account</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      )}
    </div>
  );
}

export default Register;