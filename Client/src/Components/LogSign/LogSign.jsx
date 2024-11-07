import React, { useState } from 'react';
import './LogSign.css';
import GraduationCap from '../../assets/Graduation_Cap.png';

function LogSignf() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, seterror] = useState('');
  const [userType, setUserType] = useState('Student');
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(password.length > 8)
    {
      seterror('')
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
  
        if (response.status === 201) {
          alert('Registration successful!');
        } else if (response.status === 400 && data.error === 'User already exists') {
          alert('Account already exists');
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
  
    }
    else
    {
      seterror('minimum 8 char')
    }
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:5000/check-username?username=${username}&table=${userType === 'Student' ? 'students' : 'tutors'}`
      );
      const data = await response.json();

      setUsernameAvailable(data.available);
    } catch (error) {
      console.error('Error checking username:', error);
    }
  };


  return (
    <div className="logsign-container">
      <form className="logsign-form" onSubmit={handleSubmit}>
        <div className="tutor_logo">
          <img src={GraduationCap} alt="E-tutor logo" />
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
          className={`logsign-input ${usernameAvailable ? '' : 'username-taken'}`}
          id="username"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            checkUsernameAvailability(e.target.value);
          }}
        />
        {!usernameAvailable && <p className="username-taken-msg">Username already exists</p>}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="logsign-input"
          id="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {
          error == ''?(
            <div style={{ height:'15px', fontSize:'12px'}}></div>
          ):
        (<div style={{color:"red", fontSize:'12px', height:'15px'}}>{error}</div>
        )
        }
        
        <div className="category-radio">
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
        <button type="submit" className="logsign-button">Sign in</button>
        <center><p>or</p></center>
        <button type="button" className="logsign-google-button">Sign in with Google</button>
      </form>
    </div>
  );
}

export default LogSignf;
