// LandlordProperties.js

import React, { useState, useEffect } from 'react';
import { getLandlordProperties } from '../services/propertyServices'; // Assuming you have a service function to fetch landlord properties

const LandlordProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch properties when component mounts
    const fetchProperties = async () => {
      try {
        const response = await getLandlordProperties(); // Make sure this function fetches properties associated with the logged-in landlord
        setProperties(response); // Assuming response is an array of properties
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div>
      <h2>My Properties</h2>
      <div className="property-list">
        {properties.map(property => (
          <div key={property._id} className="property-card">
            <h3>{property.address}</h3>
            <p>City: {property.city}</p>
            <p>Area: {property.area}</p>
            {/* Add more property details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandlordProperties;
