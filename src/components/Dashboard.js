// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'; // Import the CSS file

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          'https://cloud.iexapis.com/stable/stock/market/batch?symbols=aapl,googl,msft&types=quote&token=pk_e9cdab82f3c34f0cb1ea4736e696e7d0'
        );

        const stocks = Object.values(response.data).map((stock) => stock.quote);
        setStockData(stocks);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="page-container dashboard-container">
      <h2 className="dashboard-header">Welcome, {user.username}!</h2>
      <button className="dashboard-logout-button" onClick={onLogout}>
        Logout
      </button>

      <h3>Stocks</h3>
      <ul className="dashboard-stock-list">
        {/* Render stock data here */}
        {stockData.map((stock) => (
          <li key={stock.symbol} className="dashboard-stock-item">
            <strong>{stock.symbol}:</strong> {stock.latestPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
