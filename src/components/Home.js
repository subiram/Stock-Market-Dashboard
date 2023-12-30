import React from 'react';
import './Home.css'; 

const Home = () => {
  return (
    <div className="page-container home-container">
      <h1>Welcome to Stock Market Dashboard</h1>
      <p>
        <a className="home-link" href="/login">
          Login
        </a>{' '}
        or{' '}
        <a className="home-link" href="/registration">
          Register
        </a>{' '}
        to get started.
      </p>
    </div>
  );
};

export default Home;
