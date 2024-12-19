import React, { useState } from 'react';
import SearchBar from '../components/common/SearchBar';
import '../styles/FindTutors.css';


import ProfileImage1 from '../assets/Ana_de_armas.png';
import StarImage from '../assets/Star-image.png';
import ProfileImage2 from '../assets/Sydney_Sweeney.png';
import ProfileImage3 from '../assets/Joseph.svg';
import dropdownIcon from '../assets/dropdown-icon.png';

function FindTutors() {
  const [sortByOpen, setSortByOpen] = useState(false);

  const toggleSortByDropdown = () => {
    setSortByOpen(!sortByOpen);
  };

  return (
    <div className="find-tutors-page">
      <div className="search-section">
        <SearchBar />
        <h2>These <span className="highlight">Tutors</span> Fit your Choice</h2>
      </div>
      <div className="main-content1">
        <div className="filters">
          <h2>Filters</h2>
          <h3>Availability</h3>
          <div className="checkbox-group">
            <label><input type="checkbox" /> Today</label>
            <label><input type="checkbox" /> Tomorrow</label>
            <label><input type="checkbox" /> This week</label>
          </div>

          <h3>Language</h3>
          <div className="custom-dropdown">
            <select>
              <option>Select</option>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
            <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
          </div>

          <h3>Subject</h3>
          <div className="custom-dropdown">
            <select>
              <option>Select</option>
              <option>Algebra</option>
              <option>Geometry</option>
              <option>Calculus</option>
            </select>
            <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
          </div>

          <h3>Price</h3>
          <div className="custom-dropdown">
            <select>
              <option>Select</option>
              <option>Rs. 0 - Rs. 500</option>
              <option>Rs. 500 - Rs. 1000</option>
              <option>Rs. 1000 - Rs. 1500</option>
            </select>
            <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
          </div>

          <h3>Experience</h3>
          <div className="custom-dropdown">
            <select>
              <option>Select</option>
              <option>Less than 1 year</option>
              <option>1 - 3 years</option>
              <option>3 - 5 years</option>
              <option>5+ years</option>
            </select>
            <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
          </div>
        </div>

        <div className="tutor-profiles">
          <div className="sort-by">
            <label>Sort By:</label>
            <div className="custom-dropdown">
            <select>
              <option>Select</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Ratings</option>
              <option>Experience</option>
            </select>
              <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
            </div>
          </div>
          <div className="tutor-card">
            <img src={ProfileImage1} alt="Tutor Profile" className="profile-pic" />
            <div className="tutor-details">
              <h2>Ana de Armas</h2>
              <p>Engineer with Extensive Algebra Knowledge and Tutoring Experience</p>
              <p style={{ fontSize: 18, color: '#333' }}>Hourly rate: Rs.100</p>
            </div>
            <div className="tutor-ratings">
              <p style={{ color: '#FE6635', fontSize: 25 }}>Ratings</p>
              <div className="star-rating">
                <img src={StarImage} alt="Star rating" />
              </div>
              <p>5.0 (123)</p>
              <p>1608 hours of Tutoring</p>
              <button className="view-profile-btn">View Profile</button>
            </div>
          </div>

          <div className="tutor-card">
            <img src={ProfileImage2} alt="Tutor Profile" className="profile-pic" />
            <div className="tutor-details">
              <h2>Sydney Sweeney</h2>
              <p>Experienced Tutor with 5+ Years Teaching High School/Undergrad Math</p>
              <p style={{ fontSize: 18, color: '#333' }}>Hourly rate: Rs.150</p>
            </div>
            <div className="tutor-ratings">
              <p style={{ color: '#FE6635', fontSize: 25 }}>Ratings</p>
              <div className="star-rating">
                <img src={StarImage} alt="Star rating" />
              </div>
              <p>5.0 (100)</p>
              <p>1412 hours of Tutoring</p>
              <button className="view-profile-btn">View Profile</button>
            </div>
          </div>

          <div className="tutor-card">
            <img src={ProfileImage3} alt="Tutor Profile" className="profile-pic" />
            <div className="tutor-details">
              <h2>Joseph</h2>
              <p>Experience in AI with Computer vision @Google</p>
              <p style={{ fontSize: 18, color: '#333' }}>Hourly rate: Rs.150</p>
            </div>
            <div className="tutor-ratings">
              <p style={{ color: '#FE6635', fontSize: 25 }}>Ratings</p>
              <div className="star-rating">
                <img src={StarImage} alt="Star rating" />
              </div>
              <p>5.0 (700)</p>
              <p>1412 hours of Tutoring</p>
              <button className="view-profile-btn">View Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindTutors;