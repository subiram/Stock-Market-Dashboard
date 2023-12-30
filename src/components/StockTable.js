// src/components/StockTable.js
import React, { useState, useEffect } from 'react';
import './Stock.css'; // Import the stock.css file
import axios from 'axios';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          'https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=pk_58b64c13e456411d9558633db43b7400'
        );

        const stockData = response.data;
        setStocks(stockData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

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

      <table className="stock-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company Name</th>
            <th>Latest Price</th>
          </tr>
        </thead>
        <tbody>
          {sortStocks().map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.companyName}</td>
              <td>{stock.latestPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
