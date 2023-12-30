import React from 'react';
import './Stock.css'

const StockCard = ({ stocks }) => {
  if (!stocks || stocks.length === 0) {
    return <div>No stock data available for table view.</div>;
  }
  return (
    <div className="stock-card-container">
      {stocks.map((stock) => (
        <div key={stock.symbol} className="stock-card">
          <h3>{stock.symbol}</h3>
          <p>{stock.companyName}</p>
          <p>Latest Price: {stock.latestPrice}</p>
        </div>
      ))}
    </div>
  );
};

export default StockCard;
