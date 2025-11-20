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
    async function loadData() {
      setLoading(true);
      
      const mainData = await getMainProducts();
      if (mainData && mainData.frequent_searches) {
        setFrequentSearches(mainData.frequent_searches);
      }
      
      const allData = await filterProducts({}, 1, 50);
      if (allData && allData.products) {
        setProducts(allData.products);
        setTotalPages(allData.total_pages || 1);
      }
      
      setLoading(false);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function searchOrChangePage() {
      setLoading(true);
      
      let filters = {};
      if (searchQuery) {
        filters.search = searchQuery;
      }
      
      const data = await filterProducts(filters, currentPage, 50);
      
      if (data && data.products) {
        setProducts(data.products);
        setTotalPages(data.total_pages || 1);
      }
      
      setLoading(false);
    }

    if (searchQuery || currentPage > 1) {
      searchOrChangePage();
    }
  }, [searchQuery, currentPage]);

  function handleSearch(query) {
    setSearchQuery(query);
    setCurrentPage(1);
  }

  function handleFrequentSearchClick(search) {
    setSearchQuery(search);
    setCurrentPage(1);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }

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
