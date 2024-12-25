import React from 'react';
import '../../styles/homepage/Banner.css';
import rightImage from '../../assets/Banner-image.png'; 
import SearchBar from '../common/SearchBar'; 

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
        <SearchBar/>

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
