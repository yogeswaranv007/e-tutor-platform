import React from 'react';
import "../../styles/common/Header.css";
import GraduationCap from '../../assets/Graduation_Cap.png'; 
import Tutor2 from "../../assets/Tutor2.png";

const Header = () => {
  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={GraduationCap} alt="E-Tutor Logo" />
        <span><a href="/home">E-Tutor</a></span>
      </div>
      <ul className="navbar-nav">
        <li className="navbar-item"><a href="/student-dashboard">Dashboard</a></li>
        <li className="navbar-item"><a href="/find-tutors">Find Tutors</a></li>
        <li className="navbar-item"><a href="/chats">Chats</a></li>
        <li className="navbar-item"><a href="/about">About</a></li>
      </ul>
      <div className="navbar-login"> 
        <a href="/profile" className="profile-link"> 
          <img src={Tutor2} alt="Student profile pic" style={{ height: '30px', borderRadius: '50%' }} /> 
          <span>Megan Fox</span> 
        </a>
        <button className="log-out-btn" onClick={handleLogout}>Log out</button>
      </div>
    </nav>
  );
}

export default Header;
