
import axios from './axios';

export const registerLandlord = async (userData) => {
  try {
    console.log(userData);
    const response = await axios.post('/landlord/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const registerTenant = async (userData) => {
    try {
      const response = await axios.post('/tenant/register', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
export const loginLandlord = async (userData) => {
    try {
      const response = await axios.post('/landlord/login', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  export const loginTenant = async (userData) => {
    try {
      console.log(userData);
      const response = await axios.post('/tenant/login', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
