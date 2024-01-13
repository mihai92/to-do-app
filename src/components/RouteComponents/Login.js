import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styling/Login.css'
import { wait } from '@testing-library/user-event/dist/utils';


const Login = () => {
  localStorage.clear();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
let userData = {Email,Password}
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log('Login successful:', data.token);
        localStorage.setItem("user-info",data.token);
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

  return (
    <div className="wrapper">
      <div className="login">
        <h2 id='toplabel'>To Do List</h2>
        <form onSubmit={handleLogin}>
          {/* Email input */}
          <input
            className="input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          {/* Password input */}
          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {/* Login button */}
          <button className="loginbutton"  type='submit'> Login </button>
        </form>
        {/* Create account redirect */}
        <p className="createaccount" onClick={() => navigate('/register')}>
          Don't have an account yet?
        </p>
      </div>
    </div>
  );
};

export default Login;