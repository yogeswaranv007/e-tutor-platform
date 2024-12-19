import React, { useState } from 'react';
import './../../Styles/Signup/Signup.css';
import GraduationCap from './../../assets/Graduation_Cap.png';
import MailIcon from './../../assets/MailIcon.png';
import UserIcon from '../../assets/UserIcon.png';
import LockIcon from '../../assets/LockIcon.png';
import GoogleIcon from '../../assets/GoogleIcon.png';

function Signup({ onClose = () => {} }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('Student');
  const [usernameAvailable] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !username || !password) {
      setError('All fields are required.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setError(''); // Clear any existing errors
    try {
      const endpoint = userType === 'Student' ? 'register-student' : 'register-tutor';
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
          usertype: userType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        onClose(); // Call onClose when registration is successful
      } else {
        // Handle known errors from the server
        if (data.error) {
          setError(data.error);
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred. Please check your internet connection or contact support.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="tutor_logo">
          <img src={GraduationCap} alt="E-tutor logo" />
          <span>E-Tutor</span>
        </div>
        <div className="signup-input-bg">
          <label htmlFor="email">Email</label>
          <div className="signup-input-container">
            <img src={MailIcon} alt="Mail Icon" className="signup-input-icon" />
            <input
              type="email"
              className="signup-input"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label htmlFor="username">Username</label>
          <div className="signup-input-container">
            <img src={UserIcon} alt="User Icon" className="signup-input-icon" />
            <input
              type="text"
              className={`signup-input ${usernameAvailable ? '' : 'username-taken'}`}
              id="username"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                checkUsernameAvailability(e.target.value);
              }}
            />
          </div>
          {!usernameAvailable && <p className="username-taken-msg">Username already exists</p>}

          <label htmlFor="password">Password</label>
          <div className="signup-input-container">
            <img src={LockIcon} alt="Lock Icon" className="signup-input-icon" />
            <input
              type="password"
              className="signup-input"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div style={{ color: 'red', fontSize: '16px', height: '15px' }}>{error}</div>}

          <div className="signup-category-radio">
            <div>
              <label htmlFor="student">Student</label>
              <input
                type="radio"
                id="student"
                name="userType"
                value="Student"
                checked={userType === 'Student'}
                onChange={() => setUserType('Student')}
              />
            </div>
            <div>
              <label htmlFor="tutor">Tutor</label>
              <input
                type="radio"
                id="tutor"
                name="userType"
                value="Tutor"
                checked={userType === 'Tutor'}
                onChange={() => setUserType('Tutor')}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="signup-button">Sign Up</button>
        <p className="or">or</p>
        <button type="button" className="signup-google-button">
          <img src={GoogleIcon} alt="Google Icon" className="google-icon" /> Sign Up with Google
        </button>
      </form>
    </div>
  );
}

export default Signup;