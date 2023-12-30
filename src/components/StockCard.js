// src/components/StockCard.js
import React, { useState } from 'react';
import './Stock.css'; // Import the stock.css file

const StockCard = ({ stocks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filteredStocks = stocks.filter((stock) =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortStocks = () => {
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
