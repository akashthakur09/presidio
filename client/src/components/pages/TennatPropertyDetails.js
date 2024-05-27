import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TenantHeader from '../navbar/tenantNavbar';

const TenantPropertyDetails = () => {
  const [approvedProperties, setApprovedProperties] = useState([]);

  useEffect(() => {
    const fetchApprovedProperties = async () => {
      try {
        // Fetch all tenant requests
        const requestsResponse = await axios.get('api/request/getTenantRequest', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Filter approved requests
        const approvedRequests = requestsResponse.data.filter(request => request.status === 'approved');

        // Fetch details for each approved property
        const propertyDetailsPromises = approvedRequests.map(request => 
          axios.get(`api/property/${request.property_id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
        );

        const propertiesResponses = await Promise.all(propertyDetailsPromises);
        const properties = propertiesResponses.map(response => response.data);

        setApprovedProperties(properties);
      } catch (error) {
        console.error('Error fetching approved properties:', error);
      }
    };

    fetchApprovedProperties();
  }, []);

  return (
    <div>
      <TenantHeader />
      <h1 style={{ textAlign: 'center' }}>Approved Properties</h1>
      <div className="approved-property-list">
        {approvedProperties.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No approved properties.</p>
        ) : (
          approvedProperties.map(property => (
            <div key={property._id} className="property-card">
              <h2>{property.place}</h2>
              <p>Area: {property.area} sq ft</p>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Bathrooms: {property.bathrooms}</p>
              <p>Nearby Hospitals: {property.hospitals}</p>
              <p>Nearby Colleges: {property.colleges}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TenantPropertyDetails;
