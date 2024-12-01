import React from 'react';
import '../../styles/common/Footer.css';
import facebookIcon from '../../assets/facebook-icon.png'; 
import instagramIcon from '../../assets/instagram-icon.png'; 
import linkedinIcon from '../../assets/linkedin-icon.png'; 
import logo from '../../assets/logo.png'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo-section">
          <img src={logo} alt="E-Tutor Logo" className="footer-logo" />
          <span className="footer-title">E-Tutor</span>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#find-tutor">Find Tutor</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="footer-column">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
          <div className="footer-column social-media">
            <span>Also Connect with us via</span>
            <div className="social-icons">
            <a href="https://facebook.com"><img src={facebookIcon} alt="Facebook" /></a>
              <a href="https://instagram.com"><img src={instagramIcon} alt="Instagram" /></a>
              <a href="https://linkedin.com"><img src={linkedinIcon} alt="LinkedIn" /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright ©2024 E-Tutor.in</p>
        <a href="mailto:students-support@etutor.in" className="footer-email">students-support@etutor.in</a>
      </div>
    </footer>
  );
}

export default Footer;
