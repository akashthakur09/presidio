import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "api/property/getAllproperties"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleInterest = () => {
    navigate("/tenantLogin");
  };

  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <ul className="nav-list">
            <li>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <h1>Available Properties</h1>
        <div className="properties-list">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property._id} className="property-card">
                <h2>{property.place}</h2>
                <p>Area: {property.area} sq ft</p>
                <p>Bedrooms: {property.bedrooms}</p>
                <p>Bathrooms: {property.bathrooms}</p>
                <p>Nearby Hospitals: {property.hospitals}</p>
                <p>Nearby Colleges: {property.colleges}</p>
                <button className="interest-button" onClick={handleInterest}>
                  I'm Interested
                </button>
              </div>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
