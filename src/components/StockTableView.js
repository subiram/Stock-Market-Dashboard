import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StockTable from './StockTable';
import './Stock.css'; 

const StockTableView = ({ stocks }) => {
  const navigate = useNavigate();

  if (!stocks || stocks.length === 0) {
    return (
      <div className="center-content">
        <p>No stock data available for table view.</p>
        <Link to="/dashboard" className="back-link">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="center-content">
      <StockTable stocks={stocks} />
      <Link to="/dashboard" className="back-link">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default StockTableView;
