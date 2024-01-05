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
<<<<<<< Updated upstream
    <div className='wrapper'>
    <div className='login'>
      <h2 className='label'>To Do List</h2>
      
      <form>
        
        {/*  Email input   */}
        <input
          className='input'                 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
       


        {/*  Password input   */}

        <input
          className='input'
          type="password"                   
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />


        {/*  Login button   */}

        <MediumButton id='loginbutton'
        onClick={handleLogin}
         label={"Login"}>                   
        </MediumButton>

        {/*  Create account redirect *DONE*   */}
        <p className='createaccount'><a  onClick={navigateToRegister} >Dont have an account yet?</a></p> 



      </form>
    </div>
=======
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
          <MediumButton id="loginbutton" label="Login" />
        </form>
        {/* Create account redirect */}
        <p className="createaccount" onClick={navigateToRegister}>
          Don't have an account yet?
        </p>
      </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default Login;