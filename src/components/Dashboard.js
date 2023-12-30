// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import StockTable from './StockTable';
import StockCard from './StockCard';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard-container">
      <h2 align='center' className="dashboard-header">Welcome, {user.username}!</h2>
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
