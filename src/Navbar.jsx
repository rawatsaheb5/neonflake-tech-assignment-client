import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';  // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Neonflake Tech</Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/thumbnail" className="navbar-link">Listing Page</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
