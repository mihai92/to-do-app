import React, { useState } from 'react';
import MediumButton from '../MediumButton';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // logica buton login
    console.log('Login clicked');
  };

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
        onClick={console.log("merge?")} label={"Login"}>
        </MediumButton>
      </form>
    </div>
  );
};

export default Login;