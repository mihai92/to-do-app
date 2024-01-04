import React, { useState } from 'react';
import '../../styling/Register.css'
import { useNavigate } from 'react-router';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
  
    const userData = {
      Username: formData.username,
      Email: formData.email,
      Password: formData.password,
    };
  
    try {
      const response = await fetch('/SignUp', { // Using the endpoint from your backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        console.log('Registration successful:', data);
        navigate('/login');
      } else {
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Registration request failed:', error);
    }
  };

  return (
    <div className='wrapper'>
    <div className='register'>
      <h2 className='registration'>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className='input'
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className='input'
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className='input'
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className='input'
            placeholder="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className='registerbutton'>Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;