import React, { useState, useEffect } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return function cleanup() {
      clearTimeout(timer);
    };
  }, [searchTerm, onSearch]);

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleClear() {
    setSearchTerm('');
  }

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Поиск товаров..."
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button className="clear-button" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
