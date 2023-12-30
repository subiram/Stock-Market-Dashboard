// src/components/StockCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

const StockCard = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          'https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=pk_58b64c13e456411d9558633db43b7400'
        );

        const stocksData = response.data;
        console.log('Fetched stocks:', stocksData);

        // Assuming that the data structure is an array directly
        setStocks(stocksData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  const sortStocks = () => {
    let filteredStocks = [...stocks];

    // Apply search term filter
    if (searchTerm) {
      filteredStocks = filteredStocks.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sort
    if (sortBy === 'symbol') {
      return filteredStocks.sort((a, b) => a.symbol.localeCompare(b.symbol));
    } else if (sortBy === 'latestPrice') {
      return filteredStocks.sort((a, b) => a.latestPrice - b.latestPrice);
    } else {
      return filteredStocks;
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="stock-container">
      <div className="stock-controls">
        <div className="stock-search">
          <label htmlFor="search">Search Symbol:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="stock-sort">
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="symbol">Symbol</option>
            <option value="latestPrice">Latest Price</option>
          </select>
        </div>
      </div>

      <div className="stock-card-container">
        {sortStocks().map((stock) => (
          <div key={stock.symbol} className="stock-card">
            <h3>{stock.symbol}</h3>
            <p>{stock.companyName}</p>
            <p>Latest Price: {stock.latestPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockCard;
