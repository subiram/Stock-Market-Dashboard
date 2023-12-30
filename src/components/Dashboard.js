import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StockTable from './StockTable';
import StockCard from './StockCard';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [stockData, setStockData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          'https://cloud.iexapis.com/stable/stock/market/batch?symbols=aapl,googl,msft&types=quote&token=pk_58b64c13e456411d9558633db43b7400'
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
    <div className="dashboard-container">
      <h2 align='center' className="dashboard-header">Welcome, {user.username} !</h2>
      <br/> 
      <br/>
      <nav className="dashboard-navigation">
        <Link to="./table">Table View</Link>
        <Link to="./cards">Card View</Link>
      </nav>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
