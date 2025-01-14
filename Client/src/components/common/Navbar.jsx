import React, { useState, useEffect } from 'react'; 
import { Link, NavLink, useNavigate } from 'react-router-dom'; 
import '../../styles/common/navbar.css'; 
import logo from '../../assets/logo.png'; 
import ProfileIcon from '../../assets/ProfileIcon.png';
import Modal from './Modal'; 
import LoginPage from '../../pages/LoginPage'; 
import Signup from '../Signup/Signup'; 
import { useAuth } from '../../context/AuthContext'; 
import axios from 'axios';

const Navbar = () => {   
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);   
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);    
  const [profileImage, setProfileImage] = useState(ProfileIcon);

  const openLoginModal = () => setIsLoginModalOpen(true);   
  const closeLoginModal = () => setIsLoginModalOpen(false);    
  const openSignupModal = () => setIsSignupModalOpen(true);   
  const closeSignupModal = () => setIsSignupModalOpen(false);    

  useEffect(() => {
    if (user) {
      fetchProfileImage();
    }
  }, [user]);

  const fetchProfileImage = async () => {
    try {
      if (!user) return;

      const response = await axios.get(`/api/profile/image/${user._id}`, {
        params: { userType: user.userType },
        responseType: 'arraybuffer'
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const imageUrl = URL.createObjectURL(blob);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error('Failed to fetch profile image:', error);
      setProfileImage(ProfileIcon);
    }
  };

  const handleLogout = () => {     
    logout(); 
    setProfileImage(ProfileIcon);
  };    

  const navigateToProfile = () => {
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
          <NavLink to="/about" activelassname="active-link">About</NavLink>
        </>
      );
    }

    if (user?.userType === 'Student') {
      return (
        <>
          <NavLink to="/student-dashboard" activelassname="active-link">Dashboard</NavLink>
          <NavLink to="/find-tutors" activelassname="active-link">Find Tutors</NavLink>
          <NavLink to="/chats" activelassname="active-link">Chats</NavLink>
          <NavLink to="/about" activelassname="active-link">About</NavLink>
        </>
      );
    }

    if (user?.userType === 'Tutor') {
      return (
        <>
          <NavLink to="/tutor-dashboard" activelassname="active-link">Dashboard</NavLink>
          <NavLink to="/chats" activelassname="active-link">Chats</NavLink>
          <NavLink to="/about" activelassname="active-link">About</NavLink>
        </>
      );
    } 

    return (
      <>
        <NavLink to="/find-tutors" activelassname="active-link">Find Tutors</NavLink>
        <NavLink to="/chats" activelassname="active-link">Chats</NavLink>
        <NavLink to="/about" activelassname="active-link">About</NavLink>
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
              src={profileImage} 
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
      
      {isLoginModalOpen && (
        <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
          <LoginPage onClose={closeLoginModal} />
        </Modal>
      )}
      
      {isSignupModalOpen && (
        <Modal isOpen={isSignupModalOpen} onClose={closeSignupModal}>
          <Signup onClose={closeSignupModal} />
        </Modal>
      )}
    </nav>
  ); 
};  

export default Navbar;