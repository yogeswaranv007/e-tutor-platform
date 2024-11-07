import React from 'react';
import '../styles/Banner.css';
import rightImage from '../assets/Banner-image.png'; 
import searchIcon from '../assets/search-icon.png'; 

const Banner = () => {
  return (
    <div className="banner">
      <div className="content-wrapper">
        <div className="content">
          <div className="text-section">
            <pre className="banner-text">Connect with Expert<br />
                      Tutors Anytime,<br />
                            Anywhere!</pre>
          </div>
          <div className="image-section">
            <img src={rightImage} alt="Tutoring session" />
          </div>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="What would you like to learn?" />
          <button className="search-button">
            <img src={searchIcon} alt="Search" className="search-icon" />
          </button>
        </div>

        <div className="most-searched">
          <span>Most searched :</span>
          <button>Algebra</button>
          <button>Calculus</button>
          <button>CSS</button>
          <button>Java</button>
          <button>Python</button>
          <button>Javascript</button>
          <button>Html</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
