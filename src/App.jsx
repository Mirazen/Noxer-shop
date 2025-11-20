import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FrequentSearches from './components/FrequentSearches';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import { getMainProducts, filterProducts } from './utils/api';
import './styles/App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [frequentSearches, setFrequentSearches] = useState([]);
  const perPage = 50;

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const data = await getMainProducts();
      
      if (data) {
        const productsList = data.products || [];
        setProducts(productsList);
        setInitialProducts(productsList);
        setFrequentSearches(data.frequent_searches || []);
      }
      
      setLoading(false);
    };

    loadInitialData();
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleFrequentSearchClick = useCallback((search) => {
    setSearchQuery(search);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      if (!searchQuery.trim()) {
        setProducts(initialProducts);
        setCurrentPage(1);
        setTotalPages(1);
        return;
      }

      setLoading(true);
      
      const filterObj = { search: searchQuery };
      const data = await filterProducts(filterObj, currentPage, perPage);
      
      if (data) {
        setProducts(data.products || []);
        setCurrentPage(data.current_page || 1);
        setTotalPages(data.total_pages || 1);
      }
      
      setLoading(false);
    };

    loadProducts();
  }, [searchQuery, currentPage, initialProducts]);

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
