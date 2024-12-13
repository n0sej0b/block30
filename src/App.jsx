import { useState } from "react";
import "./index.css";
import Register from "./components/Register.jsx";
import Account from "./components/Account.jsx";
import Books from "./components/Books.jsx";
import Home from "./components/Home.jsx";
import LoginForm from "./components/Login.jsx";
import Navbar from "./Navbar";
import Singlebook from "./components/SingleBook.jsx";
import { BrowserRouter,Routes,Route,Link,useNavigate,Navigate,} from "react-router-dom";
import Login from "./components/Login.jsx";


function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [rBook,setRbook] = useState();

  const handleLogin = (username, password) => {
    if (username && password) {
      setIsLoggedIn(true);
      setError("");
      navigate("/account");
    } else {
      setError("Please enter both username and password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              {!isLoggedIn ? (
                <div className="LBox">
                  <br />
                  <div>
                    <Link
                      className="Register"
                      style={{ fontSize: "28px", color: "cyan" }}
                      to="/register"
                    >
                      Register
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="login"
                      style={{ fontSize: "28px", color: "cyan" }}
                      to="/login"
                    >
                      Login
                    </Link>
                  </div>
                  {error && <div style={{ color: "red" }}>{error}</div>}
                </div>
              ) : (
                <div>
                  <h3>Welcome to your account!</h3>
                  <div>
                    <Link to="/account">Go to Account</Link>
                  </div>
                  <div>
                    <Link to="/books">View Books</Link>
                  </div>
                </div>
              )}
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account rBook={rBook} setRbook={setRbook} account={account} setAccount={setAccount} token={token} />} />
        <Route path="/books" element={<Books token={token} account={account} />} />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />

        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<Singlebook />} />
      </Routes>

      <div
        style={{ backgroundColor: "crimson", height: "5px", width: "100%" }}
      />
      <div className="background-container" />
    </>
  );
}

// Main App component
function App() {
  return (
    <BrowserRouter>
      <h2
        style={{
          fontSize: "28px",
          backgroundColor: "crimson",
          textAlign: "center",
        }}
      >
        We Read Good
      </h2>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
