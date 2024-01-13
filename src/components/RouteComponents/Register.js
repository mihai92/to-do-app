import React, { useState } from 'react';
import '../../styling/Register.css'
import { useNavigate } from 'react-router';
import { async } from 'q';

const Register = () => {
  localStorage.clear();
  const navigate = useNavigate();

const [Nickname, setNickname]=useState("");
const [Email, setEmail]=useState("");
const [DOB, setDOB]=useState("");
const [PhoneNumber, setPhoneNumber]=useState("");
const [Password, setPassword]=useState("");
let userData ={Nickname,Email,DOB,PhoneNumber,Password}
const inregistrare = async (e) =>{
  e.preventDefault(); // Prevent the default form submission behavior
const response = await fetch('http://localhost:5000/SignUp', { // Using the endpoint from your backend
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
  };

  return (
    <div className='wrapper'>
    <div className='register'>
      <h2 className='registration'>Registration</h2>
      <form onSubmit={inregistrare}>
        <div>
          <input
            className='input'
            type="text"
            placeholder="Nickname"
            id="username"
            name="username"
            onChange={(e)=>setNickname(e.target.value)}
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
            onChange={(e)=>setEmail(e.target.value)}
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
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className='input'
            placeholder="Date of birth"
            type="date"
            id="DOB"
            name="DOB"
            onChange={(e)=>setDOB(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className='input'
            placeholder="Phone number"
            type="input"
            onChange={(e)=>setPhoneNumber(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className='registerbutton'>Register</button>
      </form>
    </div>
    </div>
  );
}

export default Register;