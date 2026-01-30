import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style/login.css'
export function Login() {
  // enter keydown  
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      formSubmit(event);  // call login function
    }
  };

  const users = {
    "users": [
      { "username": "youssef", "password": "1234" },
      { "username": "name", "password": "pass" }
    ]
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const nav = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
    const userExists = users.users.some(
      (el) => el.username === username.trim() && el.password === password.trim()
    );

    if (userExists) {
      nav("/home");
    } else {
      setError(true);
    }
  };

  return (
    <div id="login-container">
      <div id="login-card">
        <h3 id="login-title">Welcome to MiniStore</h3>
        {error && <p id="login-error">Username or password is incorrect!</p>}

        <form onSubmit={formSubmit} id="login-form">
          <div className="form-group">
            <label htmlFor="username-input">Username</label>
            <input
              id="username-input"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleEnter}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password-input">Password</label>
            <input
              id="password-input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleEnter}
            />
          </div>

          <button type="submit" id="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
