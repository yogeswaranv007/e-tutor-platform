import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/search-icon.png';

const SearchBar = ({ onSearch, placeholder = "Search by topic or tutor name...", isTransitioning = false }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/find-tutors', { state: { searchQuery: searchValue } });
  };

  const handleInputClick = () => {
    navigate('/find-tutors');
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={`search-bar ${isTransitioning ? 'search-bar-transition' : ''}`}>
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        onClick={handleInputClick}
        placeholder={placeholder}
        className="search-input"
        style={{ cursor: 'pointer' }}
      />
      <button type="submit" className="search-button">
        <img src={searchIcon} alt="Search" className="search-icon" />
      </button>
    </form>
  );
};

export default SearchBar;