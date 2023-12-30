import React from 'react';
import './Stock.css';

const StockTable = ({ stocks }) => {
  if (!stocks || stocks.length === 0) {
    return <div>No stock data available for table view.</div>;
  }
  return (
    <table  className="stock-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Company Name</th>
          <th>Latest Price</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.symbol}>
            <td>{stock.symbol}</td>
            <td>{stock.companyName}</td>
            <td>{stock.latestPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
