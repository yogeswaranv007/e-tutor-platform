import React from 'react';
import '../styles/Categories.css';
import businessIcon from '../assets/business-icon.png'; 
import softwareIcon from '../assets/software-icon.png';
import financeIcon from '../assets/finance-icon.png';
import personalIcon from '../assets/personal-icon.png';
import designIcon from '../assets/design-icon.png';
import marketingIcon from '../assets/marketing-icon.png';
import healthIcon from '../assets/health-icon.png';
import photoIcon from '../assets/photo-icon.png';

const Categories = () => {
  return (
    <div className="categories-section">
      <h2 className="categories-title">Popular Categories</h2>
      <div className="categories-grid">
        <div className="category-box" style={{ backgroundColor: '#DDE5FF' }}>
          <img src={businessIcon} alt="Business" className="category-icon" />
          <p>Business</p>
        </div>
        <div className="category-box" style={{ backgroundColor: '#DFF5E5' }}>
          <img src={softwareIcon} alt="IT and Software" className="category-icon" />
          <p>IT and Software</p>
        </div>
        <div className="category-box" style={{ backgroundColor: '#FFEEDB' }}>
          <img src={financeIcon} alt="Finance and Accounting" className="category-icon" />
          <p>Finance and<br />Accounting</p>
        </div>
        <div className="category-box" style={{ backgroundColor: '#FFE3D5' }}>
          <img src={designIcon} alt="Design" className="category-icon" />
          <p>Design</p>
        </div>
        <div className="category-box" style={{ backgroundColor: '#F9F5FF' }}>
          <img src={photoIcon} alt="Photography and Video" className="category-icon" />
          <p>Photography and<br />Video</p>
        </div>
        <div className="category-box" style={{ backgroundColor: '#FFF5E4' }}>
          <img src={personalIcon} alt="Personal Development" className="category-icon" />
          <p>Personal<br />Development</p>
        </div>
        <div className="category-box" style={{ backgroundColor: '#DFF5E5' }}>
          <img src={healthIcon} alt="Health and Fitness" className="category-icon" />
          <p>Health and Fitness</p>
        </div>
        <div className="category-box" style={{ backgroundColor: '#E5E5FF' }}>
          <img src={marketingIcon} alt="Marketing" className="category-icon" />
          <p>Marketing</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
