import { useState } from 'react'
import '../index.css';
import Register from "./Register.jsx";
import Account from "./Account.jsx";
import Books from "./Books.jsx";


import Navbar from '../Navbar';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';



function App() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    
    if (!username || !password) {
      setError('Both fields are required!');
      setLoading(false);
      return;
    }

   
    try {
      
      const BackendResponse = { username: '', password: '' };

      
      if (username === BackendResponse.username && password === BackendResponse.password) {
        setIsLoggedIn(true);
        setLoading(false);
        setUsername('');
        setPassword('');
      } else {
        setError('Invalid username or password');
        setLoading(false);
      }
    } catch (err) {
      setError('Something went wrong! Please try again.');
      setLoading(false);
    }
  };
  

  return (
    
  <BrowserRouter>
    <div>
      <Navbar />
      
    </div>
      
    
      
        


        
        
      
    
      
     
    <div className="App">
      <div >
      <h1 style={{fontSize: "28px", backgroundColor: 'crimson', textAlign: 'center'}}>We Read Good</h1>
      <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
        <div className="input-fields">
          <div className="input-group">
            <label style={{color:'azure',textAlign: 'center'}} htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label style={{color:'azure',textAlign: 'center'}} htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
      </div>
      
      {!isLoggedIn ? (
        <>
        <div className='LBox'>
          
          
          <Link className='Register' style={{fontsize: '28px',color:'cyan'}} to="register">Register</Link>
          <Routes>
          
          <Route path="/register" element={<Register />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Books" element={<Books />} />
          {/* <Route path="/Contact" element={<Contact />} /> */}
        
         
         </Routes>
        

      <br></br>
          
      
            
            
          
                   
          {/* Error message */}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      
        <div style={{backgroundColor: 'crimson', height: '5px',width: '100%' }}></div>           
  
        <div className="background-container"></div>

        
        </>

        
      ) : (
        <div>
          <h2>Welcome, {username}!</h2>
          <p>You are logged in.</p>
        </div>
      )}
    </div>
    
     
    
</BrowserRouter>




  );
}


export default App;




















