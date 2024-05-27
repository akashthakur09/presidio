import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TenantHeader from '../navbar/tenantNavbar';
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`api/tenant/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <>
      <TenantHeader/>
      <div className="profile-page">
        <div className="profile-container">
          {userData && (
            <>
              <div className="profile-details">
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Contact:</strong> {userData.phone}</p>
              </div>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
