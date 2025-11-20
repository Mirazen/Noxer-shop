import React, { useState } from 'react';
import '../styles/Filters.css';

const Filters = ({ onFilterChange, categories, brands }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [inStock, setInStock] = useState(false);

  const handleCategoryChange = (category) => {
    const newCategory = selectedCategory === category ? '' : category;
    setSelectedCategory(newCategory);
    applyFilters({ category: newCategory, brand: selectedBrand, inStock });
  };

  const handleBrandChange = (brand) => {
    const newBrand = selectedBrand === brand ? '' : brand;
    setSelectedBrand(newBrand);
    applyFilters({ category: selectedCategory, brand: newBrand, inStock });
  };

  const handleStockChange = (checked) => {
    setInStock(checked);
    applyFilters({ category: selectedCategory, brand: selectedBrand, inStock: checked });
  };

  const applyFilters = (filters) => {
    const filterObj = {};
    
    if (filters.category) filterObj.category = filters.category;
    if (filters.brand) filterObj.brand = filters.brand;
    if (filters.inStock) filterObj.in_stock = true;

    onFilterChange(filterObj);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setInStock(false);
    onFilterChange({});
  };

  return (
    <aside className="filters">
      <div className="filters-header">
        <h2>Фильтры</h2>
        <button className="reset-button" onClick={handleReset}>
          Сбросить
        </button>
      </div>

      {/* Категории */}
      {categories && categories.length > 0 && (
        <div className="filter-section">
          <h3>Категория</h3>
          <div className="filter-options">
            {categories.map((cat, index) => (
              <label key={index} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => handleCategoryChange(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Бренды */}
      {brands && brands.length > 0 && (
        <div className="filter-section">
          <h3>Бренд</h3>
          <div className="filter-options">
            {brands.map((brand, index) => (
              <label key={index} className="filter-option">
                <input
                  type="radio"
                  name="brand"
                  checked={selectedBrand === brand}
                  onChange={() => handleBrandChange(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* В наличии */}
      <div className="filter-section">
        <label className="filter-option">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => handleStockChange(e.target.checked)}
          />
          <span>Только в наличии</span>
        </label>
      </div>
    </aside>
  );
};

export default Filters;
