import React, { useState, useEffect } from 'react';
import SearchBar from '../components/common/SearchBar';
import '../styles/FindTutors.css';
import StarImage from '../assets/Star-image.png';
import dropdownIcon from '../assets/dropdown-icon.png';
import ProfileIcon from '../assets/ProfileIcon.png';
import { useNavigate } from 'react-router-dom';

function FindTutors() {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByOpen, setSortByOpen] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [filters, setFilters] = useState({
    availability: [],
    language: '',
    subject: '',
    price: '',
    experience: ''
  });

  useEffect(() => {
    fetchTutors();
  }, []);

  const navigate = useNavigate();

  const handleViewProfileClick = (tutor) => {
    navigate(`/view-profile/${tutor.userId}`);
  };
  
  const fetchTutors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tutors');
      const data = await response.json();
      if (data.success) {
        setTutors(data.tutors);
        setFilteredTutors(data.tutors);
        const uniqueLanguages = [...new Set(
          data.tutors.flatMap(tutor => tutor.TutoringLanguage || [])
        )].filter(Boolean);
        
        setAvailableLanguages(uniqueLanguages);
      }
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = tutors.filter(tutor => 
      tutor.name?.toLowerCase().includes(query.toLowerCase()) ||
      tutor.TutoringTopics?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTutors(filtered);
  };

  const handleSort = (event) => {
    const sortType = event.target.value;
    const sorted = [...filteredTutors];
    
    switch(sortType) {
      case 'Price: Low to High':
        sorted.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'Price: High to Low':
        sorted.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case 'Experience':
        sorted.sort((a, b) => (b.experience || '').localeCompare(a.experience || ''));
        break;
      default:
        break;
    }
    setFilteredTutors(sorted);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    let filtered = [...tutors];
    
    if (newFilters.availability.length > 0) {
      // Add availability filtering logic if needed
    }

    if (newFilters.language) {
      filtered = filtered.filter(tutor => tutor.TutoringLanguage && tutor.TutoringLanguage.includes(newFilters.language));
    }
    
    if (newFilters.subject) {
      filtered = filtered.filter(tutor => 
        tutor.TutoringTopics?.includes(newFilters.subject)
      );
    }
    
    if (newFilters.price) {
      const [min, max] = newFilters.price.split(' - ').map(p => 
        parseInt(p.replace('Rs. ', ''))
      );
      filtered = filtered.filter(tutor => 
        tutor.hourlyRate >= min && tutor.hourlyRate <= max
      );
    }
    
    if (newFilters.experience) {
      const experienceMap = {
        'Less than 1 year': 1,
        '1 - 3 years': 2,
        '3 - 5 years': 3,
        '5+ years': 4
      };
      
      filtered = filtered.filter(tutor => {
        const tutorExp = experienceMap[tutor.experience] || 0;
        const filterExp = experienceMap[newFilters.experience] || 0;
        return tutorExp >= filterExp;
      });
    }
    
    setFilteredTutors(filtered);
  };

  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    const updatedAvailability = checked
      ? [...filters.availability, name]
      : filters.availability.filter(item => item !== name);
    
    handleFilterChange('availability', updatedAvailability);
  };

  const getTutorImage = (tutorId) => {
    return `http://localhost:5000/api/profile/image/${tutorId}?userType=Tutor`;
  };

  
  const formatExperience = (tutor) => {
    if (!tutor.experience) return "Experience not specified";
    return `${tutor.experience}`;
  };

  return (
    <div className="find-tutors-page">
      <div className="search-section">
        <SearchBar onSearch={handleSearch} />
        <h2>These <span className="highlight">Tutors</span> Fit your Choice</h2>
      </div>
      
      <div className="main-content1">
        <div className="filters">
          <h2>Filters</h2>
          <h3>Availability</h3>
          <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                name="Today"
                checked={filters.availability.includes('Today')}
                onChange={handleCheckboxChange}
              /> Today
            </label>
            <label>
              <input 
                type="checkbox" 
                name="Tomorrow"
                checked={filters.availability.includes('Tomorrow')}
                onChange={handleCheckboxChange}
              /> Tomorrow
            </label>
            <label>
              <input 
                type="checkbox" 
                name="This week"
                checked={filters.availability.includes('This week')}
                onChange={handleCheckboxChange}
              /> This week
            </label>
          </div>

          <h3>Language</h3>
          <div className="custom-dropdown">
            <select 
              value={filters.language}
              onChange={(e) => handleFilterChange('language', e.target.value)}
            >
              <option value="">Select</option>
              {availableLanguages.map(language => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
            </select>
            <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
          </div>

          <h3>Price</h3>
          <div className="custom-dropdown">
            <select
              value={filters.price}
              onChange={(e) => handleFilterChange('price', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Rs. 0 - Rs. 500">Rs. 0 - Rs. 500</option>
              <option value="Rs. 500 - Rs. 1000">Rs. 500 - Rs. 1000</option>
              <option value="Rs. 1000 - Rs. 1500">Rs. 1000 - Rs. 1500</option>
            </select>
            <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
          </div>

          <h3>Experience</h3>
          <div className="custom-dropdown">
            <select
              value={filters.experience}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Less than 1 year">Less than 1 year</option>
              <option value="1 - 3 years">1 - 3 years</option>
              <option value="3 - 5 years">3 - 5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
            <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
          </div>
        </div>

        <div className="tutor-profiles">
          <div className="sort-by">
            <label>Sort By:</label>
            <div className="custom-dropdown">
              <select onChange={handleSort}>
                <option value="">Select</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Experience">Experience</option>
              </select>
              <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
            </div>
          </div>

          {filteredTutors.map((tutor) => (
            <div key={tutor._id} className="tutor-card">
              <img 
                src={getTutorImage(tutor.userId)}
                alt={`${tutor.name}'s Profile`}
                className="profile-pic"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ProfileIcon;
                }}
              />
              <div className="tutor-details">
                <h2>{tutor.name}</h2>
                <p>{formatExperience(tutor)}</p>
                <p style={{ fontSize: 18, color: '#333' }}>
                  Hourly rate: Rs.{tutor.hourlyRate}
                </p>
              </div>
              <div className="tutor-ratings">
                <p style={{ color: '#FE6635', fontSize: 25 }}>Ratings</p>
                <div className="star-rating">
                  <img src={StarImage} alt="Star rating" />
                </div>
                <p>5.0 (100)</p>
                <p>1412 hours of Tutoring</p>
                <button className="view-profile-btn" onClick={() => handleViewProfileClick(tutor)} >View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindTutors;