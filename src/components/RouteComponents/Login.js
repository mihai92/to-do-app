import React, { useState } from 'react';
import MediumButton from '../MediumButton';
import { useNavigate } from 'react-router-dom';
import '../../styling/Login.css'



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // logica buton login
    console.log('Login clicked');
  };
const navigateToRegister = () => {
navigate('/register');
}
  return (
    <div className='login'>
      <h2 className='label'>To Do List</h2>
      
      <form>
        
        <input
          className='input'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
       
        <input
          className='input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <MediumButton id='loginbutton'
        onClick={handleLogin}
         label={"Login"}>
        </MediumButton>
        <p className='createaccount'><a  onClick={navigateToRegister} >Dont have an account yet?</a></p>
      </form>
    </div>
  );
};

export default Login;