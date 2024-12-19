import React, { useState } from 'react'; 
import { Link, NavLink, useNavigate } from 'react-router-dom'; 
import '../../styles/common/navbar.css'; 
import logo from '../../assets/logo.png'; 
import Modal from './Modal'; 
import LoginPage from '../../pages/LoginPage'; 
import Signup from '../Signup/Signup'; 
import { useAuth } from '../../context/AuthContext'; 

const Navbar = () => {   
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);   
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);    

  const openLoginModal = () => setIsLoginModalOpen(true);   
  const closeLoginModal = () => setIsLoginModalOpen(false);    

  const openSignupModal = () => setIsSignupModalOpen(true);   
  const closeSignupModal = () => setIsSignupModalOpen(false);    

  const handleLogout = () => {     
    logout(); 
  };    

  console.log('userType:', user?.userType);

  const navigateToProfile = () => {
    console.log('userType:', user?.userType); 
    if (user?.userType === 'Tutor') {
      navigate('/tutor-profile'); 
    } else {
      navigate('/profile');
    }
  };

  const renderNavbarLinks = () => {
    if (!user) {
      return (
        <>
          <NavLink to="/find-tutors" activeClassName="active-link">Find Tutors</NavLink>
          <NavLink to="/chats" activeClassName="active-link">Chats</NavLink>
          <NavLink to="/about" activeClassName="active-link">About</NavLink>
        </>
      );
    }

    if (user?.userType === 'Student') {
      return (
        <>
          <NavLink to="/student-dashboard" activeClassName="active-link">Dashboard</NavLink>
          <NavLink to="/find-tutors" activeClassName="active-link">Find Tutors</NavLink>
          <NavLink to="/chats" activeClassName="active-link">Chats</NavLink>
          <NavLink to="/about" activeClassName="active-link">About</NavLink>
        </>
      );
    }

    if (user?.userType === 'Tutor') {
      return (
        <>
          <NavLink to="/tutor-dashboard" activeClassName="active-link">Dashboard</NavLink>
          <NavLink to="/chats" activeClassName="active-link">Chats</NavLink>
          <NavLink to="/about" activeClassName="active-link">About</NavLink>
        </>
      );
    } 

    return (
      <>
        <NavLink to="/find-tutors" activeClassName="active-link">Find Tutors</NavLink>
        <NavLink to="/chats" activeClassName="active-link">Chats</NavLink>
        <NavLink to="/about" activeClassName="active-link">About</NavLink>
      </>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="E-Tutor Logo" />
          <span className="navbar-title">E-Tutor</span>
        </Link>
      </div>
      
      <div className="navbar-links">
        {renderNavbarLinks()}
      </div>
      
      <div className="navbar-buttons">
        {user ? (
          <div className="user-info">
            <img 
              src={user?.profilePicture || '/default-profile.png'} 
              alt="Profile" 
              className="profile-pic"
              onClick={navigateToProfile}
              style={{ cursor: 'pointer' }}
            />
            <span 
              className="username" 
              onClick={navigateToProfile}
              style={{ cursor: 'pointer' }}
            >
              {user?.username}
            </span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <button className="btn-signup" onClick={openSignupModal}>Sign up</button>
            <button className="btn-login" onClick={openLoginModal}>Log in</button>
          </>
        )}
      </div>
      
      {/* Login Modal */}
      {isLoginModalOpen && (
        <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
          <LoginPage onClose={closeLoginModal} />
        </Modal>
      )}
      
      {/* Signup Modal */}
      {isSignupModalOpen && (
        <Modal isOpen={isSignupModalOpen} onClose={closeSignupModal}>
          <Signup onClose={closeSignupModal} />
        </Modal>
      )}
    </nav>
  ); 
};  

export default Navbar;
