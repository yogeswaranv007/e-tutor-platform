import React, { useState } from 'react';
import '../styles/LoginPage.css';
import logo from '../assets/logo.png';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function LogSignf() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Student');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('User Type:', userType);
  };

  const handleGoogleLogin = (credentialResponse) => {
    console.log('Google login successful:', credentialResponse);
  };

  return (
    <GoogleOAuthProvider clientId="50826592942-dt9vqijgkeul1bu4fu9t61j10ef4di8h.apps.googleusercontent.com">
      <div className="logsign-container">
        <form className="logsign-form" onSubmit={handleSubmit}>
          <div className='tutor_logo'>
            <img src={logo} alt="E-tutor logo"/>
            <span>E-Tutor</span>
          </div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="logsign-input"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="logsign-input"
            id="username"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="logsign-input"
            id="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='category-radio'>
            <label htmlFor="student">Student:</label>
            <input
              type="radio"
              id="student"
              name="userType"
              value="Student"
              checked={userType === 'Student'}
              onChange={() => setUserType('Student')}
            />
            <label htmlFor="tutor">Tutor:</label>
            <input
              type="radio"
              id="tutor"
              name="userType"
              value="Tutor"
              checked={userType === 'Tutor'}
              onChange={() => setUserType('Tutor')}
            />
          </div>
          <button className="logsign-button">Sign in</button>
          <center><p>or</p></center>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log('Google Login Failed');
            }}
          />
        </form>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LogSignf;
