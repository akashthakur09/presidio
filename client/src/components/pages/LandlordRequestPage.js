import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../navbar/landlordNavbar';

const RequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [properties, setProperties] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('api/request/getLandlordRequest', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setRequests(response.data);
        console.log(response);

        // Fetch property details for each request
        response.data.forEach(request => {
          if (request.property_id) {
            fetchPropertyDetails(request.property_id);
          }
        });
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    const fetchPropertyDetails = async (propertyId) => {
      try {
        const response = await axios.get(`api/property/${propertyId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProperties(prevProperties => ({
          ...prevProperties,
          [propertyId]: response.data,
        }));
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleRequestUpdate = async (requestId, status) => {
    try {
      const response = await axios.put(
        `api/request/updateRequest/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Response:', response.data);
      if (response.data.status) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId ? { ...request, status } : request
          )
        );
      } else {
        console.error('Failed to update request status:', response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error updating request status:', error.response.data);
      } else {
        console.error('Error updating request status:', error.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="request-page">
        <h1>Request Page</h1>
        <div className="requests-list">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div key={request._id} className="request-card">
                <h2>{properties[request.property_id]? properties[request.property_id].name : 'Loading property details...'}</h2>
                {properties[request.property_id] && (
                  <div className="property-details">
                    <p>City: {properties[request.property_id].address}</p>
                    <p>Address: {properties[request.property_id].address} </p>
                    <p>Area: {properties[request.property_id].area} sq ft</p>
                    <p>Bedrooms: {properties[request.property_id].bedrooms}</p>
                    <p>Bathrooms: {properties[request.property_id].bathrooms}</p>
                    <p>Nearby Hospitals: {properties[request.property_id].hospitals}</p>
                    <p>Nearby Colleges: {properties[request.property_id].colleges}</p>
                  </div>
                )}
                <p>Status: {request.status}</p>
                {/* <p>Tenant: {request.tenant_id} </p> */}
                <p>Landlord: {request.landlord_id} </p>
                <div className="request-buttons">
                  {request.status !== "approved" ? (
                    <button
                      className="accept-button"
                      onClick={() => handleRequestUpdate(request._id, 'approved')}
                    >
                      Accept
                    </button>
                  ) : (
                    <button
                      className="reject-button"
                      onClick={() => handleRequestUpdate(request._id, 'rejected')}
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
