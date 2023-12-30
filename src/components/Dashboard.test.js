// src/components/Dashboard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  test('renders welcome message and navigation links', () => {
    const user = { username: 'TestUser' };

    render(
      <Router>
        <Dashboard user={user} />
      </Router>
    );

    // Check if the welcome message is rendered
    expect(screen.getByText(`Welcome, ${user.username}!`)).toBeInTheDocument();

    // Check if the navigation links are rendered
    expect(screen.getByText('Table View')).toBeInTheDocument();
    expect(screen.getByText('Card View')).toBeInTheDocument();
  });
});
