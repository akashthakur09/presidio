// src/pages/TenantHomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TenantHeader from '../navbar/tenantNavbar';

const TenantHomePage = () => {
  const [properties, setProperties] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('api/property/getAllproperties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const sortedProperties = () => {
    let sorted = [...properties];
    if (sortBy) {
      sorted.sort((a, b) => {
        if (sortOrder === 'ascending') {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      });
    }
    return sorted;
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleInterest = async (propertyId) => {
    try {
      const response = await axios.post(
        `api/request/createRequest/${propertyId}`,
        {},  // No need to send a body, assuming the backend just needs the propertyId
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.status) {
        alert('Request sent successfully!');
        // Update the state to remove the interested property
        setProperties(properties.filter(property => property._id !== propertyId));
      } else {
        alert('Failed to send request.');
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <div>
      <TenantHeader />
      <h1 className="title" style={{textAlign:"center"}}>Tenant Home Page</h1>
      <div className="filters">
        <div className="filter-left">
          <label>Sort By:</label>
          <select value={sortBy} onChange={handleSortByChange}>
            <option value="">--Select--</option>
            <option value="bedrooms">Bedrooms</option>
            <option value="hospitals">Hospitals</option>
            <option value="colleges">Colleges</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="filter-right">
          <label>Sort Order:</label>
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </div>
      <div className="property-list">
        {sortedProperties().map((property) => (
          <div key={property._id} className="property-card">
            <h2>{property.place}</h2>
            <p>Area: {property.area} sq ft</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Nearby Hospitals: {property.hospitals}</p>
            <p>Nearby Colleges: {property.colleges}</p>
            <button
              className="interest-button"
              onClick={() => handleInterest(property._id)}
            >
              I'm Interested
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantHomePage;
