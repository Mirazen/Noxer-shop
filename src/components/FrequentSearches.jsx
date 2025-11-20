import React from 'react';

const FrequentSearches = ({ searches, onSearchClick }) => {
  if (!searches || searches.length === 0) return null;

  return (
    <div className="frequent-searches">
      <h3 className="frequent-title">Часто ищут:</h3>
      <div className="search-tags">
        {searches.map((search, index) => (
          <button
            key={index}
            className="search-tag"
            onClick={() => onSearchClick(search)}
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FrequentSearches;
