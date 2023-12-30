import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StockCard from './StockCard';

jest.mock('axios');

// Sample data for testing
const sampleStocks = [
  { symbol: 'AAPL', companyName: 'Apple Inc.', latestPrice: 150.25 },
  { symbol: 'GOOGL', companyName: 'Alphabet Inc.', latestPrice: 2800.0 },
];

describe('StockCard Component', () => {
  test('renders cards with stock data', async () => {
    
    axios.get.mockResolvedValue({ data: sampleStocks });

    render(<StockCard />);

    const cards = await screen.findAllByTestId('stock-card');
d
    expect(cards.length).toBe(sampleStocks.length);

    sampleStocks.forEach((stock) => {
      expect(screen.getByText(stock.symbol)).toBeInTheDocument();
      expect(screen.getByText(stock.companyName)).toBeInTheDocument();
      expect(screen.getByText(`Latest Price: ${stock.latestPrice}`)).toBeInTheDocument();
    });
  });

  test('filters and sorts stocks based on user input', async () => {
    axios.get.mockResolvedValue({ data: sampleStocks });

    render(<StockCard />);

    await screen.findAllByTestId('stock-card');

    fireEvent.change(screen.getByLabelText('Search Symbol:'), { target: { value: 'AAPL' } });

    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.queryByText('GOOGL')).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Sort By:'), { target: { value: 'latestPrice' } });

    const sortedStocks = sampleStocks.sort((a, b) => a.latestPrice - b.latestPrice);
    sortedStocks.forEach((stock, index) => {
      const card = screen.getByText(stock.symbol).closest('.stock-card');
      expect(card).toHaveClass(`card-${index + 1}`);
    });
  });
});
