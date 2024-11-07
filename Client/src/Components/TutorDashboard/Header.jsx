import React from 'react';
import "../../Styles/TutorDashboard/Header.css";
import GraduationCap from '../../assets/Graduation_Cap.png'; // Import image correctly
import Tutor2 from "../../assets/Tutor2.png";

const Header = () => {
  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={GraduationCap} alt="E-Tutor Logo" /> {/* Use imported image */}
        <span>E-Tutor</span>
      </div>
      <ul className="navbar-nav">
        <li className="navbar-item"><a href="/">Dashboard</a></li>
        <li className="navbar-item"><a href="/chats">Chats</a></li>
        <li className="navbar-item"><a href="/about">About</a></li>
      </ul>
      <div className="navbar-login"> {/* Changed from <li> to <div> */}
        <a href="/profile" className="profile-link"> {/* Link to the profile page */}
          <img src={Tutor2} alt="Student profile pic" style={{ height: '30px', borderRadius: '50%' }} /> {/* Profile image */}
          <span>Megan Fox</span> {/* Profile name */}
        </a>
        <button className="log-out-btn" onClick={handleLogout}>Log out</button>
      </div>
    </nav>
  );
}

export default Header;
