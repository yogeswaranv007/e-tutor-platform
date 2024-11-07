import React from 'react';
import '../styles/SearchBar.css';
import searchIcon from '../assets/search-icon.png';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="What would you like to learn?" />
      <button className="search-button">
        <img src={searchIcon} alt="Search" className="search-icon" />
      </button>
    </div>
  );
};

export default SearchBar;

