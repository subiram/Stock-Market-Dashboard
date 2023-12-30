import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StockCard from './StockCard';
import './Stock.css'; 

const StockCardView = ({ stocks }) => {
  const navigate = useNavigate();

  if (!stocks || stocks.length === 0) {
    return (
      <div className="center-content">
        <p>No stock data available for card view.</p>
        <Link to="/dashboard" className="back-link">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="center-content">
      <StockCard stocks={stocks} />
      <Link to="/dashboard" className="back-link">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default StockCardView;
