// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item"><NavLink to="/requestsTtoL" activeclassname="activeClassName">Request</NavLink></li>
          <li className="nav-item"><NavLink to="/propertyDetails" activeclassname="activeClassName">Details</NavLink></li>
          <li className="nav-item"><NavLink to="/Lanlordprofile" activeclassname="activeClassName">Profile</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
