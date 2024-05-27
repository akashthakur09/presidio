import React from 'react';
import { NavLink } from 'react-router-dom';

const MainRegisterLogin = () => {
  return (
    <div className="main-register-login">
      <h1>Welcome!</h1>
      <div className="buttons-container">
        <NavLink to="/landlordLogin" className="landlord-button">Landlord</NavLink>
        <NavLink to="/tenantLogin" className="tenant-button">Tenant</NavLink>
      </div>
    </div>
  );
};

export default MainRegisterLogin;
