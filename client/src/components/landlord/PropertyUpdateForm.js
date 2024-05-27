import React, { useState } from 'react';

const LandlordPropertyUpdate = ({ property }) => {
  const [formData, setFormData] = useState({
    name: property.name,
    address: property.address,
    // Add more property details here
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated property data to the backend API
      const response = await fetch(`api/landlord/properties/${property._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Property updated successfully
        alert('Property updated successfully');
      } else {
        console.error('Failed to update property');
      }
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  return (
    <div>
      <h2>Update Property</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        {/* Add more input fields for other property details */}
        <button type="submit">Update Property</button>
      </form>
    </div>
  );
};

export default LandlordPropertyUpdate;
