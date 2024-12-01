import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/common/navbar.css';
import logo from '../../assets/logo.png';
import Modal from './Modal';
import LoginPage from '../../Pages/LoginPage';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to=""><img src={logo} alt="E-Tutor Logo" /></Link>
        <span className="navbar-title">E-Tutor</span>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/find-tutors">Find Tutors</Link>
        <Link to="/become-tutor">Become a Tutor</Link>
        <Link to="/chats">Chats</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="navbar-buttons">
        <button className="btn-signup">Sign up</button>
        <button className="btn-login" onClick={openModal}>Log in</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <LoginPage />
      </Modal>
    </nav>
  );
};

export default Navbar;
