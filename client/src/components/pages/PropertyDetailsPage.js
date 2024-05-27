// src/pages/DetailsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../navbar/landlordNavbar';

const DetailsPage = () => {
  const [properties, setProperties] = useState([]);
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [showUpdatePropertyForm, setShowUpdatePropertyForm] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [newProperty, setNewProperty] = useState({
    address: '',
    city: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    hospitals: '',
    colleges: ''
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`api/property/getLandlordProperties/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [userId]);

  const handleDeleteProperty = async (propertyId) => {
    try {
      await axios.delete(`api/property/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty((prevProperty) => ({ ...prevProperty, [name]: value }));
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'api/property/createProperty',
        { ...newProperty, landlord: userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setProperties((prevProperties) => [...prevProperties, response.data]);
      setShowAddPropertyForm(false);
      setNewProperty({
        address: '',
        city: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        hospitals: '',
        colleges: ''
      });
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const handleUpdateProperty = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `api/property/${currentProperty._id}`,
        { ...newProperty, landlord: userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property._id === currentProperty._id ? response.data : property
        )
      );
      setShowUpdatePropertyForm(false);
      setCurrentProperty(null);
      setNewProperty({
        address: '',
        city: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        hospitals: '',
        colleges: ''
      });
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const handleEditClick = (property) => {
    setCurrentProperty(property);
    setNewProperty(property);
    setShowUpdatePropertyForm(true);
  };

  return (
    <div>
      <Header />
      <div className="details-page">
        <h1>Details Page</h1>
        <button
          className="add-property-button"
          onClick={() => setShowAddPropertyForm(true)}
        >
          Add Property
        </button>
        {showAddPropertyForm && (
          <div className="add-property-form">
            <h2>Add New Property</h2>
            <form onSubmit={handleAddProperty}>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={newProperty.address}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={newProperty.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="area"
                placeholder="Area"
                value={newProperty.area}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="bedrooms"
                placeholder="Bedrooms"
                value={newProperty.bedrooms}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="bathrooms"
                placeholder="Bathrooms"
                value={newProperty.bathrooms}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="hospitals"
                placeholder="Nearby Hospitals"
                value={newProperty.hospitals}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="colleges"
                placeholder="Nearby Colleges"
                value={newProperty.colleges}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="submit-button">Add</button>
            </form>
          </div>
        )}
        {showUpdatePropertyForm && (
          <div className="update-property-form">
            <h2>Update Property</h2>
            <form onSubmit={handleUpdateProperty} >
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={newProperty.address}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={newProperty.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="area"
                placeholder="Area"
                value={newProperty.area}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="bedrooms"
                placeholder="Bedrooms"
                value={newProperty.bedrooms}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="bathrooms"
                placeholder="Bathrooms"
                value={newProperty.bathrooms}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="hospitals"
                placeholder="Nearby Hospitals"
                value={newProperty.hospitals}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="colleges"
                placeholder="Nearby Colleges"
                value={newProperty.colleges}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="submit-button">Update</button>
            </form>
          </div>
        )}
        <div className="properties-list">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property._id} className="property-card">
                <h2>{property.address}</h2>                
                <p>City: {property.city}</p>
                <p>Area: {property.area} sq ft</p>
                <p>Bedrooms: {property.bedrooms}</p>
                <p>Bathrooms: {property.bathrooms}</p>
                <p>Nearby Hospitals: {property.hospitals}</p>
                <p>Nearby Colleges: {property.colleges}</p>
                <p>Status: {property.availability}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteProperty(property._id)}
                >
                  Delete Property
                </button>
                <button
                  className="update-button"
                  onClick={() => handleEditClick(property)}
                >
                  Update Property
                </button>
              </div>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
