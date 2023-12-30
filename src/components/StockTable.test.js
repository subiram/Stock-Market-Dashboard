import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StockTable from './StockTable';


jest.mock('axios');

// Sample data for testing
const sampleStocks = [
  { symbol: 'AAPL', companyName: 'Apple Inc.', latestPrice: 150.25 },
  { symbol: 'GOOGL', companyName: 'Alphabet Inc.', latestPrice: 2800.0 },
];

describe('StockTable Component', () => {
  test('renders table with stock data', async () => {
    
    axios.get.mockResolvedValue({ data: sampleStocks });

    render(<StockTable />);

    const tableRows = await screen.findAllByRole('row');
    const tableData = await screen.findAllByRole('cell');

   
    expect(tableRows.length).toBe(sampleStocks.length + 1); 
    expect(tableData.length).toBe(sampleStocks.length * 3); 

    sampleStocks.forEach((stock) => {
      expect(screen.getByText(stock.symbol)).toBeInTheDocument();
      expect(screen.getByText(stock.companyName)).toBeInTheDocument();
      expect(screen.getByText(stock.latestPrice.toString())).toBeInTheDocument();
    });
  });

  test('filters and sorts stocks based on user input', async () => {

    axios.get.mockResolvedValue({ data: sampleStocks });

    render(<StockTable />);

    await screen.findAllByRole('row');

    fireEvent.change(screen.getByLabelText('Search Symbol:'), { target: { value: 'AAPL' } });

    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.queryByText('GOOGL')).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Sort By:'), { target: { value: 'latestPrice' } });

    const sortedStocks = sampleStocks.sort((a, b) => a.latestPrice - b.latestPrice);
    sortedStocks.forEach((stock, index) => {
      const row = screen.getByText(stock.symbol).closest('tr');
      expect(row).toHaveClass(`row-${index + 1}`);
    });
  });
});
