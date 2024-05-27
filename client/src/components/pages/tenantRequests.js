import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TenantHeader from '../navbar/tenantNavbar';

const TenantRequests = () => {
  const [requests, setRequests] = useState([]);
  const [pendingProperties, setPendingProperties] = useState([]);
  const [approvedProperties, setApprovedProperties] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('api/request/getTenantRequest', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setRequests(response.data);

        const pendingRequests = response.data.filter(request => request.status === 'pending');
        const pendingPropertyDetailsPromises = pendingRequests.map(request => 
          axios.get(`api/property/${request.property_id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }).then(propertyResponse => ({ ...request, property: propertyResponse.data }))
        );

        const penProperties = await Promise.all(pendingPropertyDetailsPromises);
        setPendingProperties(penProperties);

        const approvedRequests = response.data.filter(request => request.status === 'approved');
        const approvedPropertyDetailsPromises = approvedRequests.map(request => 
          axios.get(`api/property/${request.property_id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }).then(propertyResponse => ({ ...request, property: propertyResponse.data }))
        );

        const appProperties = await Promise.all(approvedPropertyDetailsPromises);
        setApprovedProperties(appProperties);
      } catch (error) {
        console.error('Error fetching requests or properties:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleDeleteRequest = async (requestId) => {
    try {
      await axios.delete(`api/request/deleteRequest/${requestId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRequests(prevRequests => prevRequests.filter(request => request._id !== requestId));
      setPendingProperties(prevProperties => prevProperties.filter(property => property._id !== requestId));
      setApprovedProperties(prevProperties => prevProperties.filter(property => property._id !== requestId));
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  return (
    <div>
      <TenantHeader />
      <h1 style={{ textAlign: "center" }}>Tenant Requests</h1>
      <div className="tenant-request-list">
        {pendingProperties.map(request => (
          <div key={request._id} className="tenant-request-card">
            <h2>Property: {request.property ? request.property.place : 'N/A'}</h2>
            <p>Area: {request.property ? request.property.area : 'N/A'} sq ft</p>
            <p>Bedrooms: {request.property ? request.property.bedrooms : 'N/A'}</p>
            <p>Bathrooms: {request.property ? request.property.bathrooms : 'N/A'}</p>
            <p>Nearby Hospitals: {request.property ? request.property.hospitals : 'N/A'}</p>
            <p>Nearby Colleges: {request.property ? request.property.colleges : 'N/A'}</p>
            <p>Status: {request.status}</p>
            <div className="button-group">
              <button
                className={
                  request.status === 'rejected' 
                    ? 'tenant-rejected-button' 
                    : request.status === 'approved' 
                    ? 'tenant-approved-button' 
                    : 'tenant-pending-button'
                }
                disabled
              >
                {request.status === 'rejected' ? 'Rejected' : request.status === 'approved' ? 'Approved' : 'Pending'}
              </button>
              <button className="tenant-delete-button" onClick={() => handleDeleteRequest(request._id)}>
                Delete Request
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2 style={{ textAlign: "center"}}>Approved Properties</h2>
      <div className="approved-property-list">
        {approvedProperties.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No approved properties.</p>
        ) : (
          approvedProperties.map(request => (
            <div key={request._id} className="property-card">
              <h2>{request.property.place}</h2>
              <p>Area: {request.property.area} sq ft</p>
              <p>Bedrooms: {request.property.bedrooms}</p>
              <p>Bathrooms: {request.property.bathrooms}</p>
              <p>Nearby Hospitals: {request.property.hospitals}</p>
              <p>Nearby Colleges: {request.property.colleges}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TenantRequests;
