import React, { useState } from 'react';
import MediumButton from '../MediumButton';
import { useNavigate } from 'react-router-dom';
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
    <div>
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <MediumButton
        onClick={handleLogin}
         label={"Login"}>
        </MediumButton>
        <MediumButton label="Dont have an account?" onClick={navigateToRegister}/>
      </form>
    </div>
  );
};

export default Login;