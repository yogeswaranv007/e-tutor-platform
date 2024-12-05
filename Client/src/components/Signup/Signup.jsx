import React, { useState } from 'react';
import '../../styles/Signup/Signup.css';
import GraduationCap from './../../assets/Graduation_Cap.png';
import MailIcon from './../../assets/MailIcon.png';
import UserIcon from '../../assets/UserIcon.png';
import LockIcon from '../../assets/LockIcon.png';
import GoogleIcon from '../../assets/GoogleIcon.png';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('Student');
  const [usernameAvailable, setUsernameAvailable] = useState(true);

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

  const checkUsernameAvailability = async (username) => {
    if (!username) {
      setUsernameAvailable(true); // Reset availability for empty username
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/check-username?username=${username}&table=${userType === 'Student' ? 'students' : 'tutors'}`
      );

      if (!response.ok) {
        throw new Error('Failed to check username availability.');
      }

      const data = await response.json();
      setUsernameAvailable(data.available);
    } catch (err) {
      console.error('Error checking username:', err);
      setError('Unable to check username availability. Please try again later.');
    }
  };

  return (
    <div className="logsign-container">
      <form className="logsign-form" onSubmit={handleSubmit}>
        <div className="tutor_logo">
          <img src={GraduationCap} alt="E-tutor logo" />
          <span>E-Tutor</span>
        </div>
        <div className="input-bg">
          <label htmlFor="email">Email</label>
          <div className="input-container">
            <img src={MailIcon} alt="Mail Icon" className="input-icon" />
            <input
              type="email"
              className="logsign-input"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label htmlFor="username">Username</label>
          <div className="input-container">
            <img src={UserIcon} alt="User Icon" className="input-icon" />
            <input
              type="text"
              className={`logsign-input ${usernameAvailable ? '' : 'username-taken'}`}
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
          <div className="input-container">
            <img src={LockIcon} alt="Lock Icon" className="input-icon" />
            <input
              type="password"
              className="logsign-input"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div style={{ color: 'red', fontSize: '16px', height: '15px' }}>{error}</div>}

          <div className="category-radio">
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

        <button type="submit" className="logsign-button">Sign Up</button>
        <p className="or">or</p>
        <button type="button" className="logsign-google-button">
          <img src={GoogleIcon} alt="Google Icon" className="google-icon" /> Sign Up with Google
        </button>
      </form>
    </div>
  );
}

export default Signup;
