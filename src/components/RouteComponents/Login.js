import React, { useState } from 'react';
import MediumButton from '../MediumButton';
import { useNavigate } from 'react-router-dom';
import '../../styling/Login.css'


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log('Login successful:', data);
        // Save the token in localStorage or context/state management
        // Navigate to the dashboard or home page upon successful login
        navigate('/dashboard');
      } else {
        // Handle errors such as invalid credentials
        console.error('Login failed:', data.message);
        // Optionally set an error message in state and display it to the user
      }
    } catch (error) {
      console.error('Login request failed:', error);
      // Optionally set an error message in state and display it to the user
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="wrapper">
      <div className="login">
        <h2>To Do List</h2>
        <form onSubmit={handleLogin}>
          {/* Email input */}
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          {/* Password input */}
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {/* Login button */}
          <MediumButton id="loginButton" label="Login" />
        </form>
        {/* Create account redirect */}
        <p className="createAccount" onClick={navigateToRegister}>
          Don't have an account yet?
        </p>
      </div>
    </div>
  );
};

export default Login;