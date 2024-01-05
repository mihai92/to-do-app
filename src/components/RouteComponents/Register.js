import React, { useState } from 'react';
import '../../styling/Register.css'
import { useNavigate } from 'react-router';
import { async } from 'q';

const Register = () => {
  const navigate = useNavigate();

const [Nickname, setNickname]=useState("");
const [Email, setEmail]=useState("");
const [DOB, setDOB]=useState("");
const [PhoneNumber, setPhoneNumber]=useState("");
const [Password, setPassword]=useState("");
let userData ={Nickname,Email,DOB,PhoneNumber,Password}
async function inregistrare(){
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
      <form>
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
            placeholder="email"
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
            type="input"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e)=>setDOB(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className='input'
            placeholder="phonenumber"
            type="input"
            onChange={(e)=>setPhoneNumber(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className='registerbutton' onClick={inregistrare}>Register</button>
      </form>
    </div>
    </div>
  );
}

export default Register;