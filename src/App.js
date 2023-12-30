import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import StockTableView from './components/StockTableView';
import StockCardView from './components/StockCardView';
import axios from 'axios';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          'https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=pk_58b64c13e456411d9558633db43b7400'
        );

        const stocks = Object.values(response.data).map((stock) => stock.quote);
        setStockData(stocks);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-container">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Register</Link>
            </li>
            {user && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            {user && (
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onLogout={handleLogout} stocks={stockData} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/table"
          element={<StockTableView stocks={stockData} />}
        />
        <Route
          path="/dashboard/cards"
          element={<StockCardView stocks={stockData} />}
        />
        <Route
          path="/logout"
          element={<Logout onLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
