// propertyService.js

import axios from 'axios';

// Function to fetch properties associated with the logged-in landlord
export const getLandlordProperties = async () => {
  const id=localStorage.getItem("userId");
  try {
    // Make an HTTP GET request to your backend API endpoint
    const response = await axios.get(`http://localhost:4000/api/property/getLandlordProperties/${id}`, {
      // Include any necessary headers, such as authentication tokens
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors, such as network errors or API errors
    console.error('Error fetching properties:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
