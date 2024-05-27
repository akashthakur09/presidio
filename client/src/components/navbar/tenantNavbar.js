// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const TenantHeader = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item"><NavLink to="/tenantHome" activeclassname="activeClassName">Home</NavLink></li>
          <li className="nav-item"><NavLink to="/requests" activeclassname="activeClassName">Your Request</NavLink></li>
          <li className="nav-item"><NavLink to="/tenantProperty" activeclassname="activeClassName">Property Details</NavLink></li>
          <li className="nav-item"><NavLink to="/tenantprofile" activeclassname="activeClassName">Profile</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default TenantHeader;
