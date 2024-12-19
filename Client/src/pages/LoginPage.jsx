import React, { useState } from 'react';
import './../styles/LoginPage.css';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext
import GraduationCap from '../assets/Graduation_Cap.png';
import MailIcon from '../assets/MailIcon.png';
import LockIcon from '../assets/LockIcon.png';
import GoogleIcon from '../assets/GoogleIcon.png';

function Login({ onClose = () => {}, onSignup = () => {} }) {
  const { login } = useAuth(); // Use login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Student'); // Added user type selection
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    setError(''); // Clear any existing errors
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, userType}), // Include user type in the request
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        login(data.user); // Set the logged-in user data in the context
        onClose(); // Close the login modal
      } else {
        setError(data.error || 'User does not exist. Please sign up.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(
        'An unexpected error occurred. Please check your internet connection or contact support.'
      );
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="tutor_logo">
          <img src={GraduationCap} alt="E-tutor logo" />
          <span>E-Tutor</span>
        </div>
        <div className="login-input-bg">
          <label htmlFor="email">Email</label>
          <div className="login-input-container">
            <img src={MailIcon} alt="Mail Icon" className="login-input-icon" />
            <input
              type="email"
              className="login-input"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="login-input-container">
            <img src={LockIcon} alt="Lock Icon" className="login-input-icon" />
            <input
              type="password"
              className="login-input"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-category-radio">
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

          {error && <div className="error-message">{error}</div>}

          <div className="forgot-password">
            <a href="#forgot-password">Forgot Password?</a>
          </div>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        <p className="or">or</p>
        <button
          type="button"
          className="login-google-button"
          onClick={() => alert('Google login functionality is not implemented yet.')}
        >
          <img src={GoogleIcon} alt="Google Icon" className="google-icon" /> Log In with Google
        </button>

        <div className="signup-link">
          Don't have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSignup(); // Open the signup modal
            }}
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
