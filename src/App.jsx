import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FrequentSearches from './components/FrequentSearches';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import { getMainProducts, filterProducts } from './utils/api';
import './styles/App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [frequentSearches, setFrequentSearches] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      
      const mainData = await getMainProducts();
      if (mainData) {
        setFrequentSearches(mainData.frequent_searches || []);
      }
      
      const allData = await filterProducts({}, 1, 50);
      if (allData) {
        setProducts(allData.products || []);
        setTotalPages(allData.total_pages || 1);
      }
      
      setLoading(false);
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (currentPage === 1 && !searchQuery) return;
    
    const loadProducts = async () => {
      setLoading(true);
      
      const filterObj = searchQuery ? { search: searchQuery } : {};
      const data = await filterProducts(filterObj, currentPage, 50);
      
      if (data) {
        setProducts(data.products || []);
        setTotalPages(data.total_pages || 1);
      }
      
      setLoading(false);
    };

    loadProducts();
  }, [searchQuery, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFrequentSearchClick = (search) => {
    setSearchQuery(search);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-container">
        <div className="search-section">
          <SearchBar onSearch={handleSearch} />
          <FrequentSearches 
            searches={frequentSearches} 
            onSearchClick={handleFrequentSearchClick}
          />
        </div>

        <div className="products-section">
          <ProductGrid products={products} loading={loading} />
          
          {!loading && products.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
